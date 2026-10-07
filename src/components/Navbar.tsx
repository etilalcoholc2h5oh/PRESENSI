import React from 'react';
import { ShieldCheck } from 'lucide-react';

interface NavbarProps {
  currentView: 'student' | 'admin';
  onChangeView: (view: 'student' | 'admin') => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentView, onChangeView }) => {
  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-40 shadow-xs">
      <div className="max-w-7xl mx-auto px-3 h-12 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="p-1 bg-gradient-to-br from-emerald-600 to-teal-700 text-white rounded-lg">
            <ShieldCheck className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-1">
              <span className="font-bold text-slate-900 text-xs sm:text-sm tracking-tight">MAN 1 Boyolali</span>
              <span className="px-1 py-0.2 bg-emerald-100 text-emerald-800 text-[8px] font-bold uppercase tracking-wider rounded-full">Presensi</span>
            </div>
          </div>
        </div>

        <div className="flex items-center bg-slate-100 p-0.5 rounded-lg border border-slate-200">
          <button
            onClick={() => onChangeView('student')}
            className={`px-3 py-1 rounded-md text-[11px] font-semibold transition-all ${
              currentView === 'student'
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Siswa
          </button>
          <button
            onClick={() => onChangeView('admin')}
            className={`px-3 py-1 rounded-md text-[11px] font-semibold transition-all ${
              currentView === 'admin'
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Guru / Admin
          </button>
        </div>
      </div>
    </header>
  );
};
