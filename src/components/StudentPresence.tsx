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
  onRecordSubmitted: (record: AttendanceRecord) => void;
}

export const StudentPresence: React.FC<StudentPresenceProps> = ({
  records = [],
  onRecordSubmitted,
}) => {
  const [selectedClass, setSelectedClass] = useState<string>('X A');
  const [studentName, setStudentName] = useState<string>('');
  const [studentGender, setStudentGender] = useState<'L' | 'P'>('P');
  const [currentStudent, setCurrentStudent] = useState<Student | null>(null);
  const [isNameDropdownOpen, setIsNameDropdownOpen] = useState(false);

  // Time-based prayer detection
  const detectedPrayer = useMemo<PrayerType>(() => {
    const now = new Date();
    const hour = now.getHours();
    if (hour < 11) return 'Dhuha';
    return 'Dzuhur';
  }, []);

  const [prayerType, setPrayerType] = useState<PrayerType>(detectedPrayer);
  const [cameraActive, setCameraActive] = useState<boolean>(false);
  const [facingMode, setFacingMode] = useState<'user' | 'environment'>('user');
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [submitSuccessMsg, setSubmitSuccessMsg] = useState<string | null>(null);
  const [submitErrorMsg, setSubmitErrorMsg] = useState<string | null>(null);
  const [submittedRecordInfo, setSubmittedRecordInfo] = useState<{
    name: string;
    class: string;
    prayer: string;
    time: string;
    status: string;
    date: string;
  } | null>(null);

  // Local state to track submitted records in current session
  const [locallySubmittedRecords, setLocallySubmittedRecords] = useState<AttendanceRecord[]>([]);

  // Bypass / Dispensasi Modal State
  const [bypassModalOpen, setBypassModalOpen] = useState<boolean>(false);
  const [bypassType, setBypassType] = useState<'Haid' | 'SakitIzin'>('Haid');

  // Dual-Camera (BeReal Mode) state
  const [isBeRealCapturing, setIsBeRealCapturing] = useState<boolean>(false);
  const [beRealStepMsg, setBeRealStepMsg] = useState<string>('');
  const [beRealFlash, setBeRealFlash] = useState<boolean>(false);
  const [beRealModalOpen, setBeRealModalOpen] = useState<boolean>(false);
  const [beRealPhotoUrl, setBeRealPhotoUrl] = useState<string | null>(null);
  const [countdownSec, setCountdownSec] = useState<number | null>(null);

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const nameDropdownRef = useRef<HTMLDivElement>(null);

  // Ref untuk menyimpan frame foto 1 & 2
  const frame1CanvasRef = useRef<HTMLCanvasElement | null>(null);
  const frame2CanvasRef = useRef<HTMLCanvasElement | null>(null);
  const beRealOptionsRef = useRef<BeRealRenderOptions | null>(null);

  // Siswa berdasarkan kelas yang dipilih
  const classStudents = useMemo(() => {
    return getStudentsByClass(selectedClass);
  }, [selectedClass]);

  // Filter nama siswa berdasarkan input pencarian
  const filteredStudents = useMemo(() => {
    const q = studentName.toLowerCase().trim();
    if (!q) return classStudents;
    return classStudents.filter((s) => s.name.toLowerCase().includes(q));
  }, [classStudents, studentName]);

  // Update gender & selected student saat memilih nama
  const handleSelectStudent = (student: Student) => {
    setStudentName(student.name);
    setStudentGender(student.gender);
    setCurrentStudent(student);
    setIsNameDropdownOpen(false);
  };

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (nameDropdownRef.current && !nameDropdownRef.current.contains(event.target as Node)) {
        setIsNameDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Set default student when class changes
  useEffect(() => {
    if (classStudents.length > 0) {
      handleSelectStudent(classStudents[0]);
    } else {
      setStudentName('');
      setCurrentStudent(null);
    }
  }, [selectedClass, classStudents]);

  // Start / Stop Camera Stream
  const startCamera = async (mode: 'user' | 'environment') => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: mode,
          width: { ideal: 1280 },
          height: { ideal: 720 },
        },
        audio: false,
      });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
      }
      setCameraActive(true);
    } catch (err: any) {
      console.warn('Camera access error:', err);
      setCameraActive(false);
    }
  };

  useEffect(() => {
    startCamera(facingMode);
    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop());
      }
    };
  }, [facingMode]);

  // Toggle switch kamera depan/belakang
  const handleToggleFacingMode = () => {
    setFacingMode((prev) => (prev === 'user' ? 'environment' : 'user'));
  };

  // Dual-Camera Capture Execution
  const handleStartCapture = async () => {
    if (!currentStudent || !videoRef.current) return;
    setIsBeRealCapturing(true);
    setBeRealStepMsg('Siap-siap! Mengambil foto wajah...');

    try {
      // Countdown 2 detik
      setCountdownSec(2);
      await new Promise((r) => setTimeout(r, 1000));
      setCountdownSec(1);
      await new Promise((r) => setTimeout(r, 1000));
      setCountdownSec(null);

      // 1. Ambil Foto Pertama (Wajah)
      playCameraShutterSound();
      setBeRealFlash(true);
      setTimeout(() => setBeRealFlash(false), 140);
      const frame1 = captureFrameToCanvas(videoRef.current, facingMode === 'user');
      frame1CanvasRef.current = frame1;

      // 2. Beralih ke Kamera Kedua (Suasana Belakang)
      setBeRealStepMsg('Mengambil foto suasana...');
      const targetMode = facingMode === 'user' ? 'environment' : 'user';
      let frame2: HTMLCanvasElement | null = null;
      let switchedStream: MediaStream | null = null;

      try {
        if (streamRef.current) {
          streamRef.current.getTracks().forEach((t) => t.stop());
        }
        switchedStream = await navigator.mediaDevices.getUserMedia({
          video: {
            facingMode: targetMode,
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

      // 3. Render BeReal Photo dengan validasi jam sholat
      const isNowValid = isTimeValid(prayerType);
      const renderOpts: BeRealRenderOptions = {
        studentName: currentStudent.name,
        studentClass: currentStudent.class,
        prayerType: prayerType,
        aiConfidence: 100,
        gpsText: isNowValid ? 'Presensi Sah' : 'Di Luar Jam Sholat',
      };
      beRealOptionsRef.current = renderOpts;

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
    const attendanceStatus: AttendanceStatus = isTimeValid(prayerType) ? 'Hadir' : 'Tidak Sah';
    try {
      const autoNotes = isTimeValid(prayerType) 
          ? `Presensi sah di area madrasah.`
          : `Presensi di luar jam operasional (${prayerType}).`;

      const res = await submitAttendanceRecord({
        name: currentStudent.name,
        class: currentStudent.class,
        prayer_type: prayerType,
        status: attendanceStatus,
        ai_status: 'Manual',
        ai_confidence: 100,
        gps_status: 'Valid',
        snapshot_photo: finalPhoto,
        notes: autoNotes,
        created_at: new Date().toISOString(),
      });

      const info = {
        name: currentStudent.name,
        class: currentStudent.class,
        prayer: prayerType,
        time: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }) + ' WIB',
        status: attendanceStatus,
        date: todayStrISO,
      };
      setSubmittedRecordInfo(info);
      try {
        localStorage.setItem('man1_last_submission_session', JSON.stringify(info));
      } catch (e) {}
      setSubmitSuccessMsg(res.message || 'Presensi berhasil dicatat (Tersimpan di perangkat & siap disinkronisasi).');
      setLocallySubmittedRecords((prev) => [res.record, ...prev]);
      onRecordSubmitted(res.record);
      setBeRealModalOpen(false);
    } catch (err: any) {
      const msg = err.message || '';
      if (msg.includes('409') || msg.includes('sudah')) {
        const info = {
          name: currentStudent.name,
          class: currentStudent.class,
          prayer: prayerType,
          time: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }) + ' WIB',
          status: attendanceStatus,
          date: todayStrISO,
        };
        setSubmittedRecordInfo(info);
        try {
          localStorage.setItem('man1_last_submission_session', JSON.stringify(info));
        } catch (e) {}
      }
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
      setSubmitSuccessMsg(res.message || 'Presensi berhasil dicatat (Tersimpan di perangkat & siap disinkronisasi).');
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
    } catch (e) {
      return '';
    }
  };

  const todayStrISO = useMemo(() => {
    return new Intl.DateTimeFormat('sv-SE', {
      timeZone: 'Asia/Jakarta',
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    }).format(new Date());
  }, []);

  const todayStr = useMemo(() => {
    return new Date().toLocaleDateString('id-ID', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  }, []);

  const isFridayReal = useMemo(() => {
    return new Date().getDay() === 5;
  }, []);

  const allRecordsPool = useMemo(() => {
    return [...locallySubmittedRecords, ...records];
  }, [locallySubmittedRecords, records]);

  const hasAlreadySubmittedToday = useMemo(() => {
    if (!currentStudent || !prayerType) return false;
    const cleanStudentName = currentStudent.name.trim().toLowerCase();
    const cleanStudentClass = currentStudent.class.replace(/\s+/g, '').toLowerCase();

    return allRecordsPool.some((r) => {
      if (!r || !r.name || !r.created_at) return false;
      const rName = r.name.trim().toLowerCase();
      const rClass = (r.class || '').replace(/\s+/g, '').toLowerCase();
      const isSameStudent = rName === cleanStudentName && (rClass === cleanStudentClass || !rClass);
      const isSamePrayer = r.prayer_type === prayerType;
      const recordDate = getLocalDateString(r.created_at);
      const isSameDay = recordDate === todayStrISO;
      return isSameStudent && isSamePrayer && isSameDay;
    });
  }, [currentStudent, prayerType, allRecordsPool, todayStrISO]);

  const isSubmitDisabled = !isNameValid || submitting || hasAlreadySubmittedToday;

  return (
    <div className="space-y-4 max-w-5xl mx-auto px-2 sm:px-4">
      {/* Header Presensi */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-emerald-700 via-emerald-600 to-teal-700 rounded-3xl p-4 sm:p-5 text-white shadow-md relative overflow-hidden flex flex-col sm:flex-row sm:items-center justify-between gap-3"
      >
        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-white/15 backdrop-blur-md border border-white/20">
            <span className="w-2 h-2 rounded-full bg-emerald-300 animate-pulse"></span>
            <span className="text-xs font-semibold tracking-wide">
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
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
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
                }}
                className="w-full py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-2xl cursor-pointer transition shadow-md active:scale-95"
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
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="bg-white rounded-3xl p-6 shadow-2xl max-w-sm w-full text-center space-y-4 border border-rose-100"
            >
              <div className="w-14 h-14 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center mx-auto">
                <AlertCircle className="w-7 h-7" />
              </div>
              <div>
                <h3 className="font-black text-lg text-slate-900">Perhatian</h3>
                <p className="text-slate-600 text-xs mt-1 leading-relaxed">{submitErrorMsg}</p>
              </div>
              <button
                onClick={() => setSubmitErrorMsg(null)}
                className="w-full py-3 bg-rose-600 text-white font-bold rounded-2xl cursor-pointer hover:bg-rose-700 transition"
              >
                Tutup
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Main Grid: Data Siswa & Kamera */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* Kolom Kiri: Form Identitas & Tombol Dispensasi */}
        <motion.div
          className="lg:col-span-5 bg-white border border-slate-200 rounded-3xl p-5 shadow-xs space-y-4"
          whileHover={{ y: -2 }}
          transition={{ type: 'spring', stiffness: 400, damping: 20 }}
        >
          {/* Pilih Sholat */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700">Pilih Sholat</label>
            <div className="grid grid-cols-2 gap-2">
              {(['Dhuha', 'Dzuhur'] as PrayerType[]).map((type) => (
                <button
                  key={type}
                  type="button"
                  onClick={() => setPrayerType(type)}
                  className={`py-2 px-3 rounded-2xl font-bold text-xs transition border cursor-pointer ${
                    prayerType === type
                      ? 'bg-emerald-600 text-white border-emerald-600 shadow-xs'
                      : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  Sholat {type}
                </button>
              ))}
            </div>
          </div>

          {/* Pilih Kelas */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700">Pilih Kelas</label>
            <select
              value={selectedClass}
              onChange={(e) => setSelectedClass(e.target.value)}
              className="w-full p-2.5 rounded-2xl border border-slate-300 text-xs font-semibold text-slate-800 bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
            >
              {CLASSES.map((cls) => (
                <option key={cls} value={cls}>
                  Kelas {cls}
                </option>
              ))}
            </select>
          </div>

          {/* Cari & Pilih Nama Siswa */}
          <div className="space-y-1.5 relative" ref={nameDropdownRef}>
            <label className="text-xs font-bold text-slate-700">Nama Siswa</label>
            <div className="relative">
              <input
                type="text"
                placeholder="Ketik untuk mencari nama..."
                value={studentName}
                onChange={(e) => {
                  setStudentName(e.target.value);
                  setIsNameDropdownOpen(true);
                }}
                onFocus={() => setIsNameDropdownOpen(true)}
                className="w-full p-2.5 rounded-2xl border border-slate-300 text-xs font-semibold text-slate-800 bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500 pr-8"
              />
              {studentName && (
                <button
                  type="button"
                  onClick={() => {
                    setStudentName('');
                    setIsNameDropdownOpen(true);
                  }}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Dropdown Hasil Pencarian */}
            {isNameDropdownOpen && (
              <div className="absolute left-0 right-0 top-full mt-1 bg-white border border-slate-200 rounded-2xl shadow-xl max-h-48 overflow-y-auto z-50 p-1 divide-y divide-slate-100">
                {filteredStudents.length > 0 ? (
                  filteredStudents.map((s) => (
                    <button
                      key={s.id || s.name}
                      type="button"
                      onClick={() => handleSelectStudent(s)}
                      className="w-full text-left p-2 hover:bg-emerald-50 rounded-xl text-xs flex items-center justify-between group transition"
                    >
                      <span className="font-semibold text-slate-800 group-hover:text-emerald-800">
                        {s.name}
                      </span>
                      <span className="text-[10px] px-1.5 py-0.5 rounded-md bg-slate-100 text-slate-600 font-bold">
                        {s.gender === 'P' ? 'Perempuan' : 'Laki-laki'}
                      </span>
                    </button>
                  ))
                ) : (
                  <div className="p-3 text-center text-xs text-slate-400">
                    Nama siswa tidak ditemukan
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Tombol Dispensasi: Haid & Sakit/Izin */}
          <div className="pt-2 border-t border-slate-100 space-y-2">
            <label className="text-xs font-bold text-slate-600">Dispensasi / Izin</label>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <motion.button
                type="button"
                id="btn-bypass-haid"
                disabled={studentGender === 'L' || hasAlreadySubmittedToday}
                whileHover={{ scale: studentGender === 'L' || hasAlreadySubmittedToday ? 1 : 1.02 }}
                whileTap={{ scale: studentGender === 'L' || hasAlreadySubmittedToday ? 1 : 0.96 }}
                onClick={() => {
                  if (studentGender === 'L') return;
                  if (!isNameValid) {
                    alert('Harap ketik nama lengkap Anda terlebih dahulu.');
                    return;
                  }
                  setBypassType('Haid');
                  setBypassModalOpen(true);
                }}
                className={`py-2 px-3 rounded-2xl font-bold transition flex items-center justify-center border ${
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

        {/* Kolom Kanan: Kamera & Tombol Jepret */}
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
              <div className="absolute inset-0 bg-white z-50 animate-out fade-out duration-150 pointer-events-none" />
            )}

            {/* Countdown Overlay */}
            {countdownSec !== null && (
              <div className="absolute inset-0 bg-black/40 backdrop-blur-xs flex items-center justify-center z-40">
                <span className="text-7xl font-black text-white drop-shadow-lg animate-bounce">
                  {countdownSec}
                </span>
              </div>
            )}

            {/* Step Message */}
            {beRealStepMsg && (
              <div className="absolute bottom-4 left-4 right-4 z-40 bg-slate-900/80 backdrop-blur-md px-4 py-2 rounded-2xl text-center text-xs font-bold text-white shadow-lg border border-white/20">
                {beRealStepMsg}
              </div>
            )}

            {/* Tombol Balik Kamera */}
            <button
              type="button"
              onClick={handleToggleFacingMode}
              className="absolute top-3 right-3 p-2.5 rounded-2xl bg-black/40 hover:bg-black/60 text-white backdrop-blur-md transition cursor-pointer z-30"
              title="Balik Kamera"
            >
              <RefreshCw className="w-4 h-4" />
            </button>
          </div>

          {/* Tombol Ambil Foto Presensi */}
          <div className="pt-2">
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
                <span>Jepret Presensi (2 Sudut): {studentName.trim()}</span>
              )}
            </motion.button>
          </div>
        </motion.div>
      </div>

      {/* BeReal Preview Modal */}
      <BeRealPreviewModal
        isOpen={beRealModalOpen}
        photoUrl={beRealPhotoUrl}
        studentName={currentStudent?.name || studentName}
        studentClass={currentStudent?.class || selectedClass}
        prayerType={prayerType}
        submitting={submitting}
        onConfirm={() => {
          if (beRealPhotoUrl) {
            handleConfirmBeRealSubmit(beRealPhotoUrl);
          }
        }}
        onRetake={() => {
          setBeRealModalOpen(false);
          setBeRealPhotoUrl(null);
        }}
        onClose={() => {
          setBeRealModalOpen(false);
          setBeRealPhotoUrl(null);
        }}
      />

      {/* Bypass Dispensasi Modal */}
      <BypassModal
        isOpen={bypassModalOpen}
        type={bypassType}
        studentName={currentStudent?.name || studentName}
        studentClass={currentStudent?.class || selectedClass}
        prayerType={prayerType}
        onClose={() => setBypassModalOpen(false)}
        onSubmit={(status, notes) => {
          setBypassModalOpen(false);
          handleBypassSubmit(status, notes);
        }}
      />
    </div>
  );
};