import { AttendanceRecord } from '../types';

const LOCAL_RECORDS_KEY = 'man1_local_attendance_records';
let memoryRecordsCache: AttendanceRecord[] | null = null;

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
    const res = await fetch('/api/attendance');
    if (res.ok) {
      const result = await res.json();
      if (result.success && Array.isArray(result.data)) {
        saveLocalCache(result.data);
        return { data: result.data, isFromCloud: true };
      }
    }
  } catch (err) {
    console.warn('Gagal fetch data dari server, menggunakan cache:', err);
  }
  
  const raw = localStorage.getItem(LOCAL_RECORDS_KEY);
  const data = raw ? JSON.parse(raw) : [];
  return { data, isFromCloud: false };
}

export async function submitAttendanceRecord(record: Omit<AttendanceRecord, 'id'>): Promise<{ success: boolean; record: AttendanceRecord; isCloud: boolean; message: string }> {
  const res = await fetch('/api/attendance', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(record),
  });

  const result = await res.json();
  if (!res.ok) {
    throw new Error(result.message || 'Gagal menyimpan presensi');
  }

  // Refresh local cache after successful submit
  getAttendanceRecords();

  return {
    success: true,
    record: result.record,
    isCloud: true,
    message: 'Presensi berhasil dicatat di server mandiri.',
  };
}

export async function updateRecordStatus(id: string, newStatus: AttendanceRecord['status'], notes?: string): Promise<boolean> {
  try {
    const res = await fetch(`/api/attendance/${encodeURIComponent(id)}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status: newStatus, notes }),
    });
    if (res.ok) {
      getAttendanceRecords();
      return true;
    }
  } catch (err) {
    console.error('Update status failed', err);
  }
  return false;
}

export async function deleteRecord(id: string): Promise<boolean> {
  try {
    const res = await fetch(`/api/attendance/${encodeURIComponent(id)}`, {
      method: 'DELETE',
    });
    if (res.ok) {
      getAttendanceRecords();
      return true;
    }
  } catch (err) {
    console.error('Delete failed', err);
  }
  return false;
}

// Export remains for backward compatibility in imports
export function getStoredConfig() { return { isConnected: true }; }

