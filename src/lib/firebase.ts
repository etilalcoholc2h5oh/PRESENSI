import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import firebaseAppletConfig from '../../firebase-applet-config.json';

// Fallback / default configuration to ensure 100% reliability on Vercel/GitHub deployments
const defaultConfig = {
  projectId: firebaseAppletConfig.projectId || 'gen-lang-client-0559386805',
  appId: firebaseAppletConfig.appId || '1:554782738500:web:3c9037b683b9bdb02cd411',
  apiKey: firebaseAppletConfig.apiKey || 'AIzaSyDWzN7o5Q3V8T2wbJyPjfGNay4nMAbBrA0',
  authDomain: firebaseAppletConfig.authDomain || 'gen-lang-client-0559386805.firebaseapp.com',
  firestoreDatabaseId: firebaseAppletConfig.firestoreDatabaseId || 'ai-studio-presensisholatsi-22b8319d-8284-49ce-9df6-f68885f808f2',
  storageBucket: firebaseAppletConfig.storageBucket || 'gen-lang-client-0559386805.firebasestorage.app',
  messagingSenderId: firebaseAppletConfig.messagingSenderId || '554782738500',
  measurementId: firebaseAppletConfig.measurementId || '',
};

let resolvedConfig = defaultConfig;

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
  // 2. Override with individual VITE_ env vars if specified
  resolvedConfig = {
    projectId: (import.meta.env as any).VITE_FIREBASE_PROJECT_ID || defaultConfig.projectId,
    appId: (import.meta.env as any).VITE_FIREBASE_APP_ID || defaultConfig.appId,
    apiKey: (import.meta.env as any).VITE_FIREBASE_API_KEY || defaultConfig.apiKey,
    authDomain: (import.meta.env as any).VITE_FIREBASE_AUTH_DOMAIN || defaultConfig.authDomain,
    firestoreDatabaseId: (import.meta.env as any).VITE_FIRESTORE_DATABASE_ID || defaultConfig.firestoreDatabaseId,
    storageBucket: (import.meta.env as any).VITE_FIREBASE_STORAGE_BUCKET || defaultConfig.storageBucket,
    messagingSenderId: (import.meta.env as any).VITE_FIREBASE_MESSAGING_SENDER_ID || defaultConfig.messagingSenderId,
    measurementId: (import.meta.env as any).VITE_FIREBASE_MEASUREMENT_ID || defaultConfig.measurementId,
  };
}

const app = initializeApp(resolvedConfig);
export const auth = getAuth(app);
export const db = getFirestore(app, resolvedConfig.firestoreDatabaseId || defaultConfig.firestoreDatabaseId);
export const googleAuthProvider = new GoogleAuthProvider();