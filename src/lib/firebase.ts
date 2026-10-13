import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import firebaseAppletConfig from '../../firebase-applet-config.json';

// Konfigurasi Firebase HANYA dari firebase-applet-config.json (project presensi-man1, database "(default)").
// Sengaja tidak membaca variabel lingkungan VITE_FIREBASE_* agar sisa pengaturan lama di Vercel
// tidak diam-diam mengarahkan aplikasi ke project lama.
const { firestoreDatabaseId, ...firebaseOptions } = firebaseAppletConfig as Record<string, string>;

const app = initializeApp(firebaseOptions);

export const db =
  !firestoreDatabaseId || firestoreDatabaseId === '(default)'
    ? getFirestore(app)
    : getFirestore(app, firestoreDatabaseId);
