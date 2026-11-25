"use client";

import React, { useState } from "react";
import Link from "next/link";

export default function AdminGroupsPage() {
  const [groups, setGroups] = useState([
    { 
      id: "G01", 
      name: "Alpha Dev", 
      leader: "Budi Santoso", 
      membersCount: 4, 
      office: "PT Telkom Indonesia", 
      teacher: "Drs. Hendro Wibowo, M.Kom", 
      status: "accept",
      letterFile: "Surat_Pengantar_AlphaDev.pdf",
      letterNo: "421.5/PKL-SMK/011/2026",
      isSigned: true 
    },
    { 
      id: "G02", 
      name: "Cyber Ops", 
      leader: "Ahmad Fauzi", 
      membersCount: 3, 
      office: "Diskominfo Provinsi", 
      teacher: "Sri Wahyuni, S.Pd", 
      status: "applying",
      letterFile: "Surat_Pengantar_CyberOps.pdf",
      letterNo: "421.5/PKL-SMK/018/2026",
      isSigned: true 
    },
    { 
      id: "G03", 
      name: "Pixel Studio", 
      leader: "Rizky Pratama", 
      membersCount: 2, 
      office: "CV Inovasi Digital", 
      teacher: "Arief Wicaksono, M.T", 
      status: "accept",
      letterFile: "Surat_Pengantar_PixelStudio.pdf",
      letterNo: "421.5/PKL-SMK/022/2026",
      isSigned: true 
    },
    { 
      id: "G04", 
      name: "Creative Hub", 
      leader: "Nabila Az-Zahra", 
      membersCount: 3, 
      office: "Studio Animasi Nusantara", 
      teacher: "Sri Wahyuni, S.Pd", 
      status: "requesting",
      letterFile: null,
      letterNo: "421.5/PKL-SMK/034/2026",
      isSigned: false 
    }
  ]);

  const defaultGroup = {
    id: "",
    name: "",
    leader: "",
    membersCount: 0,
    office: "",
    teacher: "",
    status: "",
    letterFile: null,
    letterNo: "",
    isSigned: false
  };

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedGroup, setSelectedGroup] = useState(defaultGroup);
  const [modalOpen, setModalOpen] = useState(false);
  const [pdfName, setPdfName] = useState("");

  const handleOpenAcc = (group) => {
    if (!group) return;
    setSelectedGroup(group);
    setPdfName(group.letterFile || `Surat_Pengantar_${(group.name || "").replace(/\s+/g, "_")}.pdf`);
    setModalOpen(true);
  };

  const handleConfirmAcc = (e) => {
    e.preventDefault();
    if (!selectedGroup || !selectedGroup.id) return;
    const targetId = selectedGroup.id;
    const targetName = selectedGroup.name;
    setGroups((prev) =>
      prev.map((g) => {
        if (g && g.id === targetId) {
          return {
            ...g,
            status: "accept",
            isSigned: true,
            letterFile: pdfName
          };
        }
        return g;
      })
    );
    setModalOpen(false);
    alert(`Surat pengantar untuk "${targetName}" berhasil di-ACC & diterbitkan!`);
  };

  const handleDelete = (id) => {
    if (!id) return;
    if (window.confirm("Bubarkan kelompok magang ini?")) {
      setGroups((prev) => prev.filter((g) => g && g.id !== id));
    }
  };

  const filtered = groups.filter(g =>
    g.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    g.office.toLowerCase().includes(searchTerm.toLowerCase()) ||
    g.leader.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl p-6 sm:p-7 border border-slate-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-semibold mb-2">
            Penempatan & Dokumen Magang
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
            Kelompok Magang & ACC Surat PKL
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-xl">
            Kelola persetujuan berkas pengantar, lampiran PDF surat magang, dan status alur perizinan siswa.
          </p>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden p-5 sm:p-6">
        <div className="flex items-center justify-between gap-4 mb-4">
          <div className="text-sm font-semibold text-slate-700">
            Daftar Kelompok ({filtered.length})
          </div>
          <input
            type="text"
            placeholder="Cari kelompok / kantor..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-64 px-3 py-1.5 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-slate-800"
          />
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead>
              <tr className="bg-slate-50 text-slate-600 font-semibold border-y border-slate-200">
                <th className="py-3 px-4">Nama Kelompok</th>
                <th className="py-3 px-4">Ketua Kelompok</th>
                <th className="py-3 px-4">Jumlah Anggota</th>
                <th className="py-3 px-4">Mitra Kantor</th>
                <th className="py-3 px-4">Dokumen PDF</th>
                <th className="py-3 px-4">Status Alur</th>
                <th className="py-3 px-4 text-right">Otorisasi / ACC</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.map((group) => (
                <tr key={group.id} className="hover:bg-slate-50/70">
                  <td className="py-3 px-4">
                    <div className="font-bold text-slate-900">{group.name}</div>
                    <div className="text-[11px] font-mono text-slate-400">{group.letterNo}</div>
                  </td>
                  <td className="py-3 px-4 text-slate-700">{group.leader}</td>
                  <td className="py-3 px-4 text-slate-600">{group.membersCount} Siswa</td>
                  <td className="py-3 px-4 font-semibold text-slate-800">{group.office}</td>
                  <td className="py-3 px-4">
                    {group.letterFile ? (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-slate-100 text-slate-700 font-mono text-xs">
                        <span className="text-rose-600 font-bold">PDF</span> {group.letterFile}
                      </span>
                    ) : (
                      <span className="text-slate-400 italic text-xs">Belum ada PDF</span>
                    )}
                  </td>
                  <td className="py-3 px-4">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                        group.status === "accept"
                          ? "bg-emerald-100 text-emerald-800"
                          : group.status === "applying"
                          ? "bg-blue-100 text-blue-800"
                          : "bg-amber-100 text-amber-800"
                      }`}
                    >
                      {group.status === "accept"
                        ? "Resmi Masuk / ACC"
                        : group.status === "applying"
                        ? "Menunggu Balasan Kantor"
                        : "Butuh Surat Guru (Menunggu ACC)"}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-right space-x-1.5">
                    {group.status === "requesting" ? (
                      <button
                        onClick={() => handleOpenAcc(group)}
                        className="px-3 py-1 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-lg text-xs shadow-xs cursor-pointer"
                      >
                        ACC Surat PKL
                      </button>
                    ) : (
                      <button
                        onClick={() => handleOpenAcc(group)}
                        className="px-2.5 py-1 text-xs text-emerald-700 hover:bg-emerald-50 border border-emerald-300 font-semibold rounded-lg cursor-pointer"
                      >
                        Lihat Surat ACC
                      </button>
                    )}
                    <button
                      onClick={() => handleDelete(group.id)}
                      className="px-2 py-1 text-xs text-rose-600 hover:bg-rose-50 font-medium rounded cursor-pointer"
                    >
                      Bubarkan
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal ACC Admin */}
      {modalOpen && selectedGroup?.id ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-200">
            <h3 className="text-lg font-bold text-slate-900 mb-1">
              ACC & Pengesahan Surat Pengantar PKL
            </h3>
            <p className="text-xs text-slate-500 mb-4">
              Kelompok: <strong>{selectedGroup.name}</strong> &bull; Instansi: <strong>{selectedGroup.office}</strong>
            </p>

            <form onSubmit={handleConfirmAcc} className="space-y-4 text-xs sm:text-sm">
              <div>
                <label className="block text-slate-700 font-medium mb-1">Unggah / Pilih File PDF Surat PKL</label>
                <div className="border border-slate-200 rounded-xl p-3 bg-slate-50 flex items-center justify-between">
                  <span className="font-mono text-xs text-slate-700">{pdfName}</span>
                  <label className="px-2.5 py-1 bg-white border border-slate-300 text-slate-700 rounded-lg text-xs font-semibold cursor-pointer">
                    Ganti PDF
                    <input
                      type="file"
                      accept="application/pdf"
                      onChange={(e) => e.target.files?.[0] && setPdfName(e.target.files[0].name)}
                      className="hidden"
                    />
                  </label>
                </div>
              </div>

              <div className="border border-slate-200 rounded-xl p-3 bg-emerald-50 text-emerald-900 text-xs">
                <div className="font-bold">Tanda Tangan & Stempel Resmi</div>
                <div className="text-emerald-700 mt-0.5">Stempel digital QR sekolah dan tanda tangan guru otomatis dilekatkan ke dalam berkas surat pengantar PDF.</div>
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 font-medium cursor-pointer"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold cursor-pointer"
                >
                  ACC & Sahkan Sekarang
                </button>
              </div>
            </form>
          </div>
        </div>
      ) : null}
    </div>
  );
}
