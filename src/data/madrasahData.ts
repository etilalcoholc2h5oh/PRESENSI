import { Student, AttendanceRecord, GeofenceConfig } from '../types';

export const MADRASAH_INFO = {
  name: 'MAN 1 Boyolali',
  subtitle: 'Madrasah Aliyah Negeri 1 Boyolali',
  motto: 'Mandiri Berprestasi, Religius & Berakhlakul Karimah',
  address: 'Jl. Kates No. 34, Siswodipuran, Kec. Boyolali, Kabupaten Boyolali, Jawa Tengah 57311',
};

// Lokasi Kompleks MAN 1 Boyolali (Jl. Kates No. 34, Siswodipuran - Ruang Kelas, Mushola, & Gedung Madrasah)
export const DEFAULT_GEOFENCE: GeofenceConfig = {
  latitude: -7.540982,
  longitude: 110.599143,
  radiusMeters: 600,
  locationName: 'MAN 1 Boyolali (Ruang Kelas & Fasilitas Madrasah)',
};

export const CLASSES = [
  // Kelas X (X A s.d. X J)
  'X A', 'X B', 'X C', 'X D', 'X E', 'X F', 'X G', 'X H', 'X I', 'X J',
  // Kelas XI (XI A s.d. XI J)
  'XI A', 'XI B', 'XI C', 'XI D', 'XI E', 'XI F', 'XI G', 'XI H', 'XI I', 'XI J',
  // Kelas XII (XII A s.d. XII J)
  'XII A', 'XII B', 'XII C', 'XII D', 'XII E', 'XII F', 'XII G', 'XII H', 'XII I', 'XII J',
];

export const PRAYER_TIME_CONFIG: Record<string, { startHour: number; startMinute: number; endHour: number; endMinute: number }> = {
  'Dhuha': { startHour: 6, startMinute: 55, endHour: 7, endMinute: 15 },
  'Dzuhur': { startHour: 11, startMinute: 40, endHour: 12, endMinute: 15 },
};

export const INITIAL_STUDENTS: Student[] = [
  // Kelas X A
  { id: 'S101', nisn: '0071234561', name: 'Ahmad Fauzi Rahman', class: 'X A', gender: 'L' },
  { id: 'S102', nisn: '0071234562', name: 'Aisyah Putri Azzahra', class: 'X A', gender: 'P' },
  { id: 'S103', nisn: '0071234563', name: 'Dimas Anggara Putra', class: 'X A', gender: 'L' },
  { id: 'S104', nisn: '0071234564', name: 'Fatimah Az-Zahra', class: 'X A', gender: 'P' },
  { id: 'S105', nisn: '0071234565', name: 'Reza Pratama Kusuma', class: 'X A', gender: 'L' },
  { id: 'S106', nisn: '0071234566', name: 'Zahra Salsabila', class: 'X A', gender: 'P' },

  // Kelas X B
  { id: 'S111', nisn: '0071234571', name: 'Muhammad Rizky Pratama', class: 'X B', gender: 'L' },
  { id: 'S112', nisn: '0071234572', name: 'Nabila Syifa Wardani', class: 'X B', gender: 'P' },
  { id: 'S113', nisn: '0071234573', name: 'Rian Hidayat', class: 'X B', gender: 'L' },
  { id: 'S114', nisn: '0071234574', name: 'Siti Rahmawati', class: 'X B', gender: 'P' },
  { id: 'S115', nisn: '0071234575', name: 'Yoga Saputra', class: 'X B', gender: 'L' },

  // Kelas XI A
  { id: 'S201', nisn: '0061234571', name: 'Bagas Surya Nugroho', class: 'XI A', gender: 'L' },
  { id: 'S202', nisn: '0061234572', name: 'Dewi Anjani Kusuma', class: 'XI A', gender: 'P' },
  { id: 'S203', nisn: '0061234573', name: 'Farhan Maulana Hakim', class: 'XI A', gender: 'L' },
  { id: 'S204', nisn: '0061234574', name: 'Kirana Maharani', class: 'XI A', gender: 'P' },
  { id: 'S205', nisn: '0061234575', name: 'Rafi Ahmad Fauzi', class: 'XI A', gender: 'L' },

  // Kelas XI B
  { id: 'S211', nisn: '0061234581', name: 'Abdullah Azzam Musyaffa', class: 'XI B', gender: 'L' },
  { id: 'S212', nisn: '0061234582', name: 'Salma Aulia Rahma', class: 'XI B', gender: 'P' },
  { id: 'S213', nisn: '0061234583', name: 'Ilham Ramadhan', class: 'XI B', gender: 'L' },
  { id: 'S214', nisn: '0061234584', name: 'Aura Nisa Salsabila', class: 'XI B', gender: 'P' },

  // Kelas XII A
  { id: 'S301', nisn: '0051234591', name: 'Daffa Raihan Al-Fatih', class: 'XII A', gender: 'L' },
  { id: 'S302', nisn: '0051234592', name: 'Fitri Handayani', class: 'XII A', gender: 'P' },
  { id: 'S303', nisn: '0051234593', name: 'Lukman Nur Hakim', class: 'XII A', gender: 'L' },
  { id: 'S304', nisn: '0051234594', name: 'Tia Amalia Putri', class: 'XII A', gender: 'P' },
  { id: 'S305', nisn: '0051234595', name: 'Zidan Al-Farisi', class: 'XII A', gender: 'L' },

  // Kelas XII B
  { id: 'S311', nisn: '0051234601', name: 'Rizki Maulana', class: 'XII B', gender: 'L' },
  { id: 'S312', nisn: '0051234602', name: 'Salsabila Zahra', class: 'XII B', gender: 'P' },
  { id: 'S313', nisn: '0051234603', name: 'Bintang Pratama', class: 'XII B', gender: 'L' },
];

