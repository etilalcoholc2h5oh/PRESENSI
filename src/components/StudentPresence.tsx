import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Camera,
  RefreshCw,
  CheckCircle2,
  AlertCircle,
  X,
} from 'lucide-react';
import { Student, PrayerType, AttendanceStatus, DetectionResult, AttendanceRecord } from '../types';
import { CLASSES, PRAYER_TIME_CONFIG, INITIAL_STUDENTS } from '../data/madrasahData';
import {
  captureFrameToCanvas,
  renderBeRealDualCanvas,
  playCameraShutterSound,
  BeRealRenderOptions,
} from '../services/aiDetector';
import { submitAttendanceRecord } from '../services/supabaseService';
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
  const [studentName, setStudentName] = useState<string>(() => {
    return localStorage.getItem('man1_last_student_name') || '';
  });
  const [studentGender, setStudentGender] = useState<'L' | 'P'>(() => {
    return (localStorage.getItem('man1_last_student_gender') as 'L' | 'P') || 'L';
  });

  const classStudents = INITIAL_STUDENTS.filter((s) => s.class === selectedClass);

  const currentStudent: Student = {
    id: 'stu-' + (studentName.trim().toLowerCase().replace(/\s+/g, '-') || 'anon'),
    nisn: '',
    name: studentName.trim(),
    class: selectedClass,
    gender: studentGender,
  };

  useEffect(() => {
    if (selectedClass) localStorage.setItem('man1_last_class', selectedClass);
  }, [selectedClass]);
  useEffect(() => {
    if (studentName) localStorage.setItem('man1_last_student_name', studentName);
  }, [studentName]);
  useEffect(() => {
    if (studentGender) localStorage.setItem('man1_last_student_gender', studentGender);
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

        // Deteksi background dengan interval sat-set ~500ms (2 frame per detik)
        // Menjamin HP tidak overheat dan video tetap mulus 60 FPS
        if (!isDetecting && timestamp - lastDetectionTime > 500) {
          isDetecting = true;
          lastDetectionTime = timestamp;
          /* detectObjects(video)
            .then((result) => {
              if (isRunning) {
                latestDetectionRef.current = result;
                setLatestDetection(result);
              }
            })
            .catch((err) => {
              console.warn('Detection error:', err);
            })
            .finally(() => {
              isDetecting = false;
            }); */

        }

    // Render overlay dan garis scanner secara mulus 60 FPS
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
      const renderOpts: BeRealRenderOptions = {
        studentName: currentStudent.name,
        studentClass: currentStudent.class,
        prayerType: prayerType,
        aiConfidence: 100,
        gpsText: 'Presensi Sah',
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
      const attendanceStatus: AttendanceStatus = isTimeValid(prayerType) ? 'Hadir' : 'Tidak Sah';
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

      setSubmitSuccessMsg(res.message);
      onRecordSubmitted();
      setBeRealModalOpen(false);
      setTimeout(() => {
        setSubmitSuccessMsg(null);
      }, 5000);
    } catch (err: any) {
      const msg = err.message || '';
      setSubmitErrorMsg(msg.includes('409') ? 'Anda sudah melakukan presensi untuk sholat ini hari ini.' : 'Gagal mengirim presensi: ' + msg);
    } finally {
      setSubmitting(false);
    }
  };

  const handleBypassSubmit = async (status: AttendanceStatus, notes: string) => {
    if (!currentStudent) return;
    setSubmitting(true);
    try {
      const res = await submitAttendanceRecord({
        name: currentStudent.name,
        class: currentStudent.class,
        prayer_type: prayerType,
        status: status,
        ai_status: `Bypass (${status})`,
        gps_status: 'Valid',
        notes: notes,
        created_at: new Date().toISOString(),
      });
      setSubmitSuccessMsg(res.message);
      onRecordSubmitted();
      setTimeout(() => {
        setSubmitSuccessMsg(null);
      }, 5000);
    } catch (err: any) {
      const msg = err.message || '';
      setSubmitErrorMsg(msg.includes('409') ? 'Anda sudah melakukan presensi untuk sholat ini hari ini.' : 'Gagal mengirim data: ' + msg);
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

  const todayStrISO = new Date().toISOString().split('T')[0];
  const hasAlreadySubmittedToday = records.some((r) => {
    const recordDate = new Date(r.created_at).toISOString().split('T')[0];
    const isSameName = (r.name || '').trim().toLowerCase() === studentName.trim().toLowerCase();
    const isSameClass = (r.class || '').trim().toLowerCase() === selectedClass.trim().toLowerCase();
    const isSamePrayer = r.prayer_type === prayerType;
    return isSameName && isSameClass && isSamePrayer && recordDate === todayStrISO;
  });

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
      {submitSuccessMsg && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-3xl p-6 shadow-xl max-w-sm w-full text-center space-y-4"
          >
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
               <CheckCircle2 className="w-8 h-8" />
            </div>
            <div>
              <h3 className="font-bold text-lg text-slate-900">Presensi Berhasil Terkirim</h3>
              <p className="text-slate-600 text-sm mt-1">{submitSuccessMsg}</p>
            </div>
            <button
              onClick={() => setSubmitSuccessMsg(null)}
              className="w-full py-3 bg-emerald-600 text-white font-bold rounded-2xl cursor-pointer hover:bg-emerald-700 transition"
            >
              Tutup
            </button>
          </motion.div>
        </div>
      )}

      {/* Error Modal */}
      {submitErrorMsg && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-3xl p-6 shadow-xl max-w-sm w-full text-center space-y-4"
          >
            <div className="w-16 h-16 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center mx-auto">
               <AlertCircle className="w-8 h-8" />
            </div>
            <div>
              <h3 className="font-bold text-lg text-slate-900">Perhatian</h3>
              <p className="text-slate-600 text-sm mt-1">{submitErrorMsg}</p>
            </div>
            <button
              onClick={() => setSubmitErrorMsg(null)}
              className="w-full py-3 bg-slate-800 text-white font-bold rounded-2xl cursor-pointer hover:bg-slate-900 transition"
            >
              Tutup
            </button>
          </motion.div>
        </div>
      )}

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
                  onChange={(e) => setSelectedClass(e.target.value)}
                  className="w-full bg-slate-50 hover:bg-white border border-slate-300 rounded-2xl px-3.5 py-2.5 text-xs sm:text-sm text-slate-900 font-medium focus:ring-2 focus:ring-emerald-500 focus:outline-none transition cursor-pointer"
                >
                  {CLASSES.map((cls) => (
                    <option key={cls} value={cls}>
                      {cls}
                    </option>
                  ))}
                </select>
              </div>

              {/* Nama Siswa */}
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="block text-xs font-bold text-slate-700">
                    Nama Lengkap Siswa:
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
                    <option value="">-- Pilih Nama Siswa Kelas {selectedClass} --</option>
                    {classStudents.map((stu) => (
                      <option key={stu.id} value={stu.name}>
                        {stu.name}
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
                disabled={studentGender === 'L'}
                whileHover={{ scale: studentGender === 'L' ? 1 : 1.02 }}
                whileTap={{ scale: studentGender === 'L' ? 1 : 0.96 }}
                onClick={() => {
                  if (!isNameValid) {
                    alert('Harap ketik nama lengkap Anda terlebih dahulu.');
                    return;
                  }
                  setBypassType('Halangan');
                  setBypassModalOpen(true);
                }}
                className={`py-2 px-3 rounded-2xl font-bold border transition flex items-center justify-center cursor-pointer ${
                  studentGender === 'L'
                    ? 'bg-slate-50 border-slate-200 text-slate-300 opacity-40 cursor-not-allowed'
                    : 'bg-rose-50 hover:bg-rose-100 border-rose-200 text-rose-700'
                }`}
              >
                <span>Haid</span>
              </motion.button>

              <motion.button
                type="button"
                id="btn-bypass-sakit"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.96 }}
                onClick={() => {
                  if (!isNameValid) {
                    alert('Harap ketik nama lengkap Anda terlebih dahulu.');
                    return;
                  }
                  setBypassType('SakitIzin');
                  setBypassModalOpen(true);
                }}
                className="py-2 px-3 rounded-2xl font-bold bg-amber-50 hover:bg-amber-100 border border-amber-200 text-amber-800 transition flex items-center justify-center cursor-pointer"
              >
                <span>Sakit / Izin</span>
              </motion.button>
            </div>
          </div>
        </motion.div>

        {/* Kolom Kanan: Kamera, AI Overlay, & Submit */}
        <motion.div
          className="lg:col-span-7 bg-white border border-slate-200 rounded-3xl p-5 shadow-xs space-y-4"
          whileHover={{ y: -2 }}
          transition={{ type: 'spring', stiffness: 400, damping: 20 }}
        >
          {/* Header Kontrol Kamera */}
          <div className="flex items-center justify-between gap-2 pb-1">
            <div className="flex items-center gap-1.5">
              <Camera className="w-4 h-4 text-emerald-600" />
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

            {/* Canvas Overlay Bounding Box */}
            <canvas
              ref={canvasRef}
              className="absolute inset-0 w-full h-full pointer-events-none"
            />

            {/* Flash Effect */}
            {beRealFlash && (
              <div className="absolute inset-0 bg-white z-40 transition-opacity duration-150 pointer-events-none opacity-90" />
            )}

            {/* In-Progress Capture Overlay */}
            {isBeRealCapturing && (
              <div className="absolute inset-0 bg-slate-900/80 backdrop-blur-xs z-30 flex flex-col items-center justify-center p-6 text-center space-y-3">
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
                    animate={{ rotate: [-5, 5, -5] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    <Camera className="w-6 h-6" />
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
              <div className="p-3.5 rounded-2xl bg-amber-50 border border-amber-200 text-amber-800 text-xs font-bold flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-amber-600 shrink-0" />
                <span>Pemberitahuan Terkirim: Anda sudah melakukan presensi untuk sholat {prayerType} hari ini. Absensi tidak dapat dilakukan dua kali.</span>
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
                isSubmitDisabled || isBeRealCapturing
                  ? 'bg-slate-100 text-slate-400 border border-slate-200 cursor-not-allowed'
                  : 'bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-600 hover:from-emerald-700 hover:to-teal-700 text-white shadow-emerald-600/20'
              }`}
            >
              {hasAlreadySubmittedToday ? (
                <span>Presensi Telah Tercatat Sebelumnya</span>
              ) : isBeRealCapturing ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>Mengambil foto presensi...</span>
                </>
              ) : !isNameValid ? (
                <span>Pilih Nama Siswa Terlebih Dahulu</span>
              ) : (
                <>
                  <Camera className="w-4 h-4 text-white" />
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
