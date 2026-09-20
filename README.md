# Presensi Sholat Siswa - MAN 1 Boyolali

Aplikasi presensi ibadah harian terverifikasi berbasis Dual-Camera AI & Geofencing GPS terintegrasi Supabase Cloud Database.

---

## 🚀 Panduan Deploy ke Vercel

### 1. Upload ke GitHub
1. Unduh file proyek ini dalam format **ZIP** dari menu Google AI Studio.
2. Ekstrak ZIP di komputer Anda.
3. Buat repository baru di [GitHub](https://github.com/new) (misalnya: `presensi-man1-boyolali`).
4. Unggah/Push semua file ke repository GitHub tersebut.

---

### 2. Deploy di Vercel
1. Buka [Vercel](https://vercel.com) dan login menggunakan akun GitHub Anda.
2. Klik **Add New...** > **Project**.
3. Pilih repository `presensi-man1-boyolali` dari GitHub Anda.
4. Pada bagian **Build and Output Settings**:
   - **Framework Preset**: `Vite`
   - **Build Command**: `vite build`
   - **Output Directory**: `dist`
5. Pada bagian **Environment Variables**, tambahkan dua variabel dari project Supabase Anda:
   - `VITE_SUPABASE_URL` = `https://[PROJECT-ID].supabase.co`
   - `VITE_SUPABASE_ANON_KEY` = `eyJh...[anon-public-key-anda]`
6. Klik tombol **Deploy** dan tunggu 1-2 menit hingga selesai!

---

### 3. Setup Tabel di Supabase (Jika belum)
Jalankan perintah SQL berikut pada menu **SQL Editor** di Dashboard Supabase:

```sql
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

CREATE INDEX IF NOT EXISTS idx_presensi_created_at ON presensi_sholat(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_presensi_class ON presensi_sholat(class);
CREATE INDEX IF NOT EXISTS idx_presensi_prayer ON presensi_sholat(prayer_type);

ALTER TABLE presensi_sholat ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Izinkan Siswa Melakukan Input Presensi" ON presensi_sholat FOR INSERT WITH CHECK (true);
CREATE POLICY "Izinkan Baca Data Presensi" ON presensi_sholat FOR SELECT USING (true);
CREATE POLICY "Izinkan Guru Update Status Presensi" ON presensi_sholat FOR UPDATE USING (true);
CREATE POLICY "Izinkan Guru Hapus Data Presensi" ON presensi_sholat FOR DELETE USING (true);
```

---

## 🔒 Akses Pengawas / Guru
- **PIN Guru / Admin**: `3103` (Bawaan tetap madrasah)
- Dilengkapi fitur proteksi **Rate Limiting anti brute-force**:
  - Maksimal 5x kesalahan berturut-turut.
  - Penguncian (*lockout*) selama 30 detik dengan timer hitungan mundur.
