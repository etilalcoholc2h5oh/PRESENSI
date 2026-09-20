import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  RefreshCw,
  Search,
  Eye,
  Trash2,
  Edit2,
  X,
  ChevronLeft,
  ChevronRight,
  Database,
  Copy,
  Check,
  AlertTriangle,
  Clock,
  MapPin,
  Camera,
  FileText,
  User,
} from 'lucide-react';
import { AttendanceRecord, AttendanceStatus } from '../types';
import { CLASSES, MADRASAH_INFO } from '../data/madrasahData';
import { exportToExcel, exportToPdf } from '../services/exportService';
import {
  updateRecordStatus,
  deleteRecord,
  getStoredConfig,
  saveSupabaseConfig,
  SUPABASE_SQL_SCHEMA,
} from '../services/supabaseService';

interface AdminDashboardProps {
  records: AttendanceRecord[];
  isCloudConnected: boolean;
  onRefreshData: () => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  records,
  isCloudConnected,
  onRefreshData,
}) => {
  // Filters State
  const [dateRangeStart, setDateRangeStart] = useState<string>('');
  const [dateRangeEnd, setDateRangeEnd] = useState<string>('');
  const [selectedClass, setSelectedClass] = useState<string>('');
  const [selectedPrayer, setSelectedPrayer] = useState<string>('');
  const [selectedStatus, setSelectedStatus] = useState<string>('');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Snapshot Modal
  const [viewPhotoRecord, setViewPhotoRecord] = useState<AttendanceRecord | null>(null);

  // Edit Status Modal
  const [editRecord, setEditRecord] = useState<AttendanceRecord | null>(null);
  const [newStatus, setNewStatus] = useState<AttendanceStatus>('Hadir');
  const [editNotes, setEditNotes] = useState<string>('');

  // Delete Confirmation Modal State
  const [deleteConfirmRecord, setDeleteConfirmRecord] = useState<{ id: string; name: string } | null>(null);
  const [isDeleting, setIsDeleting] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<{ text: string; type: 'success' | 'error' } | null>(null);

  const showToast = (text: string, type: 'success' | 'error' = 'success') => {
    setToastMessage({ text, type });
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  // Supabase Cloud Modal State
  const [supabaseModalOpen, setSupabaseModalOpen] = useState(false);
  const [supabaseUrl, setSupabaseUrl] = useState('');
  const [supabaseKey, setSupabaseKey] = useState('');
  const [copiedSql, setCopiedSql] = useState(false);
  const [savingConfig, setSavingConfig] = useState(false);
  const [configMsg, setConfigMsg] = useState<{ text: string; isError: boolean } | null>(null);

  const handleOpenSupabaseModal = () => {
    const current = getStoredConfig();
    setSupabaseUrl(current.url || '');
    setSupabaseKey(current.anonKey || '');
    setConfigMsg(null);
    setSupabaseModalOpen(true);
  };

  const handleSaveSupabase = async () => {
    setSavingConfig(true);
    setConfigMsg(null);
    try {
      const res = await saveSupabaseConfig(supabaseUrl, supabaseKey);
      setConfigMsg({ text: res.message, isError: !res.success });
      if (res.success) {
        onRefreshData();
      }
    } catch (e: any) {
      setConfigMsg({ text: e.message || 'Gagal menghubungkan Supabase', isError: true });
    } finally {
      setSavingConfig(false);
    }
  };

  const handleCopySql = () => {
    navigator.clipboard.writeText(SUPABASE_SQL_SCHEMA);
    setCopiedSql(true);
    setTimeout(() => setCopiedSql(false), 2500);
  };

  const applyDatePreset = (days: number) => {
    const end = new Date();
    const start = new Date();
    start.setDate(end.getDate() - days);
    setDateRangeEnd(end.toISOString().slice(0, 10));
    setDateRangeStart(start.toISOString().slice(0, 10));
  };

  const resetFilters = () => {
    setDateRangeStart('');
    setDateRangeEnd('');
    setSelectedClass('');
    setSelectedPrayer('');
    setSelectedStatus('');
    setSearchQuery('');
  };

  // Filter Data
  const filteredRecords = useMemo(() => {
    return records.filter((rec) => {
      const recDate = new Date(rec.created_at).toISOString().slice(0, 10);
      if (dateRangeStart && recDate < dateRangeStart) return false;
      if (dateRangeEnd && recDate > dateRangeEnd) return false;
      if (selectedClass && rec.class !== selectedClass) return false;
      if (selectedPrayer && rec.prayer_type !== selectedPrayer) return false;
      if (selectedStatus && rec.status !== selectedStatus) return false;
      if (searchQuery) {
        const q = searchQuery.toLowerCase();
        const matchName = rec.name.toLowerCase().includes(q);
        const matchClass = rec.class.toLowerCase().includes(q);
        const matchNotes = (rec.notes || '').toLowerCase().includes(q);
        if (!matchName && !matchClass && !matchNotes) return false;
      }
      return true;
    });
  }, [records, dateRangeStart, dateRangeEnd, selectedClass, selectedPrayer, selectedStatus, searchQuery]);

  // Statistics
  const stats = useMemo(() => {
    const total = filteredRecords.length;
    const hadir = filteredRecords.filter((r) => r.status === 'Hadir').length;
    const haid = filteredRecords.filter((r) => r.status === "Halangan Syar'i").length;
    const sakit = filteredRecords.filter((r) => r.status === 'Sakit' || r.status === 'Izin').length;
    const rate = total > 0 ? Math.round((hadir / total) * 100) : 0;
    return { total, hadir, haid, sakit, rate };
  }, [filteredRecords]);

  // Pagination for 1,000+ students scale
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(25);

  useEffect(() => {
    setCurrentPage(1);
  }, [dateRangeStart, dateRangeEnd, selectedClass, selectedPrayer, selectedStatus, searchQuery, pageSize]);

  const totalPages = Math.max(1, Math.ceil(filteredRecords.length / pageSize));
  const paginatedRecords = useMemo(() => {
    const startIdx = (currentPage - 1) * pageSize;
    return filteredRecords.slice(startIdx, startIdx + pageSize);
  }, [filteredRecords, currentPage, pageSize]);

  const getFilterSummary = () => {
    let summary = 'Semua Periode';
    if (dateRangeStart && dateRangeEnd) {
      summary = `${dateRangeStart} s/d ${dateRangeEnd}`;
    } else if (dateRangeStart) {
      summary = `Mulai ${dateRangeStart}`;
    }
    if (selectedClass) summary += ` | Kelas: ${selectedClass}`;
    if (selectedPrayer) summary += ` | Sholat: ${selectedPrayer}`;
    return summary;
  };

  const handleExportExcel = () => {
    exportToExcel(filteredRecords, getFilterSummary());
  };

  const handleExportPdf = () => {
    exportToPdf(filteredRecords, getFilterSummary());
  };

  const handleSaveStatusEdit = async () => {
    if (!editRecord) return;
    await updateRecordStatus(editRecord.id, newStatus, editNotes);
    setEditRecord(null);
    showToast('Status presensi berhasil diperbarui', 'success');
    onRefreshData();
  };

  const promptDeleteRecord = (id: string, name: string) => {
    setDeleteConfirmRecord({ id, name });
  };

  const confirmDeleteRecord = async () => {
    if (!deleteConfirmRecord) return;
    setIsDeleting(true);
    try {
      await deleteRecord(deleteConfirmRecord.id);
      showToast(`Data presensi "${deleteConfirmRecord.name}" berhasil dihapus`, 'success');
      setDeleteConfirmRecord(null);
      onRefreshData();
    } catch (err: any) {
      showToast('Gagal menghapus data: ' + (err?.message || 'Kesalahan sistem'), 'error');
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Toast Notification Banner */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            className={`fixed top-4 right-4 z-50 px-4 py-3 rounded-2xl shadow-lg border text-xs font-bold flex items-center gap-2 ${
              toastMessage.type === 'error'
                ? 'bg-rose-50 border-rose-200 text-rose-800'
                : 'bg-emerald-50 border-emerald-200 text-emerald-900'
            }`}
          >
            {toastMessage.type === 'error' ? (
              <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0" />
            ) : (
              <Check className="w-4 h-4 text-emerald-600 shrink-0" />
            )}
            <span>{toastMessage.text}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Top Banner & Action Controls */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-2 border-b border-slate-200">
        <div>
          <h2 className="text-lg sm:text-xl font-black text-slate-900 tracking-tight">
            Dashboard Rekapitulasi Ibadah
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Audit presensi ibadah harian siswa terverifikasi AI dan geofencing GPS
          </p>
        </div>

        {/* Buttons: Export Excel, Print PDF, Refresh */}
        <div className="no-print flex items-center flex-wrap gap-2">
          <motion.button
            type="button"
            whileHover={{ scale: 1.05, rotate: 180 }}
            whileTap={{ scale: 0.95 }}
            onClick={onRefreshData}
            className="p-2.5 bg-white hover:bg-slate-50 border border-slate-200 text-slate-600 rounded-2xl text-xs transition cursor-pointer shadow-xs"
            title="Muat ulang data"
          >
            <RefreshCw className="w-4 h-4 text-emerald-600" />
          </motion.button>
          <motion.button
            type="button"
            id="btn-export-excel"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={handleExportExcel}
            className="px-4 py-2 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white rounded-2xl text-xs font-bold transition shadow-xs cursor-pointer"
          >
            <span>Excel (.xlsx)</span>
          </motion.button>
          <motion.button
            type="button"
            id="btn-export-pdf"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={handleExportPdf}
            className="px-4 py-2 bg-white hover:bg-slate-50 border border-slate-300 text-slate-800 rounded-2xl text-xs font-bold transition shadow-xs cursor-pointer"
          >
            <span>Cetak PDF</span>
          </motion.button>
        </div>
      </div>

      {/* REKAPITULASI & AUDIT TRAIL */}
      <div className="space-y-5">
        {/* Printable Header (Only visible during print) */}
        <div className="hidden print-only text-center mb-6 text-black">
          <h1 className="text-xl font-bold uppercase">{MADRASAH_INFO.name}</h1>
          <p className="text-xs">{MADRASAH_INFO.address}</p>
          <div className="border-b-2 border-black my-2"></div>
          <h2 className="text-base font-bold underline">
            LAPORAN AUDIT PRESENSI SHOLAT SISWA
          </h2>
          <p className="text-xs mt-1">
            Dicetak pada: {new Date().toLocaleDateString('id-ID')} | Total Rekaman: {filteredRecords.length}
          </p>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-3 sm:gap-4">
          <motion.div
            className="bg-white border border-slate-200 p-4 rounded-3xl shadow-xs"
            whileHover={{ y: -3, scale: 1.02 }}
            transition={{ type: 'spring', stiffness: 350, damping: 20 }}
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-500">Total Absensi</span>
            </div>
            <div className="text-2xl font-black text-slate-900 mt-1">{stats.total}</div>
            <span className="text-[11px] text-slate-400">Data tersimpan</span>
          </motion.div>

          <motion.div
            className="bg-white border border-emerald-200/80 p-4 rounded-3xl shadow-xs"
            whileHover={{ y: -3, scale: 1.02 }}
            transition={{ type: 'spring', stiffness: 350, damping: 20 }}
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-emerald-700">Hadir Sholat</span>
            </div>
            <div className="text-2xl font-black text-emerald-600 mt-1">{stats.hadir}</div>
            <span className="text-[11px] text-emerald-600">Valid AI & GPS</span>
          </motion.div>

          <motion.div
            className="bg-white border border-rose-200/80 p-4 rounded-3xl shadow-xs"
            whileHover={{ y: -3, scale: 1.02 }}
            transition={{ type: 'spring', stiffness: 350, damping: 20 }}
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-rose-700">Halangan Syar'i</span>
            </div>
            <div className="text-2xl font-black text-rose-600 mt-1">{stats.haid}</div>
            <span className="text-[11px] text-rose-600">Dispensasi Siswi</span>
          </motion.div>

          <motion.div
            className="bg-white border border-amber-200/80 p-4 rounded-3xl shadow-xs"
            whileHover={{ y: -3, scale: 1.02 }}
            transition={{ type: 'spring', stiffness: 350, damping: 20 }}
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-amber-700">Sakit / Izin</span>
            </div>
            <div className="text-2xl font-black text-amber-600 mt-1">{stats.sakit}</div>
            <span className="text-[11px] text-amber-600">Keterangan Khusus</span>
          </motion.div>

          <motion.div
            className="bg-white border border-sky-200/80 p-4 rounded-3xl shadow-xs col-span-2 lg:col-span-1"
            whileHover={{ y: -3, scale: 1.02 }}
            transition={{ type: 'spring', stiffness: 350, damping: 20 }}
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-sky-700">Tingkat Hadir</span>
            </div>
            <div className="text-2xl font-black text-sky-600 mt-1">{stats.rate}%</div>
            <span className="text-[11px] text-sky-600">Disiplin Sholat</span>
          </motion.div>
        </div>

        {/* Filter Panel */}
        <motion.div
          className="no-print bg-white border border-slate-200 rounded-3xl p-4 sm:p-5 shadow-xs space-y-3"
          whileHover={{ y: -2 }}
          transition={{ type: 'spring', stiffness: 400, damping: 20 }}
        >
          <div className="flex flex-wrap items-center justify-between gap-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700">
              Filter Rekapitulasi Presensi
            </h4>
            {/* Quick Preset Buttons */}
            <div className="flex flex-wrap items-center gap-1.5 text-xs">
              <span className="text-slate-400 text-[11px]">Preset:</span>
              <button
                type="button"
                onClick={() => applyDatePreset(0)}
                className="px-2.5 py-1 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-[11px] font-medium transition cursor-pointer"
              >
                Hari Ini
              </button>
              <button
                type="button"
                onClick={() => applyDatePreset(7)}
                className="px-2.5 py-1 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-[11px] font-medium transition cursor-pointer"
              >
                7 Hari
              </button>
              <button
                type="button"
                onClick={() => applyDatePreset(30)}
                className="px-2.5 py-1 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-[11px] font-medium transition cursor-pointer"
              >
                1 Bulan
              </button>
              <button
                type="button"
                onClick={() => applyDatePreset(180)}
                className="px-2.5 py-1 rounded-xl bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 text-emerald-700 text-[11px] font-semibold transition cursor-pointer"
              >
                6 Bulan
              </button>
              <button
                type="button"
                onClick={resetFilters}
                className="px-2.5 py-1 rounded-xl text-emerald-700 hover:underline text-[11px] font-semibold ml-2 cursor-pointer"
              >
                Reset
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-3 text-xs">
            {/* Tanggal Mulai */}
            <div>
              <label className="block text-slate-600 font-bold mb-1">Dari Tanggal:</label>
              <input
                type="date"
                value={dateRangeStart}
                onChange={(e) => setDateRangeStart(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-slate-800 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              />
            </div>
            {/* Tanggal Sampai */}
            <div>
              <label className="block text-slate-600 font-bold mb-1">Sampai Tanggal:</label>
              <input
                type="date"
                value={dateRangeEnd}
                onChange={(e) => setDateRangeEnd(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-slate-800 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              />
            </div>
            {/* Filter Kelas */}
            <div>
              <label className="block text-slate-600 font-bold mb-1">Pilih Kelas:</label>
              <select
                value={selectedClass}
                onChange={(e) => setSelectedClass(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-slate-800 focus:ring-2 focus:ring-emerald-500 focus:outline-none cursor-pointer"
              >
                <option value="">Semua Kelas</option>
                {CLASSES.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>
            {/* Filter Sholat */}
            <div>
              <label className="block text-slate-600 font-bold mb-1">Jenis Sholat:</label>
              <select
                value={selectedPrayer}
                onChange={(e) => setSelectedPrayer(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-slate-800 focus:ring-2 focus:ring-emerald-500 focus:outline-none cursor-pointer"
              >
                <option value="">Semua Sholat</option>
                <option value="Dhuha">Dhuha</option>
                <option value="Dzuhur">Dzuhur</option>
                <option value="Sholat Jumat">Sholat Jumat</option>
              </select>
            </div>
            {/* Filter Status */}
            <div>
              <label className="block text-slate-600 font-bold mb-1">Status Kehadiran:</label>
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-slate-800 focus:ring-2 focus:ring-emerald-500 focus:outline-none cursor-pointer"
              >
                <option value="">Semua Status</option>
                <option value="Hadir">Hadir</option>
                <option value="Halangan Syar'i">Halangan Syar'i</option>
                <option value="Sakit">Sakit</option>
                <option value="Izin">Izin</option>
              </select>
            </div>
            {/* Pencarian Nama */}
            <div>
              <label className="block text-slate-600 font-bold mb-1">Cari Nama Siswa:</label>
              <div className="relative">
                <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
                <input
                  type="text"
                  placeholder="Ketik nama..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl pl-8 pr-3 py-2 text-slate-800 placeholder-slate-400 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                />
              </div>
            </div>
          </div>
        </motion.div>

        {/* Mobile View: Tampilan Kartu Rekapitulasi Rapi & Responsif (Khusus Layar HP < md) */}
        <div className="block md:hidden space-y-3">
          {filteredRecords.length === 0 ? (
            <div className="bg-white border border-slate-200 rounded-2xl p-8 text-center text-slate-400 text-xs shadow-xs">
              Tidak ada data presensi yang cocok dengan filter.
            </div>
          ) : (
            paginatedRecords.map((rec) => {
              const d = new Date(rec.created_at);
              const dateStr = d.toLocaleDateString('id-ID', { day: '2-digit', month: 'short', year: 'numeric' });
              const timeStr = d.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' });

              let badgeColor = 'bg-emerald-50 text-emerald-800 border-emerald-200';
              if (rec.status === "Halangan Syar'i") {
                badgeColor = 'bg-rose-50 text-rose-800 border-rose-200';
              } else if (rec.status === 'Sakit' || rec.status === 'Izin') {
                badgeColor = 'bg-amber-50 text-amber-800 border-amber-200';
              }

              return (
                <div
                  key={rec.id}
                  className="bg-white border border-slate-200 rounded-2xl p-3.5 shadow-xs flex flex-col gap-3 transition hover:border-slate-300"
                >
                  {/* Header Kartu: Siswa, Waktu & Sholat */}
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h4 className="font-bold text-slate-900 text-sm leading-tight">{rec.name}</h4>
                      <div className="flex items-center gap-2 mt-1 text-[11px] text-slate-500">
                        <span className="font-semibold text-slate-700 bg-slate-100 px-2 py-0.5 rounded-md">
                          {rec.class}
                        </span>
                        <span className="flex items-center gap-1 font-mono">
                          <Clock className="w-3 h-3 text-slate-400" />
                          {dateStr}, {timeStr}
                        </span>
                      </div>
                    </div>

                    <div className="flex flex-col items-end gap-1 shrink-0">
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wide bg-emerald-100/70 text-emerald-800 border border-emerald-200">
                        {rec.prayer_type}
                      </span>
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${badgeColor}`}>
                        {rec.status}
                      </span>
                    </div>
                  </div>

                  {/* Body Kartu: Bukti Foto, GPS, Catatan */}
                  <div className="grid grid-cols-2 gap-2 bg-slate-50/70 rounded-xl p-2.5 border border-slate-100 text-[11px]">
                    {/* Bukti Foto */}
                    <div className="flex items-center gap-2">
                      {rec.snapshot_photo ? (
                        <button
                          type="button"
                          onClick={() => setViewPhotoRecord(rec)}
                          className="flex items-center gap-1.5 text-left group cursor-pointer"
                        >
                          <img
                            src={rec.snapshot_photo}
                            alt="Bukti"
                            className="w-10 h-10 rounded-lg object-cover border border-slate-200 bg-white group-hover:ring-2 group-hover:ring-emerald-500 transition shadow-2xs shrink-0"
                          />
                          <div className="overflow-hidden">
                            <span className="text-[10px] text-emerald-700 font-bold block group-hover:underline flex items-center gap-1">
                              <Eye className="w-3 h-3" /> Foto
                            </span>
                            <span className="text-[9px] text-slate-400 block truncate">{rec.ai_status || 'OK'}</span>
                          </div>
                        </button>
                      ) : (
                        <div className="flex items-center gap-1.5 text-slate-400 italic text-[10px]">
                          <Camera className="w-3.5 h-3.5 text-slate-300" />
                          <span>{rec.ai_status || 'Tanpa Foto'}</span>
                        </div>
                      )}
                    </div>

                    {/* Lokasi GPS */}
                    <div className="flex items-start gap-1.5">
                      <MapPin
                        className={`w-3.5 h-3.5 shrink-0 mt-0.5 ${
                          rec.gps_status.includes('Valid') ? 'text-emerald-600' : 'text-rose-500'
                        }`}
                      />
                      <div className="overflow-hidden">
                        <span
                          className={`font-bold block truncate text-[10px] ${
                            rec.gps_status.includes('Valid') ? 'text-emerald-700' : 'text-rose-600'
                          }`}
                        >
                          {rec.gps_status}
                        </span>
                        <span className="text-[9px] text-slate-400 block font-mono">
                          {rec.gps_distance ? `${rec.gps_distance}m` : '-'}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Keterangan Tambahan jika ada */}
                  {rec.notes && (
                    <div className="text-[11px] text-slate-600 bg-amber-50/50 border border-amber-200/50 rounded-lg px-2.5 py-1.5 flex items-start gap-1.5">
                      <FileText className="w-3.5 h-3.5 text-amber-600 shrink-0 mt-0.5" />
                      <span className="break-words line-clamp-2">{rec.notes}</span>
                    </div>
                  )}

                  {/* Footer Kartu: Tombol Aksi Guru */}
                  <div className="flex items-center justify-end gap-2 pt-1 border-t border-slate-100">
                    <button
                      type="button"
                      onClick={() => {
                        setEditRecord(rec);
                        setNewStatus(rec.status);
                        setEditNotes(rec.notes || '');
                      }}
                      className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold flex items-center gap-1.5 transition cursor-pointer"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                      <span>Ubah</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => promptDeleteRecord(rec.id, rec.name)}
                      className="px-3 py-1.5 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 text-xs font-semibold flex items-center gap-1.5 transition cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5 text-rose-600" />
                      <span>Hapus</span>
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Desktop View: Tabel Rekapitulasi Rapi & Lega (Layar md ke atas) */}
        <div className="hidden md:block bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead className="bg-slate-50 text-slate-700 uppercase tracking-wider border-b border-slate-200 text-[11px]">
                <tr>
                  <th className="py-3.5 px-4 font-bold whitespace-nowrap">Waktu</th>
                  <th className="py-3.5 px-4 font-bold whitespace-nowrap">Siswa & Kelas</th>
                  <th className="py-3.5 px-4 font-bold whitespace-nowrap">Sholat</th>
                  <th className="py-3.5 px-4 font-bold whitespace-nowrap">Status</th>
                  <th className="py-3.5 px-4 font-bold whitespace-nowrap">Bukti Foto / AI</th>
                  <th className="py-3.5 px-4 font-bold whitespace-nowrap">Lokasi GPS</th>
                  <th className="py-3.5 px-4 font-bold">Keterangan</th>
                  <th className="py-3.5 px-4 font-bold no-print text-right whitespace-nowrap">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                {filteredRecords.length === 0 ? (
                  <tr>
                    <td colSpan={8} className="py-12 text-center text-slate-400">
                      Tidak ada data presensi yang cocok dengan filter.
                    </td>
                  </tr>
                ) : (
                  paginatedRecords.map((rec) => {
                    const d = new Date(rec.created_at);
                    const timeStr =
                      d.toLocaleDateString('id-ID', { day: '2-digit', month: 'short' }) +
                      ' ' +
                      d.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' });

                    let badgeColor = 'bg-emerald-50 text-emerald-700 border-emerald-200';
                    if (rec.status === "Halangan Syar'i") {
                      badgeColor = 'bg-rose-50 text-rose-700 border-rose-200';
                    } else if (rec.status === 'Sakit' || rec.status === 'Izin') {
                      badgeColor = 'bg-amber-50 text-amber-700 border-amber-200';
                    }

                    return (
                      <tr key={rec.id} className="hover:bg-slate-50/80 transition">
                        {/* Waktu */}
                        <td className="py-3.5 px-4 whitespace-nowrap text-slate-500 font-mono text-[11px]">
                          {timeStr}
                        </td>

                        {/* Nama & Kelas */}
                        <td className="py-3.5 px-4">
                          <div className="font-bold text-slate-900 text-xs sm:text-sm">{rec.name}</div>
                          <div className="text-[11px] text-slate-500 font-medium">{rec.class}</div>
                        </td>

                        {/* Sholat */}
                        <td className="py-3.5 px-4 whitespace-nowrap">
                          <span className="font-bold text-emerald-700">{rec.prayer_type}</span>
                        </td>

                        {/* Status */}
                        <td className="py-3.5 px-4 whitespace-nowrap">
                          <span
                            className={`px-2.5 py-1 rounded-full text-[11px] font-bold border ${badgeColor}`}
                          >
                            {rec.status}
                          </span>
                        </td>

                        {/* Foto / AI */}
                        <td className="py-3.5 px-4 whitespace-nowrap">
                          {rec.snapshot_photo ? (
                            <button
                              type="button"
                              onClick={() => setViewPhotoRecord(rec)}
                              className="group flex items-center gap-2.5 text-left hover:opacity-80 cursor-pointer"
                            >
                              <img
                                src={rec.snapshot_photo}
                                alt="Bukti"
                                className="w-10 h-10 rounded-xl object-cover border border-slate-200 bg-slate-100 group-hover:ring-2 group-hover:ring-emerald-500 transition shadow-2xs"
                              />
                              <div>
                                <div className="text-[11px] text-emerald-700 font-bold flex items-center gap-1 group-hover:underline">
                                  <Eye className="w-3 h-3" /> Lihat Foto
                                </div>
                                <div className="text-[10px] text-slate-500">{rec.ai_status}</div>
                              </div>
                            </button>
                          ) : (
                            <span className="text-slate-400 text-[11px] italic">
                              {rec.ai_status || 'Tanpa Foto'}
                            </span>
                          )}
                        </td>

                        {/* Lokasi GPS */}
                        <td className="py-3.5 px-4 whitespace-nowrap">
                          <div
                            className={`text-[11px] font-bold ${
                              rec.gps_status.includes('Valid')
                                ? 'text-emerald-700'
                                : 'text-rose-600'
                            }`}
                          >
                            {rec.gps_status}
                          </div>
                          <div className="text-[10px] text-slate-400 font-mono">
                            {rec.gps_distance ? `${rec.gps_distance} meter` : '-'}
                          </div>
                        </td>

                        {/* Keterangan */}
                        <td className="py-3.5 px-4 text-slate-600 text-[11px] max-w-xs truncate font-medium">
                          {rec.notes || '-'}
                        </td>

                        {/* Aksi Guru */}
                        <td className="py-3.5 px-4 no-print text-right whitespace-nowrap">
                          <div className="flex items-center justify-end gap-1.5">
                            <motion.button
                              type="button"
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              onClick={() => {
                                setEditRecord(rec);
                                setNewStatus(rec.status);
                                setEditNotes(rec.notes || '');
                              }}
                              className="p-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition cursor-pointer shadow-2xs"
                              title="Ubah Status Manual"
                            >
                              <Edit2 className="w-3.5 h-3.5" />
                            </motion.button>
                            <motion.button
                              type="button"
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              onClick={() => promptDeleteRecord(rec.id, rec.name)}
                              className="p-1.5 rounded-xl bg-rose-50 hover:bg-rose-100 border border-rose-200 text-rose-600 transition cursor-pointer shadow-2xs"
                              title="Hapus Catatan"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </motion.button>
                          </div>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Pagination & Scale Info Bar for 1,000+ Students */}
        {filteredRecords.length > 0 && (
          <div className="no-print bg-white border border-slate-200 rounded-3xl p-3.5 sm:px-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-600 shadow-xs">
            <div className="flex items-center gap-1.5 flex-wrap">
              <span>Menampilkan baris</span>
              <span className="font-bold text-slate-900">
                {(currentPage - 1) * pageSize + 1} - {Math.min(currentPage * pageSize, filteredRecords.length)}
              </span>
              <span>dari total</span>
              <span className="font-bold text-emerald-700">{filteredRecords.length}</span>
              <span>data presensi</span>
              <span className="text-[11px] text-slate-400 hidden md:inline-block">
                (Unduh Excel/PDF otomatis mencakup seluruh {filteredRecords.length} data)
              </span>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5">
                <span className="text-slate-400 text-[11px]">Tampilkan:</span>
                <select
                  value={pageSize}
                  onChange={(e) => setPageSize(Number(e.target.value))}
                  className="bg-slate-50 border border-slate-200 rounded-xl px-2 py-1 text-xs font-semibold text-slate-700 focus:outline-none cursor-pointer"
                >
                  <option value={25}>25 baris</option>
                  <option value={50}>50 baris</option>
                  <option value={100}>100 baris</option>
                  <option value={250}>250 baris</option>
                </select>
              </div>

              <div className="flex items-center gap-1">
                <button
                  type="button"
                  disabled={currentPage <= 1}
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  className="p-1.5 rounded-xl border border-slate-200 hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed transition text-slate-700 cursor-pointer"
                  title="Halaman Sebelumnya"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <span className="px-2 font-bold text-slate-800 text-xs">
                  {currentPage} / {totalPages}
                </span>
                <button
                  type="button"
                  disabled={currentPage >= totalPages}
                  onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                  className="p-1.5 rounded-xl border border-slate-200 hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed transition text-slate-700 cursor-pointer"
                  title="Halaman Selanjutnya"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Signature Block for Print / PDF */}
        <div className="hidden print-only mt-12 pt-8 text-black text-xs">
          <div className="grid grid-cols-2 gap-8 text-center">
            <div>
              <p>Mengetahui,</p>
              <p className="font-bold">Kepala Madrasah MAN 1 Boyolali</p>
              <div className="h-16"></div>
              <p className="font-bold underline">Drs. H. Mahsun Alwi, M.Ag.</p>
              <p>NIP. 19680512 199403 1 002</p>
            </div>
            <div>
              <p>Boyolali, {new Date().toLocaleDateString('id-ID')}</p>
              <p className="font-bold">Koordinator Pembina Keagamaan</p>
              <div className="h-16"></div>
              <p className="font-bold underline">Ustadz Muhammad Ilham, S.Pd.I.</p>
              <p>NIP. 19820315 200901 1 008</p>
            </div>
          </div>
        </div>
      </div>

      {/* MODAL VIEW SNAPSHOT PHOTO */}
      {viewPhotoRecord && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-fade-in"
          onClick={() => setViewPhotoRecord(null)}
        >
          <motion.div
            className="bg-white border border-slate-200 rounded-3xl max-w-lg w-full p-5 overflow-hidden shadow-2xl relative text-slate-800 space-y-3"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setViewPhotoRecord(null)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 p-1 rounded-xl hover:bg-slate-100 transition cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-2">
              <h4 className="text-sm font-extrabold text-slate-900">
                Bukti Foto Presensi: {viewPhotoRecord.name}
              </h4>
            </div>
            <div className="rounded-2xl overflow-hidden border border-slate-200 bg-slate-950 aspect-[3/4] max-w-[280px] mx-auto flex items-center justify-center shadow-md">
              <img
                src={viewPhotoRecord.snapshot_photo}
                alt={viewPhotoRecord.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200 text-xs space-y-1.5 text-slate-600 font-medium">
              <div className="flex justify-between">
                <span className="text-slate-500">Waktu:</span>
                <span className="font-mono text-slate-800">
                  {new Date(viewPhotoRecord.created_at).toLocaleString('id-ID')}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Kelas & Sholat:</span>
                <span className="font-bold text-emerald-700">
                  {viewPhotoRecord.class} | {viewPhotoRecord.prayer_type}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Verifikasi AI:</span>
                <span className="font-semibold text-slate-800">{viewPhotoRecord.ai_status}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Lokasi GPS:</span>
                <span className="font-semibold text-slate-800">
                  {viewPhotoRecord.gps_status} ({viewPhotoRecord.gps_distance || 0}m)
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      )}

      {/* MODAL EDIT STATUS SISWA OLEH GURU */}
      {editRecord && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-fade-in">
          <motion.div
            className="bg-white border border-slate-200 rounded-3xl max-w-sm w-full p-5 shadow-2xl space-y-4 text-slate-800"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
          >
            <div>
              <h3 className="text-sm font-extrabold text-slate-900">Koreksi Status Presensi</h3>
              <p className="text-xs text-slate-500 mt-0.5 font-medium">
                {editRecord.name} ({editRecord.class}) - {editRecord.prayer_type}
              </p>
            </div>
            <div className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-700 font-bold mb-1">Status Kehadiran:</label>
                <select
                  value={newStatus}
                  onChange={(e) => setNewStatus(e.target.value as AttendanceStatus)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-slate-800 focus:ring-2 focus:ring-emerald-500 focus:outline-none cursor-pointer"
                >
                  <option value="Hadir">Hadir</option>
                  <option value="Halangan Syar'i">Halangan Syar'i</option>
                  <option value="Sakit">Sakit</option>
                  <option value="Izin">Izin</option>
                </select>
              </div>
              <div>
                <label className="block text-slate-700 font-bold mb-1">
                  Catatan Guru (Opsional):
                </label>
                <textarea
                  rows={3}
                  value={editNotes}
                  onChange={(e) => setEditNotes(e.target.value)}
                  placeholder="Alasan koreksi status..."
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl p-3 text-slate-800 placeholder-slate-400 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                />
              </div>
            </div>
            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setEditRecord(null)}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:text-slate-900 cursor-pointer"
              >
                Batal
              </button>
              <button
                type="button"
                onClick={handleSaveStatusEdit}
                className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-xs cursor-pointer"
              >
                Simpan Perubahan
              </button>
            </div>
          </motion.div>
        </div>
      )}

      {/* MODAL KONEKSI SUPABASE CLOUD (GRATIS) */}
      {supabaseModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-fade-in">
          <motion.div
            className="bg-white border border-slate-200 rounded-3xl max-w-lg w-full p-6 shadow-2xl space-y-4 text-slate-800 relative"
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
          >
            <button
              type="button"
              onClick={() => setSupabaseModalOpen(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 p-1.5 rounded-xl hover:bg-slate-100 transition cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2.5">
              <div className="p-2.5 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-700">
                <Database className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-extrabold text-slate-900">
                  Koneksi Database Supabase Cloud
                </h3>
                <p className="text-xs text-slate-500 font-medium">
                  Free Tier (100% Gratis) • Mendukung 1.000+ Siswa MAN 1 Boyolali
                </p>
              </div>
            </div>

            <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200 text-xs space-y-2 text-slate-600">
              <div className="flex items-center justify-between">
                <span className="font-bold text-slate-700">Status Saat Ini:</span>
                <span
                  className={`px-2.5 py-0.5 rounded-full font-bold text-[11px] ${
                    isCloudConnected
                      ? 'bg-emerald-100 text-emerald-800'
                      : 'bg-amber-100 text-amber-800'
                  }`}
                >
                  {isCloudConnected ? '✓ Terhubung ke Supabase' : 'Mode Server Lokal Aktif'}
                </span>
              </div>
              <p className="text-[11px] leading-relaxed text-slate-500">
                Dengan Supabase Cloud gratis, semua siswa dari HP masing-masing dapat langsung mengirim presensi dan otomatis tersinkron ke Dashboard Guru secara real-time.
              </p>
            </div>

            {configMsg && (
              <div
                className={`p-3 rounded-2xl text-xs font-semibold ${
                  configMsg.isError
                    ? 'bg-rose-50 border border-rose-200 text-rose-700'
                    : 'bg-emerald-50 border border-emerald-200 text-emerald-700'
                }`}
              >
                {configMsg.text}
              </div>
            )}

            <div className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-700 font-bold mb-1">
                  Supabase Project URL:
                </label>
                <input
                  type="text"
                  placeholder="https://xyzabcdefghijklmnop.supabase.co"
                  value={supabaseUrl}
                  onChange={(e) => setSupabaseUrl(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-slate-800 font-mono text-xs focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-bold mb-1">
                  Supabase Project API Key (anon / public):
                </label>
                <input
                  type="password"
                  placeholder="eyJhbGciOiJIUzI1NiIsInR5cCI6..."
                  value={supabaseKey}
                  onChange={(e) => setSupabaseKey(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-slate-800 font-mono text-xs focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                />
              </div>

              {/* Tombol Salin SQL */}
              <div className="pt-1 flex items-center justify-between p-2.5 bg-emerald-50/70 border border-emerald-200/80 rounded-2xl">
                <div className="text-[11px] text-emerald-900 font-medium">
                  Belum buat tabel di Supabase? Salin skrip SQL otomatis:
                </div>
                <button
                  type="button"
                  onClick={handleCopySql}
                  className="shrink-0 px-3 py-1.5 rounded-xl bg-white hover:bg-emerald-100 border border-emerald-300 text-emerald-800 text-[11px] font-bold transition flex items-center gap-1.5 cursor-pointer shadow-2xs"
                >
                  {copiedSql ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Tersalin!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Salin SQL</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setSupabaseModalOpen(false)}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:text-slate-900 cursor-pointer"
              >
                Tutup
              </button>
              {isCloudConnected && (
                <button
                  type="button"
                  onClick={() => {
                    setSupabaseUrl('');
                    setSupabaseKey('');
                    handleSaveSupabase();
                  }}
                  className="px-3.5 py-2 rounded-xl border border-rose-200 text-rose-600 hover:bg-rose-50 text-xs font-semibold cursor-pointer"
                >
                  Putuskan
                </button>
              )}
              <button
                type="button"
                onClick={handleSaveSupabase}
                disabled={savingConfig}
                className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-xs cursor-pointer flex items-center gap-1.5"
              >
                {savingConfig && <RefreshCw className="w-3.5 h-3.5 animate-spin" />}
                <span>Simpan & Sambungkan</span>
              </button>
            </div>
          </motion.div>
        </div>
      )}

      {/* Modal Konfirmasi Hapus Data Presensi Kustom (Aman & Tidak Terblokir oleh Browser/iFrame) */}
      <AnimatePresence>
        {deleteConfirmRecord && (
          <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
            <motion.div
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.92, opacity: 0 }}
              className="bg-white rounded-3xl p-6 max-w-sm w-full shadow-2xl border border-slate-100 flex flex-col items-center text-center space-y-4"
            >
              <div className="w-14 h-14 rounded-2xl bg-rose-50 border border-rose-100 flex items-center justify-center text-rose-600 shadow-inner">
                <Trash2 className="w-7 h-7" />
              </div>

              <div>
                <h3 className="text-base font-black text-slate-900">Hapus Catatan Presensi?</h3>
                <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">
                  Apakah Anda yakin ingin menghapus catatan presensi untuk siswa{' '}
                  <span className="font-bold text-slate-800">"{deleteConfirmRecord.name}"</span>?
                  Data uji coba yang dihapus tidak dapat dipulihkan kembali.
                </p>
              </div>

              <div className="flex items-center gap-2.5 w-full pt-2">
                <button
                  type="button"
                  disabled={isDeleting}
                  onClick={() => setDeleteConfirmRecord(null)}
                  className="flex-1 py-2.5 px-4 rounded-xl border border-slate-200 text-slate-700 text-xs font-semibold hover:bg-slate-50 transition cursor-pointer disabled:opacity-50"
                >
                  Batal
                </button>
                <button
                  type="button"
                  disabled={isDeleting}
                  onClick={confirmDeleteRecord}
                  className="flex-1 py-2.5 px-4 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold shadow-xs transition cursor-pointer disabled:opacity-50 flex items-center justify-center gap-1.5"
                >
                  {isDeleting ? (
                    <>
                      <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                      <span>Menghapus...</span>
                    </>
                  ) : (
                    <>
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Ya, Hapus</span>
                    </>
                  )}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
