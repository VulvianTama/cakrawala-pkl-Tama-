"use client";

import React, { useState } from "react";
import Link from "next/link";

export default function AdminSettingsPage() {
  const [academicYear, setAcademicYear] = useState("2026/2027");
  const [letterFormat, setLetterFormat] = useState("421.5/PKL-SMK/{NO}/{BULAN}/{TAHUN}");
  const [maxMembers, setMaxMembers] = useState(4);
  const [gpsRadius, setGpsRadius] = useState(150);
  const [workStartTime, setWorkStartTime] = useState("08:00");
  const [workEndTime, setWorkEndTime] = useState("16:00");
  const [headmasterName, setHeadmasterName] = useState("Drs. H. Mulyono, M.Pd");
  const [headmasterNip, setHeadmasterNip] = useState("197005141995121001");
  const [isSaved, setIsSaved] = useState(false);

  const handleSave = (e) => {
    e.preventDefault();
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  return (
    <div className="space-y-6">
      {/* Header Pengaturan */}
      <div className="bg-white rounded-2xl p-6 sm:p-7 border border-slate-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-semibold mb-2">
            Konfigurasi Sistem
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
            Pengaturan Master PKL
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-xl">
            Sesuaikan format surat pengantar resmi, toleransi jarak presensi siswa, dan periode aktif tahun ajaran magang.
          </p>
        </div>

        <Link
          href="/admin"
          className="text-xs sm:text-sm font-semibold text-slate-600 hover:text-slate-900 px-4 py-2 rounded-xl border border-slate-200 hover:bg-slate-50 transition-colors inline-flex items-center gap-1.5 self-start"
        >
          &larr; Kembali ke Ringkasan
        </Link>
      </div>

      {isSaved && (
        <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs sm:text-sm flex items-center gap-2.5 animate-in fade-in">
          <svg className="w-5 h-5 text-emerald-600 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
          </svg>
          <span className="font-medium">Pengaturan sistem berhasil disimpan dan diterapkan pada seluruh akun siswa dan guru.</span>
        </div>
      )}

      {/* Form Konfigurasi */}
      <form onSubmit={handleSave} className="space-y-6">
        {/* Bagian 1: Periode & Kelompok */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs">
          <h2 className="text-base font-bold text-slate-900 mb-1">Periode & Batasan Kelompok</h2>
          <p className="text-xs text-slate-500 mb-5">Aturan dasar pembentukan kelompok magang oleh siswa.</p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 text-xs sm:text-sm">
            <div>
              <label className="block text-slate-700 font-medium mb-1.5">Tahun Ajaran Aktif</label>
              <input
                type="text"
                required
                value={academicYear}
                onChange={(e) => setAcademicYear(e.target.value)}
                placeholder="2026/2027"
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-slate-800"
              />
              <span className="text-[11px] text-slate-400 mt-1 block">Tercantum pada kop dokumen dan laporan akhir.</span>
            </div>

            <div>
              <label className="block text-slate-700 font-medium mb-1.5">Batas Maksimal Siswa per Kelompok</label>
              <input
                type="number"
                min="1"
                max="10"
                required
                value={maxMembers}
                onChange={(e) => setMaxMembers(parseInt(e.target.value) || 1)}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-slate-800"
              />
              <span className="text-[11px] text-slate-400 mt-1 block">Jumlah siswa dalam satu kantor mitra industri.</span>
            </div>
          </div>
        </div>

        {/* Bagian 2: Format Dokumen Surat Pengantar */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs">
          <h2 className="text-base font-bold text-slate-900 mb-1">Format Surat Pengantar PKL</h2>
          <p className="text-xs text-slate-500 mb-5">Penomoran otomatis dan tanda tangan kepala sekolah pada berkas cetak.</p>

          <div className="space-y-4 text-xs sm:text-sm">
            <div>
              <label className="block text-slate-700 font-medium mb-1.5">Format Nomor Surat</label>
              <input
                type="text"
                required
                value={letterFormat}
                onChange={(e) => setLetterFormat(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl font-mono focus:outline-none focus:border-slate-800"
              />
              <span className="text-[11px] text-slate-400 mt-1 block">Variabel yang tersedia: &#123;NO&#125;, &#123;BULAN&#125;, &#123;TAHUN&#125;</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-slate-700 font-medium mb-1.5">Nama Kepala Sekolah / Pejabat Penandatangan</label>
                <input
                  type="text"
                  required
                  value={headmasterName}
                  onChange={(e) => setHeadmasterName(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-slate-800"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-medium mb-1.5">NIP Pejabat</label>
                <input
                  type="text"
                  required
                  value={headmasterNip}
                  onChange={(e) => setHeadmasterNip(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl font-mono focus:outline-none focus:border-slate-800"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Bagian 3: Toleransi Presensi GPS & Jam Kerja */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs">
          <h2 className="text-base font-bold text-slate-900 mb-1">Presensi GPS & Jam Operasional</h2>
          <p className="text-xs text-slate-500 mb-5">Validasi lokasi presensi siswa berdasarkan titik koordinat kantor mitra.</p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs sm:text-sm">
            <div>
              <label className="block text-slate-700 font-medium mb-1.5">Radius Toleransi (Meter)</label>
              <input
                type="number"
                min="50"
                max="500"
                required
                value={gpsRadius}
                onChange={(e) => setGpsRadius(parseInt(e.target.value) || 100)}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-slate-800"
              />
              <span className="text-[11px] text-slate-400 mt-1 block">Jarak maksimal dari titik kantor mitra.</span>
            </div>

            <div>
              <label className="block text-slate-700 font-medium mb-1.5">Batas Jam Masuk Pagi</label>
              <input
                type="time"
                required
                value={workStartTime}
                onChange={(e) => setWorkStartTime(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-slate-800"
              />
              <span className="text-[11px] text-slate-400 mt-1 block">Lewat dari jam ini ditandai terlambat.</span>
            </div>

            <div>
              <label className="block text-slate-700 font-medium mb-1.5">Jam Kepulangan</label>
              <input
                type="time"
                required
                value={workEndTime}
                onChange={(e) => setWorkEndTime(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-slate-800"
              />
              <span className="text-[11px] text-slate-400 mt-1 block">Presensi kepulangan dibuka mulai jam ini.</span>
            </div>
          </div>
        </div>

        {/* Tombol Simpan */}
        <div className="flex items-center justify-end gap-3 pt-2">
          <Link
            href="/admin"
            className="px-5 py-2.5 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 font-medium text-xs sm:text-sm transition-colors"
          >
            Batal
          </Link>
          <button
            type="submit"
            className="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs sm:text-sm shadow-xs transition-colors cursor-pointer"
          >
            Simpan Konfigurasi
          </button>
        </div>
      </form>
    </div>
  );
}
