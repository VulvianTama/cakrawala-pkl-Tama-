"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function StudentCreateGroupPage() {
  const router = useRouter();
  const [groupName, setGroupName] = useState("");
  const [selectedOffice, setSelectedOffice] = useState("");
  const [leaderNis, setLeaderNis] = useState("20241001");
  const [member1Nis, setMember1Nis] = useState("");
  const [member2Nis, setMember2Nis] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const offices = [
    { id: "OFF-01", name: "PT Telkom Indonesia", quota: 4, remaining: 2, field: "IT & Telekomunikasi" },
    { id: "OFF-02", name: "Diskominfo Kota Surabaya", quota: 3, remaining: 1, field: "Pemerintahan & Cyber Ops" },
    { id: "OFF-03", name: "CV Inovasi Digital (Pixel Studio)", quota: 2, remaining: 2, field: "Software & Mobile App" },
    { id: "OFF-04", name: "Studio Animasi Nusantara", quota: 3, remaining: 0, field: "DKV & Animasi (Penuh)" }
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!groupName.trim() || !selectedOffice) {
      alert("Harap lengkapi nama kelompok dan pilih instansi mitra.");
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      alert("Kelompok PKL " + groupName + " berhasil diajukan! Menunggu penugasan guru pembimbing.");
      router.push("/student/group");
    }, 600);
  };

  return (
    <div className="space-y-6 max-w-2xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold tracking-tight text-[#1d1d1f]">
            Pengajuan Kelompok PKL
          </h1>
          <p className="text-xs text-[#86868b] mt-0.5">
            Daftarkan nama kelompok, tentukan anggota tim, dan pilih instansi mitra magang.
          </p>
        </div>
        <Link
          href="/student/group"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#0071e3] hover:text-[#0077ed] transition-colors"
        >
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
          </svg>
          Kembali
        </Link>
      </div>

      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-black/[0.06] shadow-[0_2px_12px_rgba(0,0,0,0.03)]">
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Group Name */}
          <div>
            <label className="block text-xs font-semibold text-[#1d1d1f] mb-1.5">
              Nama Kelompok
            </label>
            <input
              type="text"
              value={groupName}
              onChange={(e) => setGroupName(e.target.value)}
              placeholder="Contoh: Alpha Dev, Cyber Ops"
              className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-black/10 bg-[#f5f5f7] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0071e3] transition-all"
              required
            />
          </div>

          {/* Select Partner Office */}
          <div>
            <label className="block text-xs font-semibold text-[#1d1d1f] mb-1.5">
              Pilihan Perusahaan / Instansi Mitra
            </label>
            <div className="space-y-2">
              {offices.map((office) => {
                const isFull = office.remaining === 0;
                const isSelected = selectedOffice === office.id;
                return (
                  <label
                    key={office.id}
                    className={`flex items-center justify-between p-3.5 rounded-2xl border transition-all cursor-pointer ${
                      isFull
                        ? "opacity-50 cursor-not-allowed bg-black/[0.02] border-black/[0.05]"
                        : isSelected
                        ? "border-[#0071e3] bg-[#0071e3]/5 shadow-sm"
                        : "border-black/[0.08] hover:bg-black/[0.02]"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <input
                        type="radio"
                        name="office"
                        disabled={isFull}
                        checked={isSelected}
                        onChange={() => setSelectedOffice(office.id)}
                        className="text-[#0071e3] focus:ring-[#0071e3]"
                      />
                      <div>
                        <p className="font-semibold text-xs text-[#1d1d1f]">{office.name}</p>
                        <p className="text-[11px] text-[#86868b]">{office.field}</p>
                      </div>
                    </div>
                    <span
                      className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                        isFull
                          ? "bg-red-50 text-red-600"
                          : "bg-[#34c759]/15 text-[#248a3d]"
                      }`}
                    >
                      {isFull ? "Kuota Penuh" : `Sisa ${office.remaining} Kuota`}
                    </span>
                  </label>
                );
              })}
            </div>
          </div>

          {/* Group Members Section */}
          <div className="pt-3 border-t border-black/[0.06] space-y-3">
            <h3 className="text-xs font-bold text-[#1d1d1f] uppercase tracking-wider">
              Susunan Anggota Kelompok
            </h3>

            <div>
              <label className="block text-[11px] text-[#86868b] mb-1">
                Ketua Kelompok (Akun Anda)
              </label>
              <input
                type="text"
                disabled
                value={`Budi Santoso (NIS: ${leaderNis})`}
                className="w-full px-3.5 py-2 text-xs rounded-xl border border-black/10 bg-black/[0.03] text-[#1d1d1f] font-medium"
              />
            </div>

            <div>
              <label className="block text-[11px] text-[#86868b] mb-1">
                NIS Anggota 1 (Opsional)
              </label>
              <input
                type="text"
                value={member1Nis}
                onChange={(e) => setMember1Nis(e.target.value)}
                placeholder="Masukkan NIS Siswa (contoh: 20241002)"
                className="w-full px-3.5 py-2 text-xs rounded-xl border border-black/10 bg-[#f5f5f7] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0071e3] transition-all font-mono"
              />
            </div>

            <div>
              <label className="block text-[11px] text-[#86868b] mb-1">
                NIS Anggota 2 (Opsional)
              </label>
              <input
                type="text"
                value={member2Nis}
                onChange={(e) => setMember2Nis(e.target.value)}
                placeholder="Masukkan NIS Siswa (contoh: 20241003)"
                className="w-full px-3.5 py-2 text-xs rounded-xl border border-black/10 bg-[#f5f5f7] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0071e3] transition-all font-mono"
              />
            </div>
          </div>

          {/* Submit Action */}
          <div className="pt-3 border-t border-black/[0.06] flex items-center justify-end gap-2">
            <Link
              href="/student/group"
              className="px-4 py-2 text-xs font-semibold text-[#86868b] hover:text-[#1d1d1f] rounded-xl"
            >
              Batal
            </Link>
            <button
              type="submit"
              disabled={isSubmitting}
              className="apple-btn-primary px-5 py-2.5 text-white text-xs font-semibold rounded-xl transition-all shadow-sm cursor-pointer disabled:opacity-50"
            >
              {isSubmitting ? "Mengirimkan Pengajuan..." : "Ajukan Kelompok PKL"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
