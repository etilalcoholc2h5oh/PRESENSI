# Presensi Sholat Siswa - MAN 1 Boyolali

Aplikasi presensi ibadah harian terverifikasi berbasis Dual-Camera AI & Geofencing GPS terintegrasi Google Firebase Firestore Cloud Database.

---

## 🚀 Fitur Utama
1. **Foto Presensi Dual-Kamera (2 Sudut)**: kamera depan (wajah) dan belakang (suasana) digabung menjadi satu foto kecil (≈15 KB) lengkap dengan nama, kelas, sholat, dan waktu WIB.
2. **Jadwal Sholat WIB**: Dhuha 06:55–07:15 dan Dzuhur 11:40–12:15 (sumber tunggal di `src/data/madrasahData.ts`). Semua tanggal dan jam dihitung dalam WIB.
3. **Google Firebase Firestore**: presensi dikirim langsung ke database. Jika server/jaringan bermasalah, presensi tersimpan di HP siswa dan dikirim ulang otomatis.
4. **Dashboard Guru & Export Data**: rekap per kelas (termasuk daftar siswa berhalangan haid/sakit/izin), filter, koreksi status, hapus data sampai server, serta ekspor Excel & PDF untuk seluruh periode.
5. **Masa simpan 7 hari (TTL)**: tiap data menyimpan `expireAt`; aktifkan kebijakan TTL di Firebase console (Firestore → TTL → koleksi `attendance`, kolom `expireAt`).

---

## 🔒 Akses Pengawas / Guru
- **PIN Guru / Admin**: `3103` (Bawaan resmi madrasah)
- Dilengkapi proteksi **Rate Limiting anti brute-force**:
  - Maksimal 5x kesalahan input PIN berturut-turut.
  - Penguncian (*lockout*) selama 30 detik dengan timer hitungan mundur.
