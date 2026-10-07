import { AttendanceRecord, PrayerType } from '../types';

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

/**
 * Mendapatkan seluruh rekaman presensi langsung dari Server SQL Database Mandiri
 * Bebas dari kuota Firebase!
 */
export async function getAttendanceRecords(): Promise<{ data: AttendanceRecord[]; isFromCloud: boolean }> {
  let records: AttendanceRecord[] = [];
  let isFromCloud = true;

  // 1. Ambil dari Server Database SQL (/api/attendance)
  try {
    const res = await fetch('/api/attendance', {
      headers: { Accept: 'application/json' },
    });
    if (res.ok) {
      const result = await res.json();
      if (result.success && Array.isArray(result.data)) {
        records = result.data;
      }
    } else {
      isFromCloud = false;
    }
  } catch (err) {
    console.warn('[SQL-DB] Gagal fetch dari server SQL API, beralih ke cache lokal:', err);
    isFromCloud = false;
  }

  // 2. Jika offline / server gagal diakses, baru gunakan cache lokal
  if (!isFromCloud) {
    try {
      const raw = localStorage.getItem(LOCAL_RECORDS_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed) && parsed.length > 0) {
          records = parsed;
        }
      }
    } catch (e) {
      // ignore
    }
  }

  records.sort((a, b) => {
    const ta = a.created_at ? new Date(a.created_at).getTime() : 0;
    const tb = b.created_at ? new Date(b.created_at).getTime() : 0;
    return tb - ta;
  });

  if (isFromCloud) {
    saveLocalCache(records);
  } else if (records.length > 0) {
    saveLocalCache(records);
  }

  return { data: records, isFromCloud };
}

/**
 * Subscribe pembaruan data secara berkala (Polling Server SQL)
 * Tanpa perlu Firebase onSnapshot!
 */
export function subscribeToAttendance(callback: (records: AttendanceRecord[]) => void) {
  // Ambil data pertama kali
  getAttendanceRecords().then((res) => callback(res.data));

  // Polling server SQL setiap 4 detik untuk update langsung jika ada siswa yang baru absen
  const intervalId = setInterval(async () => {
    try {
      const res = await fetch('/api/attendance', {
        headers: { Accept: 'application/json' },
      });
      if (res.ok) {
        const result = await res.json();
        if (result.success && Array.isArray(result.data)) {
          saveLocalCache(result.data);
          callback(result.data);
        }
      }
    } catch {
      // ignore network errors during background polling
    }
  }, 4000);

  return () => {
    clearInterval(intervalId);
  };
}

/**
 * Mengirim rekaman presensi langsung ke Server SQL Database Mandiri
 */
export async function submitAttendanceRecord(
  record: Omit<AttendanceRecord, 'id'>
): Promise<{ success: boolean; record: AttendanceRecord; isCloud: boolean; message: string }> {
  try {
    const res = await fetch('/api/attendance', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify(record),
    });

    let result: any = null;
    try {
      result = await res.json();
    } catch {
      throw new Error(`Server HTTP ${res.status}`);
    }

    if (!res.ok) {
      throw new Error(result?.message || `Gagal menyimpan`);
    }

    const savedRecord = result.record as AttendanceRecord;

    // Perbarui cache lokal
    const current = memoryRecordsCache || [];
    saveLocalCache([savedRecord, ...current.filter((r) => r.id !== savedRecord.id)]);

    return {
      success: true,
      record: savedRecord,
      isCloud: true,
      message: 'Presensi berhasil dicatat (Tersimpan di perangkat & siap disinkronisasi).',
    };
  } catch (err: any) {
    if (err.message && (err.message.includes('sudah') || err.message.includes('tercatat'))) {
      throw err;
    }

    console.warn('[SQL-DB] Error POST /api/attendance, simpan ke cache lokal:', err);

    // Fallback simpan lokal jika koneksi server sedang bermasalah
    const fallbackRecord: AttendanceRecord = {
      id: `rec-local-${Date.now()}`,
      ...record,
      created_at: record.created_at || new Date().toISOString(),
    };

    const currentRecords = memoryRecordsCache || [];
    saveLocalCache([fallbackRecord, ...currentRecords]);

    return {
      success: true,
      record: fallbackRecord,
      isCloud: false,
      message: 'Presensi berhasil dicatat (Tersimpan di perangkat & siap disinkronisasi).',
    };
  }
}

/**
 * Memperbarui status presensi siswa oleh Guru di Server SQL
 */
export async function updateRecordStatus(
  id: string,
  newStatus: AttendanceRecord['status'],
  notes?: string
): Promise<boolean> {
  let isUpdated = false;
  try {
    const res = await fetch(`/api/attendance?id=${encodeURIComponent(id)}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, status: newStatus, notes }),
    });
    if (res.ok) {
      isUpdated = true;
    }
  } catch (err) {
    console.warn('Update status server error, updating local:', err);
  }

  // Always update local memory and cache
  try {
    let current = memoryRecordsCache;
    if (!current) {
      const raw = localStorage.getItem(LOCAL_RECORDS_KEY);
      current = raw ? JSON.parse(raw) : [];
    }
    if (Array.isArray(current)) {
      const updated = current.map((r) =>
        r.id === id ? { ...r, status: newStatus, notes: notes !== undefined ? notes : r.notes } : r
      );
      saveLocalCache(updated);
      isUpdated = true;
    }
  } catch (e) {
    console.error('Local update error:', e);
  }

  return isUpdated;
}

/**
 * Menghapus satu rekaman presensi dari Server SQL & Cache Lokal
 */
export async function deleteRecord(id: string): Promise<boolean> {
  let isDeleted = false;
  try {
    const res = await fetch(`/api/attendance?id=${encodeURIComponent(id)}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id }),
    });
    if (res.ok) {
      isDeleted = true;
    }
  } catch (err) {
    console.warn('Delete record server error, cleaning local cache:', err);
  }

  // Always clean up local storage & memory cache
  try {
    let current = memoryRecordsCache;
    if (!current) {
      const raw = localStorage.getItem(LOCAL_RECORDS_KEY);
      current = raw ? JSON.parse(raw) : [];
    }
    if (Array.isArray(current)) {
      const filtered = current.filter((r) => r.id !== id);
      saveLocalCache(filtered);
      isDeleted = true;
    }
    // Also remove from last submission session if matching
    const lastSession = localStorage.getItem('man1_last_submission_session');
    if (lastSession) {
      try {
        const parsed = JSON.parse(lastSession);
        if (parsed?.id === id) {
          localStorage.removeItem('man1_last_submission_session');
        }
      } catch (e) {}
    }
  } catch (e) {
    console.error('Local cache delete error:', e);
  }

  return isDeleted;
}

/**
 * Mengosongkan seluruh data presensi di Server SQL & Cache Lokal
 */
export async function deleteAllAttendanceRecords(): Promise<boolean> {
  try {
    await fetch('/api/attendance', { method: 'DELETE' });
  } catch (err) {
    console.warn('Delete all server error, clearing local cache:', err);
  }
  saveLocalCache([]);
  try {
    localStorage.removeItem('man1_last_submission_session');
  } catch (e) {}
  return true;
}

export function getStoredConfig() {
  return { isConnected: true };
}
