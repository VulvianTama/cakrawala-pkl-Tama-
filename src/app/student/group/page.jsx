"use client";

import React, { useState } from "react";
import Link from "next/link";

export default function StudentGroupPage() {
  const [showLetterPreview, setShowLetterPreview] = useState(false);

  const groupData = {
    name: "Alpha Dev",
    code: "GRP-2026-001",
    status: "accept",
    office: {
      name: "PT Telkom Indonesia (Witel Jatim)",
      field: "Teknologi Informasi & Telekomunikasi",
      address: "Jl. Ketintang No. 156, Gayungan, Surabaya 60231",
      picName: "Rahmat Wicaksono, S.T",
      picRole: "Head of Digital Infrastructure & Talent",
      picPhone: "0811-3456-7890",
      workHours: "Senin - Jumat, 08:00 - 16:30 WIB",
    },
    teacher: {
      name: "Drs. Hendro Wibowo, M.Kom",
      nip: "198504122010011002",
      role: "Guru Pembimbing Lapangan",
      phone: "0812-3456-7890",
    },
    letterNo: "421.5/PKL-SMK/011/2026",
    signedAt: "18 Nov 2026, 09:30 WIB",
    members: [
      {
        id: "M01",
        name: "Budi Santoso",
        nis: "20241001",
        class: "XII RPL 1",
        role: "Ketua Kelompok",
        isLeader: true,
      },
      {
        id: "M02",
        name: "Siti Rahmawati",
        nis: "20241002",
        class: "XII RPL 1",
        role: "Anggota",
        isLeader: false,
      },
    ],
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold tracking-tight text-[#1d1d1f]">
              Kelompok PKL: {groupData.name}
            </h1>
            <span className="text-[11px] font-semibold bg-[#34c759]/15 text-[#248a3d] px-2.5 py-0.5 rounded-full border border-[#34c759]/20">
              Disetujui & Diterbitkan
            </span>
          </div>
          <p className="text-xs text-[#86868b] mt-0.5">
            Kode Kelompok: <span className="font-mono tabular-nums">{groupData.code}</span> • Status penempatan magang aktif
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Link
            href="/student/group/create"
            className="px-3.5 py-2 text-xs font-semibold text-[#0071e3] bg-[#0071e3]/10 hover:bg-[#0071e3]/15 rounded-xl transition-all"
          >
            Buat Kelompok Baru
          </Link>
        </div>
      </div>

      {/* Progress Timeline (Apple Visual Stepper) */}
      <section className="bg-white rounded-3xl p-6 border border-black/[0.06] shadow-[0_2px_12px_rgba(0,0,0,0.03)]">
        <h2 className="text-xs font-bold uppercase tracking-wider text-[#86868b] mb-4">
          Tahapan Status Pengajuan PKL
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
          {[
            { step: "1. Pemilihan Mitra", desc: "PT Telkom Indonesia", done: true },
            { step: "2. Verifikasi Guru", desc: "Drs. Hendro Wibowo", done: true },
            { step: "3. Tanda Tangan & ACC", desc: "ACC Digital Resmi", done: true },
            { step: "4. Surat Tugas Terbit", desc: groupData.letterNo, done: true },
          ].map((item, idx) => (
            <div
              key={idx}
              className="p-3.5 rounded-2xl bg-[#f5f5f7] border border-black/[0.04] flex items-start gap-3"
            >
              <div className="w-6 h-6 rounded-full bg-[#34c759] text-white flex items-center justify-center shrink-0 mt-0.5">
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div>
                <p className="text-xs font-bold text-[#1d1d1f]">{item.step}</p>
                <p className="text-[11px] text-[#86868b] mt-0.5 truncate">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Grid: Office Mitra & Teacher Supervisor */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* Office Details */}
        <div className="md:col-span-7 bg-white rounded-3xl p-6 border border-black/[0.06] shadow-[0_2px_12px_rgba(0,0,0,0.03)] space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-semibold tracking-tight text-[#1d1d1f]">
              Instansi / Perusahaan Tempat Magang
            </h2>
            <span className="text-[10px] font-semibold bg-blue-50 text-[#0071e3] px-2.5 py-0.5 rounded-full">
              Industri Mitra
            </span>
          </div>

          <div className="p-4 bg-[#f5f5f7] rounded-2xl space-y-2.5 text-xs">
            <div>
              <p className="text-[10px] text-[#86868b] uppercase tracking-wider">Nama Perusahaan</p>
              <p className="font-bold text-sm text-[#1d1d1f]">{groupData.office.name}</p>
              <p className="text-[#86868b]">{groupData.office.field}</p>
            </div>

            <div className="pt-2 border-t border-black/[0.05]">
              <p className="text-[10px] text-[#86868b] uppercase tracking-wider">Alamat Kantor</p>
              <p className="text-[#1d1d1f]">{groupData.office.address}</p>
            </div>

            <div className="pt-2 border-t border-black/[0.05] grid grid-cols-2 gap-2">
              <div>
                <p className="text-[10px] text-[#86868b] uppercase tracking-wider">PIC Kantor</p>
                <p className="font-semibold text-[#1d1d1f]">{groupData.office.picName}</p>
                <p className="text-[10px] text-[#86868b]">{groupData.office.picRole}</p>
              </div>
              <div>
                <p className="text-[10px] text-[#86868b] uppercase tracking-wider">Jam Operasional</p>
                <p className="font-mono text-[#1d1d1f] text-[11px]">{groupData.office.workHours}</p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowLetterPreview(true)}
              className="apple-btn-primary flex-1 py-2.5 text-white text-xs font-semibold rounded-xl transition-all shadow-sm flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
              </svg>
              Lihat Surat Pengantar PKL
            </button>
          </div>
        </div>

        {/* Guru Pembimbing & Anggota */}
        <div className="md:col-span-5 space-y-5">
          {/* Guru Pembimbing Card */}
          <div className="bg-white rounded-3xl p-6 border border-black/[0.06] shadow-[0_2px_12px_rgba(0,0,0,0.03)] space-y-3">
            <h3 className="text-xs font-bold text-[#1d1d1f] uppercase tracking-wider">
              Guru Pembimbing Sekolah
            </h3>

            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 text-white flex items-center justify-center font-bold text-sm shadow-sm">
                HW
              </div>
              <div>
                <p className="font-bold text-xs text-[#1d1d1f]">{groupData.teacher.name}</p>
                <p className="text-[10px] text-[#86868b] font-mono tabular-nums">NIP. {groupData.teacher.nip}</p>
                <p className="text-[10px] text-[#0071e3] font-medium">{groupData.teacher.role}</p>
              </div>
            </div>

            <div className="pt-2 border-t border-black/[0.05] flex items-center justify-between text-xs">
              <span className="text-[#86868b]">Telepon / WhatsApp:</span>
              <span className="font-mono font-semibold text-[#1d1d1f]">{groupData.teacher.phone}</span>
            </div>
          </div>

          {/* Members List */}
          <div className="bg-white rounded-3xl p-6 border border-black/[0.06] shadow-[0_2px_12px_rgba(0,0,0,0.03)] space-y-3">
            <h3 className="text-xs font-bold text-[#1d1d1f] uppercase tracking-wider">
              Anggota Kelompok ({groupData.members.length} Siswa)
            </h3>

            <div className="divide-y divide-black/[0.05]">
              {groupData.members.map((member) => (
                <div key={member.id} className="py-2.5 flex items-center justify-between text-xs">
                  <div>
                    <p className="font-semibold text-[#1d1d1f]">{member.name}</p>
                    <p className="text-[10px] text-[#86868b] font-mono tabular-nums">
                      NIS: {member.nis} • {member.class}
                    </p>
                  </div>
                  <span
                    className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                      member.isLeader
                        ? "bg-[#0071e3]/10 text-[#0071e3]"
                        : "bg-black/[0.05] text-[#86868b]"
                    }`}
                  >
                    {member.role}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Modal Preview Surat PKL */}
      {showLetterPreview && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl w-full max-w-lg shadow-2xl border border-black/[0.08] overflow-hidden flex flex-col max-h-[90vh]">
            <div className="pt-3 pb-1 flex justify-center">
              <div className="w-10 h-1 rounded-full bg-slate-300"></div>
            </div>

            <div className="px-6 py-3 border-b border-black/[0.06] flex items-center justify-between">
              <div>
                <h3 className="font-bold text-sm text-[#1d1d1f]">Surat Pengantar PKL Resmi</h3>
                <p className="text-[11px] font-mono tabular-nums text-[#86868b]">{groupData.letterNo}</p>
              </div>
              <button
                onClick={() => setShowLetterPreview(false)}
                className="w-7 h-7 rounded-full bg-black/[0.05] hover:bg-black/[0.1] text-[#86868b] flex items-center justify-center cursor-pointer"
                title="Tutup"
              >
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="p-6 overflow-y-auto space-y-4 text-xs text-[#1d1d1f]">
              <div className="text-center pb-3 border-b-2 border-black/80">
                <p className="text-[10px] font-bold tracking-wider uppercase text-[#86868b]">Pemerintah Provinsi Jawa Timur</p>
                <p className="text-xs font-bold uppercase">Dinas Pendidikan Sekolah Menengah Kejuruan</p>
                <p className="text-sm font-extrabold uppercase mt-0.5">SMK Negeri 1 Cakrawala</p>
              </div>

              <div className="text-center py-1">
                <p className="font-bold underline text-xs uppercase">Surat Tugas Praktik Kerja Lapangan</p>
                <p className="text-[11px] font-mono text-[#86868b]">Nomor: {groupData.letterNo}</p>
              </div>

              <p className="leading-relaxed">
                Menugaskan siswa terlampir untuk melaksanakan Praktik Kerja Lapangan pada <strong>{groupData.office.name}</strong>.
              </p>

              <div className="border border-[#34c759]/40 bg-[#34c759]/5 p-2.5 rounded-xl flex items-center justify-between">
                <div>
                  <p className="text-[11px] font-bold text-[#248a3d]">Status ACC: SAH & DITANDATANGANI</p>
                  <p className="text-[10px] text-[#86868b]">Oleh: {groupData.teacher.name} ({groupData.signedAt})</p>
                </div>
                <span className="text-xs font-mono font-bold bg-white px-2 py-1 rounded border border-[#34c759]/30 text-[#248a3d]">
                  QR VERIFIED
                </span>
              </div>
            </div>

            <div className="p-4 bg-[#f5f5f7] border-t border-black/[0.06] flex items-center justify-end gap-2">
              <button
                onClick={() => setShowLetterPreview(false)}
                className="px-4 py-2 text-xs font-semibold text-[#86868b] hover:text-[#1d1d1f] rounded-xl cursor-pointer"
              >
                Tutup
              </button>
              <button
                onClick={() => alert("File PDF surat berhasil diunduh.")}
                className="px-4 py-2 bg-[#0071e3] text-white text-xs font-semibold rounded-xl hover:bg-[#0077ed] transition-all shadow-sm cursor-pointer"
              >
                Unduh PDF
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
