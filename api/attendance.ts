import { neon } from '@neondatabase/serverless';

function getDb() {
  // 1. Scan otomatis semua variabel koneksi Postgres/Neon di Vercel
  for (const [key, value] of Object.entries(process.env)) {
    if (
      typeof value === 'string' &&
      (value.startsWith('postgres://') || value.startsWith('postgresql://'))
    ) {
      return neon(value);
    }
  }

  // 2. Cek variabel standar
  const connectionString =
    process.env.POSTGRES_URL ||
    process.env.DATABASE_URL ||
    process.env.POSTGRES_PRISMA_URL ||
    process.env.POSTGRES_URL_NON_POOLING ||
    process.env.NEON_BLUE_FOREST_URL ||
    process.env.NEON_BLUE_FOREST_DATABASE_URL ||
    process.env.NEON_BLUE_FOREST_POSTGRES_URL ||
    process.env.STORAGE_POSTGRES_URL ||
    process.env.STORAGE_DATABASE_URL ||
    process.env.STORAGE_URL ||
    process.env.NEON_DATABASE_URL ||
    '';

  if (!connectionString) {
    return null;
  }
  return neon(connectionString);
}

let tableInitialized = false;

async function ensureTable(sql: ReturnType<typeof neon>) {
  if (tableInitialized) return;
  try {
    await sql`
      CREATE TABLE IF NOT EXISTS attendance_records (
        id VARCHAR(128) PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        class VARCHAR(64) NOT NULL,
        prayer_type VARCHAR(64) NOT NULL,
        status VARCHAR(64) NOT NULL,
        ai_status TEXT,
        ai_confidence REAL,
        gps_status TEXT,
        gps_distance REAL,
        gps_coords JSONB,
        snapshot_photo TEXT,
        notes TEXT,
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
      );
    `;
    await sql`
      CREATE INDEX IF NOT EXISTS idx_attendance_lookup 
      ON attendance_records (name, class, prayer_type, created_at DESC);
    `;
    tableInitialized = true;
  } catch (err) {
    console.error('Failed to create attendance_records table:', err);
  }
}

