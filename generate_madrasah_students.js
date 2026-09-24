const fs = require('fs');

const classes = [
  // Kelas X
  'X A', 'X B', 'X C', 'X D', 'X E', 'X F', 'X G', 'X H', 'X I', 'X J',
  // Kelas XI
  'XI A', 'XI B', 'XI C', 'XI D', 'XI E', 'XI F', 'XI G', 'XI H', 'XI I', 'XI J',
  // Kelas XII
  'XII A', 'XII B', 'XII C', 'XII D', 'XII E', 'XII F', 'XII G', 'XII H', 'XII I', 'XII J'
];

const firstNamesMale = [
  'Ahmad', 'Muhammad', 'Aditya', 'Bagas', 'Dimas', 'Fajar', 'Galih', 'Hafizh', 'Ilham', 'Joko',
  'Kevin', 'Lukman', 'Maulana', 'Naufal', 'Pratama', 'Rafi', 'Rizky', 'Syahrul', 'Taufik', 'Wahyu',
  'Yusuf', 'Zackya', 'Alif', 'Bayu', 'Danang', 'Eko', 'Farhan', 'Gilang', 'Hendro', 'Irfan'
];

const middleNamesMale = [
  'Fauzi', 'Nur', 'Rizki', 'Prasetya', 'Saputra', 'Kusuma', 'Hidayat', 'Ramadhan', 'Akbar', 'Ardiansyah',
  'Setiawan', 'Pratama', 'Wibowo', 'Nugroho', 'Firmansyah', 'Santoso', 'Gunawan', 'Hakim', 'Mahendra', 'Putra'
];

const lastNamesMale = [
  'Kurniawan', 'Pratama', 'Saputra', 'Utomo', 'Wicaksono', 'Hidayatullah', 'Pamungkas', 'Pramono', 'Santoso', 'Wijaya',
  'Purnomo', 'Kusuma', 'Nugraha', 'Setiadi', 'Sulistyo', 'Hermawan', 'Mustofa', 'Rahman', 'Suryanto', 'Triyono'
];

const firstNamesFemale = [
  'Aisyah', 'Anisa', 'Annisa', 'Bella', 'Citra', 'Dewi', 'Dina', 'Erna', 'Fatimah', 'Fitri',
  'Gita', 'Hana', 'Indah', 'Intan', 'Kartika', 'Laila', 'Maya', 'Nabila', 'Nurul', 'Putri',
  'Rani', 'Rina', 'Salma', 'Siti', 'Tiara', 'Ulfa', 'Vina', 'Wulan', 'Yuliana', 'Zahra'
];

const middleNamesFemale = [
  'Nur', 'Aulia', 'Rahma', 'Fitriani', 'Kusuma', 'Lestari', 'Permatasari', 'Anggraini', 'Maharani', 'Wulandari',
  'Salsabila', 'Az-Zahra', 'Khaerunnisa', 'Hidayati', 'Rahmatika', 'Safitri', 'Khoirun', 'Syahputri', 'Amalia', 'Dewanti'
];

const lastNamesFemale = [
  'Rahmawati', 'Anggraini', 'Lestari', 'Wulandari', 'Utami', 'Kusumawardani', 'Pratiwi', 'Safitri', 'Sari', 'Susanti',
  'Handayani', 'Mulyani', 'Puspitasari', 'Novitasari', 'Ramadhani', 'Widyaningrum', 'Kurniasari', 'Sulastri', 'Febriana', 'Setianingsih'
];

let studentIdCounter = 1;
const allStudents = [];

classes.forEach((cls, classIdx) => {
  const gradePrefix = cls.startsWith('XII') ? '006' : (cls.startsWith('XI') ? '007' : '008');
  const classSeed = (classIdx + 1) * 37;
  
  // 24 students per class (12 Male, 12 Female)
  const studentsInClass = [];
  
  // 12 Male students
  for (let i = 0; i < 12; i++) {
    const fn = firstNamesMale[(classSeed + i * 3) % firstNamesMale.length];
    const mn = middleNamesMale[(classSeed + i * 7 + 2) % middleNamesMale.length];
    const ln = lastNamesMale[(classSeed + i * 11 + 5) % lastNamesMale.length];
    const name = `${fn} ${mn} ${ln}`;
    const idNum = String(studentIdCounter++).padStart(4, '0');
    const nisn = `${gradePrefix}${String(classIdx * 30 + i * 2 + 101).padStart(8, '0')}`;
    studentsInClass.push({
      id: `S${idNum}`,
      nisn: nisn,
      name: name,
      class: cls,
      gender: 'L'
    });
  }
  
  // 12 Female students
  for (let i = 0; i < 12; i++) {
    const fn = firstNamesFemale[(classSeed + i * 5) % firstNamesFemale.length];
    const mn = middleNamesFemale[(classSeed + i * 9 + 3) % middleNamesFemale.length];
    const ln = lastNamesFemale[(classSeed + i * 13 + 7) % lastNamesFemale.length];
    const name = `${fn} ${mn} ${ln}`;
    const idNum = String(studentIdCounter++).padStart(4, '0');
    const nisn = `${gradePrefix}${String(classIdx * 30 + i * 2 + 102).padStart(8, '0')}`;
    studentsInClass.push({
      id: `S${idNum}`,
      nisn: nisn,
      name: name,
      class: cls,
      gender: 'P'
    });
  }
  
  // Sort alphabetically by name
  studentsInClass.sort((a, b) => a.name.localeCompare(b.name));
  allStudents.push(...studentsInClass);
});

const fileContent = `import { Student, AttendanceRecord, GeofenceConfig } from '../types';

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

export const INITIAL_STUDENTS: Student[] = ${JSON.stringify(allStudents, null, 2)};

export const DEMO_ATTENDANCE_RECORDS: AttendanceRecord[] = [
  {
    id: 'rec-001',
    name: 'Ahmad Fauzi Kurniawan',
    class: 'X A',
    prayer_type: 'Dhuha',
    status: 'Hadir',
    ai_status: 'Valid (Dual Camera: 96%)',
    ai_confidence: 96,
    gps_status: 'Valid (Dalam Radius)',
    gps_distance: 25,
    gps_coords: { latitude: -7.540982, longitude: 110.599143 },
    notes: 'Presensi Dhuha Berjamaah',
    created_at: new Date(Date.now() - 3600000 * 3).toISOString(),
  },
  {
    id: 'rec-002',
    name: 'Aisyah Aulia Rahmawati',
    class: 'X A',
    prayer_type: 'Dhuha',
    status: 'Hadir',
    ai_status: 'Valid (Dual Camera: 94%)',
    ai_confidence: 94,
    gps_status: 'Valid (Dalam Radius)',
    gps_distance: 12,
    gps_coords: { latitude: -7.540982, longitude: 110.599143 },
    notes: 'Presensi Dhuha Berjamaah',
    created_at: new Date(Date.now() - 3600000 * 2.5).toISOString(),
  }
];
`;

fs.writeFileSync('src/data/madrasahData.ts', fileContent, 'utf-8');
console.log('Successfully generated ' + allStudents.length + ' students for all 30 classes (X A-J, XI A-J, XII A-J)!');
