// Semua tanggal/jam presensi dihitung dalam WIB (Asia/Jakarta), apa pun zona waktu perangkatnya.
// Catatan: Dhuha 06:55-07:15 WIB = 23:55-00:15 UTC, jadi tanggal UTC TIDAK boleh dipakai untuk
// mengelompokkan presensi per hari.

const WIB = 'Asia/Jakarta';

const dateKeyFmt = new Intl.DateTimeFormat('sv-SE', {
  timeZone: WIB,
  year: 'numeric',
  month: '2-digit',
  day: '2-digit',
});

const partsFmt = new Intl.DateTimeFormat('en-US', {
  timeZone: WIB,
  hourCycle: 'h23',
  hour: '2-digit',
  minute: '2-digit',
  weekday: 'short',
});

const WEEKDAY_INDEX: Record<string, number> = { Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6 };

/** Ubah nilai tanggal apa pun (ISO string, Date, Firestore Timestamp) menjadi Date; null jika tidak valid. */
export function toDateSafe(value: any): Date | null {
  if (!value) return null;
  try {
    let d: Date;
    if (value instanceof Date) d = value;
    else if (typeof value === 'object' && typeof value.toDate === 'function') d = value.toDate();
    else if (typeof value === 'object' && typeof value.seconds === 'number') d = new Date(value.seconds * 1000);
    else d = new Date(value);
    return isNaN(d.getTime()) ? null : d;
  } catch {
    return null;
  }
}

/** Tanggal WIB berformat YYYY-MM-DD ('' jika tidak valid). */
export function wibDateKey(value: any = new Date()): string {
  const d = toDateSafe(value);
  return d ? dateKeyFmt.format(d) : '';
}

/** Bulan WIB berformat YYYY-MM. */
export function wibMonthKey(value: any = new Date()): string {
  return wibDateKey(value).slice(0, 7);
}

/** Jam, menit, dan hari (0 = Minggu ... 5 = Jumat) menurut WIB. */
export function wibParts(value: any = new Date()): { hour: number; minute: number; dayOfWeek: number } {
  const d = toDateSafe(value) || new Date();
  let hour = 0;
  let minute = 0;
  let dayOfWeek = 0;
  for (const p of partsFmt.formatToParts(d)) {
    if (p.type === 'hour') hour = parseInt(p.value, 10) % 24;
    else if (p.type === 'minute') minute = parseInt(p.value, 10);
    else if (p.type === 'weekday') dayOfWeek = WEEKDAY_INDEX[p.value] ?? 0;
  }
  return { hour, minute, dayOfWeek };
}

/** Awal hari WIB (00:00:00) sebagai string ISO UTC, untuk query Firestore. */
export function wibDayStartIso(dateKey: string): string {
  return new Date(`${dateKey}T00:00:00+07:00`).toISOString();
}

/** Akhir hari WIB (23:59:59.999) sebagai string ISO UTC, untuk query Firestore. */
export function wibDayEndIso(dateKey: string): string {
  return new Date(`${dateKey}T23:59:59.999+07:00`).toISOString();
}

/** Tanggal WIB beberapa hari yang lalu (YYYY-MM-DD). */
export function wibDateKeyDaysAgo(days: number): string {
  return wibDateKey(new Date(Date.now() - days * 86400000));
}
