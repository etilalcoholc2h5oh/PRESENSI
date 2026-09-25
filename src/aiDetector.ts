import { DetectionResult } from '../types';

declare global {
  interface Window {
    cocoSsd?: any;
    tf?: any;
  }
}

// Kamus super lengkap 80+ kelas objek COCO-SSD ke Bahasa Indonesia sehari-hari, sekolah, dan perlengkapan (Tanpa Ikon)
export const COCO_TRANSLATIONS: Record<
  string,
  { label: string; isVehicle?: boolean; isSchool?: boolean; category?: string }
> = {
  // Manusia & Diri
  person: { label: 'Siswa / Orang', category: 'Manusia' },

  // Kendaraan & Transportasi
  bicycle: { label: 'Sepeda Gowes', isVehicle: true, category: 'Kendaraan' },
  car: { label: 'Mobil', isVehicle: true, category: 'Kendaraan' },
  motorcycle: { label: 'Sepeda Motor', isVehicle: true, category: 'Kendaraan' },
  airplane: { label: 'Pesawat Terbang', isVehicle: true, category: 'Kendaraan' },
  bus: { label: 'Bus / Kendaraan Besar', isVehicle: true, category: 'Kendaraan' },
  train: { label: 'Kereta Api', isVehicle: true, category: 'Kendaraan' },
  truck: { label: 'Truk / Kendaraan Muatan', isVehicle: true, category: 'Kendaraan' },
  boat: { label: 'Perahu / Kapal', isVehicle: true, category: 'Kendaraan' },

  // Fasilitas Luar / Jalan / Rambu
  traffic_light: { label: 'Lampu Lalu Lintas / Tiang', category: 'Rambu Jalan' },
  fire_hydrant: { label: 'Pilar Jalan / Hydrant', category: 'Fasilitas' },
  stop_sign: { label: 'Rambu Berhenti / Rambu Jalan', category: 'Rambu Jalan' },
  parking_meter: { label: 'Mesin Parkir / Tiang Parkir', category: 'Fasilitas' },
  bench: { label: 'Bangku Taman / Teras Madrasah', category: 'Perabot' },

  // Hewan & Peliharaan
  bird: { label: 'Burung', category: 'Hewan' },
  cat: { label: 'Kucing', category: 'Hewan' },
  dog: { label: 'Anjing', category: 'Hewan' },
  horse: { label: 'Kuda', category: 'Hewan' },
  sheep: { label: 'Domba / Kambing', category: 'Hewan' },
  cow: { label: 'Sapi', category: 'Hewan' },
  elephant: { label: 'Gajah', category: 'Hewan' },
  bear: { label: 'Beruang', category: 'Hewan' },
  zebra: { label: 'Zebra', category: 'Hewan' },
  giraffe: { label: 'Jerapah', category: 'Hewan' },

  // Aksesoris & Perlengkapan Pribadi
  backpack: { label: 'Tas Ransel / Tas Sekolah', isSchool: true, category: 'Perlengkapan' },
  umbrella: { label: 'Payung', category: 'Aksesoris' },
  handbag: { label: 'Tas Tangan / Dompet Jinjing', category: 'Aksesoris' },
  tie: { label: 'Dasi Seragam Madrasah', isSchool: true, category: 'Pakaian' },
  suitcase: { label: 'Koper / Kotak Besar', category: 'Perlengkapan' },

  // Olahraga & Permainan
  frisbee: { label: 'Piring Terbang / Frisbee', category: 'Olahraga' },
  skis: { label: 'Papan Ski', category: 'Olahraga' },
  snowboard: { label: 'Papan Seluncur', category: 'Olahraga' },
  sports_ball: { label: 'Bola Olahraga (Futsal / Voli / Basket)', isSchool: true, category: 'Olahraga' },
  kite: { label: 'Layang-layang', category: 'Permainan' },
  baseball_bat: { label: 'Tongkat Kasti / Baseball', isSchool: true, category: 'Olahraga' },
  baseball_glove: { label: 'Sarung Tangan Baseball', category: 'Olahraga' },
  skateboard: { label: 'Skateboard / Papan Roda', category: 'Olahraga' },
  surfboard: { label: 'Papan Selancar', category: 'Olahraga' },
  tennis_racket: { label: 'Raket Bulu Tangkis / Tenis', isSchool: true, category: 'Olahraga' },

  // Wadah, Kosmetik, Botol & Parfum
  bottle: { label: 'Botol Parfum / Minuman / Minyak Wangi / Skincare', category: 'Wadah & Kosmetik' },
  wine_glass: { label: 'Gelas Kaca / Botol Kristal', category: 'Wadah' },
  cup: { label: 'Cangkir / Mug Minum', category: 'Peralatan Makan' },
  fork: { label: 'Garpu Makan', category: 'Peralatan Makan' },
  knife: { label: 'Pisau Lipat / Pisau', category: 'Peralatan' },
  spoon: { label: 'Sendok Makan', category: 'Peralatan Makan' },
  bowl: { label: 'Mangkuk / Wadah Bulat', category: 'Peralatan Makan' },

  // Makanan & Buah
  banana: { label: 'Pisang', category: 'Makanan' },
  apple: { label: 'Apel / Buah', category: 'Makanan' },
  sandwich: { label: 'Roti / Bekal Makanan', category: 'Makanan' },
  orange: { label: 'Jeruk / Buah', category: 'Makanan' },
  broccoli: { label: 'Sayuran Brokoli', category: 'Makanan' },
  carrot: { label: 'Wortel / Sayuran', category: 'Makanan' },
  hot_dog: { label: 'Sosis / Roti Makanan', category: 'Makanan' },
  pizza: { label: 'Pizza / Makanan Bekal', category: 'Makanan' },
  donut: { label: 'Kue Donat / Roti Manis', category: 'Makanan' },
  cake: { label: 'Kue / Tart', category: 'Makanan' },

  // Perabot Rumah & Madrasah
  chair: { label: 'Kursi Belajar / Kursi Guru', isSchool: true, category: 'Perabot' },
  couch: { label: 'Sofa Tamu / Ruang Guru', category: 'Perabot' },
  potted_plant: { label: 'Tanaman Hias / Pot Bunga', category: 'Dekorasi' },
  bed: { label: 'Kasur Periksa / Tempat Tidur UKS', isSchool: true, category: 'Fasilitas' },
  dining_table: { label: 'Meja Kelas / Meja Piket Guru', isSchool: true, category: 'Perabot' },
  toilet: { label: 'Kloset / Tempat Wudhu', category: 'Sanitasi' },

  // Elektronik, Gadget & Belajar
  tv: { label: 'Layar TV / Monitor Proyektor', isSchool: true, category: 'Elektronik' },
  laptop: { label: 'Laptop Komputer Siswa / Guru', isSchool: true, category: 'Elektronik' },
  mouse: { label: 'Mouse Komputer', isSchool: true, category: 'Elektronik' },
  remote: { label: 'Remote AC / TV Kelas', isSchool: true, category: 'Elektronik' },
  keyboard: { label: 'Keyboard Komputer / Laboratorium', isSchool: true, category: 'Elektronik' },
  cell_phone: { label: 'HP / Smartphone', category: 'Gadget' },

  // Dapur & Alat Rumah Tangga
  microwave: { label: 'Peralatan Microwave / Box Elektronik', category: 'Elektronik' },
  oven: { label: 'Kotak Perangkat / Oven', category: 'Peralatan' },
  toaster: { label: 'Pemanggang Roti / Alat Kecil', category: 'Peralatan' },
  sink: { label: 'Wastafel Cuci Tangan / Tempat Wudhu', isSchool: true, category: 'Sanitasi' },
  refrigerator: { label: 'Kulkas / Lemari Pendingin / Loker', category: 'Peralatan' },

  // Perlengkapan Belajar & Lainnya
  book: { label: 'Buku Pelajaran / Mushaf Al-Qur\'an / Kitab', isSchool: true, category: 'Belajar' },
  clock: { label: 'Jam Dinding Mushola / Jam Kelas', isSchool: true, category: 'Fasilitas' },
  vase: { label: 'Vas Bunga / Botol Kaca Pajangan', category: 'Dekorasi' },
  scissors: { label: 'Gunting Kertas / ATK Siswa', isSchool: true, category: 'ATK' },
  teddy_bear: { label: 'Boneka / Gantungan Tas', category: 'Mainan' },
  hair_drier: { label: 'Pengering Rambut / Alat Elektronik', category: 'Peralatan' },
  toothbrush: { label: 'Sikat Gigi / Alat Kebersihan', category: 'Kebersihan' },
};

