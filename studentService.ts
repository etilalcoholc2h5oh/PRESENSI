import { Student } from '../types';
import { INITIAL_STUDENTS } from '../data/madrasahData';

const CUSTOM_STUDENTS_KEY = 'man1_custom_students_list_v2';
const DATA_VERSION_KEY = 'man1_students_version';
const CURRENT_DATA_VERSION = '2026_2027_official_1041';

export function getAllStudents(): Student[] {
  try {
    localStorage.removeItem(CUSTOM_STUDENTS_KEY);
    localStorage.removeItem('man1_custom_students_list');
    localStorage.setItem(DATA_VERSION_KEY, CURRENT_DATA_VERSION);
  } catch (e) {
    // ignore
  }
  return INITIAL_STUDENTS;
}

export function saveAllStudents(students: Student[]): void {
  try {
    localStorage.setItem(CUSTOM_STUDENTS_KEY, JSON.stringify(students));
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('students_updated', { detail: students }));
    }
  } catch (e) {
    console.error('Gagal menyimpan custom students ke storage:', e);
  }
}

export function getStudentsByClass(className: string): Student[] {
  const all = getAllStudents();
  return all.filter((s) => s.class === className);
}

export function addOrUpdateStudent(student: Omit<Student, 'id'> & { id?: string }): Student {
  const all = getAllStudents();
  const id = student.id || 'stu-' + Date.now() + '-' + Math.random().toString(36).substring(2, 7);
  const newStudent: Student = {
    ...student,
    id,
  };

  const existingIndex = all.findIndex((s) => s.id === id || (s.name.trim().toLowerCase() === student.name.trim().toLowerCase() && s.class === student.class));
  let updated: Student[];
  if (existingIndex >= 0) {
    updated = [...all];
    updated[existingIndex] = newStudent;
  } else {
    updated = [...all, newStudent];
  }

  saveAllStudents(updated);
  return newStudent;
}

export function deleteStudent(id: string): void {
  const all = getAllStudents();
  const updated = all.filter((s) => s.id !== id);
  saveAllStudents(updated);
}

export function importStudentsForClass(className: string, rawText: string, replaceExisting = true): { count: number } {
  const lines = rawText.split(/\r?\n/).map((l) => l.trim()).filter(Boolean);
  const importedStudents: Student[] = [];

  lines.forEach((line, index) => {
    // Bisa format: "1. Ahmad Fauzi (L)" atau "Ahmad Fauzi \t L" atau "Ahmad Fauzi"
    let cleaned = line.replace(/^\d+[\.\)\-\s]+/, '').trim();
    let gender: 'L' | 'P' = 'L';

    if (/\b(P|Perempuan|Wanita|F|Putri)\b/i.test(cleaned) || /\(P\)/i.test(cleaned)) {
      gender = 'P';
      cleaned = cleaned.replace(/\s*[\(\[]?(P|Perempuan|Wanita|F|Putri)[\)\]]?\s*$/i, '').trim();
    } else if (/\b(L|Laki|Pria|M|Putra)\b/i.test(cleaned) || /\(L\)/i.test(cleaned)) {
      gender = 'L';
      cleaned = cleaned.replace(/\s*[\(\[]?(L|Laki|Pria|M|Putra)[\)\]]?\s*$/i, '').trim();
    } else {
      // Deteksi otomatis nama perempuan umum Indonesia
      const femaleNames = ['anisa', 'annisa', 'citra', 'dina', 'dewi', 'erna', 'fitri', 'gita', 'hana', 'indah', 'intan', 'kartika', 'laila', 'maya', 'nabila', 'nurul', 'putri', 'rani', 'rina', 'salma', 'siti', 'tiara', 'ulfa', 'vina', 'wulan', 'yuliana', 'zahra', 'aulia', 'fatimah', 'safitri', 'lestari', 'rahma', 'ayu', 'retno', 'nur', 'amalia', 'marwah', 'salsabila', 'khairunnisa', 'fadillah'];
      const firstWord = cleaned.split(' ')[0].toLowerCase();
      if (femaleNames.includes(firstWord)) {
        gender = 'P';
      }
    }

    if (cleaned.length >= 2) {
      importedStudents.push({
        id: `stu-${className.toLowerCase().replace(/\s+/g, '')}-${Date.now()}-${index + 1}`,
        nisn: `008${String(Date.now()).slice(-6)}${String(index + 1).padStart(2, '0')}`,
        name: cleaned,
        class: className,
        gender: gender,
      });
    }
  });

  const all = getAllStudents();
  let updated: Student[];
  if (replaceExisting) {
    const others = all.filter((s) => s.class !== className);
    updated = [...others, ...importedStudents];
  } else {
    // Append without duplicating exact name
    const existingNames = new Set(all.filter((s) => s.class === className).map((s) => s.name.toLowerCase()));
    const nonDuplicates = importedStudents.filter((s) => !existingNames.has(s.name.toLowerCase()));
    updated = [...all, ...nonDuplicates];
  }

  saveAllStudents(updated);
  return { count: importedStudents.length };
}

export function resetStudentsToDefault(): void {
  try {
    localStorage.removeItem(CUSTOM_STUDENTS_KEY);
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('students_updated', { detail: INITIAL_STUDENTS }));
    }
  } catch (e) {
    console.error('Reset students failed:', e);
  }
}
