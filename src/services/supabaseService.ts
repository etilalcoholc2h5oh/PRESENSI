import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { AttendanceRecord, SupabaseConfig } from '../types';
import { DEMO_ATTENDANCE_RECORDS } from '../data/madrasahData';

const CONFIG_STORAGE_KEY = 'man1_supabase_config';
const LOCAL_RECORDS_KEY = 'man1_local_attendance_records';

export const SUPABASE_SQL_SCHEMA = `-- SQL SCHEMA UNTUK SUPABASE DATABASE
-- 1. Buat Tabel presensi_sholat
CREATE TABLE IF NOT EXISTS presensi_sholat (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    class TEXT NOT NULL,
    prayer_type TEXT NOT NULL,
    status TEXT NOT NULL,
    ai_status TEXT,
    ai_confidence NUMERIC,
    gps_status TEXT,
    gps_distance NUMERIC,
    gps_coords JSONB,
    snapshot_photo TEXT,
    notes TEXT,
    created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. Buat Index
CREATE INDEX IF NOT EXISTS idx_presensi_created_at ON presensi_sholat(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_presensi_class ON presensi_sholat(class);
CREATE INDEX IF NOT EXISTS idx_presensi_prayer ON presensi_sholat(prayer_type);

-- 3. Row Level Security
ALTER TABLE presensi_sholat ENABLE ROW LEVEL SECURITY;

-- 4. Kebijakan Akses
CREATE POLICY "Izinkan Siswa Melakukan Input Presensi" ON presensi_sholat FOR INSERT WITH CHECK (true);
CREATE POLICY "Izinkan Baca Data Presensi" ON presensi_sholat FOR SELECT USING (true);
CREATE POLICY "Izinkan Guru Update Status Presensi" ON presensi_sholat FOR UPDATE USING (true);
CREATE POLICY "Izinkan Guru Hapus Data Presensi" ON presensi_sholat FOR DELETE USING (true);
`;

let clientInstance: SupabaseClient | null = null;
let memoryRecordsCache: AttendanceRecord[] | null = null;

export function getStoredConfig(): SupabaseConfig {
  const envUrl = (import.meta as any).env?.VITE_SUPABASE_URL || '';
  const envKey = (import.meta as any).env?.VITE_SUPABASE_ANON_KEY || '';

  // 1. Cek local storage terlebih dahulu agar konfigurasi permanen tersimpan antar sesi
  try {
    const saved = localStorage.getItem(CONFIG_STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      if (parsed.url && parsed.anonKey) {
        return {
          url: parsed.url,
          anonKey: parsed.anonKey,
          tableName: parsed.tableName || 'presensi_sholat',
          isConnected: true,
        };
      }
    }
  } catch (e) {
    console.warn('Gagal membaca konfigurasi Supabase dari storage', e);
  }

  // 2. Fallback ke Environment Variables jika ada
  if (envUrl && envKey) {
    return {
      url: envUrl,
      anonKey: envKey,
      tableName: 'presensi_sholat',
      isConnected: true,
    };
  }

  return {
    url: '',
    anonKey: '',
    tableName: 'presensi_sholat',
    isConnected: false,
  };
}

export function initSupabaseClient(url?: string, anonKey?: string): SupabaseClient | null {
  const currentConfig = getStoredConfig();
  const finalUrl = url ?? currentConfig.url;
  const finalKey = anonKey ?? currentConfig.anonKey;

  if (!finalUrl || !finalKey) {
    clientInstance = null;
    return null;
  }

  try {
    clientInstance = createClient(finalUrl.trim(), finalKey.trim(), {
      auth: { persistSession: false, autoRefreshToken: false }
    });
    return clientInstance;
  } catch (err) {
    console.error('Error inisialisasi Supabase client:', err);
    clientInstance = null;
    return null;
  }
}

// Auto-initialize client on load for permanent connection
try {
  clientInstance = initSupabaseClient();
} catch (e) {
  console.warn('Auto-init client warning:', e);
}