export default async function handler(req: any, res: any) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  const sql = getDb();
  if (!sql) {
    return res.status(500).json({
      success: false,
      error: 'POSTGRES_URL is not configured yet on Vercel.',
      message: 'Database Neon SQL belum terhubung di Environment Variables Vercel.',
    });
  }

  await ensureTable(sql);

  const { method } = req;
  const urlParts = req.url ? req.url.split('?')[0].split('/') : [];
  const pathId = urlParts.length > 3 ? urlParts[urlParts.length - 1] : req.query?.id;

  let body = req.body;
  if (typeof body === 'string') {
    try {
      body = JSON.parse(body);
    } catch {
      body = {};
    }
  }
  body = body || {};

  try {
    // 1. GET /api/attendance
    if (method === 'GET') {
      const rows = await sql`
        SELECT 
          id, name, class, prayer_type, status, 
          ai_status, ai_confidence, gps_status, gps_distance, 
          gps_coords, snapshot_photo, notes, 
          to_char(created_at AT TIME ZONE 'Asia/Jakarta', 'YYYY-MM-DD"T"HH24:MI:SS.MS"Z"') AS created_at
        FROM attendance_records
        ORDER BY created_at DESC
        LIMIT 2000;
      `;

      return res.status(200).json({
        success: true,
        data: rows,
        count: rows.length,
        isFromCloud: true,
        source: 'Neon Postgres (SQL)',
      });
    }

    // 2. POST /api/attendance
    if (method === 'POST') {
      const postData = body || {};
      const {
        name,
        class: studentClass,
        prayer_type,
        status = 'Hadir',
        ai_status,
        ai_confidence,
        gps_status,
        gps_distance,
        gps_coords,
        snapshot_photo,
        notes,
      } = postData;

      if (!name || !studentClass || !prayer_type) {
        return res.status(400).json({
          success: false,
          message: 'Nama siswa, kelas, dan sesi sholat wajib diisi.',
        });
      }

      // Cek duplikasi hari ini (WIB)
      const existing = await sql`
        SELECT id FROM attendance_records
        WHERE LOWER(TRIM(name)) = LOWER(TRIM(${name}))
          AND LOWER(REPLACE(class, ' ', '')) = LOWER(REPLACE(${studentClass}, ' ', ''))
          AND prayer_type = ${prayer_type}
          AND created_at >= (NOW() AT TIME ZONE 'Asia/Jakarta')::date
        LIMIT 1;
      `;

      if (existing.length > 0) {
        return res.status(409).json({
          success: false,
          message: `Siswa ${name} (${studentClass}) sudah tercatat presensi ${prayer_type} hari ini.`,
        });
      }

      const id = postData.id || `att-sql-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`;
      const createdAt = postData.created_at ? new Date(postData.created_at) : new Date();
      const finalPhoto = snapshot_photo || postData.photo_url || null;

      await sql`
        INSERT INTO attendance_records (
          id, name, class, prayer_type, status,
          ai_status, ai_confidence, gps_status, gps_distance,
          gps_coords, snapshot_photo, notes, created_at
        ) VALUES (
          ${id},
          ${name.trim()},
          ${studentClass.trim()},
          ${prayer_type},
          ${status},
          ${ai_status || null},
          ${ai_confidence || null},
          ${gps_status || null},
          ${gps_distance || null},
          ${gps_coords ? JSON.stringify(gps_coords) : null},
          ${finalPhoto},
          ${notes || null},
          ${createdAt}
        );
      `;

      const newRecord = {
        id,
        name: name.trim(),
        class: studentClass.trim(),
        prayer_type,
        status,
        ai_status,
        ai_confidence,
        gps_status,
        gps_distance,
        gps_coords,
        snapshot_photo: finalPhoto,
        photo_url: finalPhoto,
        notes,
        created_at: createdAt.toISOString(),
      };

      return res.status(201).json({
        success: true,
        record: newRecord,
        isCloud: true,
        source: 'Neon Postgres (SQL)',
        message: 'Presensi berhasil dicatat di Server Database Madrasah.',
      });
    }

    // 3. PATCH /api/attendance
    if (method === 'PATCH') {
      const recordId = req.query?.id || body?.id || pathId;
      if (!recordId) {
        return res.status(400).json({ success: false, message: 'ID presensi diperlukan.' });
      }

      const { status, notes } = body || {};
      if (status && notes !== undefined) {
        await sql`
          UPDATE attendance_records
          SET status = ${status}, notes = ${notes}
          WHERE id = ${recordId};
        `;
      } else if (status) {
        await sql`
          UPDATE attendance_records
          SET status = ${status}
          WHERE id = ${recordId};
        `;
      } else if (notes !== undefined) {
        await sql`
          UPDATE attendance_records
          SET notes = ${notes}
          WHERE id = ${recordId};
        `;
      }

      return res.status(200).json({
        success: true,
        message: 'Status presensi berhasil diperbarui.',
      });
    }

    // 4. DELETE /api/attendance
    if (method === 'DELETE') {
      const recordId = req.query?.id || body?.id || pathId;
      if (recordId) {
        await sql`
          DELETE FROM attendance_records
          WHERE id = ${recordId};
        `;
        return res.status(200).json({
          success: true,
          message: `Data presensi ${recordId} berhasil dihapus dari SQL.`,
        });
      } else {
        await sql`DELETE FROM attendance_records;`;
        return res.status(200).json({
          success: true,
          message: 'Seluruh rekaman presensi berhasil dikosongkan.',
        });
      }
    }

    return res.status(405).json({ error: `Method ${method} not allowed` });
  } catch (error: any) {
    console.error('SQL Attendance Error:', error);
    return res.status(500).json({
      success: false,
      error: error.message || 'Internal Server Error',
    });
  }
}