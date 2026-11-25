"use client";

import React, { useState } from "react";
import Link from "next/link";

export default function AdminStudentsPage() {
  const [students, setStudents] = useState([
    { id: "S01", nis: "20241001", name: "Budi Santoso", class_name: "XII RPL 1", email: "budi.santoso@smk.sch.id", group: "Alpha Dev", office: "PT Telkom Indonesia", status: "Aktif" },
    { id: "S02", nis: "20241002", name: "Siti Rahmawati", class_name: "XII RPL 1", email: "siti.rahma@smk.sch.id", group: "Alpha Dev", office: "PT Telkom Indonesia", status: "Aktif" },
    { id: "S03", nis: "20241003", name: "Ahmad Fauzi", class_name: "XII TKJ 2", email: "ahmad.f@smk.sch.id", group: "Cyber Ops", office: "Diskominfo Provinsi", status: "Aktif" },
    { id: "S04", nis: "20241004", name: "Dewi Lestari", class_name: "XII TKJ 2", email: "dewi.l@smk.sch.id", group: "Cyber Ops", office: "Diskominfo Provinsi", status: "Menunggu" },
    { id: "S05", nis: "20241005", name: "Rizky Pratama", class_name: "XII RPL 2", email: "rizky.p@smk.sch.id", group: "Pixel Studio", office: "CV Inovasi Digital", status: "Aktif" },
    { id: "S06", nis: "20241006", name: "Nabila Az-Zahra", class_name: "XII DKV 1", email: "nabila.a@smk.sch.id", group: "Creative Hub", office: "Studio Animasi Nusantara", status: "Aktif" },
    { id: "S07", nis: "20241007", name: "Fajar Nugraha", class_name: "XII RPL 2", email: "fajar.n@smk.sch.id", group: "-", office: "-", status: "Belum PKL" }
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [form, setForm] = useState({ nis: "", name: "", class_name: "XII RPL 1", email: "", office: "-", status: "Aktif" });

  const handleDelete = (id) => {
    if (window.confirm("Hapus data siswa ini dari sistem?")) {
      setStudents(students.filter(s => s.id !== id));
    }
  };

  const handleSave = (e) => {
    e.preventDefault();
    setStudents([...students, { id: `S0${students.length + 1}`, group: "-", ...form }]);
    setModalOpen(false);
  };

  const filtered = students.filter(s =>
    s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.nis.includes(searchTerm) ||
    s.class_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl p-6 sm:p-7 border border-slate-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-semibold mb-2">
            Data Pokok Siswa
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
            Master Data Siswa PKL
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-xl">
            Kelola data siswa peserta magang, penempatan industri, dan akun login aplikasi.
          </p>
        </div>

        <button
          onClick={() => { setForm({ nis: "", name: "", class_name: "XII RPL 1", email: "", office: "-", status: "Aktif" }); setModalOpen(true); }}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs sm:text-sm font-semibold rounded-xl shadow-xs transition-colors cursor-pointer self-start"
        >
          + Tambah Siswa Baru
        </button>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden p-5 sm:p-6">
        <div className="flex items-center justify-between gap-4 mb-4">
          <div className="text-sm font-semibold text-slate-700">
            Daftar Siswa ({filtered.length} orang)
          </div>
          <input
            type="text"
            placeholder="Cari siswa atau NIS..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-64 px-3 py-1.5 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-slate-800"
          />
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead>
              <tr className="bg-slate-50 text-slate-600 font-semibold border-y border-slate-200">
                <th className="py-3 px-4">NIS</th>
                <th className="py-3 px-4">Nama Siswa</th>
                <th className="py-3 px-4">Kelas</th>
                <th className="py-3 px-4">Kelompok</th>
                <th className="py-3 px-4">Instansi Kantor</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.map((student) => (
                <tr key={student.id} className="hover:bg-slate-50/70">
                  <td className="py-3 px-4 font-mono text-slate-600">{student.nis}</td>
                  <td className="py-3 px-4 font-semibold text-slate-900">
                    <div>{student.name}</div>
                    <div className="text-[11px] font-normal text-slate-400">{student.email}</div>
                  </td>
                  <td className="py-3 px-4 text-slate-600">{student.class_name}</td>
                  <td className="py-3 px-4 font-medium text-slate-800">{student.group}</td>
                  <td className="py-3 px-4 text-slate-600">{student.office}</td>
                  <td className="py-3 px-4">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                        student.status === "Aktif"
                          ? "bg-emerald-100 text-emerald-800"
                          : student.status === "Menunggu"
                          ? "bg-amber-100 text-amber-800"
                          : "bg-slate-100 text-slate-600"
                      }`}
                    >
                      {student.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-right">
                    <button
                      onClick={() => handleDelete(student.id)}
                      className="px-2 py-1 text-xs text-rose-600 hover:bg-rose-50 font-medium rounded cursor-pointer"
                    >
                      Hapus
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-xs p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-xl border border-slate-200">
            <h3 className="text-lg font-bold text-slate-900 mb-1">Tambah Siswa Peserta PKL</h3>
            <p className="text-xs text-slate-500 mb-4">Lengkapi data siswa untuk pembuatan akun sistem.</p>

            <form onSubmit={handleSave} className="space-y-3 text-xs sm:text-sm">
              <div>
                <label className="block text-slate-700 font-medium mb-1">NIS</label>
                <input
                  type="text"
                  required
                  value={form.nis}
                  onChange={(e) => setForm({ ...form, nis: e.target.value })}
                  placeholder="Nomor Induk Siswa"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-slate-800"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-medium mb-1">Nama Lengkap</label>
                <input
                  type="text"
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="Nama siswa"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-slate-800"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-700 font-medium mb-1">Kelas</label>
                  <select
                    value={form.class_name}
                    onChange={(e) => setForm({ ...form, class_name: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-slate-800"
                  >
                    <option value="XII RPL 1">XII RPL 1</option>
                    <option value="XII RPL 2">XII RPL 2</option>
                    <option value="XII TKJ 1">XII TKJ 1</option>
                    <option value="XII TKJ 2">XII TKJ 2</option>
                    <option value="XII DKV 1">XII DKV 1</option>
                  </select>
                </div>
                <div>
                  <label className="block text-slate-700 font-medium mb-1">Status</label>
                  <select
                    value={form.status}
                    onChange={(e) => setForm({ ...form, status: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-slate-800"
                  >
                    <option value="Aktif">Aktif</option>
                    <option value="Menunggu">Menunggu</option>
                    <option value="Belum PKL">Belum PKL</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-slate-700 font-medium mb-1">Email</label>
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  placeholder="siswa@smk.sch.id"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-slate-800"
                />
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
                  className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold cursor-pointer"
                >
                  Simpan Siswa
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
