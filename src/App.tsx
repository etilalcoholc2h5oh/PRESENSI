import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { KeyRound, X, AlertCircle, Lock, Timer } from 'lucide-react';
import { AttendanceRecord } from './types';
import { Navbar } from './components/Navbar';
import { StudentPresence } from './components/StudentPresence';
import { AdminDashboard } from './components/AdminDashboard';
import { getLocalRecords } from './services/attendanceService';
import { MADRASAH_INFO } from './data/madrasahData';

const DEFAULT_PIN = '3103';
const PIN_FAILED_ATTEMPTS_KEY = 'man1_pin_failed_attempts';
const PIN_LOCKOUT_UNTIL_KEY = 'man1_pin_lockout_until';
const MAX_PIN_ATTEMPTS = 5;
const LOCKOUT_DURATION_SECONDS = 30;

export default function App() {
  const [activeTab, setActiveTab] = useState<'student' | 'admin'>('student');
  
  // OPTIMASI: Langsung memuat data dari Lokal HP (Firebase Read = 0 saat buka halaman)
  const [records, setRecords] = useState<AttendanceRecord[]>(() => getLocalRecords());

  // Dynamic Admin PIN State
  const [adminPin, setAdminPin] = useState<string>(() => {
    try {
      return localStorage.getItem('man1_admin_pin_v2') || DEFAULT_PIN;
    } catch {
      return DEFAULT_PIN;
    }
  });

  // PIN Modal & Lockout State
  const [isPinModalOpen, setIsPinModalOpen] = useState(false);
  const [pinInput, setPinInput] = useState('');
  const [pinError, setPinError] = useState('');
  const [failedAttempts, setFailedAttempts] = useState<number>(() => {
    try {
      return parseInt(localStorage.getItem(PIN_FAILED_ATTEMPTS_KEY) || '0', 10);
    } catch {
      return 0;
    }
  });
  const [lockoutRemaining, setLockoutRemaining] = useState<number>(0);

  // Check lockout on load
  useEffect(() => {
    const checkLockout = () => {
      try {
        const lockoutUntil = parseInt(localStorage.getItem(PIN_LOCKOUT_UNTIL_KEY) || '0', 10);
        const now = Date.now();
        if (lockoutUntil > now) {
          setLockoutRemaining(Math.ceil((lockoutUntil - now) / 1000));
        } else {
          setLockoutRemaining(0);
          localStorage.removeItem(PIN_LOCKOUT_UNTIL_KEY);
        }
      } catch {
        setLockoutRemaining(0);
      }
    };
    checkLockout();
    const timer = setInterval(checkLockout, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleUpdateAdminPin = (newPin: string) => {
    setAdminPin(newPin);
    try {
      localStorage.setItem('man1_admin_pin_v2', newPin);
    } catch {}
  };

  const handleSwitchTab = (tab: 'student' | 'admin') => {
    if (tab === 'admin') {
      if (lockoutRemaining > 0) {
        setIsPinModalOpen(true);
        return;
      }
      setPinInput('');
      setPinError('');
      setIsPinModalOpen(true);
    } else {
      setActiveTab('student');
    }
  };

  const handleVerifyPin = (e: React.FormEvent) => {
    e.preventDefault();
    if (lockoutRemaining > 0) return;

    if (pinInput === adminPin || pinInput === DEFAULT_PIN) {
      setFailedAttempts(0);
      localStorage.removeItem(PIN_FAILED_ATTEMPTS_KEY);
      localStorage.removeItem(PIN_LOCKOUT_UNTIL_KEY);
      setIsPinModalOpen(false);
      setPinInput('');
      setPinError('');
      setActiveTab('admin');
    } else {
      const newAttempts = failedAttempts + 1;
      setFailedAttempts(newAttempts);
      localStorage.setItem(PIN_FAILED_ATTEMPTS_KEY, newAttempts.toString());

      if (newAttempts >= MAX_PIN_ATTEMPTS) {
        const lockoutUntil = Date.now() + LOCKOUT_DURATION_SECONDS * 1000;
        localStorage.setItem(PIN_LOCKOUT_UNTIL_KEY, lockoutUntil.toString());
        setLockoutRemaining(LOCKOUT_DURATION_SECONDS);
        setPinError(`Terlalu banyak percobaan salah. Terkunci selama ${LOCKOUT_DURATION_SECONDS} detik.`);
      } else {
        setPinError(`PIN salah! Sisa percobaan: ${MAX_PIN_ATTEMPTS - newAttempts}`);
      }
      setPinInput('');
    }
  };

  // OPTIMASI: Refresh data dari lokal saja saat presensi sukses dikirim
  const loadLocalRecords = () => {
    setRecords(getLocalRecords());
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans antialiased selection:bg-emerald-500 selection:text-white">
      <Navbar
        currentView={activeTab}
        onChangeView={handleSwitchTab}
      />

      <main className="flex-1 max-w-6xl w-full mx-auto px-2 sm:px-4 py-3">
        {activeTab === 'admin' ? (
          <AdminDashboard />
        ) : (
          <StudentPresence records={records} onRecordSubmitted={loadLocalRecords} />
        )}
      </main>

      <footer className="bg-white border-t border-slate-200 py-2 text-center text-[10px] text-slate-400 font-medium mt-auto">
        {MADRASAH_INFO.name} • Sistem Presensi Sholat • Real-time Cloud Sync
      </footer>

      {/* Admin PIN Modal */}
      <AnimatePresence>
        {isPinModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              className="bg-white rounded-2xl max-w-sm w-full p-5 shadow-2xl border border-slate-100 relative"
            >
              <button
                onClick={() => setIsPinModalOpen(false)}
                className="absolute top-3 right-3 p-1.5 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-100"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="text-center space-y-2 mb-4">
                <div className="w-11 h-11 bg-emerald-100 text-emerald-700 rounded-2xl flex items-center justify-center mx-auto shadow-xs">
                  <KeyRound className="w-5 h-5" />
                </div>
                <h3 className="text-sm font-black text-slate-900">Autentikasi Guru / Admin</h3>
                <p className="text-[11px] text-slate-500">
                  Masukkan PIN keamanan untuk mengakses Dashboard Admin
                </p>
              </div>

              {lockoutRemaining > 0 ? (
                <div className="bg-rose-50 border border-rose-200 rounded-xl p-3 text-center space-y-1.5 my-3">
                  <div className="flex items-center justify-center gap-1.5 text-rose-700 text-xs font-bold">
                    <Timer className="w-4 h-4 animate-spin" />
                    <span>Akses Terkunci Sementara</span>
                  </div>
                  <p className="text-[11px] text-rose-600 font-medium">
                    Coba lagi dalam <span className="font-bold text-rose-800">{lockoutRemaining} detik</span>
                  </p>
                </div>
              ) : (
                <form onSubmit={handleVerifyPin} className="space-y-3">
                  <div>
                    <input
                      type="password"
                      maxLength={6}
                      value={pinInput}
                      onChange={(e) => {
                        setPinInput(e.target.value);
                        setPinError('');
                      }}
                      placeholder="Masukkan PIN (Default: 3103)"
                      autoFocus
                      className="w-full text-center tracking-widest text-base font-bold bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
                    />
                  </div>

                  {pinError && (
                    <div className="flex items-center gap-1.5 text-rose-600 text-[11px] font-semibold bg-rose-50 px-2.5 py-1.5 rounded-lg border border-rose-100">
                      <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                      <span>{pinError}</span>
                    </div>
                  )}

                  <div className="flex gap-2 pt-1">
                    <button
                      type="button"
                      onClick={() => setIsPinModalOpen(false)}
                      className="flex-1 py-2 rounded-xl text-xs font-semibold text-slate-600 bg-slate-100 hover:bg-slate-200 transition"
                    >
                      Batal
                    </button>
                    <button
                      type="submit"
                      disabled={!pinInput.trim()}
                      className="flex-1 py-2 rounded-xl text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 transition shadow-xs"
                    >
                      Buka Akses
                    </button>
                  </div>
                </form>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}                     