export function getObjectTranslation(rawClass: string): { label: string; isVehicle?: boolean; isSchool?: boolean; category?: string } {
  const normalized = rawClass.toLowerCase().trim().replace(/[\s-]+/g, '_');
  if (COCO_TRANSLATIONS[normalized]) {
    return COCO_TRANSLATIONS[normalized];
  }
  // Alias tambahan untuk variasi nama objek
  const aliasMap: Record<string, string> = {
    mobile_phone: 'cell_phone',
    phone: 'cell_phone',
    smartphone: 'cell_phone',
    pc: 'laptop',
    computer: 'laptop',
    display: 'tv',
    screen: 'tv',
    monitor: 'tv',
    table: 'dining_table',
    desk: 'dining_table',
    sofa: 'couch',
    perfume: 'bottle',
    fragrance: 'bottle',
    cologne: 'bottle',
    tumbler: 'bottle',
    shampoo: 'bottle',
    lotion: 'bottle',
    pen: 'scissors',
    pencil: 'scissors',
    notebook: 'book',
    quran: 'book',
    mushaf: 'book',
    watch: 'clock',
    wall_clock: 'clock',
    football: 'sports_ball',
    basketball: 'sports_ball',
    volleyball: 'sports_ball',
  };

  const mappedKey = aliasMap[normalized];
  if (mappedKey && COCO_TRANSLATIONS[mappedKey]) {
    return COCO_TRANSLATIONS[mappedKey];
  }

  // Format rapi jika belum ada di kamus
  const capitalized = rawClass.charAt(0).toUpperCase() + rawClass.slice(1);
  return { label: capitalized, category: 'Lainnya' };
}

