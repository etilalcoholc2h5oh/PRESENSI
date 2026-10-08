import React from 'react';
import { motion } from 'motion/react';
import { MADRASAH_INFO } from '../data/madrasahData';

interface NavbarProps {
  activeTab: 'student' | 'admin';
  setActiveTab: (tab: 'student' | 'admin') => void;
  onOpenAdminAuth: () => void;
  isAdminAuthenticated: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  onOpenAdminAuth,
  isAdminAuthenticated,
}) => {
  const handleAdminTabClick = () => {
    if (!isAdminAuthenticated) {
      onOpenAdminAuth();
    } else {
      setActiveTab('admin');
    }
  };

  return (
    <header className="no-print bg-white border-b border-slate-200 sticky top-0 z-40 shadow-xs">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Brand */}
        <div className="flex flex-col text-left">
          <div className="flex items-center gap-2">
            <span className="font-extrabold text-sm sm:text-base text-slate-900 tracking-tight">
              {MADRASAH_INFO.name}
            </span>
            <span className="hidden sm:inline-block text-xs px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 font-semibold border border-emerald-200">
              Presensi Sholat
            </span>
          </div>
          <div className="text-xs text-slate-500 mt-0.5 font-medium">
            {MADRASAH_INFO.subtitle}
          </div>
        </div>

        {/* Pill Navigation */}
        <div className="flex items-center gap-1.5 bg-slate-100 p-1.5 rounded-2xl border border-slate-200 shadow-inner">
          <motion.button
            id="tab-presensi-siswa"
            type="button"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setActiveTab('student')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all duration-200 cursor-pointer ${
              activeTab === 'student'
                ? 'bg-white text-emerald-700 shadow-sm border border-slate-200/80'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Siswa
          </motion.button>
          <motion.button
            id="tab-akses-guru"
            type="button"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleAdminTabClick}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all duration-200 cursor-pointer ${
              activeTab === 'admin'
                ? 'bg-white text-emerald-700 shadow-sm border border-slate-200/80'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Guru / Admin
          </motion.button>
        </div>
      </div>
    </header>
  );
};
