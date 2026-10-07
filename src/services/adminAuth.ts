import { signInWithPopup, signOut } from 'firebase/auth';
import { auth, googleAuthProvider } from '../lib/firebase';

export interface AdminSignInResult {
  ok: boolean;
  email?: string;
  error?: string;
}

/**
 * Login guru/admin dengan akun Google.
 * Aturan Firestore (firestore.rules) hanya mengizinkan email guru yang terdaftar
 * untuk membaca/mengubah/menghapus data presensi. Siswa hanya boleh membuat data.
 */
export async function signInAdminWithGoogle(): Promise<AdminSignInResult> {
  try {
    const cred = await signInWithPopup(auth, googleAuthProvider);
    return { ok: true, email: cred.user.email || undefined };
  } catch (err: any) {
    const code: string = err?.code || '';
    let error = 'Login Google gagal. Coba lagi.';
    if (code.includes('popup-blocked')) error = 'Popup login diblokir browser. Izinkan popup lalu coba lagi.';
    else if (code.includes('popup-closed') || code.includes('cancelled')) error = 'Login dibatalkan.';
    else if (code.includes('unauthorized-domain')) error = 'Domain situs belum ditambahkan di Firebase Authentication (Authorized domains).';
    else if (code.includes('operation-not-allowed')) error = 'Google sign-in belum diaktifkan di Firebase Authentication.';
    return { ok: false, error };
  }
}

export async function signOutAdmin(): Promise<void> {
  try {
    await signOut(auth);
  } catch {
    // abaikan
  }
}
