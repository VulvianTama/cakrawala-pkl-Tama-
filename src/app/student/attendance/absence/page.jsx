"use client";

import React, { useState } from "react";
import Link from "next/link";

export default function StudentAbsencePage() {
  const [absenceType, setAbsenceType] = useState("sick"); // 'sick' atau 'permission'
  const [startDate, setStartDate] = useState("2026-11-24");
  const [endDate, setEndDate] = useState("2026-11-24");
  const [reason, setReason] = useState("");
  const [attachmentName, setAttachmentName] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const [absenceHistory, setAbsenceHistory] = useState([
    {
      id: "REQ-002",
      type: "Izin",
      category: "Keperluan Keluarga",
      dates: "12 Nov 2026",
      reason: "Menghadiri acara pernikahan saudara kandung di luar kota",
      file: "Surat_Izin_Orang_Tua.pdf",
      status: "Disetujui",
      approvedBy: "Drs. Hendro Wibowo, M.Kom",
      approvedAt: "11 Nov 2026, 14:00 WIB"
    }
  ]);

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setAttachmentName(e.target.files[0].name);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!reason.trim()) {
      alert("Harap isi alasan permohonan izin/sakit.");
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      const newRequest = {
        id: `REQ-00${absenceHistory.length + 3}`,
        type: absenceType === "sick" ? "Sakit" : "Izin",
        category: absenceType === "sick" ? "Surat Dokter" : "Keperluan Mendesak",
        dates: startDate === endDate ? startDate : `${startDate} s.d. ${endDate}`,
        reason: reason,
        file: attachmentName || "Surat_Keterangan.pdf",
        status: "Menunggu ACC",
        approvedBy: "-",
        approvedAt: "-"
      };
      setAbsenceHistory([newRequest, ...absenceHistory]);
      setShowSuccessModal(true);
      setReason("");
      setAttachmentName("");
    }, 600);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold tracking-tight text-[#1d1d1f]">
            Pengajuan Izin & Sakit
          </h1>
          <p className="text-xs text-[#6e6e73] mt-0.5">
            Sampaikan surat keterangan jika berhalangan hadir di lokasi magang.
          </p>
        </div>
        <Link
          href="/student"
          className="text-xs font-semibold text-[#0071e3] hover:underline flex items-center gap-1"
        >
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Kembali ke Beranda
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* Form Column */}
        <div className="md:col-span-6 bg-white rounded-3xl p-6 border border-black/[0.06] shadow-[0_2px_12px_rgba(0,0,0,0.03)]">
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Apple Segmented Control */}
            <div>
              <label className="block text-xs font-semibold text-[#1d1d1f] mb-2">
                Jenis Permohonan
              </label>
              <div className="p-1 bg-black/[0.05] rounded-2xl flex gap-1">
                <button
                  type="button"
                  onClick={() => setAbsenceType("sick")}
                  className={`flex-1 py-2 text-xs font-semibold rounded-xl transition-all cursor-pointer ${
                    absenceType === "sick"
                      ? "bg-white text-[#1d1d1f] shadow-sm font-bold"
                      : "text-[#86868b] hover:text-[#1d1d1f]"
                  }`}
                >
                  Sakit (Butuh Surat Dokter)
                </button>
                <button
                  type="button"
                  onClick={() => setAbsenceType("permission")}
                  className={`flex-1 py-2 text-xs font-semibold rounded-xl transition-all cursor-pointer ${
                    absenceType === "permission"
                      ? "bg-white text-[#1d1d1f] shadow-sm font-bold"
                      : "text-[#86868b] hover:text-[#1d1d1f]"
                  }`}
                >
                  Izin / Keperluan Khusus
                </button>
              </div>
            </div>

            {/* Date Range */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-[#1d1d1f] mb-1">
                  Mulai Tanggal
                </label>
                <input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-black/10 bg-[#f5f5f7] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0071e3] transition-all"
                  required
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-[#1d1d1f] mb-1">
                  Sampai Tanggal
                </label>
                <input
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-black/10 bg-[#f5f5f7] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0071e3] transition-all"
                  required
                />
              </div>
            </div>

            {/* Reason */}
            <div>
              <label className="block text-xs font-semibold text-[#1d1d1f] mb-1">
                Keterangan / Alasan
              </label>
              <textarea
                rows={3}
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                placeholder={
                  absenceType === "sick"
                    ? "Tuliskan keluhan sakit dan diagnosis singkat dokter..."
                    : "Jelaskan keperluan izin secara terperinci..."
                }
                className="w-full px-3 py-2 text-xs rounded-xl border border-black/10 bg-[#f5f5f7] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0071e3] transition-all"
                required
              />
            </div>

            {/* Attachment */}
            <div>
              <label className="block text-xs font-semibold text-[#1d1d1f] mb-1">
                Lampiran Bukti (Surat Dokter / Orang Tua)
              </label>
              <label className="flex flex-col items-center justify-center p-4 border-2 border-dashed border-black/15 rounded-2xl hover:bg-[#f5f5f7] cursor-pointer transition-colors text-center">
                <svg className="w-6 h-6 text-[#86868b] mb-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                </svg>
                <span className="text-xs font-medium text-[#1d1d1f]">
                  {attachmentName ? attachmentName : "Pilih dokumen file PDF atau Gambar"}
                </span>
                <span className="text-[10px] text-[#86868b] mt-0.5">Maksimal 5MB (.PDF, .JPG, .PNG)</span>
                <input type="file" accept=".pdf,image/*" onChange={handleFileChange} className="hidden" />
              </label>
            </div>

            {/* Submit CTA */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3 bg-gradient-to-b from-[#0077ed] to-[#0066cc] hover:from-[#007bf5] hover:to-[#0071e3] text-white text-xs font-semibold rounded-xl transition-all shadow-[0_2px_8px_rgba(0,102,204,0.25)] flex items-center justify-center gap-1.5 cursor-pointer active:scale-[0.98]"
            >
              {isSubmitting ? "Mengirim Permohonan..." : "Kirim Pengajuan Izin"}
            </button>
          </form>
        </div>

        {/* Info & Requirements Column */}
        <div className="md:col-span-6 space-y-4">
          <div className="bg-white rounded-3xl p-6 border border-black/[0.06] shadow-[0_2px_12px_rgba(0,0,0,0.03)] space-y-3">
            <h3 className="text-xs font-bold text-[#1d1d1f] uppercase tracking-wider">
              Prosedur Persetujuan Izin
            </h3>
            <ol className="text-xs text-[#86868b] space-y-2 list-decimal list-inside leading-relaxed">
              <li>Permohonan izin akan diteruskan otomatis ke akun Guru Pembimbing PKL Anda.</li>
              <li>Guru pembimbing akan memeriksa lampiran dan memvalidasi ke instansi terkait.</li>
              <li>Status permohonan akan terupdate menjadi <strong>Disetujui</strong> atau <strong>Ditolak</strong> disertai catatan pembimbing.</li>
            </ol>
          </div>

          <div className="bg-[#f5f5f7] rounded-3xl p-5 border border-black/[0.04]">
            <p className="text-xs font-semibold text-[#1d1d1f]">Kontak Darurat Pembimbing</p>
            <p className="text-xs text-[#86868b] mt-0.5">Drs. Hendro Wibowo, M.Kom</p>
            <p className="text-xs font-mono text-[#0071e3] mt-1 font-semibold">WA: 0812-3456-7890</p>
          </div>
        </div>
      </div>

      {/* History Log */}
      <div className="bg-white rounded-3xl p-6 border border-black/[0.06] shadow-[0_2px_12px_rgba(0,0,0,0.03)]">
        <h2 className="text-sm font-semibold tracking-tight text-[#1d1d1f] mb-4">
          Riwayat Pengajuan Izin
        </h2>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-black/[0.06] text-[#86868b]">
                <th className="pb-3 font-medium">Tanggal Izin</th>
                <th className="pb-3 font-medium">Jenis</th>
                <th className="pb-3 font-medium">Alasan</th>
                <th className="pb-3 font-medium">Status</th>
                <th className="pb-3 font-medium">Pemeriksa</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-black/[0.04]">
              {absenceHistory.map((item) => (
                <tr key={item.id} className="hover:bg-black/[0.02]">
                  <td className="py-3 font-medium text-[#1d1d1f]">{item.dates}</td>
                  <td className="py-3">
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold ${
                      item.type === "Sakit" ? "bg-red-50 text-red-600" : "bg-amber-50 text-amber-700"
                    }`}>
                      {item.type}
                    </span>
                  </td>
                  <td className="py-3 text-[#1d1d1f] max-w-xs truncate">{item.reason}</td>
                  <td className="py-3">
                    <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                      item.status === "Disetujui"
                        ? "bg-[#34c759]/15 text-[#248a3d]"
                        : "bg-amber-100 text-amber-800"
                    }`}>
                      {item.status}
                    </span>
                  </td>
                  <td className="py-3 text-[#86868b]">{item.approvedBy}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Success Sheet Modal */}
      {showSuccessModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl w-full max-w-sm p-6 shadow-2xl text-center space-y-4">
            <div className="w-12 h-12 rounded-full bg-[#34c759]/15 text-[#248a3d] flex items-center justify-center mx-auto">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <div>
              <h3 className="font-bold text-base text-[#1d1d1f]">Permohonan Terkirim</h3>
              <p className="text-xs text-[#86868b] mt-1 leading-relaxed">
                Permohonan izin Anda telah diterima dan diteruskan kepada Guru Pembimbing untuk diverifikasi.
              </p>
            </div>
            <button
              onClick={() => setShowSuccessModal(false)}
              className="w-full py-2.5 bg-[#0071e3] text-white text-xs font-semibold rounded-xl hover:bg-[#0077ed] transition-all cursor-pointer"
            >
              Selesai
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
