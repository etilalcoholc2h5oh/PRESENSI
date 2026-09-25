import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import { adminDb } from './src/lib/firebase-admin.ts';

const rootDir = process.cwd();
const PORT = 3000;

async function startServer() {
  const app = express();

  app.use(express.json({ limit: '30mb' }));
  app.use(express.urlencoded({ extended: true, limit: '30mb' }));

  // API Health Check
  app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', database: 'firebase' });
  });

  // GET all records from Firestore
  app.get('/api/attendance', async (req, res) => {
    try {
      const snapshot = await adminDb.collection('attendance')
        .orderBy('created_at', 'desc')
        .get();
      
      const records = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      
      res.json({ success: true, data: records });
    } catch (err) {
      console.error('Gagal fetch attendance:', err);
      res.status(500).json({ success: false, message: 'Gagal mengambil data' });
    }
  });

  // POST new record to Firestore
  app.post('/api/attendance', async (req, res) => {
    try {
      const body = req.body;
      if (!body || !body.name || !body.class || !body.prayer_type) {
        return res.status(400).json({ success: false, message: 'Data tidak lengkap' });
      }

      // Check for duplicate (same person, same prayer, same day)
      const newDate = new Date(body.created_at || new Date().toISOString()).toISOString().split('T')[0];
      const name = String(body.name).trim();
      
      const duplicateQuery = await adminDb.collection('attendance')
        .where('name', '==', name)
        .where('prayer_type', '==', body.prayer_type)
        .get();

      const isDuplicate = duplicateQuery.docs.some(doc => {
        const docDate = new Date(doc.data().created_at).toISOString().split('T')[0];
        return docDate === newDate;
      });

      if (isDuplicate) {
        return res.status(409).json({ 
          success: false, 
          message: `Anda sudah melakukan presensi untuk sholat ${body.prayer_type} hari ini.` 
        });
      }

      const newRecord = {
        ...body,
        created_at: body.created_at || new Date().toISOString(),
      };

      const docRef = await adminDb.collection('attendance').add(newRecord);
      
      res.status(201).json({ 
        success: true, 
        record: { id: docRef.id, ...newRecord } 
      });
    } catch (err) {
      console.error('Gagal save attendance:', err);
      res.status(500).json({ success: false, message: 'Server error' });
    }
  });

  // PATCH update status
  app.patch('/api/attendance/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const { status, notes } = req.body;

      await adminDb.collection('attendance').doc(id).update({
        status,
        notes: notes || ''
      });
      
      const updatedDoc = await adminDb.collection('attendance').doc(id).get();
      res.json({ success: true, record: { id: updatedDoc.id, ...updatedDoc.data() } });
    } catch (err) {
      console.error('Gagal update attendance:', err);
      res.status(500).json({ success: false });
    }
  });

  // DELETE record
  app.delete('/api/attendance/:id', async (req, res) => {
    try {
      const { id } = req.params;
      await adminDb.collection('attendance').doc(id).delete();
      res.json({ success: true });
    } catch (err) {
      console.error('Gagal delete attendance:', err);
      res.status(500).json({ success: false });
    }
  });

  // DELETE ALL
  app.delete('/api/attendance', async (req, res) => {
    try {
      const snapshot = await adminDb.collection('attendance').get();
      const batch = adminDb.batch();
      snapshot.docs.forEach(doc => batch.delete(doc.ref));
      await batch.commit();
      res.json({ success: true });
    } catch (err) {
      console.error('Gagal reset attendance:', err);
      res.status(500).json({ success: false });
    }
  });

  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => res.sendFile(path.join(distPath, 'index.html')));
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server mandiri (Firebase) berjalan di port ${PORT}`);
  });
}

startServer();
