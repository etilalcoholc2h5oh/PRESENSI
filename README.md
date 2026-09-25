# Presensi Sholat Siswa - MAN 1 Boyolali

Aplikasi presensi ibadah harian terverifikasi berbasis Dual-Camera AI & Geofencing GPS terintegrasi Google Firebase Firestore Cloud Database.

---

## 🚀 Fitur Utama
1. **Verifikasi AI Dual-Camera**: Deteksi objek manusia/jamaah secara real-time via TensorFlow COCO-SSD & Dual Snapshot.
2. **Validasi Geofencing GPS**: Memastikan presensi dilakukan di area lingkungan madrasah.
3. **Google Firebase Firestore**: Sinkronisasi data presensi cloud secara instan, aman, dan realtime.
4. **Dashboard Guru & Export Data**: Rekapitulasi absensi harian per kelas, filter sholat, validasi/koreksi kehadiran, serta ekspor format Excel & PDF resmi.

---

## 🔒 Akses Pengawas / Guru
- **PIN Guru / Admin**: `3103` (Bawaan resmi madrasah)
- Dilengkapi proteksi **Rate Limiting anti brute-force**:
  - Maksimal 5x kesalahan input PIN berturut-turut.
  - Penguncian (*lockout*) selama 30 detik dengan timer hitungan mundur.
