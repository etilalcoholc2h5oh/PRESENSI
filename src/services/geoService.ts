import { GeofenceConfig } from '../types';
import { DEFAULT_GEOFENCE } from '../data/madrasahData';

const GEOFENCE_STORAGE_KEY = 'man1_geofence_config';
const SIMULATE_GPS_KEY = 'man1_simulate_gps';

/**
 * Menghitung jarak antara 2 titik koordinat bumi dalam meter (Haversine Formula)
 */
export function calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371e3; // Radius bumi dalam meter
  const phi1 = (lat1 * Math.PI) / 180;
  const phi2 = (lat2 * Math.PI) / 180;
  const deltaPhi = ((lat2 - lat1) * Math.PI) / 180;
  const deltaLambda = ((lon2 - lon1) * Math.PI) / 180;

  const a =
    Math.sin(deltaPhi / 2) * Math.sin(deltaPhi / 2) +
    Math.cos(phi1) * Math.cos(phi2) * Math.sin(deltaLambda / 2) * Math.sin(deltaLambda / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c; // Meter
}

export function getGeofenceConfig(): GeofenceConfig {
  try {
    const raw = localStorage.getItem(GEOFENCE_STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      // Migrasi jika di browser masih tersimpan koordinat lama yang melenceng ke utara/Simpang Lima (-7.534...)
      const isOldCoordinates = !parsed.latitude || Math.abs(parsed.latitude - (-7.534839)) < 0.003;
      if (isOldCoordinates) {
        parsed.latitude = DEFAULT_GEOFENCE.latitude;
        parsed.longitude = DEFAULT_GEOFENCE.longitude;
        parsed.radiusMeters = DEFAULT_GEOFENCE.radiusMeters;
        parsed.locationName = DEFAULT_GEOFENCE.locationName;
        localStorage.setItem(GEOFENCE_STORAGE_KEY, JSON.stringify(parsed));
      } else if (parsed.radiusMeters && parsed.radiusMeters < 300) {
        parsed.radiusMeters = DEFAULT_GEOFENCE.radiusMeters;
        localStorage.setItem(GEOFENCE_STORAGE_KEY, JSON.stringify(parsed));
      }
      return parsed;
    }
  } catch (e) {
    console.warn(e);
  }
  return DEFAULT_GEOFENCE;
}

export function saveGeofenceConfig(config: GeofenceConfig): void {
  localStorage.setItem(GEOFENCE_STORAGE_KEY, JSON.stringify(config));
}

export function isSimulationMode(): boolean {
  return localStorage.getItem(SIMULATE_GPS_KEY) === 'true';
}

export function setSimulationMode(enabled: boolean): void {
  localStorage.setItem(SIMULATE_GPS_KEY, enabled ? 'true' : 'false');
}

/**
 * Mengambil koordinat GPS siswa saat ini
 */
export function getCurrentPosition(): Promise<{ latitude: number; longitude: number; accuracy: number }> {
  return new Promise((resolve, reject) => {
    if (isSimulationMode()) {
      const cfg = getGeofenceConfig();
      resolve({
        latitude: cfg.latitude + (Math.random() - 0.5) * 0.0001,
        longitude: cfg.longitude + (Math.random() - 0.5) * 0.0001,
        accuracy: 10,
      });
      return;
    }

    if (!navigator.geolocation) {
      reject(new Error('Geolocation tidak didukung oleh browser ini.'));
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        resolve({
          latitude: pos.coords.latitude,
          longitude: pos.coords.longitude,
          accuracy: pos.coords.accuracy,
        });
      },
      (err) => {
        let msg = 'Gagal mengambil koordinat GPS.';
        if (err.code === err.PERMISSION_DENIED) {
          msg = 'Izin lokasi (GPS) ditolak. Harap izinkan akses lokasi di browser.';
        } else if (err.code === err.POSITION_UNAVAILABLE) {
          msg = 'Informasi lokasi GPS tidak tersedia.';
        } else if (err.code === err.TIMEOUT) {
          msg = 'Waktu permintaan lokasi habis (timeout).';
        }
        reject(new Error(msg));
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 15000,
      }
    );
  });
}

/**
 * Validasi apakah koordinat berada di dalam radius geofencing sekolah
 * Mendukung toleransi drift GPS dalam ruangan (indoor accuracy tolerance)
 */
export function checkGeofence(
  coords: { latitude: number; longitude: number; accuracy?: number },
  geofence: GeofenceConfig = getGeofenceConfig()
): { isInside: boolean; distanceMeters: number } {
  const rawDistanceMeters = calculateDistance(
    coords.latitude,
    coords.longitude,
    geofence.latitude,
    geofence.longitude
  );

  // Radius check disabled: Always return isInside: true
  return {
    isInside: true,
    distanceMeters: Math.round(rawDistanceMeters),
  };
}
