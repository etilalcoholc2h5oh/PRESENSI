import React, { useState } from 'react';
import { motion } from 'motion/react';
import { X } from 'lucide-react';
import { AttendanceStatus, PrayerType, Student } from '../types';

interface BypassModalProps {
  isOpen: boolean;
  type: 'Halangan' | 'SakitIzin';
  student: Student | null;
  prayerType: PrayerType;
  onClose: () => void;
  onSubmit: (status: AttendanceStatus, notes: string) => Promise<void>;
}

export const BypassModal: React.FC<BypassModalProps> = ({
  isOpen,
  type,
  student,
  prayerType,
  onClose,
  onSubmit,
}) => {
  const [selectedStatus, setSelectedStatus] = useState<AttendanceStatus>(
    type === 'Halangan' ? "Halangan Syar'i" : 'Sakit'
  );
  const [notes, setNotes] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  if (!isOpen || !student) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const finalNotes =
        notes.trim() ||
        (type === 'Halangan'
          ? "Halangan Syar'i bulanan (Haid)"
          : selectedStatus === 'Sakit'
          ? 'Izin sakit / istirahat di UKS'
          : 'Izin kegiatan madrasah');
      await onSubmit(selectedStatus, finalNotes);
      setNotes('');
      onClose();
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-fade-in">
      <motion.div
        className="bg-white border border-slate-200 rounded-3xl max-w-md w-full p-5 sm:p-6 shadow-2xl relative text-slate-800"
        initial={{ scale: 0.9, opacity: 0, y: 16 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        transition={{ type: 'spring', stiffness: 350, damping: 25 }}
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 p-1.5 rounded-xl hover:bg-slate-100 transition cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-4">
          <div
            className={`w-11 h-11 rounded-2xl flex items-center justify-center shadow-xs font-bold text-xs ${
              type === 'Halangan'
                ? 'bg-rose-50 text-rose-700 border border-rose-200'
                : 'bg-amber-50 text-amber-700 border border-amber-200'
            }`}
          >
            {type === 'Halangan' ? 'Haid' : 'Izin'}
          </div>
          <div>
            <h3 className="font-extrabold text-base text-slate-900">
              {type === 'Halangan' ? "Keterangan Halangan Syar'i" : 'Keterangan Sakit / Izin'}
            </h3>
            <p className="text-xs text-slate-500 font-medium">
              {student.name} ({student.class})
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {type === 'Halangan' ? (
            <div className="p-3.5 rounded-2xl bg-rose-50 border border-rose-200 text-rose-800 text-xs space-y-1">
              <div className="font-bold">Ketentuan Khusus Siswi</div>
              <p className="text-rose-700 leading-relaxed text-[11px] font-medium">
                Sesuai fiqih ibadah, siswi yang berhalangan syar'i tidak diwajibkan sholat.
                Data ini dicatat sebagai dispensasi syar'i yang sah.
              </p>
            </div>
          ) : (
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Pilih Kategori:
              </label>
              <div className="grid grid-cols-2 gap-2">
                <motion.button
                  type="button"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.96 }}
                  onClick={() => setSelectedStatus('Sakit')}
                  className={`py-2 px-3 rounded-2xl text-xs font-bold border transition flex items-center justify-center cursor-pointer ${
                    selectedStatus === 'Sakit'
                      ? 'bg-amber-600 border-amber-600 text-white shadow-xs'
                      : 'bg-slate-50 border-slate-200 text-slate-600 hover:border-slate-300'
                  }`}
                >
                  <span>Sakit (UKS / Rumah)</span>
                </motion.button>
                <motion.button
                  type="button"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.96 }}
                  onClick={() => setSelectedStatus('Izin')}
                  className={`py-2 px-3 rounded-2xl text-xs font-bold border transition flex items-center justify-center cursor-pointer ${
                    selectedStatus === 'Izin'
                      ? 'bg-amber-600 border-amber-600 text-white shadow-xs'
                      : 'bg-slate-50 border-slate-200 text-slate-600 hover:border-slate-300'
                  }`}
                >
                  <span>Izin Tertulis</span>
                </motion.button>
              </div>
            </div>
          )}

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">
              Keterangan Tambahan:
            </label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={3}
              placeholder={
                type === 'Halangan'
                  ? 'Contoh: Hari ke-2 halangan haid...'
                  : 'Contoh: Istirahat di UKS karena sakit kepala...'
              }
              className="w-full bg-slate-50 border border-slate-300 rounded-2xl p-3 text-xs text-slate-900 placeholder:text-slate-400 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
            />
          </div>

          <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between text-xs text-slate-600 font-medium">
            <span>Sesi Sholat:</span>
            <span className="font-bold text-emerald-700">{prayerType}</span>
          </div>

          <div className="flex items-center justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-2xl text-xs font-semibold text-slate-600 hover:text-slate-900 transition cursor-pointer"
            >
              Batal
            </button>
            <motion.button
              type="submit"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.96 }}
              disabled={isSubmitting}
              className="px-5 py-2.5 rounded-2xl text-xs font-bold bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white shadow-xs transition disabled:opacity-50 cursor-pointer"
            >
              {isSubmitting ? 'Menyimpan...' : 'Simpan Keterangan'}
            </motion.button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};
