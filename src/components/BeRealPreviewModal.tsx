import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { X, RotateCcw, ArrowLeftRight, Send, Camera, CheckCircle2 } from 'lucide-react';
import { BeRealRenderOptions, renderBeRealDualCanvas } from '../services/aiDetector';

interface BeRealPreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialPhotoUrl: string;
  frame1Canvas: HTMLCanvasElement | null;
  frame2Canvas: HTMLCanvasElement | null;
  renderOptions: BeRealRenderOptions;
  onRetake: () => void;
  onConfirmSubmit: (photoUrl: string) => Promise<void>;
  isSubmitting: boolean;
}

export const BeRealPreviewModal: React.FC<BeRealPreviewModalProps> = ({
  isOpen,
  onClose,
  initialPhotoUrl,
  frame1Canvas,
  frame2Canvas,
  renderOptions,
  onRetake,
  onConfirmSubmit,
  isSubmitting,
}) => {
  const [currentPhotoUrl, setCurrentPhotoUrl] = useState<string>(initialPhotoUrl);
  const [isSwapped, setIsSwapped] = useState<boolean>(false);

  useEffect(() => {
    setCurrentPhotoUrl(initialPhotoUrl);
    setIsSwapped(false);
  }, [initialPhotoUrl, isOpen]);

  if (!isOpen) return null;

  const handleSwap = () => {
    if (!frame1Canvas || !frame2Canvas) return;
    const nextSwapped = !isSwapped;
    setIsSwapped(nextSwapped);
    const newMain = nextSwapped ? frame1Canvas : frame2Canvas;
    const newInset = nextSwapped ? frame2Canvas : frame1Canvas;
    const newUrl = renderBeRealDualCanvas(newMain, newInset, renderOptions);
    setCurrentPhotoUrl(newUrl);
  };

  const handleConfirm = async () => {
    await onConfirmSubmit(currentPhotoUrl);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 overflow-y-auto animate-fade-in">
      <motion.div
        className="relative bg-white border border-slate-200 rounded-3xl max-w-md w-full p-5 sm:p-6 shadow-2xl space-y-4"
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        transition={{ type: 'spring', stiffness: 350, damping: 25 }}
      >
        {/* Header Bar */}
        <div className="flex items-center justify-between border-b border-slate-200 pb-3">
          <div className="flex items-center gap-2.5">
            <motion.div
              className="w-9 h-9 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-500 flex items-center justify-center text-white shadow-xs"
              animate={{ rotate: [-3, 3, -3] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            >
              <Camera className="w-4 h-4" />
            </motion.div>
            <div>
              <h3 className="font-extrabold text-sm text-slate-900">Hasil Foto 2 Sudut</h3>
              <p className="text-xs text-emerald-700 font-semibold">Wajah Siswa dan Suasana Sholat</p>
            </div>
          </div>
          <motion.button
            type="button"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition cursor-pointer"
          >
            <X className="w-4 h-4" />
          </motion.button>
        </div>

        {/* Dual Camera Photo Frame */}
        <div className="relative aspect-[3/4] w-full max-w-[310px] mx-auto bg-slate-950 rounded-2xl overflow-hidden border border-slate-200 shadow-md">
          <img
            src={currentPhotoUrl}
            alt="Snapshot Presensi"
            className="w-full h-full object-cover"
          />
          {frame1Canvas && frame2Canvas && (
            <motion.button
              type="button"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleSwap}
              className="absolute bottom-14 right-3 px-3 py-1.5 rounded-full bg-slate-900/85 hover:bg-slate-900 border border-slate-700 text-white text-xs font-bold flex items-center gap-1.5 shadow-md backdrop-blur-xs transition cursor-pointer"
              title="Tukar foto utama dan foto kecil"
            >
              <ArrowLeftRight className="w-3.5 h-3.5 text-emerald-400" />
              <span>Tukar Sudut</span>
            </motion.button>
          )}
        </div>

        {/* Action Controls */}
        <div className="pt-2">
          <div className="grid grid-cols-2 gap-2.5">
            <motion.button
              type="button"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.96 }}
              onClick={onRetake}
              disabled={isSubmitting}
              className="py-2.5 px-3 rounded-xl border border-slate-300 hover:bg-slate-50 bg-white text-slate-700 text-xs font-bold flex items-center justify-center gap-1.5 transition cursor-pointer shadow-xs"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Foto Ulang</span>
            </motion.button>

            <motion.button
              type="button"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.96 }}
              onClick={handleConfirm}
              disabled={isSubmitting}
              className="py-2.5 px-4 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white text-xs font-bold flex items-center justify-center gap-1.5 shadow-sm transition disabled:opacity-50 cursor-pointer"
            >
              {isSubmitting ? (
                <div className="flex items-center gap-1.5">
                  <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Menyimpan...</span>
                </div>
              ) : (
                <>
                  <Send className="w-3.5 h-3.5" />
                  <span>Kirim Presensi</span>
                </>
              )}
            </motion.button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
