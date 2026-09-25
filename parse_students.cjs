const fs = require('fs');
const path = require('path');

const rawText = fs.readFileSync(path.join(__dirname, 'raw_students.txt'), 'utf-8');

const lines = rawText.split('\n');

const CLASSES_LIST = [
  'X A', 'X B', 'X C', 'X D', 'X E', 'X F', 'X G', 'X H', 'X I', 'X J',
  'XI A', 'XI B', 'XI C', 'XI D', 'XI E', 'XI F', 'XI G', 'XI H', 'XI I', 'XI J',
  'XII A', 'XII B', 'XII C', 'XII D', 'XII E', 'XII F', 'XII G', 'XII H', 'XII I', 'XII J'
];

let currentClass = null;
const allStudents = [];

for (let i = 0; i < lines.length; i++) {
  const line = lines[i].trim();
  if (!line) continue;

  const classMatch = line.match(/^KELAS\s*:\s*([X|I|V]+)\s*[-–]\s*([A-J])/i);
  if (classMatch) {
    const level = classMatch[1].toUpperCase();
    const section = classMatch[2].toUpperCase();
    currentClass = `${level} ${section}`;
    continue;
  }

  if (currentClass) {
    const studentMatch = line.match(/^(\d{1,2})\s+([0-9]{4,6})\s+(.+?)\s+([LP])(?:\s+|$)/i);
    if (studentMatch) {
      const urut = studentMatch[1];
      const induk = studentMatch[2].trim();
      let name = studentMatch[3].replace(/\t+/g, ' ').replace(/\s+/g, ' ').trim();
      const gender = studentMatch[4].toUpperCase();

      allStudents.push({
        id: induk,
        nisn: induk,
        name: name,
        class: currentClass,
        gender: gender
      });
      continue;
    }
  }
}

console.log(`Parsed total ${allStudents.length} students across classes!`);

const fileContent = `import { Student, AttendanceRecord, GeofenceConfig } from '../types';

export const MADRASAH_INFO = {
  name: 'MAN 1 Boyolali',
  subtitle: 'Madrasah Aliyah Negeri 1 Boyolali',
  motto: 'Mandiri Berprestasi, Religius & Berakhlakul Karimah',
  address: 'Jl. Kates No. 34, Siswodipuran, Kec. Boyolali, Kabupaten Boyolali, Jawa Tengah 57311',
  tahunAjaran: '2026 / 2027',
  totalSiswa: ${allStudents.length},
  totalLakiLaki: ${allStudents.filter(s => s.gender === 'L').length},
  totalPerempuan: ${allStudents.filter(s => s.gender === 'P').length},
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
    name: 'Adelia Pramadipta Putri Purwanto',
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
    name: 'Ainunnisha Sulistyaningrum',
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

fs.writeFileSync(path.join(__dirname, '../src/data/madrasahData.ts'), fileContent, 'utf-8');
console.log('Successfully regenerated madrasahData.ts without WALI_KELAS!');
