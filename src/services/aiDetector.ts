import { DetectionResult } from '../types';

declare global {
  interface Window {
    cocoSsd?: any;
    tf?: any;
  }
}

let modelPromise: Promise<any> | null = null;
let loadedModel: any = null;

export async function loadCocoSsdModel(onProgress?: (msg: string) => void): Promise<any> {
  if (loadedModel) return loadedModel;
  if (modelPromise) return modelPromise;

  modelPromise = (async () => {
    try {
      onProgress?.('Memeriksa engine TensorFlow.js...');

      let retries = 0;
      while (!window.cocoSsd && retries < 20) {
        await new Promise((r) => setTimeout(r, 200));
        retries++;
      }

      if (!window.cocoSsd) {
        onProgress?.('Memuat model COCO-SSD via CDN...');
        await loadScript('https://cdn.jsdelivr.net/npm/@tensorflow/tfjs@4.20.0/dist/tf.min.js');
        await loadScript('https://cdn.jsdelivr.net/npm/@tensorflow-models/coco-ssd@2.2.3/dist/coco-ssd.min.js');
      }

      if (window.cocoSsd) {
        onProgress?.('Menginisialisasi neural network COCO-SSD...');
        loadedModel = await window.cocoSsd.load({ base: 'mobilenet_v2' });
        onProgress?.('Model AI Siap');
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
 * Melakukan deteksi objek pada video element
 */
export async function detectObjects(videoEl: HTMLVideoElement): Promise<DetectionResult> {
  if (!loadedModel || videoEl.readyState < 2) {
    return { hasPerson: false, score: 0, allPredictions: [] };
  }

  try {
    const predictions: Array<{ class: string; score: number; bbox: [number, number, number, number] }> =
      await loadedModel.detect(videoEl);

    // Cari objek kelas 'person' dengan confidence di atas 0.55
    const personPred = predictions.find((p) => p.class.toLowerCase() === 'person' && p.score >= 0.55);

    return {
      hasPerson: !!personPred,
      score: personPred ? Math.round(personPred.score * 100) : 0,
      bbox: personPred ? personPred.bbox : undefined,
      allPredictions: predictions,
    };
  } catch (err) {
    console.error('Error saat deteksi frame:', err);
    return { hasPerson: false, score: 0, allPredictions: [] };
  }
}

/**
 * Menggambar Canvas Overlay di atas video dengan Bounding Box Neon Green
 */
export function drawDetectionOverlay(
  canvas: HTMLCanvasElement,
  video: HTMLVideoElement,
  detection: DetectionResult
): void {
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  const width = video.videoWidth || canvas.width;
  const height = video.videoHeight || canvas.height;

  if (canvas.width !== width || canvas.height !== height) {
    canvas.width = width;
    canvas.height = height;
  }

  ctx.clearRect(0, 0, width, height);

  if (detection.hasPerson && detection.bbox) {
    const [x, y, w, h] = detection.bbox;

    // Bounding Box Neon Hijau
    ctx.strokeStyle = '#059669';
    ctx.lineWidth = 3;
    ctx.shadowColor = '#10b981';
    ctx.shadowBlur = 8;
    ctx.strokeRect(x, y, w, h);

    // Fill semi-transparan di dalam box
    ctx.fillStyle = 'rgba(5, 150, 105, 0.08)';
    ctx.fillRect(x, y, w, h);

    // Sudut aksen
    const cornerSize = Math.min(20, w * 0.2, h * 0.2);
    ctx.lineWidth = 5;
    ctx.strokeStyle = '#10b981';

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
    ctx.lineTo(x + w - cornerSize, y + h);
    ctx.stroke();

    ctx.shadowBlur = 0;

    // Label Badge
    const label = `Siswa Terdeteksi: ${detection.score}%`;
    ctx.font = '600 13px "Plus Jakarta Sans", sans-serif';
    const textWidth = ctx.measureText(label).width;

    const badgeX = Math.max(10, x);
    const badgeY = Math.max(26, y - 8);

    ctx.fillStyle = 'rgba(6, 78, 59, 0.9)';
    ctx.fillRect(badgeX - 4, badgeY - 20, textWidth + 22, 24);

    ctx.strokeStyle = '#10b981';
    ctx.lineWidth = 1.5;
    ctx.strokeRect(badgeX - 4, badgeY - 20, textWidth + 22, 24);

    ctx.fillStyle = '#34d399';
    ctx.beginPath();
    ctx.arc(badgeX + 3, badgeY - 8, 4, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = '#ffffff';
    ctx.fillText(label, badgeX + 13, badgeY - 4);
  } else if (detection.allPredictions && detection.allPredictions.length > 0) {
    const topNonPerson = detection.allPredictions[0];
    const [x, y, w, h] = topNonPerson.bbox;

    ctx.strokeStyle = '#e11d48';
    ctx.lineWidth = 2.5;
    ctx.setLineDash([5, 5]);
    ctx.strokeRect(x, y, w, h);
    ctx.setLineDash([]);

    const alertText = `Bukan Siswa (${topNonPerson.class})`;
    ctx.font = '600 12px "Plus Jakarta Sans", sans-serif';
    const tw = ctx.measureText(alertText).width;

    ctx.fillStyle = 'rgba(159, 18, 57, 0.9)';
    ctx.fillRect(x, Math.max(20, y - 6) - 18, tw + 12, 22);
    ctx.fillStyle = '#ffffff';
    ctx.fillText(alertText, x + 6, Math.max(20, y - 6) - 4);
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
  const metaText = `Waktu: ${nowStr} | AI: ${
    options.aiConfidence ? options.aiConfidence + '%' : 'Valid'
  } | ${options.gpsText || 'Area Madrasah'}`;
  ctx.fillText(metaText, 18, footerY + 50);

  return canvas.toDataURL('image/jpeg', 0.72);
}
