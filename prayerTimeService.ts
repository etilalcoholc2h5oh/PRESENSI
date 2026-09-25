import { PrayerType, AttendanceStatus, AttendanceRecord } from '../types';

export interface PrayerSchedule {
  prayer: PrayerType;
  startTime: string; // 'HH:mm' 24 jam format WIB
  endTime: string;   // 'HH:mm' 24 jam format WIB
  label: string;
}

export const DEFAULT_PRAYER_SCHEDULES: Record<PrayerType, PrayerSchedule> = {
  Dhuha: {
    prayer: 'Dhuha',
    startTime: '06:30',
    endTime: '08:30',
    label: '06:30 - 08:30 WIB',
  },
  Dzuhur: {
    prayer: 'Dzuhur',
    startTime: '11:30',
    endTime: '13:30',
    label: '11:30 - 13:30 WIB',
  },
  'Sholat Jumat': {
    prayer: 'Sholat Jumat',
    startTime: '11:15',
    endTime: '13:15',
    label: '11:15 - 13:15 WIB (Khusus Hari Jumat)',
  },
};

const SCHEDULE_STORAGE_KEY = 'man1_prayer_schedules';
const SIMULATE_TIME_KEY = 'man1_simulate_prayer_time';

export function getPrayerSchedules(): Record<PrayerType, PrayerSchedule> {
  try {
    const raw = localStorage.getItem(SCHEDULE_STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      return { ...DEFAULT_PRAYER_SCHEDULES, ...parsed };
    }
  } catch (e) {
    console.warn('Error reading prayer schedules:', e);
  }
  return DEFAULT_PRAYER_SCHEDULES;
}

export function savePrayerSchedules(schedules: Record<PrayerType, PrayerSchedule>): void {
  localStorage.setItem(SCHEDULE_STORAGE_KEY, JSON.stringify(schedules));
}

export function isTimeSimulationMode(): boolean {
  return localStorage.getItem(SIMULATE_TIME_KEY) === 'true';
}

export function setTimeSimulationMode(enabled: boolean): void {
  localStorage.setItem(SIMULATE_TIME_KEY, enabled ? 'true' : 'false');
}

/**
 * Cek apakah waktu tertentu berada dalam rentang jadwal sholat
 */
export function checkPrayerTime(
  prayer: PrayerType,
  targetDate: Date = new Date()
): {
  isWithinTime: boolean;
  schedule: PrayerSchedule;
  currentTimeStr: string;
  reason?: string;
} {
  const schedules = getPrayerSchedules();
  const schedule = schedules[prayer] || DEFAULT_PRAYER_SCHEDULES[prayer];

  // Jika mode simulasi aktif untuk keperluan demonstrasi/uji coba
  if (isTimeSimulationMode()) {
    return {
      isWithinTime: true,
      schedule,
      currentTimeStr: `${schedule.startTime} (Simulasi)`,
    };
  }

  const hours = targetDate.getHours();
  const minutes = targetDate.getMinutes();
  const currentMinutes = hours * 60 + minutes;
  const currentTimeStr = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;

  // Khusus Sholat Jumat, hanya berlaku di hari Jumat (5)
  if (prayer === 'Sholat Jumat') {
    const dayOfWeek = targetDate.getDay();
    if (dayOfWeek !== 5) {
      return {
        isWithinTime: false,
        schedule,
        currentTimeStr,
        reason: 'Sholat Jumat hanya berlaku di hari Jumat',
      };
    }
  }

  const [startH, startM] = schedule.startTime.split(':').map(Number);
  const [endH, endM] = schedule.endTime.split(':').map(Number);
  const startMinutes = startH * 60 + startM;
  const endMinutes = endH * 60 + endM;

  if (currentMinutes < startMinutes) {
    return {
      isWithinTime: false,
      schedule,
      currentTimeStr,
      reason: `Belum masuk waktu ${prayer} (Jadwal: ${schedule.startTime} - ${schedule.endTime} WIB)`,
    };
  }

  if (currentMinutes > endMinutes) {
    return {
      isWithinTime: false,
      schedule,
      currentTimeStr,
      reason: `Waktu ${prayer} telah selesai (Batas akhir: ${schedule.endTime} WIB)`,
    };
  }

  return {
    isWithinTime: true,
    schedule,
    currentTimeStr,
  };
}

