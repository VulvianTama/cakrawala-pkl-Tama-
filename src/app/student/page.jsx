"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";

export default function StudentDashboardPage() {
  const [currentTime, setCurrentTime] = useState("");
  const [showLetterPreview, setShowLetterPreview] = useState(false);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(
        now.toLocaleTimeString("id-ID", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: false,
        }) + " WIB"
      );
    };
    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  const studentData = {
    name: "Budi Santoso",
    nis: "20241001",
    class: "XII Rekayasa Perangkat Lunak 1",
    group: "Alpha Dev",
    office: "PT Telkom Indonesia",
    officeAddress: "Jl. Ketintang No. 156, Surabaya",
    teacher: "Drs. Hendro Wibowo, M.Kom",
    letterNo: "421.5/PKL-SMK/011/2026",
    letterStatus: "Disetujui & Diterbitkan",
    signedAt: "18 Nov 2026, 09:30 WIB",
    stats: {
      present: 24,
      permission: 1,
      sick: 0,
      journalCount: 22,
    },
    todayStatus: {
      checkedIn: true,
      time: "07:42 WIB",
      status: "Tepat Waktu",
      verifiedGps: true,
      distance: "32 meter dari kantor",
    },
  };

  return (
    <div className="space-y-6">
      {/* Student Welcome Card (Apple Studio Canvas) */}
      <section className="bg-white rounded-3xl p-6 sm:p-7 border border-black/[0.05] shadow-[0_4px_24px_rgba(0,0,0,0.03)] flex flex-col md:flex-row md:items-center justify-between gap-5 relative overflow-hidden">
        {/* Subtle Warm Ambient Accent */}
        <div className="absolute top-0 right-0 w-80 h-40 bg-gradient-to-bl from-blue-500/[0.06] via-indigo-500/[0.03] to-transparent rounded-full blur-2xl pointer-events-none"></div>

        <div className="flex items-center gap-4 relative z-10">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#0077ed] to-[#5856d6] text-white flex items-center justify-center font-bold text-lg shadow-sm border border-white/30 shrink-0">
            BS
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-bold tracking-tight text-[#1d1d1f]">
                {studentData.name}
              </h1>
              <span className="text-[11px] font-semibold bg-[#34c759]/12 text-[#1b7a37] px-2.5 py-0.5 rounded-full border border-[#34c759]/20">
                Siswa Aktif
              </span>
            </div>
            <p className="text-xs text-[#6e6e73] mt-0.5 font-medium">
              NIS: <span className="font-mono tabular-nums text-[#1d1d1f] font-semibold">{studentData.nis}</span> • {studentData.class}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2.5 self-start md:self-auto relative z-10">
          <Link
            href="/student/attendance"
            className="px-4 py-2.5 bg-gradient-to-b from-[#0077ed] to-[#0066cc] text-white text-xs font-semibold rounded-xl hover:from-[#007bf5] hover:to-[#0071e3] transition-all shadow-[0_2px_8px_rgba(0,102,204,0.25)] flex items-center gap-1.5 active:scale-[0.98]"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Presensi Hari Ini
          </Link>
          <Link
            href="/student/attendance/absence"
            className="px-3.5 py-2.5 bg-black/[0.04] hover:bg-black/[0.07] text-[#1d1d1f] text-xs font-semibold rounded-xl transition-all"
          >
            Ajukan Izin
          </Link>
        </div>
      </section>

      {/* Grid: Live Attendance & PKL Placement */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Today's Status Widget */}
        <section className="bg-white rounded-3xl p-6 border border-black/[0.05] shadow-[0_4px_24px_rgba(0,0,0,0.03)] flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#34c759] animate-pulse"></span>
                <h2 className="text-sm font-semibold tracking-tight text-[#1d1d1f]">
                  Presensi Hari Ini
                </h2>
              </div>
              <span className="text-xs font-mono tabular-nums text-[#6e6e73] bg-black/[0.03] px-2.5 py-1 rounded-lg font-medium">
                {currentTime || "07:00:00 WIB"}
              </span>
            </div>

            <div className="p-4 rounded-2xl bg-[#f5f5f7] border border-black/[0.03] mb-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs text-[#6e6e73]">Status Masuk</span>
                <span className="text-xs font-semibold text-[#1b7a37] bg-[#34c759]/15 px-2.5 py-0.5 rounded-full">
                  {studentData.todayStatus.status}
                </span>
              </div>
              <div className="text-3xl font-bold font-mono tracking-tight text-[#1d1d1f]">
                {studentData.todayStatus.time}
              </div>
              <p className="text-[11px] text-[#6e6e73] mt-1.5 flex items-center gap-1 font-medium">
                <svg className="w-3.5 h-3.5 text-[#34c759]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                Terverifikasi GPS ({studentData.todayStatus.distance})
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 pt-3 border-t border-black/[0.04]">
            <Link
              href="/student/attendance"
              className="flex-1 text-center py-2 text-xs font-semibold text-[#0071e3] bg-[#0071e3]/10 hover:bg-[#0071e3]/15 rounded-xl transition-all"
            >
              Buka Kamera Presensi
            </Link>
          </div>
        </section>

        {/* PKL Letter & Placement Widget */}
        <section className="bg-white rounded-3xl p-6 border border-black/[0.05] shadow-[0_4px_24px_rgba(0,0,0,0.03)] flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-sm font-semibold tracking-tight text-[#1d1d1f]">
                Status Penempatan PKL
              </h2>
              <span className="text-[11px] font-semibold text-[#0071e3] bg-[#0071e3]/10 px-2.5 py-0.5 rounded-full">
                {studentData.group}
              </span>
            </div>

            <div className="space-y-2.5 mb-4">
              <div>
                <p className="text-[10px] text-[#86868b] uppercase tracking-wider font-semibold">Mitra Industri</p>
                <p className="text-sm font-bold text-[#1d1d1f] mt-0.5">{studentData.office}</p>
                <p className="text-xs text-[#6e6e73]">{studentData.officeAddress}</p>
              </div>

              <div className="pt-2 border-t border-black/[0.04]">
                <p className="text-[10px] text-[#86868b] uppercase tracking-wider font-semibold">Guru Pembimbing</p>
                <p className="text-xs font-semibold text-[#1d1d1f] mt-0.5">{studentData.teacher}</p>
              </div>

              <div className="pt-2 border-t border-black/[0.04] flex items-center justify-between">
                <div>
                  <p className="text-[10px] text-[#86868b] uppercase tracking-wider font-semibold">Surat Tugas Resmi</p>
                  <p className="text-xs font-mono tabular-nums text-[#1d1d1f] font-semibold mt-0.5">{studentData.letterNo}</p>
                </div>
                <span className="text-[10px] font-semibold text-[#1b7a37] bg-[#34c759]/15 px-2.5 py-0.5 rounded-full">
                  ACC Sah
                </span>
              </div>
            </div>
          </div>

          <div className="pt-3 border-t border-black/[0.04]">
            <button
              onClick={() => setShowLetterPreview(true)}
              className="w-full py-2.5 px-3 bg-black/[0.04] hover:bg-black/[0.08] text-[#1d1d1f] text-xs font-semibold rounded-xl transition-all flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <svg className="w-4 h-4 text-[#0071e3]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
              </svg>
              Pratinjau Surat Tugas PKL
            </button>
          </div>
        </section>
      </div>

      {/* Metric Cards (Apple Grouped Metric Row) */}
      <section className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
        <div className="bg-white rounded-2xl p-4 sm:p-5 border border-black/[0.05] shadow-[0_2px_12px_rgba(0,0,0,0.02)]">
          <p className="text-[11px] font-medium text-[#6e6e73]">Kehadiran Masuk</p>
          <div className="text-2xl sm:text-3xl font-bold font-mono tabular-nums text-[#1d1d1f] mt-1.5">
            {studentData.stats.present}
            <span className="text-xs font-normal text-[#86868b] ml-1">hari</span>
          </div>
          <p className="text-[10px] text-[#1b7a37] font-semibold mt-1">Presensi Terpenuhi</p>
        </div>

        <div className="bg-white rounded-2xl p-4 sm:p-5 border border-black/[0.05] shadow-[0_2px_12px_rgba(0,0,0,0.02)]">
          <p className="text-[11px] font-medium text-[#6e6e73]">Izin Disetujui</p>
          <div className="text-2xl sm:text-3xl font-bold font-mono tabular-nums text-[#a65100] mt-1.5">
            {studentData.stats.permission}
            <span className="text-xs font-normal text-[#86868b] ml-1">hari</span>
          </div>
          <p className="text-[10px] text-[#a65100] font-semibold mt-1">Surat Izin Sah</p>
        </div>

        <div className="bg-white rounded-2xl p-4 sm:p-5 border border-black/[0.05] shadow-[0_2px_12px_rgba(0,0,0,0.02)]">
          <p className="text-[11px] font-medium text-[#6e6e73]">Sakit</p>
          <div className="text-2xl sm:text-3xl font-bold font-mono tabular-nums text-[#1d1d1f] mt-1.5">
            {studentData.stats.sick}
            <span className="text-xs font-normal text-[#86868b] ml-1">hari</span>
          </div>
          <p className="text-[10px] text-[#6e6e73] font-medium mt-1">Surat Dokter</p>
        </div>

        <div className="bg-white rounded-2xl p-4 sm:p-5 border border-black/[0.05] shadow-[0_2px_12px_rgba(0,0,0,0.02)]">
          <p className="text-[11px] font-medium text-[#6e6e73]">Jurnal Kegiatan</p>
          <div className="text-2xl sm:text-3xl font-bold font-mono tabular-nums text-[#0066cc] mt-1.5">
            {studentData.stats.journalCount}
            <span className="text-xs font-normal text-[#86868b] ml-1">entri</span>
          </div>
          <p className="text-[10px] text-[#0066cc] font-semibold mt-1">Terverifikasi Guru</p>
        </div>
      </section>

      {/* Recent Activity List (iOS Inset Grouped Table) */}
      <section className="bg-white rounded-3xl p-6 sm:p-7 border border-black/[0.05] shadow-[0_4px_24px_rgba(0,0,0,0.03)]">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-sm font-semibold tracking-tight text-[#1d1d1f]">
              Aktivitas Presensi Terakhir
            </h2>
            <p className="text-xs text-[#6e6e73] mt-0.5">Catatan waktu kehadiran harian Anda selama periode magang.</p>
          </div>
          <Link href="/student/attendance" className="text-xs font-semibold text-[#0071e3] hover:underline">
            Buka Presensi
          </Link>
        </div>

        <div className="divide-y divide-black/[0.04]">
          {[
            { date: "Senin, 23 Nov 2026", in: "07:42 WIB", out: "Belum Pulang", note: "Konfigurasi server staging dan migrasi schema", status: "Hadir" },
            { date: "Jumat, 20 Nov 2026", in: "07:45 WIB", out: "16:05 WIB", note: "Deployment build v1.4 ke test environment", status: "Hadir" },
            { date: "Kamis, 19 Nov 2026", in: "07:50 WIB", out: "16:00 WIB", note: "Implementasi antarmuka komponen form perizinan", status: "Hadir" },
            { date: "Rabu, 18 Nov 2026", in: "07:40 WIB", out: "16:10 WIB", note: "Refactoring state management dan routing siswa", status: "Hadir" }
          ].map((row, idx) => (
            <div key={idx} className="py-3.5 flex items-center justify-between text-xs hover:bg-black/[0.015] px-2 rounded-xl transition-colors">
              <div className="space-y-0.5">
                <div className="font-semibold text-[#1d1d1f] flex items-center gap-2">
                  <span>{row.date}</span>
                  <span className="text-[10px] font-semibold text-[#1b7a37] bg-[#34c759]/15 px-2 py-0.2 rounded-full">
                    {row.status}
                  </span>
                </div>
                <p className="text-[#6e6e73] text-[11px]">{row.note}</p>
              </div>
              <div className="text-right">
                <div className="font-mono tabular-nums text-[#1d1d1f] font-semibold">{row.in}</div>
                <div className="text-[10px] text-[#86868b]">Pulang: {row.out}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Apple Sheet Modal for PKL Letter Preview */}
      {showLetterPreview && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl w-full max-w-xl shadow-2xl border border-black/[0.08] overflow-hidden flex flex-col max-h-[90vh]">
            <div className="pt-3 pb-1 flex justify-center">
              <div className="w-10 h-1 rounded-full bg-slate-300"></div>
            </div>

            <div className="px-6 py-3 border-b border-black/[0.06] flex items-center justify-between">
              <div>
                <h3 className="font-bold text-sm text-[#1d1d1f]">Surat Tugas PKL Resmi</h3>
                <p className="text-[11px] font-mono tabular-nums text-[#6e6e73]">{studentData.letterNo}</p>
              </div>
              <button
                onClick={() => setShowLetterPreview(false)}
                className="w-7 h-7 rounded-full bg-black/[0.05] hover:bg-black/[0.1] text-[#6e6e73] flex items-center justify-center cursor-pointer"
                title="Tutup"
              >
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="p-6 overflow-y-auto space-y-4 text-xs text-[#1d1d1f]">
              <div className="text-center pb-3 border-b-2 border-black/80">
                <p className="text-[11px] font-bold tracking-wider uppercase text-[#6e6e73]">Pemerintah Provinsi Jawa Timur</p>
                <p className="text-xs font-bold uppercase">Dinas Pendidikan Sekolah Menengah Kejuruan</p>
                <p className="text-base font-extrabold uppercase mt-0.5">SMK Negeri 1 Cakrawala</p>
                <p className="text-[10px] text-[#6e6e73]">Jalan Pendidikan Vokasi No. 10, Telepon (031) 8291000</p>
              </div>

              <div className="text-center py-2">
                <p className="font-bold underline text-sm uppercase">Surat Tugas Praktik Kerja Lapangan</p>
                <p className="text-[11px] font-mono text-[#6e6e73]">Nomor: {studentData.letterNo}</p>
              </div>

              <p className="leading-relaxed">
                Kepala SMK Negeri 1 Cakrawala dengan ini menugaskan siswa kelompok <strong>{studentData.group}</strong> untuk melaksanakan kegiatan Praktik Kerja Lapangan (PKL) terhitung mulai tanggal <strong>1 Desember 2026</strong> hingga <strong>31 Mei 2027</strong> pada:
              </p>

              <div className="bg-[#f5f5f7] p-3 rounded-xl space-y-1">
                <p><strong>Instansi / Perusahaan:</strong> {studentData.office}</p>
                <p><strong>Alamat:</strong> {studentData.officeAddress}</p>
                <p><strong>Guru Pembimbing:</strong> {studentData.teacher}</p>
              </div>

              <div className="pt-4 flex items-end justify-between">
                <div className="border border-[#34c759]/40 bg-[#34c759]/5 p-2 rounded-xl flex items-center gap-2">
                  <div className="w-9 h-9 rounded bg-[#1d1d1f] text-white flex items-center justify-center font-mono font-bold text-[8px] text-center">
                    QR STAMP
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-[#1b7a37]">Tersertifikasi Digital</p>
                    <p className="text-[9px] text-[#6e6e73]">{studentData.signedAt}</p>
                  </div>
                </div>

                <div className="text-right">
                  <p className="text-[11px] text-[#6e6e73]">Mengetahui,</p>
                  <p className="text-xs font-bold text-[#1d1d1f] mt-4">{studentData.teacher}</p>
                  <p className="text-[10px] text-[#6e6e73]">NIP. 198504122010011002</p>
                </div>
              </div>
            </div>

            <div className="p-4 bg-[#f5f5f7] border-t border-black/[0.06] flex items-center justify-end gap-2">
              <button
                onClick={() => setShowLetterPreview(false)}
                className="px-4 py-2 text-xs font-semibold text-[#6e6e73] hover:text-[#1d1d1f] rounded-xl cursor-pointer"
              >
                Tutup
              </button>
              <button
                onClick={() => {
                  alert("File Surat Pengantar PKL (" + studentData.letterNo + ") berhasil diunduh.");
                }}
                className="px-4 py-2 bg-[#0071e3] text-white text-xs font-semibold rounded-xl hover:bg-[#0077ed] transition-all shadow-sm flex items-center gap-1.5 cursor-pointer"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                Unduh PDF
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
