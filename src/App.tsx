import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { KeyRound, X, AlertCircle, Lock, Timer } from 'lucide-react';
import { AttendanceRecord } from './types';
import { Navbar } from './components/Navbar';
import { StudentPresence } from './components/StudentPresence';
import { AdminDashboard } from './components/AdminDashboard';
import { getAttendanceRecords } from './services/supabaseService';
import { MADRASAH_INFO } from './data/madrasahData';

const ADMIN_PIN = '3103'; // PIN Pengawas tetap: 3103 (mencegah manipulasi oleh siswa)
const PIN_FAILED_ATTEMPTS_KEY = 'man1_pin_failed_attempts';
const PIN_LOCKOUT_UNTIL_KEY = 'man1_pin_lockout_until';
const MAX_PIN_ATTEMPTS = 5;
const LOCKOUT_DURATION_SECONDS = 30;

export default function App() {
  const [activeTab, setActiveTab] = useState<'student' | 'admin'>('student');
  const [records, setRecords] = useState<AttendanceRecord[]>([]);
  const [isCloudConnected, setIsCloudConnected] = useState<boolean>(false);

  // GPS Geofence status synced with Navbar
  const [isInsideGeofence, setIsInsideGeofence] = useState<boolean>(true);

  // Admin PIN Auth
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState<boolean>(false);
  const [pinModalOpen, setPinModalOpen] = useState<boolean>(false);
  const [pinInput, setPinInput] = useState<string>('');
  const [pinError, setPinError] = useState<string | null>(null);

  // Rate Limiting State
  const [failedAttempts, setFailedAttempts] = useState<number>(() => {
    const saved = localStorage.getItem(PIN_FAILED_ATTEMPTS_KEY);
    return saved ? parseInt(saved, 10) || 0 : 0;
  });
  const [lockoutRemaining, setLockoutRemaining] = useState<number>(0);

  // Sync Rate Limiting & Countdown Timer
  useEffect(() => {
    const checkLockout = () => {
      const lockoutUntilStr = localStorage.getItem(PIN_LOCKOUT_UNTIL_KEY);
      if (lockoutUntilStr) {
        const lockoutUntil = parseInt(lockoutUntilStr, 10);
        const now = Date.now();
        if (lockoutUntil > now) {
          const remainingSec = Math.ceil((lockoutUntil - now) / 1000);
          setLockoutRemaining(remainingSec);
          return;
        } else {
          // Lockout has expired! Reset state
          localStorage.removeItem(PIN_LOCKOUT_UNTIL_KEY);
          localStorage.removeItem(PIN_FAILED_ATTEMPTS_KEY);
          setFailedAttempts(0);
          setLockoutRemaining(0);
        }
      } else {
        setLockoutRemaining(0);
      }
    };

    checkLockout();
    const interval = setInterval(checkLockout, 1000);
    return () => clearInterval(interval);
  }, []);

  // Load records on start and on update
  const loadRecords = async () => {
    try {
      const res = await getAttendanceRecords();
      setRecords(res.data);
      setIsCloudConnected(res.isFromCloud);
    } catch (err) {
      console.error('Error fetching records:', err);
    }
  };

  useEffect(() => {
    loadRecords();
    const handleUpdate = (e: Event) => {
      const customEvent = e as CustomEvent<AttendanceRecord[]>;
      if (customEvent.detail && Array.isArray(customEvent.detail)) {
        setRecords(customEvent.detail);
      }
      loadRecords();
    };
    window.addEventListener('presensi_updated', handleUpdate);
    return () => {
      window.removeEventListener('presensi_updated', handleUpdate);
    };
  }, []);

  const handleOpenAdminAuth = () => {
    if (isAdminAuthenticated) {
      loadRecords();
      setActiveTab('admin');
    } else {
      setPinInput('');
      if (lockoutRemaining === 0) {
        setPinError(null);
      }
      setPinModalOpen(true);
    }
  };

  const handleVerifyPin = (e?: React.FormEvent) => {
    if (e) e.preventDefault();

    // Check if locked out by rate limiter
    if (lockoutRemaining > 0) {
      setPinError(`Sistem terkunci sementara. Tunggu ${lockoutRemaining} detik.`);
      return;
    }

    if (pinInput.trim() === ADMIN_PIN) {
      // Success: Clear rate limiting
      localStorage.removeItem(PIN_FAILED_ATTEMPTS_KEY);
      localStorage.removeItem(PIN_LOCKOUT_UNTIL_KEY);
      setFailedAttempts(0);
      setLockoutRemaining(0);
      setPinError(null);

      setIsAdminAuthenticated(true);
      setPinModalOpen(false);
      loadRecords();
      setActiveTab('admin');
    } else {
      // Failed: Increase rate limit counter
      const nextAttempts = failedAttempts + 1;

      if (nextAttempts >= MAX_PIN_ATTEMPTS) {
        // Trigger lockout
        const lockoutUntil = Date.now() + LOCKOUT_DURATION_SECONDS * 1000;
        localStorage.setItem(PIN_LOCKOUT_UNTIL_KEY, lockoutUntil.toString());
        localStorage.setItem(PIN_FAILED_ATTEMPTS_KEY, nextAttempts.toString());
        setFailedAttempts(nextAttempts);
        setLockoutRemaining(LOCKOUT_DURATION_SECONDS);
        setPinError(`PIN salah ${MAX_PIN_ATTEMPTS} kali! Akses terkunci selama ${LOCKOUT_DURATION_SECONDS} detik.`);
        setPinInput('');
      } else {
        localStorage.setItem(PIN_FAILED_ATTEMPTS_KEY, nextAttempts.toString());
        setFailedAttempts(nextAttempts);
        const remainingAttempts = MAX_PIN_ATTEMPTS - nextAttempts;
        setPinError(`PIN salah! Sisa percobaan: ${remainingAttempts} kali lagi.`);
        setPinInput('');
      }
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800 selection:bg-emerald-500 selection:text-white">
      {/* Navigation Header */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={(tab) => {
          if (tab === 'admin') {
            handleOpenAdminAuth();
          } else {
            setActiveTab('student');
          }
        }}
        onOpenAdminAuth={handleOpenAdminAuth}
        isAdminAuthenticated={isAdminAuthenticated}
        isInsideGeofence={isInsideGeofence}
      />

      {/* Main Content Area with Smooth Animation */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8">
        <AnimatePresence mode="wait">
          {activeTab === 'student' && (
            <motion.div
              key="student-tab"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25 }}
            >
              <StudentPresence
                onRecordSubmitted={loadRecords}
              />
            </motion.div>
          )}
          {activeTab === 'admin' && (
            <motion.div
              key="admin-tab"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25 }}
            >
              <AdminDashboard
                records={records}
                isCloudConnected={isCloudConnected}
                onRefreshData={loadRecords}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Footer without bullet symbols */}
      <footer className="no-print border-t border-slate-200 bg-white py-4 px-4 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <div className="font-medium">
            {new Date().getFullYear()} {MADRASAH_INFO.name} - Sistem Presensi Sholat Siswa
          </div>
          <div className="flex items-center gap-1.5 text-slate-500 font-medium">
          </div>
        </div>
      </footer>

      {/* PIN Authentication Modal for Guru/Admin */}
      <AnimatePresence>
        {pinModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 16 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 16 }}
              transition={{ type: 'spring', stiffness: 350, damping: 25 }}
              className="bg-white border border-slate-200 rounded-3xl max-w-sm w-full p-6 shadow-2xl relative text-center text-slate-800"
            >
              <button
                type="button"
                onClick={() => setPinModalOpen(false)}
                className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 p-1 rounded-xl hover:bg-slate-100 transition cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              {lockoutRemaining > 0 ? (
                <motion.div
                  className="w-12 h-12 rounded-2xl bg-rose-50 border border-rose-200 text-rose-600 flex items-center justify-center mx-auto mb-3 shadow-xs"
                  animate={{ scale: [1, 1.08, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
                >
                  <Lock className="w-6 h-6" />
                </motion.div>
              ) : (
                <motion.div
                  className="w-12 h-12 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-600 flex items-center justify-center mx-auto mb-3 shadow-xs"
                  animate={{ rotate: [-3, 3, -3] }}
                  transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
                >
                  <KeyRound className="w-6 h-6" />
                </motion.div>
              )}

              <h3 className="font-black text-lg text-slate-900 tracking-tight">
                {lockoutRemaining > 0 ? 'Akses Terkunci Sementara' : 'Akses Guru / Admin'}
              </h3>
              <p className="text-xs text-slate-500 mt-1 font-medium leading-relaxed">
                {lockoutRemaining > 0
                  ? 'Batas maksimal kesalahan PIN tercapai. Sistem mengaktifkan proteksi anti brute-force.'
                  : 'Masukkan PIN pengawas untuk membuka rekapitulasi presensi sholat siswa.'}
              </p>

              {/* Rate Limiting Lockout Active Box */}
              {lockoutRemaining > 0 && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="mt-4 p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-800 space-y-2"
                >
                  <div className="flex items-center justify-center gap-1.5 text-xs font-bold text-rose-700">
                    <Timer className="w-4 h-4 text-rose-600 animate-pulse" />
                    <span>Tunggu Sebelum Mencoba Lagi</span>
                  </div>
                  <div className="text-3xl font-black font-mono tracking-widest text-rose-700">
                    00:{lockoutRemaining < 10 ? `0${lockoutRemaining}` : lockoutRemaining}
                  </div>
                  <p className="text-[11px] text-rose-600 font-medium">
                    PIN terkunci demi keamanan data presensi madrasah.
                  </p>
                </motion.div>
              )}

              {/* Attempt Indicator Dots when failedAttempts > 0 and not locked */}
              {failedAttempts > 0 && lockoutRemaining === 0 && (
                <div className="mt-3 p-2.5 rounded-xl bg-amber-50 border border-amber-200/80 space-y-1.5">
                  <div className="flex items-center justify-between text-[11px] font-semibold text-amber-800">
                    <span>Percobaan Gagal:</span>
                    <span className="font-bold">
                      {failedAttempts} / {MAX_PIN_ATTEMPTS}
                    </span>
                  </div>
                  <div className="flex items-center justify-center gap-1.5">
                    {Array.from({ length: MAX_PIN_ATTEMPTS }).map((_, idx) => (
                      <div
                        key={idx}
                        className={`h-1.5 rounded-full transition-all duration-300 ${
                          idx < failedAttempts ? 'w-5 bg-rose-500' : 'w-2.5 bg-amber-200'
                        }`}
                      />
                    ))}
                  </div>
                </div>
              )}

              <form onSubmit={handleVerifyPin} className="mt-4 space-y-4">
                <div>
                  <input
                    type="password"
                    maxLength={10}
                    autoFocus={lockoutRemaining === 0}
                    disabled={lockoutRemaining > 0}
                    placeholder={lockoutRemaining > 0 ? 'Terkunci...' : 'Masukkan PIN'}
                    value={pinInput}
                    onChange={(e) => {
                      setPinInput(e.target.value);
                      if (pinError) setPinError(null);
                    }}
                    className={`w-full border rounded-2xl py-3 px-4 text-center text-xl tracking-[0.35em] font-mono text-slate-900 focus:outline-none transition placeholder:tracking-normal placeholder:text-sm placeholder:font-sans ${
                      lockoutRemaining > 0
                        ? 'bg-slate-100 border-slate-200 text-slate-400 cursor-not-allowed placeholder:text-slate-400'
                        : 'bg-slate-50 border-slate-300 focus:ring-2 focus:ring-emerald-500 placeholder:text-slate-400'
                    }`}
                  />
                  {pinError && (
                    <p className="text-rose-600 text-xs font-bold mt-2 flex items-center justify-center gap-1.5">
                      <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                      <span>{pinError}</span>
                    </p>
                  )}
                </div>

                {/* Quick Numpad for Mobile */}
                <div className="grid grid-cols-3 gap-2 pt-1">
                  {['1', '2', '3', '4', '5', '6', '7', '8', '9', 'C', '0', ' '].map((k) => (
                    <motion.button
                      key={k}
                      type="button"
                      disabled={lockoutRemaining > 0}
                      whileHover={lockoutRemaining === 0 ? { scale: 1.05 } : undefined}
                      whileTap={lockoutRemaining === 0 ? { scale: 0.92 } : undefined}
                      onClick={() => {
                        if (lockoutRemaining > 0) return;
                        if (k === 'C') setPinInput('');
                        else if (k === ' ') setPinInput((prev) => prev.slice(0, -1));
                        else setPinInput((prev) => prev + k);
                      }}
                      className={`py-2.5 rounded-2xl border font-bold text-sm transition shadow-2xs ${
                        lockoutRemaining > 0
                          ? 'bg-slate-100 border-slate-200 text-slate-300 cursor-not-allowed opacity-50'
                          : 'bg-slate-100 hover:bg-slate-200 border-slate-200 text-slate-800 cursor-pointer'
                      }`}
                    >
                      {k === ' ' ? 'Hapus' : k}
                    </motion.button>
                  ))}
                </div>

                <div className="flex gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setPinModalOpen(false)}
                    className="flex-1 py-2.5 rounded-2xl border border-slate-300 text-xs font-bold text-slate-600 hover:text-slate-900 cursor-pointer"
                  >
                    Tutup
                  </button>
                  <button
                    type="submit"
                    disabled={lockoutRemaining > 0 || !pinInput.trim()}
                    className={`flex-1 py-2.5 rounded-2xl text-xs font-bold shadow-xs transition ${
                      lockoutRemaining > 0 || !pinInput.trim()
                        ? 'bg-slate-200 text-slate-400 cursor-not-allowed border border-slate-300'
                        : 'bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white active:scale-95 cursor-pointer'
                    }`}
                  >
                    {lockoutRemaining > 0
                      ? `Terkunci (${lockoutRemaining}s)`
                      : 'Buka Dashboard'}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