export interface AttendanceEvaluation {
  isValid: boolean;
  isWithinTime: boolean;
  isWithinRadius: boolean;
  hasPhoto: boolean;
  finalStatus: AttendanceStatus;
  displayStatus: string;
  reasons: string[];
  notesText: string;
}

/**
 * Aturan Mutlak Keabsahan Presensi Sholat MAN 1 Boyolali:
 * 1. Harus dalam jam sholat (tidak boleh di luar jadwal)
 * 2. Harus dalam radius lokasi Mushola/Lapangan (tidak boleh di luar radius)
 * 3. Harus ada bukti foto selfie (tidak boleh tanpa foto)
 *
 * Pengecualian Syar'i / Izin:
 * - Status 'Halangan Syar'i' (Haid)
 * - Status 'Sakit' / 'Izin' (Dispensasi berhalangan)
 */
export function evaluateAttendanceRecord(record: {
  status: AttendanceStatus;
  prayer_type: PrayerType;
  gps_status?: string;
  gps_distance?: number;
  snapshot_photo?: string;
  created_at: string;
  notes?: string;
}): AttendanceEvaluation {
  // Pengecualian resmi: Halangan Syar'i atau Sakit/Izin
  if (record.status === "Halangan Syar'i") {
    return {
      isValid: true,
      isWithinTime: true,
      isWithinRadius: true,
      hasPhoto: true,
      finalStatus: "Halangan Syar'i",
      displayStatus: "Halangan Syar'i",
      reasons: [],
      notesText: record.notes || 'Dispensasi Halangan Syar\'i siswi',
    };
  }

  if (record.status === 'Sakit' || record.status === 'Izin') {
    return {
      isValid: true,
      isWithinTime: true,
      isWithinRadius: true,
      hasPhoto: true,
      finalStatus: record.status,
      displayStatus: record.status,
      reasons: [],
      notesText: record.notes || `Dispensasi berhalangan (${record.status})`,
    };
  }

  // 1. Cek Radius GPS
  const isOutsideRadius =
    record.status === 'Di Luar Radius' ||
    (record.gps_status && record.gps_status.toLowerCase().includes('luar')) ||
    (typeof record.gps_distance === 'number' && record.gps_distance > 250);
  const isWithinRadius = !isOutsideRadius;

  // 2. Cek Bukti Foto
  const hasPhoto = Boolean(
    record.snapshot_photo &&
    record.snapshot_photo.trim().length > 100 &&
    !record.snapshot_photo.includes('Tanpa Foto')
  );

  // 3. Cek Jam Sholat
  const recordDate = new Date(record.created_at);
  const timeCheck = checkPrayerTime(record.prayer_type, recordDate);
  const isWithinTime = timeCheck.isWithinTime;

  const reasons: string[] = [];
  if (!isWithinRadius) {
    const dist = record.gps_distance ? `${record.gps_distance}m` : 'Area luar';
    reasons.push(`Di Luar Radius (${dist})`);
  }
  if (!isWithinTime) {
    reasons.push(`Di Luar Jam Sholat (${timeCheck.currentTimeStr} WIB)`);
  }
  if (!hasPhoto) {
    reasons.push('Tanpa Foto Bukti');
  }

  const isValid = isWithinRadius && isWithinTime && hasPhoto;

  if (isValid) {
    return {
      isValid: true,
      isWithinTime: true,
      isWithinRadius: true,
      hasPhoto: true,
      finalStatus: 'Hadir',
      displayStatus: 'Hadir Sah',
      reasons: [],
      notesText: record.notes || `Hadir sholat ${record.prayer_type} berjamaah`,
    };
  }

  // Pelanggaran salah satu atau lebih dari 3 syarat
  let displayStatus = 'Tidak Sah';
  if (reasons.length === 1) {
    displayStatus = `Tidak Sah (${reasons[0].split(' (')[0]})`;
  } else if (reasons.length > 1) {
    displayStatus = `Tidak Sah (${reasons.length} Pelanggaran)`;
  }

  const notesDetail = `TIDAK SAH: ${reasons.join(', ')}. Wajib verifikasi guru pembina.`;

  return {
    isValid: false,
    isWithinTime,
    isWithinRadius,
    hasPhoto,
    finalStatus: 'Tidak Sah',
    displayStatus,
    reasons,
    notesText: record.notes && !record.notes.toLowerCase().includes('hadir sholat')
      ? `${notesDetail} [Catatan: ${record.notes}]`
      : notesDetail,
  };
}
