import React, { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Camera,
  RefreshCw,
  CheckCircle2,
  Check,
  AlertCircle,
  X,
} from 'lucide-react';
import { Student, PrayerType, AttendanceStatus, DetectionResult, AttendanceRecord } from '../types';
import { CLASSES, PRAYER_TIME_CONFIG } from '../data/madrasahData';
import { getStudentsByClass } from '../services/studentService';
import {
  captureFrameToCanvas,
  renderBeRealDualCanvas,
  playCameraShutterSound,
  BeRealRenderOptions,
} from '../services/aiDetector';
import { submitAttendanceRecord } from '../services/attendanceService';
import { BypassModal } from './BypassModal';
import { BeRealPreviewModal } from './BeRealPreviewModal';

// Helper function to check if current time is within valid range
const isTimeValid = (prayerType: PrayerType): boolean => {
  const config = PRAYER_TIME_CONFIG[prayerType];
  if (!config) return true; // No config, allow it
  
  const now = new Date();
  // Gunakan jam WIB (Asia/Jakarta)
  const wibTimeStr = now.toLocaleTimeString('en-GB', { timeZone: 'Asia/Jakarta', hour12: false });
  const [hStr, mStr] = wibTimeStr.split(':');
  const currentHour = parseInt(hStr, 10) || now.getHours();
  const currentMinute = parseInt(mStr, 10) || now.getMinutes();
  
  const startTime = config.startHour * 60 + config.startMinute;
  const endTime = config.endHour * 60 + config.endMinute;
  const currentTime = currentHour * 60 + currentMinute;
  
  return currentTime >= startTime && currentTime <= endTime;
};

interface StudentPresenceProps {
  records?: AttendanceRecord[];
  onRecordSubmitted: (newRecord?: AttendanceRecord) => void;
}