export async function saveSupabaseConfig(url: string, anonKey: string): Promise<{ success: boolean; message: string }> {
  try {
    const trimmedUrl = url.trim();
    const trimmedKey = anonKey.trim();

    if (!trimmedUrl && !trimmedKey) {
      localStorage.removeItem(CONFIG_STORAGE_KEY);
      clientInstance = null;
      return { success: true, message: 'Konfigurasi Supabase dihapus. Menggunakan database lokal.' };
    }

    const testClient = createClient(trimmedUrl, trimmedKey);
    const { error } = await testClient.from('presensi_sholat').select('id').limit(1);

    if (error) {
      localStorage.setItem(CONFIG_STORAGE_KEY, JSON.stringify({ url: trimmedUrl, anonKey: trimmedKey, tableName: 'presensi_sholat' }));
      clientInstance = testClient;
      return {
        success: true,
        message: `Kredensial disimpan. Catatan: Tabel presensi_sholat mungkin belum dibuat (${error.message}).`,
      };
    }

    localStorage.setItem(CONFIG_STORAGE_KEY, JSON.stringify({ url: trimmedUrl, anonKey: trimmedKey, tableName: 'presensi_sholat' }));
    clientInstance = testClient;
    return { success: true, message: 'Berhasil terhubung ke Supabase Cloud.' };
  } catch (err: any) {
    return { success: false, message: 'Gagal menghubungkan: ' + (err.message || 'URL/Key tidak valid') };
  }
}

function getLocalRecords(): AttendanceRecord[] {
  if (memoryRecordsCache !== null) {
    return memoryRecordsCache;
  }
  try {
    const raw = localStorage.getItem(LOCAL_RECORDS_KEY);
    if (raw !== null) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) {
        memoryRecordsCache = parsed;
        return parsed;
      }
    }
  } catch (e) {
    console.error('Gagal membaca database lokal:', e);
  }
  memoryRecordsCache = [...DEMO_ATTENDANCE_RECORDS];
  saveLocalRecords(DEMO_ATTENDANCE_RECORDS);
  return DEMO_ATTENDANCE_RECORDS;
}

function saveLocalRecords(records: AttendanceRecord[]) {
  memoryRecordsCache = [...records];
  try {
    localStorage.setItem(LOCAL_RECORDS_KEY, JSON.stringify(records));
  } catch (e) {
    console.warn('Storage quota warning, mengoptimalkan penyimpanan lokal...', e);
    // Jika quota storage penuh karena foto base64, kompres data foto pada data lama
    try {
      const optimizedRecords = records.map((rec, index) => {
        // Hanya simpan foto penuh untuk 8 record terbaru
        if (index > 7 && rec.snapshot_photo && rec.snapshot_photo.length > 500) {
          return {
            ...rec,
            snapshot_photo: undefined,
          };
        }
        return rec;
      });
      localStorage.setItem(LOCAL_RECORDS_KEY, JSON.stringify(optimizedRecords));
      memoryRecordsCache = optimizedRecords;
    } catch (retryErr) {
      console.error('Penyimpanan lokal penuh, data tetap tersimpan di memory sesi:', retryErr);
    }
  }
  // Beritahu seluruh komponen bahwa data presensi telah diperbarui
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('presensi_updated', { detail: records }));
  }
}

export async function getAttendanceRecords(): Promise<{ data: AttendanceRecord[]; isFromCloud: boolean }> {
  // 1. Prioritaskan Supabase jika ada kredensial kustom
  const client = clientInstance || initSupabaseClient();
  if (client) {
    try {
      const { data, error } = await client
        .from('presensi_sholat')
        .select('*')
        .order('created_at', { ascending: false });

      if (!error && data) {
        saveLocalRecords(data);
        return { data, isFromCloud: true };
      }
    } catch (err) {
      console.warn('Supabase fetch error:', err);
    }
  }

  // 2. Database Server Terpusat (Bisa diakses bersama seluruh HP siswa & laptop guru)
  try {
    const res = await fetch('/api/attendance');
    if (res.ok) {
      const result = await res.json();
      if (result.success && Array.isArray(result.data)) {
        saveLocalRecords(result.data);
        return { data: result.data, isFromCloud: true };
      }
    }
  } catch (err) {
    console.warn('Gagal koneksi ke server database presensi, beralih ke cache lokal:', err);
  }

  // 3. Fallback cache lokal
  return { data: getLocalRecords(), isFromCloud: false };
}

