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

  // FORCE priority to environment variables if they are present
  if (envUrl && envKey) {
    return {
      url: envUrl,
      anonKey: envKey,
      tableName: 'presensi_sholat',
      isConnected: false,
    };
  }

  // Fallback to local storage if environment variables are NOT set
  try {
    const saved = localStorage.getItem(CONFIG_STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      return {
        url: parsed.url || envUrl,
        anonKey: parsed.anonKey || envKey,
        tableName: parsed.tableName || 'presensi_sholat',
        isConnected: false,
      };
    }
  } catch (e) {
    console.warn('Gagal membaca konfigurasi Supabase dari storage', e);
  }
  return {
    url: envUrl,
    anonKey: envKey,
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
    clientInstance = createClient(finalUrl.trim(), finalKey.trim());
    return clientInstance;
  } catch (err) {
    console.error('Error inisialisasi Supabase client:', err);
    clientInstance = null;
    return null;
  }
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
  const client = clientInstance || initSupabaseClient();
  let cloudRecord: AttendanceRecord | null = null;
  let isCloudSuccess = false;

  // 1. Simpan ke Supabase jika aktif
  let supabaseErrorDetail = '';
  if (client) {
    try {
      const payload = {
        name: record.name,
        class: record.class,
        prayer_type: record.prayer_type,
        status: record.status,
        ai_status: record.ai_status,
        ai_confidence: record.ai_confidence || null,
        gps_status: record.gps_status,
        gps_distance: record.gps_distance ? Math.round(record.gps_distance) : null,
        gps_coords: record.gps_coords || null,
        snapshot_photo: record.snapshot_photo || null,
        notes: record.notes || null,
      };

      const { data, error } = await client
        .from('presensi_sholat')
        .insert([payload])
        .select()
        .single();

      if (error) {
        console.error('Supabase insert error:', error);
        supabaseErrorDetail = error.message;
      } else if (data) {
        cloudRecord = data;
        isCloudSuccess = true;
      }
    } catch (err: any) {
      console.error('Supabase insert exception:', err);
      supabaseErrorDetail = err?.message || 'Gagal terhubung ke Supabase';
    }
  } else {
    supabaseErrorDetail = 'Kunci Supabase belum terpasang di perangkat ini';
  }

  // 2. Kirim ke Server Terpusat MAN 1 Boyolali agar otomatis tersinkron ke semua HP / Laptop Guru
  try {
    const res = await fetch('/api/attendance', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(record),
    });
    if (res.ok) {
      const result = await res.json();
      if (result.success && result.record) {
        cloudRecord = result.record;
        isCloudSuccess = true;
      }
    }
  } catch (err) {
    // Abaikan jika server lokal tidak aktif
  }

  const finalRecord: AttendanceRecord = cloudRecord || {
    ...record,
    id: 'rec-' + Date.now() + '-' + Math.random().toString(36).substring(2, 6),
    created_at: new Date().toISOString(),
  };

  const currentLocal = getLocalRecords();
  const updatedList = [finalRecord, ...currentLocal.filter((r) => r.id !== finalRecord.id)];
  saveLocalRecords(updatedList);

  return {
    success: true,
    record: finalRecord,
    isCloud: isCloudSuccess,
    message: isCloudSuccess
      ? 'Presensi & foto berhasil masuk ke database pusat guru!'
      : `Presensi tersimpan di HP. (Catatan Cloud: ${supabaseErrorDetail || 'Belum tersambung ke Supabase'})`,
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
