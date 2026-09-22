import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Camera,
  RefreshCw,
  CheckCircle2,
  AlertCircle,
  X,
} from 'lucide-react';
import { Student, PrayerType, AttendanceStatus, DetectionResult } from '../types';
import { CLASSES } from '../data/madrasahData';
import {
  loadCocoSsdModel,
  detectObjects,
  drawDetectionOverlay,
  captureFrameToCanvas,
  renderBeRealDualCanvas,
  playCameraShutterSound,
  BeRealRenderOptions,
  getObjectTranslation,
} from '../services/aiDetector';
import {
  getCurrentPosition,
  checkGeofence,
  getGeofenceConfig,
  saveGeofenceConfig,
} from '../services/geoService';
import { submitAttendanceRecord } from '../services/supabaseService';
import { BypassModal } from './BypassModal';
import { BeRealPreviewModal } from './BeRealPreviewModal';

interface StudentPresenceProps {
  onRecordSubmitted: () => void;
  onGpsUpdate: (isInside: boolean, distance: number) => void;
}

export const StudentPresence: React.FC<StudentPresenceProps> = ({
  onRecordSubmitted,
  onGpsUpdate,
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

  // 3. Kamera & AI State
  const [facingMode, setFacingMode] = useState<'user' | 'environment'>('user');
  const [cameraActive, setCameraActive] = useState<boolean>(false);
  const [cameraError, setCameraError] = useState<string | null>(null);
  const [aiLoading, setAiLoading] = useState<boolean>(true);
  const [aiStatusMsg, setAiStatusMsg] = useState<string>('Menyiapkan AI deteksi...');
  const [latestDetection, setLatestDetection] = useState<DetectionResult>({
    hasPerson: false,
    score: 0,
    allPredictions: [],
  });

  // 4. GPS & Geofencing State
  const [gpsLoading, setGpsLoading] = useState<boolean>(true);
  const [gpsInside, setGpsInside] = useState<boolean>(true);
  const [gpsDistance, setGpsDistance] = useState<number | null>(null);
  const [gpsCoords, setGpsCoords] = useState<{ latitude: number; longitude: number } | undefined>();

  // 5. Modals & Submission State
  const [bypassModalOpen, setBypassModalOpen] = useState<boolean>(false);
  const [bypassType, setBypassType] = useState<'Halangan' | 'SakitIzin'>('Halangan');
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [submitSuccessMsg, setSubmitSuccessMsg] = useState<string | null>(null);

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

  const latestDetectionRef = useRef<DetectionResult>({
    hasPerson: false,
    score: 0,
    allPredictions: [],
  });

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

  const checkGps = async () => {
    setGpsLoading(true);
    try {
      const pos = await getCurrentPosition();
      const check = checkGeofence({
        latitude: pos.latitude,
        longitude: pos.longitude,
        accuracy: pos.accuracy,
      });
      setGpsInside(check.isInside);
      setGpsDistance(check.distanceMeters);
      setGpsCoords({ latitude: pos.latitude, longitude: pos.longitude });
      onGpsUpdate(check.isInside, check.distanceMeters);
    } catch (err: any) {
      console.warn('GPS check error:', err);
      setGpsInside(false);
      setGpsDistance(999);
      onGpsUpdate(false, 999);
    } finally {
      setGpsLoading(false);
    }
  };

  useEffect(() => {
    checkGps();
  }, []);

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
      try {
        setAiLoading(true);
        setAiStatusMsg('Memuat model AI deteksi siswa...');
        await loadCocoSsdModel();
        if (isMounted) {
          setAiLoading(false);
          setAiStatusMsg('AI Aktif');
        }
      } catch (err: any) {
        console.error('AI loading error:', err);
        if (isMounted) {
          setAiLoading(false);
          setAiStatusMsg('AI siap');
        }
      }
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

        // Deteksi background dengan interval sat-set ~140ms (7-8 frame per detik)
        // Menjamin HP tidak overheat dan video tetap mulus 60 FPS
        if (!isDetecting && timestamp - lastDetectionTime > 140) {
          isDetecting = true;
          lastDetectionTime = timestamp;
          detectObjects(video)
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
            });
        }

        // Render overlay dan garis scanner secara mulus 60 FPS menggunakan data terbaru
        drawDetectionOverlay(canvas, video, latestDetectionRef.current, isUserMode);
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
    if (!latestDetection.hasPerson) {
      alert('AI belum mendeteksi siswa di depan kamera. Harap posisikan kamera menghadap siswa.');
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
        aiConfidence: latestDetection.score,
        gpsText: gpsInside
          ? 'Area Madrasah (Sah)'
          : `Luar Radius (${gpsDistance ?? 0}m)`,
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
      const isOutsideRadius = !gpsInside;
      const attendanceStatus: AttendanceStatus = isOutsideRadius ? 'Di Luar Radius' : 'Hadir';
      const autoNotes = isOutsideRadius
        ? `Presensi dilakukan ${gpsDistance} meter di luar radius Mushola. Siswa terdeteksi di luar area presensi yang sah.`
        : `Presensi sah. Siswa hadir sholat ${prayerType} berjamaah di area Madrasah.`;

      const res = await submitAttendanceRecord({
        name: currentStudent.name,
        class: currentStudent.class,
        prayer_type: prayerType,
        status: attendanceStatus,
        ai_status: `Valid (${latestDetection.score}%)`,
        ai_confidence: latestDetection.score,
        gps_status: gpsInside
          ? 'Valid (Dalam Radius)'
          : `Di Luar Radius (${gpsDistance ?? 0}m)`,
        gps_distance: gpsDistance ?? undefined,
        gps_coords: gpsCoords,
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
      alert('Gagal mengirim presensi: ' + err.message);
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
        gps_status: gpsInside ? 'Valid (Dalam Radius)' : 'Di Luar Radius',
        gps_distance: gpsDistance ?? undefined,
        gps_coords: gpsCoords,
        notes: notes,
        created_at: new Date().toISOString(),
      });
      setSubmitSuccessMsg(res.message);
      onRecordSubmitted();
      setTimeout(() => {
        setSubmitSuccessMsg(null);
      }, 5000);
    } catch (err: any) {
      alert('Gagal mengirim data: ' + err.message);
    } finally {
      setSubmitting(false);
    }
  };

  const [manualCaptureAllowed, setManualCaptureAllowed] = useState<boolean>(false);

  // Jika kamera aktif selama 3 detik tapi AI lambat membaca di HP spesifikasi rendah, aktifkan fallback tombol ambil foto
  useEffect(() => {
    let timer: any;
    if (cameraActive && !latestDetection.hasPerson) {
      timer = setTimeout(() => {
        setManualCaptureAllowed(true);
      }, 3500);
    } else if (latestDetection.hasPerson) {
      setManualCaptureAllowed(false);
    }
    return () => clearTimeout(timer);
  }, [cameraActive, latestDetection.hasPerson]);

  const isPersonValid = latestDetection.hasPerson || manualCaptureAllowed;
  const isNameValid = studentName.trim().length >= 2;
  const isSubmitDisabled = !isNameValid || !isPersonValid || submitting;

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

      {/* Success Notification Banner (Tanpa tombol pintas, otomatis tercatat ke guru) */}
      <AnimatePresence>
        {submitSuccessMsg && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -10 }}
            className="p-4 rounded-2xl bg-emerald-50 border border-emerald-300 text-emerald-900 text-xs sm:text-sm flex items-center justify-between gap-3 shadow-sm"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-emerald-600 text-white flex items-center justify-center shrink-0">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <div>
                <div className="font-bold text-emerald-900">Alhamdulillah! Presensi Berhasil</div>
                <div className="text-xs text-emerald-700">{submitSuccessMsg}</div>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setSubmitSuccessMsg(null)}
              className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-emerald-100/50 transition cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </motion.div>
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
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Nama Lengkap Siswa:
                </label>
                <div>
                  <input
                    type="text"
                    id="input-nama-siswa"
                    value={studentName}
                    onChange={(e) => setStudentName(e.target.value)}
                    placeholder="Ketik nama lengkap Anda..."
                    className="w-full bg-slate-50 hover:bg-white border border-slate-300 rounded-2xl px-3.5 py-2.5 text-xs sm:text-sm text-slate-900 placeholder-slate-400 font-medium focus:ring-2 focus:ring-emerald-500 focus:outline-none transition"
                  />
                </div>
                {!isNameValid && (
                  <p className="text-[11px] text-amber-600 mt-1 font-medium">
                    Ketik nama lengkap untuk mengaktifkan tombol foto
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

            {/* AI Loading State */}
            {aiLoading && (
              <div className="absolute inset-0 bg-slate-900/70 backdrop-blur-xs flex flex-col items-center justify-center p-6 text-center z-20">
                <div className="w-8 h-8 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin mb-2"></div>
                <div className="text-xs font-bold text-white">{aiStatusMsg}</div>
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

            {/* AI Status Badge */}
            {!aiLoading && !cameraError && (
              <div className="absolute top-3 left-3 z-10 flex flex-col gap-1.5 max-w-[70%]">
                {latestDetection.hasPerson ? (
                  <motion.div
                    className="px-3 py-1 rounded-full bg-slate-900/90 border border-emerald-500 text-emerald-300 text-xs font-bold flex items-center gap-1.5 backdrop-blur-xs shadow-xs w-fit"
                    animate={{ scale: [1, 1.03, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                    <span>Siswa Terdeteksi ({latestDetection.score}%)</span>
                  </motion.div>
                ) : latestDetection.allPredictions && latestDetection.allPredictions.length > 0 ? (
                  (() => {
                    const topObj = latestDetection.allPredictions[0];
                    const trans = getObjectTranslation(topObj.class);
                    const conf = Math.round(topObj.score * 100);
                    return (
                      <div className={`px-3 py-1 rounded-full backdrop-blur-xs shadow-xs flex items-center gap-1.5 text-xs font-bold w-fit border ${
                        trans.isVehicle 
                          ? 'bg-amber-950/90 border-amber-400 text-amber-200' 
                          : 'bg-rose-950/90 border-rose-400 text-rose-200'
                      }`}>
                        <span>Terdeteksi: {trans.label} ({conf}%)</span>
                      </div>
                    );
                  })()
                ) : manualCaptureAllowed ? (
                  <div className="px-3 py-1 rounded-full bg-slate-900/85 border border-emerald-400/80 text-emerald-300 text-xs font-bold flex items-center gap-1.5 backdrop-blur-xs shadow-xs w-fit">
                    <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                    <span>Kamera Siap Difoto</span>
                  </div>
                ) : (
                  <div className="px-3 py-1 rounded-full bg-slate-900/85 border border-rose-500/70 text-rose-300 text-xs font-bold flex items-center gap-1.5 backdrop-blur-xs shadow-xs w-fit">
                    <span className="w-2 h-2 rounded-full bg-rose-500"></span>
                    <span>Arahkan ke Wajah Siswa</span>
                  </div>
                )}
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

          {/* GPS Status Strip - Clean & Realistic */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 px-3.5 py-2.5 bg-slate-50 rounded-2xl border border-slate-200/90 text-xs shadow-2xs">
            <div className="flex items-center gap-2 min-w-0">
              <span
                className={`w-2.5 h-2.5 rounded-full shrink-0 ${
                  gpsLoading && gpsDistance === null
                    ? 'bg-amber-400 ring-4 ring-amber-100 animate-pulse'
                    : gpsInside
                    ? 'bg-emerald-500 ring-4 ring-emerald-100'
                    : 'bg-rose-500 ring-4 ring-rose-100'
                }`}
              />
              <div className="flex items-center gap-1.5 flex-wrap min-w-0">
                <span className="font-bold text-slate-800 text-xs">
                  {gpsLoading && gpsDistance === null
                    ? 'Mendeteksi Lokasi GPS...'
                    : gpsInside
                    ? 'Area Madrasah (Sah)'
                    : 'Luar Radius'}
                </span>
                {gpsDistance !== null && (
                  <span
                    className={`px-2 py-0.5 rounded-md font-mono text-[11px] font-semibold shadow-2xs border ${
                      gpsInside
                        ? 'bg-emerald-50 border-emerald-200 text-emerald-800'
                        : 'bg-rose-50 border-rose-200 text-rose-800'
                    }`}
                    title="Jarak riil dari titik patokan gerbang madrasah di Jl. Kates"
                  >
                    {gpsDistance} m dari Gerbang Jl. Kates
                  </span>
                )}
                {gpsInside && (
                  <span className="text-[10px] text-emerald-700 font-medium hidden md:inline">
                    (Dalam Radius Kampus 600m)
                  </span>
                )}
              </div>
            </div>

            <div className="flex items-center gap-1.5 self-end sm:self-auto shrink-0">
              <motion.button
                type="button"
                id="btn-refresh-gps"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.96 }}
                onClick={checkGps}
                disabled={gpsLoading}
                className="px-3 py-1.5 rounded-xl bg-white hover:bg-slate-100 border border-slate-200 text-slate-700 text-xs font-bold transition flex items-center gap-1.5 cursor-pointer shadow-2xs"
                title="Perbarui koordinat GPS riil perangkat"
              >
                <RefreshCw className={`w-3.5 h-3.5 text-emerald-600 ${gpsLoading ? 'animate-spin' : ''}`} />
                <span>{gpsLoading ? 'Mencari...' : 'Perbarui GPS'}</span>
              </motion.button>
            </div>
          </div>

          {/* Primary Action Button */}
          <div>
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
              {isBeRealCapturing ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>Mengambil foto presensi...</span>
                </>
              ) : !isNameValid ? (
                <span>Ketik Nama Siswa Terlebih Dahulu</span>
              ) : isPersonValid ? (
                <>
                  <Camera className="w-4 h-4 text-white" />
                  <span>
                    Jepret Presensi (2 Sudut): {studentName.trim()}
                  </span>
                </>
              ) : latestDetection.allPredictions && latestDetection.allPredictions.length > 0 ? (
                (() => {
                  const trans = getObjectTranslation(latestDetection.allPredictions[0].class);
                  return (
                    <span>Terdeteksi: {trans.label} (Bukan Siswa)</span>
                  );
                })()
              ) : (
                <span>Arahkan Kamera ke Wajah Siswa</span>
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