export async function submitAttendanceRecord(record: Omit<AttendanceRecord, 'id'>): Promise<{ success: boolean; record: AttendanceRecord; isCloud: boolean; message: string }> {
  const temporaryId = 'rec-' + Date.now() + '-' + Math.random().toString(36).substring(2, 6);
  const finalRecord: AttendanceRecord = {
    ...record,
    id: temporaryId,
    created_at: new Date().toISOString(),
  };

  let isCloudSuccess = false;

  // 1. Coba simpan ke Supabase jika aktif (dengan timeout 3 detik agar tidak macet jika koneksi putus-nyambung)
  const client = clientInstance || initSupabaseClient();
  if (client) {
    try {
      const payload = {
        name: finalRecord.name,
        class: finalRecord.class,
        prayer_type: finalRecord.prayer_type,
        status: finalRecord.status,
        ai_status: finalRecord.ai_status,
        ai_confidence: finalRecord.ai_confidence || null,
        snapshot_photo: finalRecord.snapshot_photo || null,
        notes: finalRecord.notes || null,
      };

      const supabasePromise = client.from('presensi_sholat').insert([payload]).select().single();
      const timeoutPromise = new Promise((_, reject) => setTimeout(() => reject(new Error('Supabase timeout')), 3000));

      const res: any = await Promise.race([supabasePromise, timeoutPromise]);
      if (res && !res.error) {
        if (res.data) {
          Object.assign(finalRecord, res.data);
        }
        isCloudSuccess = true;
      } else if (res && res.error) {
        console.warn('Supabase insert warning:', res.error);
      }
    } catch (err) {
      console.warn('Supabase putus/lambat, beralih ke server lokal/cache:', err);
    }
  }

  // 2. Simpan ke Server Terpusat & LocalStorage sebagai mirror & jaminan pasti masuk
  try {
    const res = await fetch('/api/attendance', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(finalRecord),
    });
    if (res.ok) {
      const result = await res.json();
      if (result.success && result.record) {
        Object.assign(finalRecord, result.record);
        isCloudSuccess = true;
      }
    }
  } catch (err) {
    console.warn('Simpan ke server lokal gagal, menggunakan penyimpanan lokal.', err);
  }

  const currentLocal = getLocalRecords();
  const updatedList = [finalRecord, ...currentLocal.filter((r) => r.id !== finalRecord.id)];
  saveLocalRecords(updatedList);

  return {
    success: true,
    record: finalRecord,
    isCloud: isCloudSuccess || !!client,
    message: isCloudSuccess ? 'Presensi berhasil disimpan ke Cloud & Server Guru!' : 'Presensi tersimpan di sistem.',
  };
}

export async function updateRecordStatus(id: string, newStatus: AttendanceRecord['status'], notes?: string): Promise<boolean> {
  const client = clientInstance || initSupabaseClient();
  if (client) {
    try {
      const updateData: any = { status: newStatus };
      if (notes !== undefined) updateData.notes = notes;

      await client
        .from('presensi_sholat')
        .update(updateData)
        .eq('id', id);
    } catch (err) {
      console.error(err);
    }
  }

  // Update di server database
  try {
    await fetch(`/api/attendance/${encodeURIComponent(id)}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status: newStatus, notes }),
    });
  } catch (err) {
    console.warn('Gagal update status di server:', err);
  }

  const current = getLocalRecords();
  const updated = current.map((item) => {
    if (item.id === id) {
      return { ...item, status: newStatus, notes: notes !== undefined ? notes : item.notes };
    }
    return item;
  });
  saveLocalRecords(updated);
  return true;
}

export async function deleteRecord(id: string): Promise<boolean> {
  const client = clientInstance || initSupabaseClient();
  if (client) {
    try {
      await client.from('presensi_sholat').delete().eq('id', id);
    } catch (err) {
      console.error(err);
    }
  }

  // Hapus di server database
  try {
    await fetch(`/api/attendance/${encodeURIComponent(id)}`, {
      method: 'DELETE',
    });
  } catch (err) {
    console.warn('Gagal hapus data di server:', err);
  }

  const current = getLocalRecords();
  const filtered = current.filter((item) => item.id !== id);
  saveLocalRecords(filtered);
  return true;
}
