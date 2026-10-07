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
    return isNaN(d.getTime()) ? '-' : d.toLocaleString('id-ID');
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
  } catch (quotaErr) {
    try {
      const trimmed = records.map((r, i) => i < 5 ? r : { ...r, snapshot_photo: undefined });
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(trimmed));
    } catch {
      try {
        const minimal = records.slice(0, 50).map(r => ({ ...r, snapshot_photo: undefined }));
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(minimal));
      } catch {}
    }
  }
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

  // 1. Simpan ke local storage
  const local = getLocalRecords();
  const updatedLocal = [finalRecord, ...local];
  saveLocalRecords(updatedLocal);
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('presensi_updated', { detail: updatedLocal }));
  }

  // 2. Simpan ke Firestore (Firebase database: presensi-db-v2)
  if (db) {
    try {
      const cleanData: Record<string, any> = {};
      for (const [key, val] of Object.entries(finalRecord)) {
        if (val !== undefined) {
          cleanData[key] = val;
        }
      }
      cleanData.createdAtServer = Timestamp.now();
      
      await setDoc(doc(db, 'attendance', finalRecord.id), cleanData);
      console.log('Presensi berhasil tersimpan ke Firestore:', finalRecord.id);
    } catch (err) {
      console.warn('Firestore setDoc warning, mencoba addDoc fallback:', err);
      try {
        const cleanData: Record<string, any> = {};
        for (const [key, val] of Object.entries(finalRecord)) {
          if (val !== undefined) cleanData[key] = val;
        }
        await addDoc(collection(db, 'attendance'), cleanData);
      } catch (addErr) {
        console.warn('Firestore fallback warning:', addErr);
      }
    }
  }

  return finalRecord;
}

export async function getAttendanceRecords(isAdmin: boolean = false): Promise<AttendanceRecord[] & { data?: AttendanceRecord[]; isFromCloud?: boolean }> {
  const deletedKeys = getDeletedRecordKeys();
  const local = getLocalRecords();
  let merged: AttendanceRecord[] = [...local];

  if (db) {
    try {
      const colRef = collection(db, 'attendance');
      let snapshot;
      try {
        const q = query(colRef, orderBy('created_at', 'desc'), limit(150));
        snapshot = await getDocs(q);
      } catch (orderErr) {
        const fallbackQ = query(colRef, limit(150));
        snapshot = await getDocs(fallbackQ);
      }

      const fsRecords: AttendanceRecord[] = [];
      snapshot.forEach((docSnap: any) => {
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
      console.warn('Firestore fetch fallback:', err);
    }
  }

  merged.sort((a, b) => parseDateToMs(b.created_at) - parseDateToMs(a.created_at));
  saveLocalRecords(merged);

  const result = merged as any;
  result.data = merged;
  result.isFromCloud = !!db;
  return result;
}

export function subscribeToAttendanceRecords(
  callback: (records: AttendanceRecord[], isFromCloud: boolean) => void
): () => void {
  const deletedKeys = getDeletedRecordKeys();
  let firestoreUnsubscribe = () => {};

  getAttendanceRecords(true).then(recs => callback(recs, false));

  if (db) {
    try {
      const colRef = collection(db, 'attendance');
      const attachListener = (qToUse: any) => {
        return onSnapshot(qToUse, (snapshot: any) => {
          const remote: AttendanceRecord[] = [];
          snapshot.forEach((docSnap: any) => {
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
          const combined = Array.from(map.values()).sort((a, b) => parseDateToMs(b.created_at) - parseDateToMs(a.created_at));
          saveLocalRecords(combined);
          callback(combined, true);
        }, (err: any) => {
          console.warn('Firestore subscription fallback:', err);
        });
      };

      try {
        const q = query(colRef, orderBy('created_at', 'desc'), limit(150));
        firestoreUnsubscribe = attachListener(q);
      } catch {
        firestoreUnsubscribe = attachListener(query(colRef, limit(150)));
      }
    } catch {}
  }

  return () => {
    firestoreUnsubscribe();
  };
}

export async function deleteAttendanceRecord(id: string, name?: string, createdAt?: string): Promise<void> {
  addDeletedRecordKey(id);

  const current = getLocalRecords();
  const updated = current.filter(r => r.id !== id);
  saveLocalRecords(updated);

  if (db) {
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

export const subscribeToAttendance = (callback: (records: AttendanceRecord[]) => void) => {
  return subscribeToAttendanceRecords((recs) => callback(recs));
};

export async function updateRecordStatus(id: string, newStatus: string, notes?: string): Promise<void> {
  const current = getLocalRecords();
  const updated = current.map(r => r.id === id ? { ...r, status: newStatus as any, notes: notes !== undefined ? notes : r.notes } : r);
  saveLocalRecords(updated);

  if (db) {
    try {
      const updateData: any = { status: newStatus };
      if (notes !== undefined) {
        updateData.notes = notes;
      }
      await updateDoc(doc(db, 'attendance', id), updateData);
    } catch (err) {
      console.warn('Failed to update status in Firestore:', err);
    }
  }
}

export async function deleteRecord(id: string, name?: string, createdAt?: string): Promise<void> {
  await deleteAttendanceRecord(id, name || '', createdAt || '');
}

export async function deleteAllAttendanceRecords(): Promise<boolean> {
  try {
    await clearAllAttendanceRecords();
    return true;
  } catch {
    return false;
  }
}
