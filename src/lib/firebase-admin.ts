import { initializeApp, getApps, cert } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';
import { getFirestore } from 'firebase-admin/firestore';
import firebaseConfig from '../../firebase-applet-config.json' with { type: 'json' };

if (!getApps().length) {
  initializeApp({
    projectId: firebaseConfig.projectId,
  });
}

export const adminAuth = getAuth();
export const adminDb = getFirestore();
// Note: Use the specific database ID if configured
if (firebaseConfig.firestoreDatabaseId) {
  // adminDb = getFirestore(firebaseConfig.firestoreDatabaseId); // getFirestore in admin doesn't take DB ID like client SDK
}