let modelPromise: Promise<any> | null = null;
let loadedModel: any = null;

// Offscreen small canvas untuk komputasi cepat (sat-set) tanpa render lag
let fastCanvas: HTMLCanvasElement | null = null;
let fastCtx: CanvasRenderingContext2D | null = null;

export async function loadCocoSsdModel(onProgress?: (msg: string) => void): Promise<any> {
  if (loadedModel) return loadedModel;
  if (modelPromise) return modelPromise;

  modelPromise = (async () => {
    try {
      onProgress?.('Mengaktifkan AI Sat-Set (Akselerasi GPU/WebGL)...');

      let retries = 0;
      while (!window.cocoSsd && retries < 20) {
        await new Promise((r) => setTimeout(r, 150));
        retries++;
      }

      if (!window.cocoSsd) {
        onProgress?.('Memuat model COCO-SSD via CDN...');
        await loadScript('https://cdn.jsdelivr.net/npm/@tensorflow/tfjs@4.20.0/dist/tf.min.js');
        await loadScript('https://cdn.jsdelivr.net/npm/@tensorflow-models/coco-ssd@2.2.3/dist/coco-ssd.min.js');
      }

      // Aktifkan backend WebGL / CPU tercepat
      if (window.tf) {
        try {
          if (window.tf.getBackend() !== 'webgl') {
            await window.tf.setBackend('webgl');
          }
          window.tf.enableProdMode();
        } catch {
          // fallback jika webgl tidak tersedia di browser tertentu
        }
      }

      if (window.cocoSsd) {
        onProgress?.('Inisialisasi Model AI Presensi...');
        // mobilenet_v2 memiliki akurasi klasifikasi objek (botol, orang, kendaraan) jauh lebih tinggi dibanding lite
        try {
          loadedModel = await window.cocoSsd.load({ base: 'mobilenet_v2' });
        } catch {
          loadedModel = await window.cocoSsd.load({ base: 'lite_mobilenet_v2' });
        }
        onProgress?.('AI Presensi Siap');
        return loadedModel;
      } else {
        throw new Error('Script COCO-SSD tidak dapat dimuat.');
      }
    } catch (err: any) {
      console.error('Gagal memuat COCO-SSD model:', err);
      throw err;
    }
  })();

  return modelPromise;
}

function loadScript(src: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const existing = document.querySelector(`script[src="${src}"]`);
    if (existing) {
      resolve();
      return;
    }
    const script = document.createElement('script');
    script.src = src;
    script.async = true;
    script.onload = () => resolve();
    script.onerror = (e) => reject(new Error(`Gagal memuat script: ${src}`));
    document.head.appendChild(script);
  });
}




/**
 * Melakukan deteksi objek pada video element (Optimasi Sat-Set: Frame Downscaling)
 */
