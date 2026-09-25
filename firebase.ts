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
try {
  // Try importing local config if available
  // @ts-ignore
  const localConfig = require('../../firebase-applet-config.json');
  if (localConfig && localConfig.apiKey) {
    resolvedConfig = localConfig;
  }
} catch {
  // Use fallback
}

const app = initializeApp(resolvedConfig);
export const auth = getAuth(app);
export const db = getFirestore(app, resolvedConfig.firestoreDatabaseId || 'ai-studio-presensisholatsi-22b8319d-8284-49ce-9df6-f68885f808f2');
export const googleAuthProvider = new GoogleAuthProvider();