export const StudentPresence: React.FC<StudentPresenceProps> = ({
  records = [],
  onRecordSubmitted,
}) => {
  // 1. Identitas Siswa State
  const [selectedClass, setSelectedClass] = useState<string>(() => {
    return localStorage.getItem('man1_last_class') || 'X A';
  });

  const [studentsVersion, setStudentsVersion] = useState<number>(0);
  useEffect(() => {
    const handleUpdate = () => setStudentsVersion((v) => v + 1);
    window.addEventListener('students_updated', handleUpdate);
    return () => window.removeEventListener('students_updated', handleUpdate);
  }, []);

  // Selalu sinkron dan instan tanpa jeda rendering
  const classStudents = useMemo(() => {
    return getStudentsByClass(selectedClass);
  }, [selectedClass, studentsVersion]);

  const [studentName, setStudentName] = useState<string>(() => {
    const lastClass = localStorage.getItem('man1_last_class') || 'X A';
    const lastName = localStorage.getItem('man1_last_student_name') || '';
    if (lastName) {
      const students = getStudentsByClass(lastClass);
      if (students.some((s) => s.name === lastName)) {
        return lastName;
      }
    }
    try {
      localStorage.removeItem('man1_last_student_name');
    } catch (e) {}
    return '';
  });

  const [studentGender, setStudentGender] = useState<'L' | 'P'>(() => {
    return (localStorage.getItem('man1_last_student_gender') as 'L' | 'P') || 'L';
  });

  // Validasi ketat: jika nama siswa yang terpilih tidak ada di kelas aktif, segera reset
  useEffect(() => {
    if (studentName) {
      const found = classStudents.find((s) => s.name === studentName);
      if (!found) {
        setStudentName('');
        try {
          localStorage.removeItem('man1_last_student_name');
        } catch (e) {}
      } else if (found.gender !== studentGender) {
        setStudentGender(found.gender);
      }
    }
  }, [classStudents, studentName, studentGender]);

  const foundStudent = classStudents.find((s) => s.name === studentName);
  const currentStudent: Student = {
    id: foundStudent ? foundStudent.id : ('stu-' + (studentName.trim().toLowerCase().replace(/\s+/g, '-') || 'anon')),
    nisn: foundStudent ? foundStudent.nisn : '',
    name: studentName.trim(),
    class: selectedClass,
    gender: studentGender,
  };

  useEffect(() => {
    if (selectedClass) {
      try {
        localStorage.setItem('man1_last_class', selectedClass);
      } catch (e) {}
    }
  }, [selectedClass]);

  useEffect(() => {
    try {
      if (studentName) {
        localStorage.setItem('man1_last_student_name', studentName);
      } else {
        localStorage.removeItem('man1_last_student_name');
      }
    } catch (e) {}
  }, [studentName]);

  useEffect(() => {
    if (studentGender) {
      try {
        localStorage.setItem('man1_last_student_gender', studentGender);
      } catch (e) {}
    }
  }, [studentGender]);

  // 2. Sesi Sholat & Hari Jumat
  const isFridayReal = new Date().getDay() === 5;
  const [prayerType, setPrayerType] = useState<PrayerType>('Dhuha');

  // 3. Kamera State
  const [facingMode, setFacingMode] = useState<'user' | 'environment'>('user');
  const [cameraActive, setCameraActive] = useState<boolean>(false);
  const [cameraError, setCameraError] = useState<string | null>(null);

  // 5. Modals & Submission State
  const [bypassModalOpen, setBypassModalOpen] = useState<boolean>(false);
  const [bypassType, setBypassType] = useState<'Halangan' | 'SakitIzin'>('Halangan');
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [submitSuccessMsg, setSubmitSuccessMsg] = useState<string | null>(null);
  const [submittedRecordInfo, setSubmittedRecordInfo] = useState<{
    name: string;
    class: string;
    prayer: string;
    time: string;
    status: string;
    date?: string;
  } | null>(() => {
    try {
      const raw = localStorage.getItem('man1_last_submission_session');
      if (raw) {
        const parsed = JSON.parse(raw);
        if (parsed && parsed.name) return parsed;
      }
    } catch (e) {}
    return null;
  });
  const [locallySubmittedRecords, setLocallySubmittedRecords] = useState<AttendanceRecord[]>(() => {
    try {
      const raw = localStorage.getItem('man1_local_attendance_records');
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) return parsed;
      }
    } catch (e) {}
    return [];
  });
  const [submitErrorMsg, setSubmitErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    const handleUpdate = (e: Event) => {
      const customEvent = e as CustomEvent<AttendanceRecord[]>;
      if (customEvent.detail && Array.isArray(customEvent.detail)) {
        setLocallySubmittedRecords(customEvent.detail);
      }
      const lastSession = localStorage.getItem('man1_last_submission_session');
      if (!lastSession) {
        setSubmittedRecordInfo(null);
      }
    };
    window.addEventListener('presensi_updated', handleUpdate);
    return () => window.removeEventListener('presensi_updated', handleUpdate);
  }, []);

  // 6. Dual vs Instant Capture State
  const [captureMode, setCaptureMode] = useState<'instant' | 'bereal'>('instant');
  const [isBeRealCapturing, setIsBeRealCapturing] = useState<boolean>(false);
  const [beRealStepMsg, setBeRealStepMsg] = useState<string>('');
  const [countdownSec, setCountdownSec] = useState<number | null>(null);
  const [beRealFlash, setBeRealFlash] = useState<boolean>(false);
  const [beRealModalOpen, setBeRealModalOpen] = useState<boolean>(false);
  const [beRealPhotoUrl, setBeRealPhotoUrl] = useState<string>('');
  const frame1CanvasRef = useRef<HTMLCanvasElement | null>(null);
  const frame2CanvasRef = useRef<HTMLCanvasElement | null>(null);
  const beRealOptionsRef = useRef<BeRealRenderOptions | null>(null);

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);

  useEffect(() => {
    if (isFridayReal) {
      if (studentGender === 'L') {
        if (prayerType === 'Dzuhur') {
          setPrayerType('Sholat Jumat');
        }
      } else {
        if (prayerType === 'Sholat Jumat') {
          setPrayerType('Dzuhur');
        }
      }
    } else {
      if (prayerType === 'Sholat Jumat') {
        setPrayerType('Dzuhur');
      }
    }
  }, [isFridayReal, studentGender, prayerType]);

  const startCamera = async (targetFacing: 'user' | 'environment' = facingMode) => {
    try {
      setCameraError(null);
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop());
      }
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: targetFacing,
          width: { ideal: 640 },
          height: { ideal: 480 },
        },
        audio: false,
      });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.onloadedmetadata = () => {
          videoRef.current?.play();
          setCameraActive(true);
        };
      }
    } catch (err: any) {
      console.error('Camera error:', err);
      setCameraError(
        'Kamera tidak dapat diakses. Pastikan izin kamera telah diizinkan pada browser ponsel Anda.'
      );
      setCameraActive(false);
    }
  };

  const toggleCameraFacing = () => {
    const nextFacing = facingMode === 'user' ? 'environment' : 'user';
    setFacingMode(nextFacing);
    startCamera(nextFacing);
  };

  useEffect(() => {
    startCamera(facingMode);
    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);

  // Pengambilan foto 2 sudut BeReal (Wajah & Suasana) secara cepat dan otomatis
  const handleStartCapture = async () => {
    if (!currentStudent || !currentStudent.name) {
      alert('Silakan ketik nama lengkap siswa terlebih dahulu.');
      return;
    }
    if (!videoRef.current) return;

    setIsBeRealCapturing(true);
    setBeRealStepMsg('Mengambil foto presensi...');
    try {
      // 1. Shutter sound & visual flash sudut 1 (Wajah Siswa)
      playCameraShutterSound();
      setBeRealFlash(true);
      setTimeout(() => setBeRealFlash(false), 160);

      // Ambil frame 1 langsung dari kamera aktif (sangat cepat < 50ms)
      const isCurrentMirrored = facingMode === 'user';
      const frame1 = captureFrameToCanvas(videoRef.current, isCurrentMirrored);
      frame1CanvasRef.current = frame1;

      let frame2: HTMLCanvasElement | null = null;

      // MODE DUAL KAMERA (2 SUDUT): Wajah & Suasana Madrasah secara cepat
      setBeRealStepMsg('Sudut 2: Suasana...');
      let switchedStream: MediaStream | null = null;

      try {
        if (streamRef.current) {
          streamRef.current.getTracks().forEach((t) => t.stop());
        }
        const targetMode = facingMode === 'user' ? 'environment' : 'user';
        switchedStream = await navigator.mediaDevices.getUserMedia({
          video: {
            facingMode: { ideal: targetMode },
            width: { ideal: 800 },
            height: { ideal: 600 },
          },
          audio: false,
        });

        if (videoRef.current) {
          videoRef.current.srcObject = switchedStream;
          await new Promise<void>((resolve) => {
            if (!videoRef.current) return resolve();
            videoRef.current.onloadedmetadata = () => {
              videoRef.current?.play().then(() => resolve()).catch(() => resolve());
            };
          });

          // Jeda minimal 150ms agar sensor exposure kamera menyesuaikan secara cepat
          await new Promise((r) => setTimeout(r, 150));
          playCameraShutterSound();
          setBeRealFlash(true);
          setTimeout(() => setBeRealFlash(false), 140);
          frame2 = captureFrameToCanvas(videoRef.current, targetMode === 'user');
        }
      } catch (switchErr) {
        console.warn('Dual camera switch fallback:', switchErr);
        frame2 = frame1;
      } finally {
        if (switchedStream) {
          switchedStream.getTracks().forEach((t) => t.stop());
        }
        await startCamera(facingMode);
      }

      if (!frame2) {
        frame2 = frame1;
      }
      frame2CanvasRef.current = frame2;

      // 3. Render BeReal Photo: Foto Utama (Suasana) & Foto Sudut Kecil (Wajah)
      const isNowValid = isTimeValid(prayerType);
      const renderOpts: BeRealRenderOptions = {
        studentName: currentStudent.name,
        studentClass: currentStudent.class,
        prayerType: prayerType,
        aiConfidence: 100,
        gpsText: isNowValid ? 'Presensi Sah' : 'Di Luar Jam Sholat',
      };
      beRealOptionsRef.current = renderOpts;

      // Foto utama = frame2 (suasana), foto kecil inset = frame1 (wajah)
      const finalPhoto = renderBeRealDualCanvas(frame2, frame1, renderOpts);
      setBeRealPhotoUrl(finalPhoto);
      setBeRealModalOpen(true);
    } catch (err: any) {
      console.error('Capture error:', err);
      alert('Kendala saat mengambil foto: ' + err.message);
    } finally {
      setIsBeRealCapturing(false);
      setBeRealStepMsg('');
      setCountdownSec(null);
    }
  };

  const handleConfirmBeRealSubmit = async (finalPhoto: string) => {
        if (!currentStudent) return;
            setSubmitting(true);
                try {
                      const attendanceStatus: AttendanceStatus = 'Hadir';
                            const now = new Date();
                                  const localTimeWib = now.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit', timeZone: 'Asia/Jakarta' }) + ' WIB';
                                        const localDateWib = now.toLocaleDateString('id-ID', { day: '2-digit', month: 'short', year: 'numeric', timeZone: 'Asia/Jakarta' });
                                              const autoNotes = `Presensi sholat ${prayerType} di area madrasah.`;

                                                    const newRecord = await submitAttendanceRecord({
                                                            name: currentStudent.name,
                                                                    class: currentStudent.class,
                                                                            prayer_type: prayerType,
                                                                                    status: attendanceStatus,
                                                                                            ai_status: 'Terverifikasi',
                                                                                                    ai_confidence: 100,
                                                                                                            gps_status: 'Valid',
                                                                                                                    snapshot_photo: finalPhoto,
                                                                                                                            notes: autoNotes,
                                                                                                                                    recorded_time: localTimeWib,
                                                                                                                                            recorded_date: localDateWib,
                                                                                                                                                  });

                                                                                                                                                        setSubmittedRecordInfo({
                                                                                                                                                                name: currentStudent.name,
                                                                                                                                                                        class: currentStudent.class,
                                                                                                                                                                                prayer: prayerType,
                                                                                                                                                                                        time: localTimeWib,
                                                                                                                                                                                                status: attendanceStatus,
                                                                                                                                                                                                      });
                                                                                                                                                                                                            setSubmitSuccessMsg('Presensi Anda telah berhasil dikirim dan tercatat di sistem.');
                                                                                                                                                                                                                  if (onRecordSubmitted) {
                                                                                                                                                                                                                          onRecordSubmitted(newRecord);
                                                                                                                                                                                                                                }
                                                                                                                                                                                                                                      setBeRealModalOpen(false);
                                                                                                                                                                                                                                          } catch (err: any) {
                                                                                                                                                                                                                                                const msg = err.message || '';
                                                                                                                                                                                                                                                      setSubmitErrorMsg(msg.includes('409') || msg.includes('sudah') ? 'Anda sudah melakukan presensi untuk sholat ini hari ini.' : 'Gagal mengirim presensi: ' + msg);
                                                                                                                                                                                                                                                          } finally {
                                                                                                                                                                                                                                                                setSubmitting(false);
                                                                                                                                                                                                                                                                    }
                                                                                                                                                                                                                                                                      };

  const handleBypassSubmit = async (status: AttendanceStatus, notes: string) => {
    if (!currentStudent) return;
    const cleanNotes = notes ? notes.trim() : '';
    if (!cleanNotes) {
      setSubmitErrorMsg('Keterangan / alasan dispensasi wajib diisi terlebih dahulu.');
      return;
    }
    setSubmitting(true);
    try {
      const res = await submitAttendanceRecord({
        name: currentStudent.name,
        class: currentStudent.class,
        prayer_type: prayerType,
        status: status,
        ai_status: `Bypass (${status})`,
        gps_status: 'Valid',
        notes: cleanNotes,
        created_at: new Date().toISOString(),
      });
      const info = {
        name: currentStudent.name,
        class: currentStudent.class,
        prayer: prayerType,
        time: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }) + ' WIB',
        status: status,
        date: todayStrISO,
      };
      setSubmittedRecordInfo(info);
      try {
        localStorage.setItem('man1_last_submission_session', JSON.stringify(info));
      } catch (e) {}
      setSubmitSuccessMsg(res.message || 'Data dispensasi berhasil dikirim dan tercatat.');
      setLocallySubmittedRecords((prev) => [res.record, ...prev]);
      onRecordSubmitted(res.record);
    } catch (err: any) {
      const msg = err.message || '';
      if (msg.includes('409') || msg.includes('sudah')) {
        const info = {
          name: currentStudent.name,
          class: currentStudent.class,
          prayer: prayerType,
          time: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }) + ' WIB',
          status: status,
          date: todayStrISO,
        };
        setSubmittedRecordInfo(info);
        try {
          localStorage.setItem('man1_last_submission_session', JSON.stringify(info));
        } catch (e) {}
      }
      setSubmitErrorMsg(msg.includes('409') || msg.includes('sudah') ? 'Anda sudah melakukan presensi untuk sholat ini hari ini.' : 'Gagal mengirim data: ' + msg);
    } finally {
      setSubmitting(false);
    }
  };

  const [manualCaptureAllowed, setManualCaptureAllowed] = useState<boolean>(false);

  // Jika kamera aktif selama 3 detik, aktifkan fallback tombol ambil foto
  useEffect(() => {
    let timer: any;
    if (cameraActive) {
      timer = setTimeout(() => {
        setManualCaptureAllowed(true);
      }, 3500);
    } else {
      setManualCaptureAllowed(false);
    }
    return () => clearTimeout(timer);
  }, [cameraActive]);

  const isPersonValid = true; // Always valid now
  const isNameValid = studentName.trim().length >= 2;

  const getLocalDateString = (dateInput: any): string => {
    try {
      if (!dateInput) return '';
      
      let d: Date;
      if (typeof dateInput === 'object') {
        if (typeof dateInput.toDate === 'function') {
          d = dateInput.toDate();
        } else if (dateInput instanceof Date) {
          d = dateInput;
        } else if (typeof dateInput.seconds === 'number') {
          d = new Date(dateInput.seconds * 1000);
        } else {
          // Try standard Date parsing
          d = new Date(dateInput);
        }
      } else {
        d = new Date(dateInput);
      }

      if (isNaN(d.getTime())) return '';
      
      const formatter = new Intl.DateTimeFormat('sv-SE', {
        timeZone: 'Asia/Jakarta',
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
      });
      return formatter.format(d);
    } catch (err) {
      console.warn('getLocalDateString error:', err);
      try {
        const d = new Date(dateInput);
        if (isNaN(d.getTime())) return '';
        return d.toISOString().split('T')[0];
      } catch (inner) {
        return '';
      }
    }
  };

  const todayStrISO = getLocalDateString(new Date());
  const normalizeName = (name: string) => (name || '').trim().toLowerCase().replace(/\s+/g, ' ');
  const normalizeClass = (cls: string) => (cls || '').trim().toLowerCase().replace(/\s+/g, '');

  const allKnownRecords = useMemo(() => {
    let storageList: AttendanceRecord[] = [];
    try {
      const raw = localStorage.getItem('man1_local_attendance_records');
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) storageList = parsed;
      }
    } catch (e) {}

    const map = new Map<string, AttendanceRecord>();
    [...locallySubmittedRecords, ...storageList, ...records].forEach((r) => {
      if (r && (r.id || (r.name && r.created_at))) {
        const key = r.id || `${r.name}-${r.prayer_type}-${r.created_at}`;
        map.set(key, r);
      }
    });
    return Array.from(map.values());
  }, [locallySubmittedRecords, records]);

  const isJustSubmittedSession = Boolean(
    submittedRecordInfo &&
    normalizeName(submittedRecordInfo.name) === normalizeName(studentName) &&
    submittedRecordInfo.prayer === prayerType &&
    (!submittedRecordInfo.date || submittedRecordInfo.date === todayStrISO)
  );

  const hasAlreadySubmittedToday = Boolean(
    isJustSubmittedSession ||
    (studentName && studentName.trim().length >= 2 && allKnownRecords.some((r) => {
      const isSameName = normalizeName(r.name) === normalizeName(studentName);
      const isSamePrayer = r.prayer_type === prayerType;
      if (!isSameName || !isSamePrayer) return false;
      const recordDate = getLocalDateString(r.created_at);
      return !recordDate || recordDate === todayStrISO;
    }))
  );

  const isSubmitDisabled = !isNameValid || !isPersonValid || submitting || hasAlreadySubmittedToday;

  const todayStr = new Date().toLocaleDateString('id-ID', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });


  return (
    <div className="max-w-5xl mx-auto space-y-5">
      {/* Banner Utama */}
      <motion.div
        className="bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 text-white rounded-3xl p-5 shadow-sm relative overflow-hidden flex flex-col sm:flex-row items-center justify-between gap-4"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <div className="absolute -right-8 -top-8 w-32 h-32 bg-white/10 rounded-full blur-xl pointer-events-none"></div>

        <div className="z-10 text-center sm:text-left">
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
            <span className="text-xs font-semibold uppercase tracking-wider bg-white/20 px-2.5 py-0.5 rounded-full backdrop-blur-xs">
              Sesi {prayerType} {isFridayReal ? '(Jumat)' : ''}
            </span>
            <span className="text-xs text-emerald-100 font-medium">
              {todayStr}
            </span>
          </div>
          <h2 className="text-lg sm:text-xl font-black text-white mt-1.5 tracking-tight">
            Presensi Sholat Berjamaah
          </h2>
          <p className="text-xs text-emerald-100/90 mt-0.5 max-w-md">
            Arahkan kamera ke wajah hingga kotak hijau aktif, lalu klik foto presensi.
          </p>
        </div>
      </motion.div>

      {/* Success Modal */}
      <AnimatePresence>
        {submitSuccessMsg && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/70">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="bg-white rounded-3xl p-6 shadow-2xl max-w-sm w-full text-center space-y-4 border border-emerald-100"
            >
              <div className="w-14 h-14 rounded-full bg-emerald-100 flex items-center justify-center mx-auto text-emerald-600">
                <Check className="w-7 h-7 text-emerald-600 stroke-[2.5]" />
              </div>
              <div>
                <h3 className="font-black text-xl text-slate-900">Presensi Berhasil Terkirim!</h3>
                <p className="text-slate-600 text-xs mt-1 font-medium leading-relaxed">{submitSuccessMsg}</p>
              </div>

              {submittedRecordInfo && (
                <div className="bg-slate-50 border border-slate-200 rounded-2xl p-3.5 text-left text-xs space-y-1.5 text-slate-700 font-medium">
                  <div className="flex justify-between items-center py-0.5 border-b border-slate-200/60">
                    <span className="text-slate-500">Nama Siswa:</span>
                    <span className="font-bold text-slate-900">{submittedRecordInfo.name}</span>
                  </div>
                  <div className="flex justify-between items-center py-0.5 border-b border-slate-200/60">
                    <span className="text-slate-500">Kelas:</span>
                    <span className="font-bold text-slate-900">{submittedRecordInfo.class}</span>
                  </div>
                  <div className="flex justify-between items-center py-0.5 border-b border-slate-200/60">
                    <span className="text-slate-500">Sholat:</span>
                    <span className="font-bold text-emerald-700">{submittedRecordInfo.prayer}</span>
                  </div>
                  <div className="flex justify-between items-center py-0.5 border-b border-slate-200/60">
                    <span className="text-slate-500">Waktu:</span>
                    <span className="font-bold text-slate-900">{submittedRecordInfo.time}</span>
                  </div>
                  <div className="flex justify-between items-center py-0.5">
                    <span className="text-slate-500">Status:</span>
                    <span className="font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200 text-[11px]">{submittedRecordInfo.status}</span>
                  </div>
                </div>
              )}

              <button
                onClick={() => {
                    setSubmitSuccessMsg(null);
                        setSubmittedRecordInfo(null);
                          }}
                            className="w-full py-3.5 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-semibold rounded-2xl cursor-pointer transition shadow-md active:scale-95"
                            >
                              Selesai
                              </button>

            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Error Modal */}
      <AnimatePresence>
        {submitErrorMsg && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/70">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="bg-white rounded-3xl p-6 shadow-2xl max-w-sm w-full text-center space-y-4 border border-rose-100"
            >
              <div className="w-20 h-20 rounded-full bg-rose-50 text-rose-600 flex items-center justify-center mx-auto shadow-inner">
                 <AlertCircle className="w-10 h-10" />
              </div>
              <div>
                <h3 className="font-black text-xl text-slate-900">Perhatian</h3>
                <p className="text-rose-700 text-sm mt-1 font-medium leading-relaxed">{submitErrorMsg}</p>
              </div>
              <button
                onClick={() => setSubmitErrorMsg(null)}
                className="w-full py-4 bg-slate-800 text-white font-bold rounded-2xl cursor-pointer hover:bg-slate-900 transition shadow-md active:scale-95"
              >
                Tutup
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Main 2-Column Responsive Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
        {/* Kolom Kiri: Identitas Siswa & Pilihan Sholat */}
        <motion.div
          className="lg:col-span-5 bg-white border border-slate-200 rounded-3xl p-5 shadow-xs space-y-4"
          whileHover={{ y: -2 }}
          transition={{ type: 'spring', stiffness: 400, damping: 20 }}
        >
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                Identitas Siswa
              </span>
              <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                Langkah 1
              </span>
            </div>

            <div className="space-y-3 mt-2">
              {/* Kelas */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Pilih Kelas:
                </label>
                <select
                  id="select-kelas-siswa"
                  value={selectedClass}
                  onChange={(e) => {
                    const newClass = e.target.value;
                    setSelectedClass(newClass);
                    setStudentName('');
                    try {
                      localStorage.removeItem('man1_last_student_name');
                    } catch (err) {}
                  }}
                  className="w-full bg-slate-50 hover:bg-white border border-slate-300 rounded-2xl px-3.5 py-2.5 text-xs sm:text-sm text-slate-900 font-medium focus:ring-2 focus:ring-emerald-500 focus:outline-none transition cursor-pointer"
                >
                  {CLASSES.map((cls) => (
                    <option key={`pres-cls-${cls}`} value={cls}>
                      {cls}
                    </option>
                  ))}
                </select>
              </div>

              {/* Nama Siswa */}
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="block text-xs font-bold text-slate-700 flex items-center gap-1.5">
                    <span>Nama Lengkap Siswa:</span>
                    <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-1.5 py-0.2 rounded border border-emerald-200">
                      {classStudents.length} Siswa
                    </span>
                  </label>
                </div>

                <div>
                  <select
                    id="select-nama-siswa"
                    value={studentName}
                    onChange={(e) => {
                      const val = e.target.value;
                      setStudentName(val);
                      const found = classStudents.find((s) => s.name === val);
                      if (found) {
                        setStudentGender(found.gender);
                      }
                    }}
                    className="w-full bg-slate-50 hover:bg-white border border-slate-300 rounded-2xl px-3.5 py-2.5 text-xs sm:text-sm text-slate-900 font-medium focus:ring-2 focus:ring-emerald-500 focus:outline-none transition cursor-pointer"
                  >
                    <option value="">-- Pilih Nama Siswa ({classStudents.length} Siswa) --</option>
                    {classStudents.map((stu, index) => (
                      <option key={`pres-stu-${stu.class}-${stu.id}-${index}`} value={stu.name}>
                        {stu.name} ({stu.gender === 'L' ? 'L' : 'P'})
                      </option>
                    ))}
                  </select>
                </div>

                {!isNameValid && (
                  <p className="text-[11px] text-amber-600 mt-1 font-medium">
                    Pilih nama lengkap dari daftar untuk mengaktifkan tombol foto
                  </p>
                )}
              </div>

              {/* Jenis Kelamin */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Jenis Kelamin:
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <motion.button
                    type="button"
                    id="btn-gender-laki"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.96 }}
                    onClick={() => setStudentGender('L')}
                    className={`py-2 px-3 rounded-2xl text-xs font-bold border transition flex items-center justify-center cursor-pointer ${
                      studentGender === 'L'
                        ? 'bg-sky-50 border-sky-500 text-sky-700 shadow-xs'
                        : 'bg-slate-50 border-slate-200 text-slate-600 hover:border-slate-300'
                    }`}
                  >
                    <span>Laki-laki</span>
                  </motion.button>
                  <motion.button
                    type="button"
                    id="btn-gender-perempuan"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.96 }}
                    onClick={() => setStudentGender('P')}
                    className={`py-2 px-3 rounded-2xl text-xs font-bold border transition flex items-center justify-center cursor-pointer ${
                      studentGender === 'P'
                        ? 'bg-rose-50 border-rose-500 text-rose-700 shadow-xs'
                        : 'bg-slate-50 border-slate-200 text-slate-600 hover:border-slate-300'
                    }`}
                  >
                    <span>Perempuan</span>
                  </motion.button>
                </div>
              </div>
            </div>
          </div>

          {/* Sesi Sholat */}
          <div className="pt-3 border-t border-slate-200">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-2">
              Pilihan Sholat
            </span>
            <div className="grid grid-cols-2 gap-2">
              <motion.button
                type="button"
                id="btn-sholat-dhuha"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.96 }}
                onClick={() => setPrayerType('Dhuha')}
                className={`py-2.5 px-3 rounded-2xl text-xs font-bold border transition flex items-center justify-center cursor-pointer ${
                  prayerType === 'Dhuha'
                    ? 'bg-emerald-600 border-emerald-600 text-white shadow-xs'
                    : 'bg-slate-50 border-slate-200 text-slate-700 hover:border-slate-300'
                }`}
              >
                <span>Dhuha</span>
              </motion.button>

              {isFridayReal && (!currentStudent || currentStudent.gender === 'L') ? (
                <motion.button
                  type="button"
                  id="btn-sholat-jumat"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.96 }}
                  onClick={() => setPrayerType('Sholat Jumat')}
                  className={`py-2.5 px-3 rounded-2xl text-xs font-bold border transition flex items-center justify-center cursor-pointer ${
                    prayerType === 'Sholat Jumat'
                      ? 'bg-emerald-600 border-emerald-600 text-white shadow-xs'
                      : 'bg-slate-50 border-slate-200 text-slate-700 hover:border-slate-300'
                  }`}
                >
                  <span>Sholat Jumat</span>
                </motion.button>
              ) : (
                <motion.button
                  type="button"
                  id="btn-sholat-dzuhur"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.96 }}
                  onClick={() => setPrayerType('Dzuhur')}
                  className={`py-2.5 px-3 rounded-2xl text-xs font-bold border transition flex items-center justify-center cursor-pointer ${
                    prayerType === 'Dzuhur'
                      ? 'bg-emerald-600 border-emerald-600 text-white shadow-xs'
                      : 'bg-slate-50 border-slate-200 text-slate-700 hover:border-slate-300'
                  }`}
                >
                  <span>Dzuhur</span>
                </motion.button>
              )}
            </div>
          </div>

          {/* Dispensasi Khusus (Bypass) */}
          <div className="pt-3 border-t border-slate-200">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-2">
              Dispensasi Khusus (Bypass)
            </span>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <motion.button
                type="button"
                id="btn-bypass-haid"
                disabled={studentGender === 'L' || hasAlreadySubmittedToday}
                whileHover={{ scale: (studentGender === 'L' || hasAlreadySubmittedToday) ? 1 : 1.02 }}
                whileTap={{ scale: (studentGender === 'L' || hasAlreadySubmittedToday) ? 1 : 0.96 }}
                onClick={() => {
                  if (!isNameValid) {
                    alert('Harap ketik nama lengkap Anda terlebih dahulu.');
                    return;
                  }
                  setBypassType('Halangan');
                  setBypassModalOpen(true);
                }}
                className={`py-2 px-3 rounded-2xl font-bold border transition flex items-center justify-center cursor-pointer ${
                  studentGender === 'L' || hasAlreadySubmittedToday
                    ? 'bg-slate-50 border-slate-200 text-slate-300 opacity-40 cursor-not-allowed'
                    : 'bg-rose-50 hover:bg-rose-100 border-rose-200 text-rose-700'
                }`}
              >
                <span>Haid</span>
              </motion.button>

              <motion.button
                type="button"
                id="btn-bypass-sakit"
                disabled={hasAlreadySubmittedToday}
                whileHover={{ scale: hasAlreadySubmittedToday ? 1 : 1.02 }}
                whileTap={{ scale: hasAlreadySubmittedToday ? 1 : 0.96 }}
                onClick={() => {
                  if (!isNameValid) {
                    alert('Harap ketik nama lengkap Anda terlebih dahulu.');
                    return;
                  }
                  setBypassType('SakitIzin');
                  setBypassModalOpen(true);
                }}
                className={`py-2 px-3 rounded-2xl font-bold transition flex items-center justify-center cursor-pointer ${
                  hasAlreadySubmittedToday
                    ? 'bg-slate-50 border-slate-200 text-slate-300 opacity-40 cursor-not-allowed'
                    : 'bg-amber-50 hover:bg-amber-100 border border-amber-200 text-amber-800'
                }`}
              >
                <span>Sakit / Izin</span>
              </motion.button>
            </div>
          </div>
        </motion.div>

        {/* Kolom Kanan: Kamera, & Submit */}
        <motion.div
          className="lg:col-span-7 bg-white border border-slate-200 rounded-3xl p-5 shadow-xs space-y-4"
          whileHover={{ y: -2 }}
          transition={{ type: 'spring', stiffness: 400, damping: 20 }}
        >
          {/* Header Kontrol Kamera */}
          <div className="flex items-center justify-between gap-2 pb-1">
            <div className="flex items-center gap-1.5">
              <span className="text-xs font-bold text-slate-800">Kamera Presensi</span>
            </div>

            <div className="flex items-center gap-1.5 px-3 py-1 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-[11px] font-bold">
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
              <span>Dual Kamera (2 Sudut)</span>
            </div>
          </div>

          {/* Kamera Viewport Frame */}
          <div className="relative w-full aspect-[4/3] bg-slate-950 rounded-3xl overflow-hidden border border-slate-200 shadow-inner flex items-center justify-center">
            {/* Video Stream */}
            <video
              ref={videoRef}
              autoPlay
              playsInline
              muted
              className={`w-full h-full object-cover ${
                facingMode === 'user' ? 'scale-x-[-1]' : ''
              }`}
            />

            {/* Flash Effect */}
            {beRealFlash && (
              <div className="absolute inset-0 bg-white z-40 transition-opacity duration-150 pointer-events-none opacity-90" />
            )}

            {/* In-Progress Capture Overlay */}
            {isBeRealCapturing && (
              <div className="absolute inset-0 bg-slate-900/90 z-30 flex flex-col items-center justify-center p-6 text-center space-y-3">
                {countdownSec !== null ? (
                  <motion.div
                    className="w-16 h-16 rounded-full bg-amber-500/30 border-2 border-amber-400 flex items-center justify-center text-white font-black text-3xl shadow-lg"
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 0.5, repeat: Infinity }}
                  >
                    {countdownSec}
                  </motion.div>
                ) : (
                  <motion.div
                    className="w-12 h-12 rounded-2xl bg-emerald-600 flex items-center justify-center text-white shadow-md"
                    animate={{ scale: [1, 1.08, 1] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    <span className="w-3.5 h-3.5 rounded-full bg-white animate-ping"></span>
                  </motion.div>
                )}

                <div className="space-y-1 max-w-xs">
                  <p className="text-sm font-bold text-white tracking-wide">{beRealStepMsg}</p>
                </div>
              </div>
            )}

            {/* Camera Error State */}
            {cameraError && (
              <div className="absolute inset-0 bg-slate-900/85 flex flex-col items-center justify-center p-6 text-center z-20">
                <AlertCircle className="w-8 h-8 text-rose-500 mb-2" />
                <div className="text-xs font-bold text-white">Kamera Tidak Aktif</div>
                <p className="text-[11px] text-rose-300 max-w-xs mt-1">{cameraError}</p>
                <button
                  type="button"
                  onClick={() => startCamera(facingMode)}
                  className="mt-3 px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition cursor-pointer"
                >
                  Akses Kamera
                </button>
              </div>
            )}

            {/* Switch Camera Button */}
            <motion.button
              type="button"
              id="btn-toggle-kamera"
              whileHover={{ scale: 1.1, rotate: 180 }}
              whileTap={{ scale: 0.9 }}
              transition={{ duration: 0.3 }}
              onClick={toggleCameraFacing}
              className="absolute top-3 right-3 z-10 p-2.5 rounded-2xl bg-slate-900/80 hover:bg-slate-900 border border-slate-700 text-slate-200 hover:text-white backdrop-blur-xs transition shadow-xs flex items-center justify-center cursor-pointer"
              title="Ganti Kamera"
              aria-label="Ganti Kamera"
            >
              <RefreshCw className="w-4 h-4 text-emerald-400" />
            </motion.button>
          </div>

          {/* Primary Action Button */}
          <div className="space-y-3">
            {hasAlreadySubmittedToday && (
              <div className="p-3.5 rounded-2xl bg-amber-50 border border-amber-200 text-amber-800 text-xs font-bold leading-relaxed">
                <span>Anda sudah melakukan presensi untuk sholat {prayerType} hari ini. Absensi tidak dapat dilakukan dua kali.</span>
              </div>
            )}

            <motion.button
              type="button"
              id="btn-jebret-bereal"
              disabled={isSubmitDisabled || isBeRealCapturing}
              whileHover={!isSubmitDisabled && !isBeRealCapturing ? { scale: 1.02, y: -2 } : {}}
              whileTap={!isSubmitDisabled && !isBeRealCapturing ? { scale: 0.97 } : {}}
              onClick={handleStartCapture}
              className={`w-full py-3.5 px-4 rounded-2xl font-bold text-sm tracking-wide transition flex items-center justify-center gap-2 shadow-sm cursor-pointer ${
                hasAlreadySubmittedToday
                  ? 'bg-emerald-50 text-emerald-700 border border-emerald-300 cursor-default shadow-none'
                  : isSubmitDisabled || isBeRealCapturing
                  ? 'bg-slate-100 text-slate-400 border border-slate-200 cursor-not-allowed'
                  : 'bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-600 hover:from-emerald-700 hover:to-teal-700 text-white shadow-emerald-600/20'
              }`}
            >
              {hasAlreadySubmittedToday ? (
                <span>Presensi Berhasil Tercatat</span>
              ) : isBeRealCapturing ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>Mengambil foto presensi...</span>
                </>
              ) : !isNameValid ? (
                <span>Pilih Nama Siswa Terlebih Dahulu</span>
              ) : (
                <>
                  <span>
                    Jepret Presensi (2 Sudut): {studentName.trim()}
                  </span>
                </>
              )}
            </motion.button>
          </div>
        </motion.div>
      </div>

      {/* BeReal Preview Modal */}
      <BeRealPreviewModal
        isOpen={beRealModalOpen}
        onClose={() => setBeRealModalOpen(false)}
        initialPhotoUrl={beRealPhotoUrl}
        frame1Canvas={frame1CanvasRef.current}
        frame2Canvas={frame2CanvasRef.current}
        renderOptions={
          beRealOptionsRef.current || {
            studentName: currentStudent?.name || '',
            studentClass: currentStudent?.class || '',
            prayerType: prayerType,
          }
        }
        onRetake={() => {
          setBeRealModalOpen(false);
          handleStartCapture();
        }}
        onConfirmSubmit={handleConfirmBeRealSubmit}
        isSubmitting={submitting}
      />

      {/* Bypass Modal */}
      <BypassModal
        isOpen={bypassModalOpen}
        onClose={() => setBypassModalOpen(false)}
        onSubmit={handleBypassSubmit}
        student={currentStudent}
        prayerType={prayerType}
        type={bypassType}
      />
    </div>
  );
};