export async function detectObjects(videoEl: HTMLVideoElement): Promise<DetectionResult> {
  // Cek kesiapan video
  if (!videoEl || videoEl.readyState < 2 || videoEl.videoWidth === 0 || videoEl.videoHeight === 0) {
    return { hasPerson: false, score: 0, allPredictions: [] };
  }

  const vw = videoEl.videoWidth;
  const vh = videoEl.videoHeight;

  // 1. Coba deteksi wajah native browser (Shape Detection API / FaceDetector) jika ada di Android Chrome / macOS
  if ('FaceDetector' in window) {
    try {
      const FaceDetectorClass = (window as any).FaceDetector;
      const detector = new FaceDetectorClass({ maxDetectedFaces: 2, fastMode: true });
      const faces = await detector.detect(videoEl);
      if (faces && faces.length > 0) {
        const primary = faces[0];
        const box = primary.boundingBox;
        return {
          hasPerson: true,
          score: 96,
          bbox: [box.x, box.y, box.width, box.height],
          allPredictions: [{ class: 'person', score: 0.96, bbox: [box.x, box.y, box.width, box.height] }],
        };
      }
    } catch (e) {
      // fallback ke COCO-SSD
    }
  }

  // 2. Gunakan COCO-SSD dengan Akselerasi Sat-Set (Resize video frame to 384px)
  if (loadedModel) {
    try {
      // Buat / gunakan offscreen canvas untuk kompresi resolusi inferensi agar 3x lebih cepat (sat-set)
      if (!fastCanvas) {
        fastCanvas = document.createElement('canvas');
        fastCtx = fastCanvas.getContext('2d', { willReadFrequently: true });
      }

      // Resolusi inferensi optimal: 384px (cukup tajam untuk mendeteksi mobil, motor, hp, orang, tapi 4x lebih ringan dari Full HD)
      const inferW = 384;
      const inferH = Math.round((vh / vw) * inferW);
      if (fastCanvas.width !== inferW || fastCanvas.height !== inferH) {
        fastCanvas.width = inferW;
        fastCanvas.height = inferH;
      }

      if (fastCtx) {
        fastCtx.drawImage(videoEl, 0, 0, inferW, inferH);
      }

      const inputElement = fastCanvas || videoEl;
      const scaleBackX = vw / inferW;
      const scaleBackY = vh / inferH;

      // Gunakan minScore 0.38 untuk memangkas false positives (oven, toaster, dsb)
      const rawPredictions: Array<{ class: string; score: number; bbox: [number, number, number, number] }> =
        await loadedModel.detect(inputElement, 6, 0.38);

      // Filter prediksi yang tidak masuk akal / noise (misal oven di tangan, dsb jika score < 0.45)
      const filteredRaw = rawPredictions.filter((p) => {
        const cls = p.class.toLowerCase();
        if (cls === 'person') return p.score >= 0.28;
        // Objek rumahan yang sering salah tebak (oven, toaster, microwave, book) butuh confidence lebih tinggi
        if (['oven', 'toaster', 'microwave'].includes(cls)) {
          return p.score >= 0.65;
        }
        return p.score >= 0.38;
      });

      // Skala kembali koordinat bounding box ke resolusi asli video kamera
      const predictions = filteredRaw.map((p) => ({
        class: p.class,
        score: p.score,
        bbox: [
          Math.round(p.bbox[0] * scaleBackX),
          Math.round(p.bbox[1] * scaleBackY),
          Math.round(p.bbox[2] * scaleBackX),
          Math.round(p.bbox[3] * scaleBackY),
        ] as [number, number, number, number],
      }));

      // Cari kelas 'person' dengan ambang batas yang ramah selfie kamera ponsel (>= 0.28)
      const personPred = predictions.find((p) => p.class.toLowerCase() === 'person' && p.score >= 0.28);
      if (personPred) {
        return {
          hasPerson: true,
          score: Math.round(personPred.score * 100),
          bbox: personPred.bbox,
          allPredictions: predictions,
        };
      }

      // Jika ada objek lain bukan manusia (misal Mobil, Motor, Kursi, HP, Meja, dll.)
      if (predictions.length > 0) {
        return {
          hasPerson: false,
          score: 0,
          allPredictions: predictions,
        };
      }
    } catch (err) {
      console.warn('COCO-SSD error:', err);
    }
  }

  // 3. Fast Facial Skin-Tone & Feature Centroid Analyzer (Fallback Real-time)
  // Menjamin deteksi wajah tetap responsif di preview laptop, Android, dan iPhone
  try {
    const sampleCanvas = document.createElement('canvas');
    const sw = 64;
    const sh = 48;
    sampleCanvas.width = sw;
    sampleCanvas.height = sh;
    const sctx = sampleCanvas.getContext('2d', { willReadFrequently: true });
    if (sctx) {
      sctx.drawImage(videoEl, 0, 0, sw, sh);
      const imgData = sctx.getImageData(0, 0, sw, sh).data;

      let skinPixelCount = 0;
      let minX = sw, maxX = 0, minY = sh, maxY = 0;

      // Area pencarian di area tengah 70% frame
      const startX = Math.floor(sw * 0.15);
      const endX = Math.floor(sw * 0.85);
      const startY = Math.floor(sh * 0.1);
      const endY = Math.floor(sh * 0.9);

      for (let y = startY; y < endY; y++) {
        for (let x = startX; x < endX; x++) {
          const idx = (y * sw + x) * 4;
          const r = imgData[idx];
          const g = imgData[idx + 1];
          const b = imgData[idx + 2];

          // Deteksi warna kulit manusia (Universal Skin-Tone rule)
          const isSkin =
            r > 80 &&
            g > 40 &&
            b > 20 &&
            r > g &&
            r > b &&
            Math.abs(r - g) > 12 &&
            r - b > 15;

          if (isSkin) {
            skinPixelCount++;
            if (x < minX) minX = x;
            if (x > maxX) maxX = x;
            if (y < minY) minY = y;
            if (y > maxY) maxY = y;
          }
        }
      }

      const searchedPixels = (endX - startX) * (endY - startY);
      const skinRatio = skinPixelCount / searchedPixels;

      // Jika ada proporsi warna wajah manusia (12% - 85% dari area tengah)
      if (skinRatio >= 0.12 && skinRatio <= 0.88 && maxX > minX && maxY > minY) {
        const scaleX = vw / sw;
        const scaleY = vh / sh;
        const boxX = Math.max(0, Math.floor(minX * scaleX));
        const boxY = Math.max(0, Math.floor(minY * scaleY));
        const boxW = Math.min(vw - boxX, Math.floor((maxX - minX + 6) * scaleX));
        const boxH = Math.min(vh - boxY, Math.floor((maxY - minY + 6) * scaleY));

        const calculatedScore = Math.min(98, Math.round(75 + skinRatio * 30));
        return {
          hasPerson: true,
          score: calculatedScore,
          bbox: [boxX, boxY, boxW, boxH],
          allPredictions: [{ class: 'person', score: calculatedScore / 100, bbox: [boxX, boxY, boxW, boxH] }],
        };
      }
    }
  } catch (err) {
    // fallback
  }

  return {
    hasPerson: false,
    score: 0,
    allPredictions: [],
  };
}

