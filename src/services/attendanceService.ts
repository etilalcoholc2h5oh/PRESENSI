import {
  collection,
  addDoc,
  getDocs,
  doc,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  writeBatch,
} from 'firebase/firestore';
import { db, auth } from '../lib/firebase';
import { AttendanceRecord } from '../types';

const LOCAL_RECORDS_KEY = 'man1_local_attendance_records';
let memoryRecordsCache: AttendanceRecord[] | null = null;

enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: {
    userId?: string | null;
    email?: string | null;
    emailVerified?: boolean | null;
    isAnonymous?: boolean | null;
    tenantId?: string | null;
    providerInfo?: {
      providerId?: string | null;
      email?: string | null;
    }[];
  };
}

function handleFirestoreError(error: unknown, operationType: OperationType, path: string | null): never {
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: auth.currentUser?.uid,
      email: auth.currentUser?.email,
      emailVerified: auth.currentUser?.emailVerified,
      isAnonymous: auth.currentUser?.isAnonymous,
      tenantId: auth.currentUser?.tenantId,
      providerInfo:
        auth.currentUser?.providerData?.map((provider) => ({
          providerId: provider.providerId,
          email: provider.email,
        })) || [],
    },
    operationType,
    path,
  };
  console.error('Firestore Error:', JSON.stringify(errInfo));
  throw new Error(error instanceof Error ? error.message : 'Database error');
}

function saveLocalCache(records: AttendanceRecord[]) {
  memoryRecordsCache = [...records];
  try {
    localStorage.setItem(LOCAL_RECORDS_KEY, JSON.stringify(records));
  } catch (e) {
    console.warn('Storage quota warning', e);
  }
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('presensi_updated', { detail: records }));
  }
}

export async function getAttendanceRecords(): Promise<{ data: AttendanceRecord[]; isFromCloud: boolean }> {
  try {
    const q = query(collection(db, 'attendance'), orderBy('created_at', 'desc'));
    const snapshot = await getDocs(q);
    const records = snapshot.docs.map((docSnap) => ({
      id: docSnap.id,
      ...(docSnap.data() as Omit<AttendanceRecord, 'id'>),
    }));

    saveLocalCache(records);
    return { data: records, isFromCloud: true };
  } catch (err: any) {
    console.warn('Gagal fetch data langsung dari Firestore, mencoba fallback server / cache:', err);
    try {
      const res = await fetch('/api/attendance');
      if (res.ok) {
        const result = await res.json();
        if (result.success && Array.isArray(result.data)) {
          saveLocalCache(result.data);
          return { data: result.data, isFromCloud: true };
        }
      }
    } catch {
      // ignore
    }
  }

  const raw = localStorage.getItem(LOCAL_RECORDS_KEY);
  const data = raw ? JSON.parse(raw) : (memoryRecordsCache || []);
  return { data, isFromCloud: false };
}

export async function submitAttendanceRecord(
  record: Omit<AttendanceRecord, 'id'>
): Promise<{ success: boolean; record: AttendanceRecord; isCloud: boolean; message: string }> {
  const name = record.name.trim();
  const prayerType = record.prayer_type;
  const now = new Date();
  const today = new Date(record.created_at || now.toISOString()).toISOString().split('T')[0];

  try {
    const duplicateQuery = query(
      collection(db, 'attendance'),
      where('name', '==', name),
      where('prayer_type', '==', prayerType)
    );
    const existingSnap = await getDocs(duplicateQuery);
    const isDuplicate = existingSnap.docs.some((docSnap) => {
      const data = docSnap.data();
      const docDate = new Date(data.created_at).toISOString().split('T')[0];
      return docDate === today;
    });

    if (isDuplicate) {
      throw new Error(`Anda sudah melakukan presensi untuk sholat ${prayerType} hari ini.`);
    }
  } catch (err: any) {
    if (err.message && err.message.includes('sudah melakukan presensi')) {
      throw err;
    }
    console.warn('Pengecekan duplikat dilewati:', err);
  }

  try {
    const newDocData = {
      ...record,
      name,
      created_at: record.created_at || now.toISOString(),
    };

    const docRef = await addDoc(collection(db, 'attendance'), newDocData);
    const savedRecord: AttendanceRecord = {
      id: docRef.id,
      ...newDocData,
    };

    getAttendanceRecords().catch(() => {});

    return {
      success: true,
      record: savedRecord,
      isCloud: true,
      message: 'Presensi berhasil dicatat di server cloud.',
    };
  } catch (firestoreErr: any) {
    console.error('Direct Firestore write error, attempting server fallback:', firestoreErr);
    try {
      const res = await fetch('/api/attendance', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(record),
      });
      const result = await res.json();
      if (res.ok && result.success) {
        getAttendanceRecords().catch(() => {});
        return {
          success: true,
          record: result.record,
          isCloud: true,
          message: 'Presensi berhasil dicatat di server cloud.',
        };
      }
      throw new Error(result.message || 'Gagal menyimpan presensi');
    } catch (apiErr: any) {
      handleFirestoreError(firestoreErr || apiErr, OperationType.CREATE, 'attendance');
    }
  }
}

export async function updateRecordStatus(
  id: string,
  newStatus: AttendanceRecord['status'],
  notes?: string
): Promise<boolean> {
  try {
    const docRef = doc(db, 'attendance', id);
    await updateDoc(docRef, {
      status: newStatus,
      notes: notes || '',
    });
    getAttendanceRecords().catch(() => {});
    return true;
  } catch (err) {
    console.warn('Direct update failed, trying server API:', err);
    try {
      const res = await fetch(`/api/attendance/${encodeURIComponent(id)}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus, notes }),
      });
      if (res.ok) {
        getAttendanceRecords().catch(() => {});
        return true;
      }
    } catch {
      // ignore
    }
  }
  return false;
}

export async function deleteRecord(id: string): Promise<boolean> {
  try {
    const docRef = doc(db, 'attendance', id);
    await deleteDoc(docRef);
    getAttendanceRecords().catch(() => {});
    return true;
  } catch (err) {
    console.warn('Direct delete failed, trying server API:', err);
    try {
      const res = await fetch(`/api/attendance/${encodeURIComponent(id)}`, {
        method: 'DELETE',
      });
      if (res.ok) {
        getAttendanceRecords().catch(() => {});
        return true;
      }
    } catch {
      // ignore
    }
  }
  return false;
}

export async function deleteAllAttendanceRecords(): Promise<boolean> {
  try {
    const snapshot = await getDocs(collection(db, 'attendance'));
    const batch = writeBatch(db);
    snapshot.docs.forEach((d) => batch.delete(d.ref));
    await batch.commit();
    getAttendanceRecords().catch(() => {});
    return true;
  } catch (err) {
    console.warn('Direct delete all failed, trying server API:', err);
    try {
      const res = await fetch('/api/attendance', { method: 'DELETE' });
      const data = await res.json();
      if (data.success) {
        getAttendanceRecords().catch(() => {});
        return true;
      }
    } catch {
      // ignore
    }
  }
  return false;
}

export function getStoredConfig() {
  return { isConnected: true };
}