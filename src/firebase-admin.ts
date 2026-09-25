import { initializeApp, getApps } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';
import { getFirestore } from 'firebase-admin/firestore';
import fs from 'fs';
import path from 'path';

let firebaseConfig: any;
try {
  const configPath = path.resolve(process.cwd(), 'firebase-applet-config.json');
  const rawConfig = fs.readFileSync(configPath, 'utf8');
  firebaseConfig = JSON.parse(rawConfig);
} catch (err) {
  console.error('Gagal memuat firebase-applet-config.json:', err);
  // Fallback placeholder to prevent total crash during build
  firebaseConfig = { projectId: 'placeholder' };
}

let app: any;
if (!getApps().length) {
  app = initializeApp({
    projectId: firebaseConfig.projectId,
  });
  console.log('[Firebase Admin] Initialized with project:', firebaseConfig.projectId);
} else {
  app = getApps()[0];
}

export const adminAuth = getAuth(app);
export const adminDb = firebaseConfig.firestoreDatabaseId && firebaseConfig.firestoreDatabaseId !== '(default)'
  ? getFirestore(app, firebaseConfig.firestoreDatabaseId)
  : getFirestore(app);

