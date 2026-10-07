import { AttendanceRecord } from '../types';
import { db } from '../lib/firebase';
import { collection, addDoc, setDoc, getDocs, deleteDoc, doc, query, orderBy, onSnapshot, Timestamp, limit, updateDoc } from 'firebase/firestore';

export function parseDateToMs(dateVal: any): number {
  if (!dateVal) return 0;
  if (typeof dateVal === 'object' && dateVal.seconds !== undefined) {
    return dateVal.seconds * 1000;
  }
  if (typeof dateVal === 'object' && typeof dateVal.toDate === 'function') {
    return dateVal.toDate().getTime();
  }
  const t = new Date(dateVal).getTime();
  return isNaN(t) ? 0 : t;
}

export function formatRecordDate(dateVal: any): string {
  if (!dateVal) return '-';
  try {
    let d: Date;
    if (typeof dateVal === 'object' && dateVal.seconds !== undefined) {
      d = new Date(dateVal.seconds * 1000);
    } else if (typeof dateVal === 'object' && typeof dateVal.toDate === 'function') {
      d = dateVal.toDate();
    } else {
      d = new Date(dateVal);
    }
    if (isNaN(d.getTime())) return '-';
    // Mengunci ke WIB
    const dateStr = d.toLocaleDateString('id-ID', { day: '2-digit', month: 'short', year: 'numeric', timeZone: 'Asia/Jakarta' });
    const timeStr = d.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit', timeZone: 'Asia/Jakarta' });
    return `${dateStr}, ${timeStr} WIB`;
  } catch {
    return '-';
  }
}

export function getSafeDateISOString(dateVal: any): string {
  if (!dateVal) return '';
  try {
    let d: Date;
    if (typeof dateVal === 'object' && dateVal.seconds !== undefined) {
      d = new Date(dateVal.seconds * 1000);
    } else if (typeof dateVal === 'object' && typeof dateVal.toDate === 'function') {
      d = dateVal.toDate();
    } else {
      d = new Date(dateVal);
    }
    return isNaN(d.getTime()) ? '' : d.toISOString();
  } catch {
    return '';
  }
}

const LOCAL_STORAGE_KEY = 'man1_boyolali_attendance_records_v2';
const DELETED_KEYS_STORAGE = 'man1_boyolali_deleted_keys_v2';

// Foto base64 (puluhan KB per data) TIDAK disimpan di localStorage: JSON.parse/stringify
// yang besar memblokir halaman dan bikin kamera lambat muncul. Foto cukup ada di Firestore.
function stripPhotos(records: AttendanceRecord[]): AttendanceRecord[] {
  return records.map((r) => {
    if (!r || !r.snapshot_photo) return r;
    const { snapshot_photo, ...rest } = r;
    return rest as AttendanceRecord;
  });
}

export function getLocalRecords(): AttendanceRecord[] {
  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (!raw) return [];
    const parsed: AttendanceRecord[] = JSON.parse(raw);
    // Migrasi sekali: data lama yang masih berisi foto dibersihkan
    if (raw.length > 200_000 && parsed.some((r) => r && r.snapshot_photo)) {
      const slim = stripPhotos(parsed);
      saveLocalRecords(slim);
      return slim;
    }
    return parsed;
  } catch {
    return [];
  }
}

function saveLocalRecords(records: AttendanceRecord[]) {
  try {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(stripPhotos(records).slice(0, 300)));
  } catch {}
}

