import express from 'express';
import path from 'path';
import fs from 'fs';
import { createServer as createViteServer } from 'vite';

// Safe resolution for both native ESM and esbuild CJS bundle
const rootDir = process.cwd();


const PORT = 3000;
const DB_FILE = path.join(process.cwd(), 'attendance_database.json');

// In-memory cache
let recordsCache: any[] = [];

// Load initial database
function loadDatabase() {
  try {
    if (fs.existsSync(DB_FILE)) {
      const raw = fs.readFileSync(DB_FILE, 'utf-8');
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) {
        recordsCache = parsed;
        return;
      }
    }
  } catch (err) {
    console.error('Gagal membaca attendance_database.json:', err);
  }

  // Default seed records if empty
  recordsCache = [
    {
      id: 'rec-001',
      name: 'Muhammad Fajar Pratama',
      class: 'X A',
      prayer_type: 'Dhuha',
      status: 'Hadir',
      ai_status: 'Valid (Dual Camera: 94%)',
      ai_confidence: 94,
      gps_status: 'Valid (Dalam Radius)',
      gps_distance: 35,
      gps_coords: { latitude: -7.53606, longitude: 110.59624 },
      notes: 'Hadir sholat dhuha berjamaah',
      created_at: new Date(Date.now() - 3600000 * 3).toISOString(),
    },
    {
      id: 'rec-002',
      name: 'Aisyah Nur Rahmah',
      class: 'X B',
      prayer_type: 'Dhuha',
      status: "Halangan Syar'i",
      ai_status: 'Bypass Halangan',
      gps_status: 'Dalam Radius',
      gps_distance: 40,
      notes: 'Halangan hari ke-2',
      created_at: new Date(Date.now() - 3600000 * 2.5).toISOString(),
    },
    {
      id: 'rec-003',
      name: 'Bagas Surya Kusuma',
      class: 'XI A',
      prayer_type: 'Dzuhur',
      status: 'Hadir',
      ai_status: 'Valid (Dual Camera: 91%)',
      ai_confidence: 91,
      gps_status: 'Valid (Dalam Radius)',
      gps_distance: 18,
      gps_coords: { latitude: -7.53606, longitude: 110.59624 },
      notes: 'Presensi Dzuhur',
      created_at: new Date(Date.now() - 3600000 * 2).toISOString(),
    },
    {
      id: 'rec-004',
      name: 'Dewi Anjani Kusuma',
      class: 'XI A',
      prayer_type: 'Dzuhur',
      status: 'Sakit',
      ai_status: 'Bypass Sakit/Izin',
      gps_status: 'Di Luar Radius',
      gps_distance: 2400,
      notes: 'Izin di UKS istirahat karena demam',
      created_at: new Date(Date.now() - 3600000 * 1.5).toISOString(),
    }
  ];
  saveDatabase();
}

function saveDatabase() {
  try {
    fs.writeFileSync(DB_FILE, JSON.stringify(recordsCache, null, 2), 'utf-8');
  } catch (err) {
    console.error('Gagal menulis database file:', err);
  }
}

// Initialize on start
loadDatabase();

async function startServer() {
  const app = express();

  // Parse JSON with generous limit for dual-camera base64 snapshots
  app.use(express.json({ limit: '30mb' }));
  app.use(express.urlencoded({ extended: true, limit: '30mb' }));

  // API Health Check
  app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', time: new Date().toISOString(), totalRecords: recordsCache.length });
  });

  // GET all attendance records (accessible by all student and teacher devices)
  app.get('/api/attendance', (req, res) => {
    // Return sorted newest first
    const sorted = [...recordsCache].sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
    res.json({ success: true, data: sorted, count: sorted.length });
  });

  // POST new attendance record
  app.post('/api/attendance', (req, res) => {
    const body = req.body;
    if (!body || !body.name || !body.class || !body.prayer_type) {
      return res.status(400).json({ success: false, message: 'Data presensi tidak lengkap' });
    }

    const newRecord = {
      ...body,
      id: body.id || 'rec-' + Date.now() + '-' + Math.random().toString(36).substring(2, 7),
      created_at: body.created_at || new Date().toISOString(),
    };

    const newDate = new Date(newRecord.created_at).toISOString().split('T')[0];
    const normalizedNewName = newRecord.name.trim().toLowerCase();
    const normalizedNewClass = (newRecord.class || '').trim().toLowerCase();

    const duplicate = recordsCache.find((r: any) => {
      const normalizedExistingName = (r.name || '').trim().toLowerCase();
      const normalizedExistingClass = (r.class || '').trim().toLowerCase();
      const existingDate = new Date(r.created_at).toISOString().split('T')[0];
      return normalizedExistingName === normalizedNewName &&
             normalizedExistingClass === normalizedNewClass &&
             r.prayer_type === newRecord.prayer_type &&
             existingDate === newDate;
    });

    if (duplicate) {
      return res.status(409).json({
        success: false,
        isDuplicate: true,
        message: `Anda sudah melakukan presensi untuk sholat ${duplicate.prayer_type} hari ini. Absensi tidak dapat dilakukan dua kali.`,
        record: duplicate,
      });
    }

    // Update both cache and file
    recordsCache = [newRecord, ...recordsCache.filter((r: any) => r.id !== newRecord.id)];
    saveDatabase();

    return res.status(201).json({ success: true, record: newRecord });
  });

  // PATCH update status
  app.patch('/api/attendance/:id', (req, res) => {
    const { id } = req.params;
    const { status, notes } = req.body;

    const index = recordsCache.findIndex((r) => r.id === id);
    if (index === -1) {
      return res.status(404).json({ success: false, message: 'Data tidak ditemukan' });
    }

    recordsCache[index] = {
      ...recordsCache[index],
      ...(status ? { status } : {}),
      ...(notes !== undefined ? { notes } : {}),
    };
    saveDatabase();

    return res.json({ success: true, record: recordsCache[index] });
  });

  // DELETE record
  app.delete('/api/attendance/:id', (req, res) => {
    const { id } = req.params;
    const beforeCount = recordsCache.length;
    recordsCache = recordsCache.filter((r) => r.id !== id);
    saveDatabase();

    return res.json({ success: true, deleted: beforeCount > recordsCache.length });
  });

  // DELETE all records
  app.delete('/api/attendance', (req, res) => {
    recordsCache = [];
    saveDatabase();
    console.log('[API] Semua data presensi berhasil dihapus');
    return res.json({ success: true, message: 'Semua data berhasil dihapus' });
  });

  // Vite middleware in development
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server MAN 1 Boyolali berjalan di port ${PORT}`);
  });
}

startServer();
