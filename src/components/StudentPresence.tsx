import React, { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Camera,
  RefreshCw,
  CheckCircle2,
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
  const currentHour = now.getHours();
  const currentMinute = now.getMinutes();
  
  const startTime = config.startHour * 60 + config.startMinute;
  const endTime = config.endHour * 60 + config.endMinute;
  const currentTime = currentHour * 60 + currentMinute;
  
  return currentTime >= startTime && currentTime <= endTime;
};

interface StudentPresenceProps {
  records?: AttendanceRecord[];
  onRecordSubmitted: () => void;
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
  } | null>(null);
  const [submitErrorMsg, setSubmitErrorMsg] = useState<string | null>(null);

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
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const animationFrameRef = useRef<number | null>(null);

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

  useEffect(() => {
    let isMounted = true;
    const initAi = async () => {
      // AI removed - simplified
    };
    initAi();
    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    let isRunning = true;
    let isDetecting = false;
    let lastDetectionTime = 0;

    const runLoop = async (timestamp: number) => {
      if (!isRunning) return;
      if (
        videoRef.current &&
        canvasRef.current &&
        videoRef.current.readyState >= 2
      ) {
        const video = videoRef.current;
        const canvas = canvasRef.current;
        if (canvas.width !== video.videoWidth || canvas.height !== video.videoHeight) {
          canvas.width = video.videoWidth || 640;
          canvas.height = video.videoHeight || 480;
        }

        const isUserMode = facingMode === 'user';

        if (!isDetecting && timestamp - lastDetectionTime > 500) {
          isDetecting = true;
          lastDetectionTime = timestamp;
        }

        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.clearRect(0, 0, canvas.width, canvas.height);
        }
      }
      animationFrameRef.current = requestAnimationFrame(runLoop);
    };

    animationFrameRef.current = requestAnimationFrame(runLoop);
    return () => {
      isRunning = false;
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [facingMode, cameraActive]);

  const handleStartCapture = async () => {
    if (!currentStudent || !currentStudent.name) {
      alert('Silakan ketik nama lengkap siswa terlebih dahulu.');
      return;
    }
    if (!videoRef.current) return;

    setIsBeRealCapturing(true);
    setBeRealStepMsg('Mengambil foto presensi...');
    try {
      playCameraShutterSound();
      setBeRealFlash(true);
      setTimeout(() => setBeRealFlash(false), 160);

      const isCurrentMirrored = facingMode === 'user';
      const frame1 = captureFrameToCanvas(videoRef.current, isCurrentMirrored);
      frame1CanvasRef.current = frame1;

      let frame2: HTMLCanvasElement | null = null;
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

      const renderOpts: BeRealRenderOptions = {
        studentName: currentStudent.name,
        studentClass: currentStudent.class,
        prayerType: prayerType,
        aiConfidence: 100,
        gpsText: 'Presensi Sah',
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
    try {
      const attendanceStatus: AttendanceStatus = isTimeValid(prayerType) ? 'Hadir' : 'Tidak Sah';
      const autoNotes = isTimeValid(prayerType) 
          ? `Presensi sah di area madrasah.`
          : `Presensi di luar jam operasional (${prayerType}).`;

      await submitAttendanceRecord({
        name: currentStudent.name,
        class: currentStudent.class,
        prayer_type: prayerType,
        status: attendanceStatus,
        ai_status: 'Manual',
        ai_confidence: 100,
        gps_status: 'Valid',
        snapshot_photo: finalPhoto,
        notes: autoNotes,
      });

      setSubmittedRecordInfo({
        name: currentStudent.name,
        class: currentStudent.class,
        prayer: prayerType,
        time: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }) + ' WIB',
        status: attendanceStatus,
      });
      setSubmitSuccessMsg('Presensi Anda telah berhasil dikirim dan tercatat di sistem.');
      onRecordSubmitted();
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
    setSubmitting(true);
    try {
      await submitAttendanceRecord({
        name: currentStudent.name,
        class: currentStudent.class,
        prayer_type: prayerType,
        status: status,
        ai_status: `Bypass (${status})`,
        gps_status: 'Valid',
        notes: notes,
      });
      setSubmittedRecordInfo({
        name: currentStudent.name,
        class: currentStudent.class,
        prayer: prayerType,
        time: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }) + ' WIB',
        status: status,
      });
      setSubmitSuccessMsg('Data dispensasi berhasil dikirim dan tercatat.');
      onRecordSubmitted();
    } catch (err: any) {
      const msg = err.message || '';
      setSubmitErrorMsg(msg.includes('409') || msg.includes('sudah') ? 'Anda sudah melakukan presensi untuk sholat ini hari ini.' : 'Gagal mengirim data: ' + msg);
    } finally {
      setSubmitting(false);
    }
  };

  const isNameValid = studentName.trim().length >= 2;
  const todayStrISO = new Date().toISOString().split('T')[0];
  const hasAlreadySubmittedToday = records.some((r) => {
    const recordDate = new Date(r.created_at).toISOString().split('T')[0];
    const isSameName = (r.name || '').trim().toLowerCase() === studentName.trim().toLowerCase();
    const isSameClass = (r.class || '').trim().toLowerCase() === selectedClass.trim().toLowerCase();
    const isSamePrayer = r.prayer_type === prayerType;
    return isSameName && isSameClass && isSamePrayer && recordDate === todayStrISO;
  });

  const isSubmitDisabled = !isNameValid || submitting || hasAlreadySubmittedToday;

  const todayStr = new Date().toLocaleDateString('id-ID', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  return (
    <div className="max-w-4xl mx-auto space-y-3">
      <motion.div
        className="bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 text-white rounded-2xl p-3.5 shadow-xs relative overflow-hidden flex flex-col sm:flex-row items-center justify-between gap-2"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="z-10 text-center sm:text-left">
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-1.5">
            <span className="text-[10px] font-bold uppercase tracking-wider bg-white/20 px-2 py-0.5 rounded-full">
              Sesi {prayerType} {isFridayReal ? '(Jumat)' : ''}
            </span>
            <span className="text-[10px] text-emerald-100 font-medium">
              {todayStr}
            </span>
          </div>
          <h2 className="text-sm sm:text-base font-black text-white mt-1 tracking-tight">
            Presensi Sholat Berjamaah
          </h2>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 items-start">
        <motion.div className="lg:col-span-5 bg-white border border-slate-200 rounded-3xl p-5 shadow-xs space-y-4">
          {/* IDENTITAS SISWA */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Identitas Siswa</span>
              <span className="bg-emerald-50 border border-emerald-200 text-emerald-700 text-[10px] font-bold px-2 py-0.5 rounded-full font-sans font-sans">Langkah 1</span>
            </div>
            
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Pilih Kelas:</label>
              <select
                id="select-kelas-siswa"
                value={selectedClass}
                onChange={(e) => {
                  setSelectedClass(e.target.value);
                  setStudentName('');
                }}
                className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 text-sm font-semibold focus:ring-2 focus:ring-emerald-500 focus:bg-white transition-all outline-none animate-none"
              >
                {CLASSES.map(cls => (
                  <option key={cls} value={cls}>{cls}</option>
                ))}
              </select>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="text-xs font-bold text-slate-700">Nama Lengkap Siswa:</label>
                <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2.5 py-0.5 rounded-full font-sans font-sans">
                  {classStudents.length} Siswa
                </span>
              </div>
              <select
                id="select-nama-siswa"
                value={studentName}
                onChange={(e) => setStudentName(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 text-sm font-semibold focus:ring-2 focus:ring-emerald-500 focus:bg-white transition-all outline-none animate-none"
              >
                <option value="">-- Pilih Nama Siswa --</option>
                {classStudents.map(stu => (
                  <option key={stu.id} value={stu.name}>{stu.name}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Jenis Kelamin:</label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setStudentGender('L')}
                  className={`py-3 px-4 rounded-2xl text-xs font-black border transition-all cursor-pointer ${
                    studentGender === 'L'
                      ? 'bg-slate-50 border-slate-300 text-slate-700 ring-2 ring-slate-400/5'
                      : 'bg-white border-slate-100 text-slate-400 hover:bg-slate-50'
                  }`}
                >
                  Laki-laki
                </button>
                <button
                  type="button"
                  onClick={() => setStudentGender('P')}
                  className={`py-3 px-4 rounded-2xl text-xs font-black border transition-all cursor-pointer ${
                    studentGender === 'P'
                      ? 'bg-rose-50 border-rose-300 text-rose-500 shadow-xs'
                      : 'bg-white border-slate-100 text-slate-400 hover:bg-slate-50'
                  }`}
                >
                  Perempuan
                </button>
              </div>
            </div>
          </div>

          {/* PILIHAN SHOLAT */}
          <div className="space-y-2 pt-2 border-t border-slate-100">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">Pilihan Sholat</span>
            <div className="grid grid-cols-2 gap-2">
              {(['Dhuha', 'Dzuhur'] as PrayerType[]).map((p) => (
                <button
                  key={p}
                  type="button"
                  onClick={() => setPrayerType(p)}
                  className={`py-3 px-4 rounded-2xl text-xs font-black border transition-all cursor-pointer ${
                    prayerType === p
                      ? 'bg-emerald-600 border-emerald-600 text-white shadow-md shadow-emerald-600/10'
                      : 'bg-white border-slate-100 text-slate-500 hover:bg-slate-50'
                  }`}
                >
                  {p}
                </button>
              ))}
            </div>
          </div>

          {/* DISPENSASI KHUSUS (BYPASS) */}
          <div className="space-y-2 pt-2 border-t border-slate-100">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">Dispensasi Khusus (Bypass)</span>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => {
                  if (!studentName) {
                    alert('Silakan pilih nama siswa terlebih dahulu.');
                    return;
                  }
                  // Direct bypass for Haid/Halangan
                  handleBypassSubmit("Halangan Syar'i", 'Dispensasi Haid (Bypass)');
                }}
                className="py-3 px-4 rounded-2xl text-xs font-black border transition-all cursor-pointer bg-rose-50 border-rose-200 text-rose-600 hover:bg-rose-100/60"
              >
                Haid
              </button>
              <button
                type="button"
                onClick={() => {
                  if (!studentName) {
                    alert('Silakan pilih nama siswa terlebih dahulu.');
                    return;
                  }
                  setBypassType('SakitIzin');
                  setBypassModalOpen(true);
                }}
                className="py-3 px-4 rounded-2xl text-xs font-black border transition-all cursor-pointer bg-amber-50 border-amber-200 text-amber-700 hover:bg-amber-100/60"
              >
                Sakit / Izin
              </button>
            </div>
          </div>
        </motion.div>

        <motion.div className="lg:col-span-7 bg-white border border-slate-200 rounded-2xl p-3.5 shadow-xs space-y-3">
          <div className="relative w-full aspect-[16/10] bg-slate-950 rounded-2xl overflow-hidden border border-slate-200 shadow-inner flex items-center justify-center">
            <video ref={videoRef} autoPlay playsInline muted className={`w-full h-full object-cover ${facingMode === 'user' ? 'scale-x-[-1]' : ''}`} />
            <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" />
            <motion.button onClick={toggleCameraFacing} className="absolute top-2 right-2 z-10 p-2 rounded-xl bg-slate-900/80 text-slate-200"><RefreshCw className="w-3.5 h-3.5" /></motion.button>
          </div>
          <button disabled={isSubmitDisabled} onClick={handleStartCapture} className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl shadow-md transition active:scale-95 disabled:opacity-50">
            Jepret & Kirim Presensi
          </button>
        </motion.div>
      </div>

      <BeRealPreviewModal isOpen={beRealModalOpen} onClose={() => setBeRealModalOpen(false)} initialPhotoUrl={beRealPhotoUrl} frame1Canvas={frame1CanvasRef.current} frame2Canvas={frame2CanvasRef.current} renderOptions={{studentName: currentStudent.name, studentClass: currentStudent.class, prayerType}} onRetake={handleStartCapture} onConfirmSubmit={handleConfirmBeRealSubmit} isSubmitting={submitting} />
      <BypassModal isOpen={bypassModalOpen} onClose={() => setBypassModalOpen(false)} onSubmit={handleBypassSubmit} student={currentStudent} prayerType={prayerType} type={bypassType} />

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
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-inner">
                <CheckCircle2 className="w-9 h-9" />
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
                  setStudentName(''); // Siap langsung untuk siswa berikutnya
                }}
                className="w-full py-3.5 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-bold rounded-2xl cursor-pointer transition shadow-md active:scale-95"
              >
                Selesai / Lanjut Siswa Berikutnya ➔
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