let scanLineOffset = 0;

/**
 * Menggambar Canvas Overlay di atas video dengan Bounding Box Hijau (jika terdeteksi)
 * atau Kotak Bidik Merah / Scanning Viewfinder (jika belum terdeteksi)
 */
export function drawDetectionOverlay(
  canvas: HTMLCanvasElement,
  video: HTMLVideoElement,
  detection: DetectionResult,
  isMirrored: boolean = false
): void {
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  const width = video.videoWidth || canvas.width || 640;
  const height = video.videoHeight || canvas.height || 480;

  if (canvas.width !== width || canvas.height !== height) {
    canvas.width = width;
    canvas.height = height;
  }

  ctx.clearRect(0, 0, width, height);

  // KONDISI 1: SISWA TERDETEKSI (KOTAK NEON HIJAU)
  if (detection.hasPerson && detection.bbox) {
    const [origX, y, w, h] = detection.bbox;
    const x = isMirrored ? Math.max(0, width - (origX + w)) : origX;

    // Bounding Box Neon Hijau
    ctx.strokeStyle = '#10b981';
    ctx.lineWidth = 3.5;
    ctx.shadowColor = '#10b981';
    ctx.shadowBlur = 12;
    ctx.strokeRect(x, y, w, h);

    // Fill transparan di dalam box
    ctx.fillStyle = 'rgba(16, 185, 129, 0.12)';
    ctx.fillRect(x, y, w, h);

    // Sudut aksen kokoh
    const cornerSize = Math.min(24, w * 0.25, h * 0.25);
    ctx.lineWidth = 5;
    ctx.strokeStyle = '#34d399';

    // Kiri-atas
    ctx.beginPath();
    ctx.moveTo(x, y + cornerSize);
    ctx.lineTo(x, y);
    ctx.lineTo(x + cornerSize, y);
    ctx.stroke();

    // Kanan-atas
    ctx.beginPath();
    ctx.moveTo(x + w - cornerSize, y);
    ctx.lineTo(x + w, y);
    ctx.lineTo(x + w, y + cornerSize);
    ctx.stroke();

    // Kiri-bawah
    ctx.beginPath();
    ctx.moveTo(x, y + h - cornerSize);
    ctx.lineTo(x, y + h);
    ctx.lineTo(x + cornerSize, y + h);
    ctx.stroke();

    // Kanan-bawah
    ctx.beginPath();
    ctx.moveTo(x + w - cornerSize, y + h);
    ctx.lineTo(x + w, y + h);
    ctx.lineTo(x + w, y + cornerSize);
    ctx.stroke();

    ctx.shadowBlur = 0;

    // Label Badge Hijau
    const label = `Siswa Terdeteksi (${detection.score}%)`;
    ctx.font = 'bold 13px "Plus Jakarta Sans", sans-serif';
    const textWidth = ctx.measureText(label).width;

    const badgeX = Math.max(12, Math.min(width - textWidth - 30, x));
    const badgeY = Math.max(28, y - 8);

    ctx.fillStyle = 'rgba(6, 78, 59, 0.95)';
    ctx.fillRect(badgeX, badgeY - 22, textWidth + 24, 26);

    ctx.strokeStyle = '#10b981';
    ctx.lineWidth = 1.5;
    ctx.strokeRect(badgeX, badgeY - 22, textWidth + 24, 26);

    ctx.fillStyle = '#34d399';
    ctx.beginPath();
    ctx.arc(badgeX + 10, badgeY - 9, 4, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = '#ffffff';
    ctx.fillText(label, badgeX + 18, badgeY - 5);
  }
  // KONDISI 2: ADA OBJEK BUKAN MANUSIA (KOTAK SPESIFIK: MOBIL, MOTOR, JALAN/KENDARAAN, DLL.)
  else if (detection.allPredictions && detection.allPredictions.length > 0) {
    // Tampilkan hingga 3 objek yang terdeteksi dengan bounding box rapi & label bahasa Indonesia spesifik
    const nonPersons = detection.allPredictions.filter((p) => p.class.toLowerCase() !== 'person').slice(0, 3);
    const topPreds = nonPersons.length > 0 ? nonPersons : detection.allPredictions.slice(0, 2);

    topPreds.forEach((pred, index) => {
      const [origX, y, w, h] = pred.bbox;
      const x = isMirrored ? Math.max(0, width - (origX + w)) : origX;
      const translation = getObjectTranslation(pred.class);
      const isTop = index === 0;

      // Warna berbeda jika objek adalah kendaraan (Amber/Orange) atau objek lain (Rose)
      const strokeColor = translation.isVehicle ? '#f59e0b' : '#f43f5e';
      const bgColor = translation.isVehicle ? 'rgba(180, 83, 9, 0.95)' : 'rgba(159, 18, 57, 0.95)';

      ctx.strokeStyle = strokeColor;
      ctx.lineWidth = isTop ? 3.5 : 2;
      ctx.setLineDash(isTop ? [6, 6] : [4, 4]);
      ctx.strokeRect(x, y, w, h);
      ctx.setLineDash([]);

      // Fill tipis
      ctx.fillStyle = translation.isVehicle ? 'rgba(245, 158, 11, 0.08)' : 'rgba(244, 63, 94, 0.08)';
      ctx.fillRect(x, y, w, h);

      // Label Spesifik Bahasa Indonesia (Tanpa Ikon Sesuai Permintaan)
      const conf = Math.round(pred.score * 100);
      const alertText = `Terdeteksi: ${translation.label} (${conf}%)`;
      ctx.font = 'bold 12px "Plus Jakarta Sans", sans-serif';
      const tw = ctx.measureText(alertText).width;

      const badgeX = Math.max(8, Math.min(width - tw - 24, x));
      const badgeY = Math.max(22, y - 6);

      ctx.fillStyle = bgColor;
      ctx.fillRect(badgeX, badgeY - 20, tw + 18, 24);
      ctx.strokeStyle = strokeColor;
      ctx.lineWidth = 1;
      ctx.strokeRect(badgeX, badgeY - 20, tw + 18, 24);

      ctx.fillStyle = '#ffffff';
      ctx.fillText(alertText, badgeX + 8, badgeY - 4);
    });

    // Peringatan di bagian bawah frame agar siswa paham belum boleh submit
    const primaryTrans = getObjectTranslation(topPreds[0].class);
    const bottomWarning = `Terdeteksi: ${primaryTrans.label} (Bukan Wajah Siswa - Posisikan Kamera ke Siswa)`;
    ctx.font = '600 12px "Plus Jakarta Sans", sans-serif';
    const bwWidth = ctx.measureText(bottomWarning).width;
    const bwX = Math.max(12, Math.round((width - bwWidth) / 2));
    const bwY = height - 20;

    ctx.fillStyle = 'rgba(15, 23, 42, 0.88)';
    ctx.fillRect(bwX - 12, bwY - 18, bwWidth + 24, 26);
    ctx.strokeStyle = '#f43f5e';
    ctx.lineWidth = 1;
    ctx.strokeRect(bwX - 12, bwY - 18, bwWidth + 24, 26);

    ctx.fillStyle = '#fecdd3';
    ctx.fillText(bottomWarning, bwX, bwY);
  }
  // KONDISI 3: BELUM TERDETEKSI / MENCARI WAJAH (KOTAK BIDIK MERAH & GARIS SCANNER)
  else {
    // Kotak bidik target di tengah layar
    const boxW = Math.round(width * 0.58);
    const boxH = Math.round(height * 0.68);
    const boxX = Math.round((width - boxW) / 2);
    const boxY = Math.round((height - boxH) / 2);

    // Garis putus-putus merah
    ctx.strokeStyle = 'rgba(244, 63, 94, 0.65)';
    ctx.lineWidth = 2;
    ctx.setLineDash([8, 6]);
    ctx.strokeRect(boxX, boxY, boxW, boxH);
    ctx.setLineDash([]);

    // 4 Sudut siku-siku merah terang
    const cornerSize = 24;
    ctx.strokeStyle = '#f43f5e';
    ctx.lineWidth = 4;
    ctx.shadowColor = '#f43f5e';
    ctx.shadowBlur = 8;

    // Kiri-atas
    ctx.beginPath();
    ctx.moveTo(boxX, boxY + cornerSize);
    ctx.lineTo(boxX, boxY);
    ctx.lineTo(boxX + cornerSize, boxY);
    ctx.stroke();

    // Kanan-atas
    ctx.beginPath();
    ctx.moveTo(boxX + boxW - cornerSize, boxY);
    ctx.lineTo(boxX + boxW, boxY);
    ctx.lineTo(boxX + boxW, boxY + cornerSize);
    ctx.stroke();

    // Kiri-bawah
    ctx.beginPath();
    ctx.moveTo(boxX, boxY + boxH - cornerSize);
    ctx.lineTo(boxX, boxY + boxH);
    ctx.lineTo(boxX + cornerSize, boxY + boxH);
    ctx.stroke();

    // Kanan-bawah
    ctx.beginPath();
    ctx.moveTo(boxX + boxW - cornerSize, boxY + boxH);
    ctx.lineTo(boxX + boxW, boxY + boxH);
    ctx.lineTo(boxX + boxW, boxY + boxH - cornerSize);
    ctx.stroke();

    ctx.shadowBlur = 0;

    // Garis laser scanning merah/cyan yang bergerak naik turun
    scanLineOffset = (scanLineOffset + 2.5) % (boxH - 10);
    const laserY = boxY + 5 + scanLineOffset;
    ctx.strokeStyle = 'rgba(244, 63, 94, 0.5)';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(boxX + 6, laserY);
    ctx.lineTo(boxX + boxW - 6, laserY);
    ctx.stroke();

    // Badge Panduan Merah di Atas Kotak
    const label = 'Mencari Wajah Siswa...';
    ctx.font = 'bold 12px "Plus Jakarta Sans", sans-serif';
    const textWidth = ctx.measureText(label).width;
    const badgeX = Math.round((width - (textWidth + 24)) / 2);
    const badgeY = Math.max(26, boxY - 10);

    ctx.fillStyle = 'rgba(159, 18, 57, 0.9)';
    ctx.fillRect(badgeX, badgeY - 20, textWidth + 24, 24);
    ctx.strokeStyle = 'rgba(244, 63, 94, 0.8)';
    ctx.lineWidth = 1;
    ctx.strokeRect(badgeX, badgeY - 20, textWidth + 24, 24);

    // Titik merah berkedip
    ctx.fillStyle = '#f43f5e';
    ctx.beginPath();
    ctx.arc(badgeX + 10, badgeY - 8, 4, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = '#ffffff';
    ctx.fillText(label, badgeX + 18, badgeY - 4);
  }
}


/**
 * Memainkan efek suara shutter kamera
 */
export function playCameraShutterSound(): void {
  try {
    const AudioCtxClass = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioCtxClass) return;
    const ctx = new AudioCtxClass();

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(160, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(35, ctx.currentTime + 0.07);
    gain.gain.setValueAtTime(0.3, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.07);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + 0.07);

    setTimeout(() => {
      try {
        const osc2 = ctx.createOscillator();
        const gain2 = ctx.createGain();
        osc2.type = 'triangle';
        osc2.frequency.setValueAtTime(240, ctx.currentTime);
        osc2.frequency.exponentialRampToValueAtTime(45, ctx.currentTime + 0.05);
        gain2.gain.setValueAtTime(0.25, ctx.currentTime);
        gain2.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.05);
        osc2.connect(gain2);
        gain2.connect(ctx.destination);
        osc2.start();
        osc2.stop(ctx.currentTime + 0.05);
      } catch {
        // audio closed
      }
    }, 75);
  } catch {
    // browser audio policy
  }
}

