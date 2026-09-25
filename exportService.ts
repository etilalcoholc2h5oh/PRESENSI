import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { AttendanceRecord } from '../types';
import { MADRASAH_INFO } from '../data/madrasahData';
import { evaluateAttendanceRecord } from './prayerTimeService';

export function exportToExcel(records: AttendanceRecord[], filterSummary?: string): void {
  const dataRows = records.map((rec, idx) => {
    const d = new Date(rec.created_at);
    const dateFormatted = d.toLocaleDateString('id-ID', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
    const timeFormatted = d.toLocaleTimeString('id-ID', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    });

    // Evaluasi 3 Aturan Mutlak: Dalam Jam Sholat, Dalam Radius, Ada Bukti Foto
    const evaluation = evaluateAttendanceRecord(rec);
    const displayStatus = evaluation.displayStatus;
    const displayNotes = evaluation.notesText;

    return {
      No: idx + 1,
      Tanggal: dateFormatted,
      Jam: timeFormatted,
      'Nama Siswa': rec.name,
      Kelas: rec.class,
      'Jenis Sholat': rec.prayer_type,
      'Status Kehadiran': displayStatus,
      Keterangan: displayNotes,
      'ID Sistem': rec.id,
    };
  });

  const ws = XLSX.utils.aoa_to_sheet([
    [`LAPORAN REKAPITULASI PRESENSI SHOLAT SISWA - ${MADRASAH_INFO.name.toUpperCase()}`],
    [`Alamat: ${MADRASAH_INFO.address}`],
    [`Periode / Filter: ${filterSummary || 'Semua Data Terarsip'} | Total Catatan: ${records.length}`],
    [`Tanggal Ekspor: ${new Date().toLocaleString('id-ID')}`],
    [],
  ]);

  XLSX.utils.sheet_add_json(ws, dataRows, { origin: 'A6' });

  ws['!cols'] = [
    { wch: 6 },
    { wch: 14 },
    { wch: 12 },
    { wch: 28 },
    { wch: 16 },
    { wch: 16 },
    { wch: 18 },
    { wch: 24 },
    { wch: 20 },
  ];

  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, 'Rekap Presensi');

  const filename = `Rekap_Presensi_Sholat_MAN1_Boyolali_${new Date().toISOString().slice(0, 10)}.xlsx`;
  XLSX.writeFile(wb, filename);
}

export function exportToPdf(records: AttendanceRecord[], filterSummary?: string): void {
  const doc = new jsPDF({ orientation: 'landscape', unit: 'mm', format: 'a4' });

  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  doc.text(`LAPORAN REKAPITULASI PRESENSI SHOLAT SISWA`, 14, 15);

  doc.setFontSize(11);
  doc.text(MADRASAH_INFO.name.toUpperCase(), 14, 21);
  doc.setFontSize(9);
  doc.setFont('helvetica', 'normal');
  doc.text(MADRASAH_INFO.address, 14, 26);
  doc.text(`Filter / Periode: ${filterSummary || 'Semua Data Terarsip'} | Total Data: ${records.length} Siswa`, 14, 30);
  doc.text(`Dicetak pada: ${new Date().toLocaleString('id-ID')}`, 14, 34);

  doc.setLineWidth(0.5);
  doc.line(14, 36, 283, 36);

  const tableData = records.map((rec, idx) => {
    const d = new Date(rec.created_at);
    const dateStr = d.toLocaleDateString('id-ID', { day: '2-digit', month: '2-digit', year: 'numeric' });
    const timeStr = d.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' });

    // Evaluasi 3 Aturan Mutlak: Dalam Jam Sholat, Dalam Radius, Ada Bukti Foto
    const evaluation = evaluateAttendanceRecord(rec);
    const displayStatus = evaluation.displayStatus;
    const displayNotes = evaluation.notesText;

    return [
      idx + 1,
      `${dateStr} ${timeStr}`,
      rec.name,
      rec.class,
      rec.prayer_type,
      displayStatus,
      displayNotes,
    ];
  });

  autoTable(doc, {
    startY: 39,
    head: [['No', 'Waktu', 'Nama Siswa', 'Kelas', 'Sholat', 'Status', 'Keterangan']],
    body: tableData,
    theme: 'grid',
    headStyles: { fillColor: [5, 150, 105], textColor: [255, 255, 255], fontStyle: 'bold', fontSize: 8 },
    styles: { fontSize: 8, cellPadding: 2.5, textColor: [30, 41, 59] },
    alternateRowStyles: { fillColor: [248, 250, 252] },
    columnStyles: {
      0: { cellWidth: 10 },
      1: { cellWidth: 28 },
      2: { cellWidth: 50 },
      3: { cellWidth: 20 },
      4: { cellWidth: 25 },
      5: { cellWidth: 30 },
      6: { cellWidth: 'auto' },
    },
    margin: { left: 14, right: 14 },
    foot: [['', '', `Total Presensi: ${records.length}`, '', '', '', '']],
    footStyles: { fillColor: [241, 245, 249], textColor: [30, 41, 59], fontStyle: 'bold' },
  });

  const filename = `Laporan_Presensi_Sholat_MAN1_Boyolali_${new Date().toISOString().slice(0, 10)}.pdf`;
  doc.save(filename);
}

export function printPdfReport(records?: AttendanceRecord[], filterSummary?: string): void {
  if (records && records.length > 0) {
    exportToPdf(records, filterSummary);
    return;
  }
  try {
    window.print();
  } catch {
    // Ignore print error
  }
}