export const DEMO_ATTENDANCE_RECORDS: AttendanceRecord[] = [
  {
    id: 'rec-001',
    name: 'Ahmad Fauzi Rahman',
    class: 'X A',
    prayer_type: 'Dhuha',
    status: 'Hadir',
    ai_status: 'Valid (Dual Camera: 94%)',
    ai_confidence: 94,
    gps_status: 'Valid (Dalam Radius)',
    gps_distance: 38,
    gps_coords: { latitude: -7.53608, longitude: 110.59626 },
    snapshot_photo: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="320" height="240" viewBox="0 0 320 240"><rect width="320" height="240" fill="%23f1f5f9"/><circle cx="160" cy="90" r="40" fill="%23059669" opacity="0.4"/><rect x="110" y="140" width="100" height="80" rx="20" fill="%23059669" opacity="0.4"/><rect x="80" y="30" width="160" height="180" fill="none" stroke="%23059669" stroke-width="3"/><text x="85" y="55" fill="%23059669" font-size="14" font-family="sans-serif">Person: 94%</text><text x="160" y="230" fill="%23475569" font-size="12" font-family="sans-serif" text-anchor="middle">Ahmad Fauzi - Dhuha</text></svg>',
    notes: 'Presensi Sholat Dhuha Berjamaah',
    created_at: new Date(Date.now() - 3600000 * 4).toISOString(),
  },
  {
    id: 'rec-002',
    name: 'Aisyah Putri Azzahra',
    class: 'X A',
    prayer_type: 'Dhuha',
    status: "Halangan Syar'i",
    ai_status: "Bypass Syar'i",
    gps_status: 'Valid (Dalam Radius)',
    gps_distance: 45,
    gps_coords: { latitude: -7.53609, longitude: 110.59625 },
    notes: 'Halangan bulanan (Haid) hari ke-2',
    created_at: new Date(Date.now() - 3600000 * 3.8).toISOString(),
  },
  {
    id: 'rec-003',
    name: 'Bagas Surya Nugroho',
    class: 'XI A',
    prayer_type: 'Dzuhur',
    status: 'Hadir',
    ai_status: 'Valid (Dual Camera: 91%)',
    ai_confidence: 91,
    gps_status: 'Valid (Dalam Radius)',
    gps_distance: 52,
    gps_coords: { latitude: -7.53604, longitude: 110.59628 },
    snapshot_photo: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="320" height="240" viewBox="0 0 320 240"><rect width="320" height="240" fill="%23f1f5f9"/><circle cx="160" cy="90" r="40" fill="%230284c7" opacity="0.4"/><rect x="110" y="140" width="100" height="80" rx="20" fill="%230284c7" opacity="0.4"/><rect x="80" y="30" width="160" height="180" fill="none" stroke="%23059669" stroke-width="3"/><text x="85" y="55" fill="%23059669" font-size="14" font-family="sans-serif">Person: 91%</text><text x="160" y="230" fill="%23475569" font-size="12" font-family="sans-serif" text-anchor="middle">Bagas Surya - Dzuhur</text></svg>',
    notes: 'Presensi Dzuhur',
    created_at: new Date(Date.now() - 3600000 * 2).toISOString(),
  },
  {
    id: 'rec-004',
    name: 'Dewi Anjani Kusuma',
    class: 'XI A',
    prayer_type: 'Dzuhur',
    status: 'Sakit',
    ai_status: 'Bypass Sakit/Izin',
    gps_status: 'Di Luar Radius',
    gps_distance: 2400,
    notes: 'Izin di UKS istirahat karena demam',
    created_at: new Date(Date.now() - 3600000 * 1.5).toISOString(),
  },
  {
    id: 'rec-005',
    name: 'Daffa Raihan Al-Fatih',
    class: 'XII A',
    prayer_type: 'Sholat Jumat',
    status: 'Hadir',
    ai_status: 'Valid (Dual Camera: 96%)',
    ai_confidence: 96,
    gps_status: 'Valid (Dalam Radius)',
    gps_distance: 22,
    gps_coords: { latitude: -7.53606, longitude: 110.59624 },
    snapshot_photo: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="320" height="240" viewBox="0 0 320 240"><rect width="320" height="240" fill="%23f1f5f9"/><circle cx="160" cy="90" r="40" fill="%23059669" opacity="0.4"/><rect x="110" y="140" width="100" height="80" rx="20" fill="%23059669" opacity="0.4"/><rect x="80" y="30" width="160" height="180" fill="none" stroke="%23059669" stroke-width="3"/><text x="85" y="55" fill="%23059669" font-size="14" font-family="sans-serif">Person: 96%</text><text x="160" y="230" fill="%23475569" font-size="12" font-family="sans-serif" text-anchor="middle">Daffa Raihan - Sholat Jumat</text></svg>',
    notes: 'Presensi sah di area radius madrasah.',
    created_at: new Date(Date.now() - 86400000 * 7).toISOString(),
  },
  {
    id: 'rec-006',
    name: 'Abdullah Azzam Musyaffa',
    class: 'XI B',
    prayer_type: 'Dhuha',
    status: 'Hadir',
    ai_status: 'Valid (Dual Camera: 93%)',
    ai_confidence: 93,
    gps_status: 'Valid (Dalam Radius)',
    gps_distance: 60,
    gps_coords: { latitude: -7.53605, longitude: 110.59625 },
    snapshot_photo: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="320" height="240" viewBox="0 0 320 240"><rect width="320" height="240" fill="%23f1f5f9"/><circle cx="160" cy="90" r="40" fill="%23059669" opacity="0.4"/><rect x="110" y="140" width="100" height="80" rx="20" fill="%23059669" opacity="0.4"/><rect x="80" y="30" width="160" height="180" fill="none" stroke="%23059669" stroke-width="3"/><text x="85" y="55" fill="%23059669" font-size="14" font-family="sans-serif">Person: 93%</text><text x="160" y="230" fill="%23475569" font-size="12" font-family="sans-serif" text-anchor="middle">Abdullah - Dhuha</text></svg>',
    notes: 'Hadir tepat waktu',
    created_at: new Date(Date.now() - 86400000 * 30).toISOString(),
  },
];
