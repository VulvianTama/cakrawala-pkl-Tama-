"use client";

import React, { useState } from "react";
import Link from "next/link";

export default function AdminTeachersPage() {
  const [teachers, setTeachers] = useState([
    { id: "T01", nip: "198504122010011002", name: "Drs. Hendro Wibowo, M.Kom", email: "hendro.wibowo@guru.smk.sch.id", role: "Koordinator PKL", groupsCount: 4, phone: "0812-3456-7890" },
    { id: "T02", nip: "198909152014022003", name: "Sri Wahyuni, S.Pd", email: "sri.wahyuni@guru.smk.sch.id", role: "Pembimbing Lapangan", groupsCount: 3, phone: "0812-9876-5432" },
    { id: "T03", nip: "199201202018011004", name: "Arief Wicaksono, M.T", email: "arief.w@guru.smk.sch.id", role: "Pembimbing Lapangan", groupsCount: 5, phone: "0813-7788-9900" }
  ]);

  const [modalOpen, setModalOpen] = useState(false);
  const [form, setForm] = useState({ nip: "", name: "", email: "", role: "Pembimbing Lapangan", phone: "" });

  const handleDelete = (id) => {
    if (window.confirm("Hapus guru pembimbing ini dari sistem?")) {
      setTeachers(teachers.filter(t => t.id !== id));
    }
  };

  const handleSave = (e) => {
    e.preventDefault();
    setTeachers([...teachers, { id: `T0${teachers.length + 1}`, groupsCount: 0, ...form }]);
    setModalOpen(false);
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl p-6 sm:p-7 border border-slate-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-semibold mb-2">
            Tenaga Pengajar
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
            Guru Pembimbing & Koordinator
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-xl">
            Atur pembagian beban bimbingan siswa, koordinator magang jurusan, dan kontak darurat guru.
          </p>
        </div>

        <button
          onClick={() => { setForm({ nip: "", name: "", email: "", role: "Pembimbing Lapangan", phone: "" }); setModalOpen(true); }}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs sm:text-sm font-semibold rounded-xl shadow-xs transition-colors cursor-pointer self-start"
        >
          + Tambah Guru Baru
        </button>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden p-5 sm:p-6">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead>
              <tr className="bg-slate-50 text-slate-600 font-semibold border-y border-slate-200">
                <th className="py-3 px-4">NIP</th>
                <th className="py-3 px-4">Nama Lengkap</th>
                <th className="py-3 px-4">Peran</th>
                <th className="py-3 px-4">Beban Bimbingan</th>
                <th className="py-3 px-4">Email & Kontak</th>
                <th className="py-3 px-4 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {teachers.map((teacher) => (
                <tr key={teacher.id} className="hover:bg-slate-50/70">
                  <td className="py-3 px-4 font-mono text-slate-600">{teacher.nip}</td>
                  <td className="py-3 px-4 font-semibold text-slate-900">{teacher.name}</td>
                  <td className="py-3 px-4">
                    <span className="px-2.5 py-0.5 bg-blue-50 text-blue-700 rounded-full text-xs font-medium border border-blue-200">
                      {teacher.role}
                    </span>
                  </td>
                  <td className="py-3 px-4 font-semibold text-slate-800">{teacher.groupsCount} Kelompok</td>
                  <td className="py-3 px-4">
                    <div className="text-slate-700">{teacher.email}</div>
                    <div className="text-slate-400 font-mono text-xs">{teacher.phone}</div>
                  </td>
                  <td className="py-3 px-4 text-right">
                    <button
                      onClick={() => handleDelete(teacher.id)}
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
            <h3 className="text-lg font-bold text-slate-900 mb-1">Tambah Guru Pembimbing</h3>
            <p className="text-xs text-slate-500 mb-4">Lengkapi data pengajar untuk hak akses pendampingan magang.</p>

            <form onSubmit={handleSave} className="space-y-3 text-xs sm:text-sm">
              <div>
                <label className="block text-slate-700 font-medium mb-1">NIP</label>
                <input
                  type="text"
                  required
                  value={form.nip}
                  onChange={(e) => setForm({ ...form, nip: e.target.value })}
                  placeholder="Nomor Induk Pegawai"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-slate-800"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-medium mb-1">Nama Lengkap & Gelar</label>
                <input
                  type="text"
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="Contoh: Drs. Hendro Wibowo, M.Kom"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-slate-800"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-medium mb-1">Email Sekolah</label>
                <input
                  type="email"
                  required
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  placeholder="guru@smk.sch.id"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-slate-800"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-700 font-medium mb-1">Peran</label>
                  <select
                    value={form.role}
                    onChange={(e) => setForm({ ...form, role: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-slate-800"
                  >
                    <option value="Koordinator PKL">Koordinator PKL</option>
                    <option value="Pembimbing Lapangan">Pembimbing Lapangan</option>
                    <option value="Ketua Jurusan">Ketua Jurusan</option>
                  </select>
                </div>
                <div>
                  <label className="block text-slate-700 font-medium mb-1">Nomor HP</label>
                  <input
                    type="text"
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    placeholder="0812-xxxx"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-slate-800"
                  />
                </div>
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
                  Simpan Guru
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