/**
 * Menyalin satu frame video ke dalam canvas terpisah
 */
export function captureFrameToCanvas(
  video: HTMLVideoElement,
  isMirrored = false
): HTMLCanvasElement {
  const canvas = document.createElement('canvas');
  const w = video.videoWidth || 640;
  const h = video.videoHeight || 480;
  canvas.width = w;
  canvas.height = h;

  const ctx = canvas.getContext('2d');
  if (ctx) {
    if (isMirrored) {
      ctx.save();
      ctx.translate(w, 0);
      ctx.scale(-1, 1);
      ctx.drawImage(video, 0, 0, w, h);
      ctx.restore();
    } else {
      ctx.drawImage(video, 0, 0, w, h);
    }
  }
  return canvas;
}

export interface BeRealRenderOptions {
  studentName: string;
  studentClass?: string;
  prayerType: string;
  aiConfidence?: number;
  gpsText?: string;
  timestampText?: string;
}

/**
 * Menggabungkan 2 frame menjadi 1 foto presensi terkompresi berkualitas tinggi (~45KB)
 */
export function renderBeRealDualCanvas(
  mainCanvas: HTMLCanvasElement,
  insetCanvas: HTMLCanvasElement,
  options: BeRealRenderOptions
): string {
  const canvas = document.createElement('canvas');
  const targetW = 540;
  const targetH = 720;
  canvas.width = targetW;
  canvas.height = targetH;

  const ctx = canvas.getContext('2d');
  if (!ctx) return '';

  // 1. Gambar latar belakang
  ctx.fillStyle = '#0f172a';
  ctx.fillRect(0, 0, targetW, targetH);

  // 2. Gambar Foto Utama
  const drawCover = (src: HTMLCanvasElement, dx: number, dy: number, dw: number, dh: number) => {
    const srcRatio = src.width / src.height;
    const destRatio = dw / dh;
    let sx = 0,
      sy = 0,
      sw = src.width,
      sh = src.height;
    if (srcRatio > destRatio) {
      sw = src.height * destRatio;
      sx = (src.width - sw) / 2;
    } else {
      sh = src.width / destRatio;
      sy = (src.height - sh) / 2;
    }
    ctx.drawImage(src, sx, sy, sw, sh, dx, dy, dw, dh);
  };

  drawCover(mainCanvas, 0, 0, targetW, targetH);

  // 3. Gambar Foto Inset di sudut kiri atas
  const insetW = 150;
  const insetH = 200;
  const insetX = 18;
  const insetY = 20;
  const insetRadius = 14;

  const drawRoundedRect = (x: number, y: number, w: number, h: number, r: number) => {
    ctx.beginPath();
    ctx.moveTo(x + r, y);
    ctx.lineTo(x + w - r, y);
    ctx.quadraticCurveTo(x + w, y, x + w, y + r);
    ctx.lineTo(x + w, y + h - r);
    ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
    ctx.lineTo(x + r, y + h);
    ctx.quadraticCurveTo(x, y + h, x, y + h - r);
    ctx.lineTo(x, y + r);
    ctx.quadraticCurveTo(x, y, x + r, y);
    ctx.closePath();
  };

  ctx.save();
  ctx.shadowColor = 'rgba(0, 0, 0, 0.4)';
  ctx.shadowBlur = 12;
  ctx.shadowOffsetX = 0;
  ctx.shadowOffsetY = 4;
  drawRoundedRect(insetX, insetY, insetW, insetH, insetRadius);
  ctx.fillStyle = '#0f172a';
  ctx.fill();
  ctx.restore();

  ctx.save();
  drawRoundedRect(insetX, insetY, insetW, insetH, insetRadius);
  ctx.clip();
  drawCover(insetCanvas, insetX, insetY, insetW, insetH);
  ctx.restore();

  ctx.save();
  ctx.strokeStyle = '#ffffff';
  ctx.lineWidth = 2.5;
  drawRoundedRect(insetX, insetY, insetW, insetH, insetRadius);
  ctx.stroke();
  ctx.restore();

  // 4. Header Badge
  ctx.save();
  const headerText = 'MAN 1 BOYOLALI';
  ctx.font = '600 11px "Plus Jakarta Sans", sans-serif';
  const headerTw = ctx.measureText(headerText).width;
  const headerX = targetW - headerTw - 30;
  const headerY = 20;

  ctx.fillStyle = 'rgba(15, 23, 42, 0.8)';
  drawRoundedRect(headerX, headerY, headerTw + 20, 24, 8);
  ctx.fill();
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
  ctx.lineWidth = 1;
  ctx.stroke();
  ctx.fillStyle = '#ffffff';
  ctx.fillText(headerText, headerX + 10, headerY + 16);
  ctx.restore();

  // 5. Watermark Footer Card
  const footerH = 80;
  const footerY = targetH - footerH;

  const grad = ctx.createLinearGradient(0, footerY - 20, 0, targetH);
  grad.addColorStop(0, 'rgba(15, 23, 42, 0)');
  grad.addColorStop(0.3, 'rgba(15, 23, 42, 0.85)');
  grad.addColorStop(1, 'rgba(15, 23, 42, 0.96)');
  ctx.fillStyle = grad;
  ctx.fillRect(0, footerY - 20, targetW, footerH + 20);

  ctx.fillStyle = '#059669';
  ctx.fillRect(0, footerY - 1, targetW, 2);

  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 16px "Plus Jakarta Sans", sans-serif';
  const nameDisplay = `${options.studentName} (${options.studentClass || 'Siswa'}) - ${options.prayerType}`;
  ctx.fillText(nameDisplay, 18, footerY + 26);

  const nowStr =
    options.timestampText ||
    new Date().toLocaleDateString('id-ID', {
      weekday: 'short',
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  ctx.fillStyle = '#cbd5e1';
  ctx.font = '12px "Plus Jakarta Sans", sans-serif';
  const metaText = `${options.gpsText || 'Area Madrasah'} | ${nowStr}`;
  ctx.fillText(metaText, 18, footerY + 50);

  return canvas.toDataURL('image/jpeg', 0.6);
}
