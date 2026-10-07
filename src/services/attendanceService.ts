import { AttendanceRecord } from '../types';
import { db } from '../lib/firebase';
import { collection, addDoc, getDocs, deleteDoc, doc, query, orderBy, onSnapshot, Timestamp, limit } from 'firebase/firestore';

const LOCAL_STORAGE_KEY = 'man1_boyolali_attendance_records_v2';
const DELETED_KEYS_STORAGE = 'man1_boyolali_deleted_keys_v2';

export function getLocalRecords(): AttendanceRecord[] {
  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (!raw) return [];
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

function saveLocalRecords(records: AttendanceRecord[]) {
  try {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(records));
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
  const finalRecord: AttendanceRecord = {
    ...record,
    id: 'att_' + Math.random().toString(36).substring(2, 9),
    created_at: new Date().toISOString()
  };

  // 1. Save locally
  const local = getLocalRecords();
  const updatedLocal = [finalRecord, ...local];
  saveLocalRecords(updatedLocal);

  // 2. Try Firestore (Firebase database: presensi-db-v2)
  if (navigator.onLine && db) {
    try {
      await addDoc(collection(db, 'attendance'), {
        ...finalRecord,
        createdAtServer: Timestamp.now()
      });
    } catch (err) {
      console.warn('Firestore write failed, stored locally:', err);
    }
  }

  return finalRecord;
}

export async function getAttendanceRecords(): Promise<AttendanceRecord[]> {
  const deletedKeys = getDeletedRecordKeys();
  const local = getLocalRecords();
  let merged: AttendanceRecord[] = [...local];

  // Try Firestore (Firebase database: presensi-db-v2)
  if (navigator.onLine && db) {
    try {
      const q = query(collection(db, 'attendance'), orderBy('created_at', 'desc'), limit(150));
      const snapshot = await getDocs(q);
      const fsRecords: AttendanceRecord[] = [];
      snapshot.forEach(docSnap => {
        const data = docSnap.data() as AttendanceRecord;
        fsRecords.push({ ...data, id: docSnap.id || data.id });
      });

      const map = new Map<string, AttendanceRecord>();
      merged.forEach(r => map.set(r.id, r));
      fsRecords.forEach(r => {
        if (!deletedKeys.includes(r.id)) {
          map.set(r.id, r);
        }
      });
      merged = Array.from(map.values());
    } catch (err) {
      console.warn('Firestore fetch failed:', err);
    }
  }

  merged.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
  saveLocalRecords(merged);
  return merged;
}

export function subscribeToAttendanceRecords(
  callback: (records: AttendanceRecord[], isFromCloud: boolean) => void
): () => void {
  const deletedKeys = getDeletedRecordKeys();
  let firestoreUnsubscribe = () => {};

  // Initial load
  getAttendanceRecords().then(recs => callback(recs, false));

  // Berlangganan ke Firestore jika online (Firebase database: presensi-db-v2)
  if (navigator.onLine && db) {
    try {
      const q = query(collection(db, 'attendance'), orderBy('created_at', 'desc'), limit(150));
      firestoreUnsubscribe = onSnapshot(q, (snapshot) => {
        const remote: AttendanceRecord[] = [];
        snapshot.forEach(docSnap => {
          const data = docSnap.data() as AttendanceRecord;
          const id = docSnap.id || data.id;
          if (!deletedKeys.includes(id)) {
            remote.push({ ...data, id });
          }
        });
        const current = getLocalRecords();
        const map = new Map<string, AttendanceRecord>();
        current.forEach(r => map.set(r.id, r));
        remote.forEach(r => map.set(r.id, r));
        const combined = Array.from(map.values()).sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
        saveLocalRecords(combined);
        callback(combined, true);
      }, (err) => {
        console.warn('Firestore subscription fallback:', err);
      });
    } catch {}
  }

  // Safe Quota-Friendly Background Sync Interval (Every 5 minutes = 300,000ms)
  const safeSyncInterval = setInterval(async () => {
    if (navigator.onLine) {
      const latest = await getAttendanceRecords();
      callback(latest, true);
    }
  }, 300000);

  return () => {
    firestoreUnsubscribe();
    clearInterval(safeSyncInterval);
  };
}

export async function deleteAttendanceRecord(id: string, name: string, createdAt: string): Promise<void> {
  addDeletedRecordKey(id);

  // 1. Delete local
  const current = getLocalRecords();
  const updated = current.filter(r => r.id !== id);
  saveLocalRecords(updated);

  // 2. Delete from Firestore directly (Firebase database: presensi-db-v2)
  if (navigator.onLine && db) {
    try {
      await deleteDoc(doc(db, 'attendance', id));
    } catch {}
  }
}

export async function clearAllAttendanceRecords(): Promise<void> {
  const current = getLocalRecords();
  current.forEach(r => addDeletedRecordKey(r.id));
  saveLocalRecords([]);
}
