import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Fallback configuration to ensure 100% reliability on Vercel/GitHub deployments even if config json is missing
const fallbackConfig = {
  projectId: 'gen-lang-client-0559386805',
  appId: '1:554782738500:web:3c9037b683b9bdb02cd411',
  apiKey: 'AIzaSyDWzN7o5Q3V8T2wbJyPjfGNay4nMAbBrA0',
  authDomain: 'gen-lang-client-0559386805.firebaseapp.com',
  firestoreDatabaseId: 'ai-studio-presensisholatsi-22b8319d-8284-49ce-9df6-f68885f808f2',
  storageBucket: 'gen-lang-client-0559386805.firebasestorage.app',
  messagingSenderId: '554782738500',
  measurementId: '',
};

let resolvedConfig = fallbackConfig;

// 1. Check if single JSON env var is provided (e.g. VITE_FIREBASE_CONFIG_JSON)
const singleJsonEnv = (import.meta.env as any).VITE_FIREBASE_CONFIG_JSON;
if (singleJsonEnv) {
  try {
    const parsed = JSON.parse(singleJsonEnv);
    if (parsed && parsed.apiKey) {
      resolvedConfig = parsed;
    }
  } catch (e) {
    console.warn('Failed to parse VITE_FIREBASE_CONFIG_JSON', e);
  }
} else {
  // 2. Check individual env vars or local config json
  resolvedConfig = {
    projectId: (import.meta.env as any).VITE_FIREBASE_PROJECT_ID || fallbackConfig.projectId,
    appId: (import.meta.env as any).VITE_FIREBASE_APP_ID || fallbackConfig.appId,
    apiKey: (import.meta.env as any).VITE_FIREBASE_API_KEY || fallbackConfig.apiKey,
    authDomain: (import.meta.env as any).VITE_FIREBASE_AUTH_DOMAIN || fallbackConfig.authDomain,
    firestoreDatabaseId: (import.meta.env as any).VITE_FIRESTORE_DATABASE_ID || fallbackConfig.firestoreDatabaseId,
    storageBucket: (import.meta.env as any).VITE_FIREBASE_STORAGE_BUCKET || fallbackConfig.storageBucket,
    messagingSenderId: (import.meta.env as any).VITE_FIREBASE_MESSAGING_SENDER_ID || fallbackConfig.messagingSenderId,
    measurementId: (import.meta.env as any).VITE_FIREBASE_MEASUREMENT_ID || fallbackConfig.measurementId,
  };

  try {
    if (!resolvedConfig.apiKey || resolvedConfig.apiKey === fallbackConfig.apiKey) {
      // @ts-ignore
      const localConfig = require('../../firebase-applet-config.json');
      if (localConfig && localConfig.apiKey) {
        resolvedConfig = localConfig;
      }
    }
  } catch {
    // Use fallback / env
  }
}

const app = initializeApp(resolvedConfig);
export const auth = getAuth(app);
export const db = getFirestore(app, resolvedConfig.firestoreDatabaseId || fallbackConfig.firestoreDatabaseId);
export const googleAuthProvider = new GoogleAuthProvider();