function getDeletedRecordKeys(): string[] {
  try {
    const raw = localStorage.getItem(DELETED_KEYS_STORAGE);
    if (!raw) return [];
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

function addDeletedRecordKey(id: string) {
  try {
    const keys = getDeletedRecordKeys();
    if (!keys.includes(id)) {
      keys.push(id);
      localStorage.setItem(DELETED_KEYS_STORAGE, JSON.stringify(keys));
    }
  } catch {}
}

export async function submitAttendanceRecord(record: Omit<AttendanceRecord, 'id' | 'created_at'>): Promise<AttendanceRecord> {
  const now = new Date();
  const nowIso = now.toISOString();
  // Mengunci waktu WIB saat presensi
  const recorded_time = record.recorded_time || (now.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit', timeZone: 'Asia/Jakarta' }) + ' WIB');
  const recorded_date = record.recorded_date || now.toLocaleDateString('id-ID', { day: '2-digit', month: 'short', year: 'numeric', timeZone: 'Asia/Jakarta' });

  const finalRecord: AttendanceRecord = {
    ...record,
    id: 'att_' + Date.now() + '_' + Math.random().toString(36).substring(2, 7),
    created_at: nowIso,
    recorded_time,
    recorded_date,
  };

  const local = getLocalRecords();
  const updatedLocal = [finalRecord, ...local.filter(r => r.id !== finalRecord.id)];
  saveLocalRecords(updatedLocal);
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('presensi_updated', { detail: updatedLocal }));
  }

  if (db) {
    try {
      const cleanData: Record<string, any> = {
        id: finalRecord.id,
        name: finalRecord.name || '',
        class: finalRecord.class || '',
        prayer_type: finalRecord.prayer_type || 'Dhuha',
        status: finalRecord.status || 'Hadir',
        created_at: nowIso,
        createdAt: nowIso,
        recorded_time,
        recorded_date,
        createdAtServer: Timestamp.now(),
        ai_status: finalRecord.ai_status || 'Manual',
        ai_confidence: finalRecord.ai_confidence || 100,
        gps_status: finalRecord.gps_status || 'Valid',
        notes: finalRecord.notes || '',
      };
      if (finalRecord.snapshot_photo) cleanData.snapshot_photo = finalRecord.snapshot_photo;
      await setDoc(doc(db, 'attendance', finalRecord.id), cleanData);
    } catch (err: any) {
      console.warn('Firestore fallback:', err);
    }
  }
  return finalRecord;
}

export async function getAttendanceRecords(isAdmin: boolean = false): Promise<AttendanceRecord[] & { data?: AttendanceRecord[]; isFromCloud?: boolean }> {
  const deletedKeys = getDeletedRecordKeys();
  const local = getLocalRecords();
  let merged: AttendanceRecord[] = [...local];
  let isFromCloud = false;

  if (db) {
    try {
      const colRef = collection(db, 'attendance');
      const snapshot = await getDocs(query(colRef, orderBy('created_at', 'desc'), limit(150)));
      if (!snapshot.empty) {
        const fsRecords: AttendanceRecord[] = [];
        snapshot.forEach((docSnap: any) => {
          const data = docSnap.data() as any;
          const id = docSnap.id || data.id;
          let recDate = data.created_at || data.createdAt || new Date().toISOString();
          fsRecords.push({
            ...data,
            id,
            created_at: recDate,
            recorded_time: data.recorded_time || (new Date(recDate).toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit', timeZone: 'Asia/Jakarta' }) + ' WIB'),
            recorded_date: data.recorded_date || new Date(recDate).toLocaleDateString('id-ID', { day: '2-digit', month: 'short', year: 'numeric', timeZone: 'Asia/Jakarta' }),
            name: data.name || '',
            class: data.class || '',
            prayer_type: data.prayer_type || data.prayerType || 'Dhuha',
            status: data.status || 'Hadir',
          });
        });
        const map = new Map<string, AttendanceRecord>();
        merged.forEach(r => map.set(r.id, r));
        fsRecords.forEach(r => { if (!deletedKeys.includes(r.id)) map.set(r.id, r); });
        merged = Array.from(map.values());
        isFromCloud = true;
      }
    } catch {}
  }
  merged.sort((a, b) => parseDateToMs(b.created_at) - parseDateToMs(a.created_at));
  saveLocalRecords(merged);
  // App.tsx membaca res.data dan res.isFromCloud
  return Object.assign(merged, { data: merged, isFromCloud }) as any;
}

export function subscribeToAttendanceRecords(callback: (records: AttendanceRecord[], isFromCloud: boolean) => void): () => void {
  const deletedKeys = getDeletedRecordKeys();
  let unsub = () => {};
  if (db) {
    const process = (snapshot: any) => {
      const remote: AttendanceRecord[] = [];
      snapshot.forEach((docSnap: any) => {
        const data = docSnap.data() as any;
        const id = docSnap.id || data.id;
        if (!deletedKeys.includes(id)) {
          let recDate = data.created_at || data.createdAt || new Date().toISOString();
          remote.push({
            ...data,
            id,
            created_at: recDate,
            recorded_time: data.recorded_time || (new Date(recDate).toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit', timeZone: 'Asia/Jakarta' }) + ' WIB'),
            recorded_date: data.recorded_date || new Date(recDate).toLocaleDateString('id-ID', { day: '2-digit', month: 'short', year: 'numeric', timeZone: 'Asia/Jakarta' }),
            name: data.name || '',
            class: data.class || '',
            prayer_type: data.prayer_type || data.prayerType || 'Dhuha',
            status: data.status || 'Hadir',
          });
        }
      });
      const current = getLocalRecords();
      const map = new Map<string, AttendanceRecord>();
      current.forEach(r => map.set(r.id, r));
      remote.forEach(r => map.set(r.id, r));
      const combined = Array.from(map.values()).sort((a, b) => parseDateToMs(b.created_at) - parseDateToMs(a.created_at));
      saveLocalRecords(combined);
      callback(combined, true);
    };
    unsub = onSnapshot(query(collection(db, 'attendance'), orderBy('created_at', 'desc'), limit(150)), process);
  }
  return unsub;
}

export async function deleteAttendanceRecord(id: string): Promise<void> {
  addDeletedRecordKey(id);
  const updated = getLocalRecords().filter(r => r.id !== id);
  saveLocalRecords(updated);
  if (db) try { await deleteDoc(doc(db, 'attendance', id)); } catch {}
}

export async function deleteAllAttendanceRecords(): Promise<boolean> {
  saveLocalRecords([]);
  return true;
}

export const subscribeToAttendance = (callback: (records: AttendanceRecord[]) => void) => subscribeToAttendanceRecords((recs) => callback(recs));

// Alias untuk AdminDashboard
export const deleteRecord = deleteAttendanceRecord;

export async function updateRecordStatus(id: string, status: string, notes?: string): Promise<void> {
  const updated = getLocalRecords().map((r) =>
    r.id === id ? { ...r, status: status as any, notes: notes ?? r.notes } : r
  );
  saveLocalRecords(updated);
  if (db) {
    try {
      await updateDoc(doc(db, 'attendance', id), { status, notes: notes ?? '' });
    } catch {}
  }
}
