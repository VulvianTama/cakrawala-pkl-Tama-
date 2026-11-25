"use client";

import React, { useState } from "react";
import Link from "next/link";

export default function AdminOfficesPage() {
  const [offices, setOffices] = useState([
    { id: "O01", name: "PT Telkom Indonesia", address: "Jl. Pahlawan No. 10, Semarang", field: "Telekomunikasi & Jaringan", phone: "024-8412345", email: "pkl@telkom.co.id", quota: 8, is_verified: true },
    { id: "O02", name: "Diskominfo Provinsi", address: "Jl. Pemuda No. 45, Semarang", field: "Pemerintahan & Layanan Publik", phone: "024-3511222", email: "diskominfo@prov.go.id", quota: 6, is_verified: true },
    { id: "O03", name: "CV Inovasi Digital", address: "Kawasan Industri Candi Blok A-12", field: "Pengembangan Perangkat Lunak", phone: "0811-2233-4455", email: "hr@inovasidigital.id", quota: 4, is_verified: true },
    { id: "O04", name: "Studio Animasi Nusantara", address: "Ruko Mataram Square No. 3", field: "Multimedia & Desain Grafis", phone: "0812-9988-7766", email: "studio@animasinusantara.com", quota: 3, is_verified: true },
    { id: "O05", name: "Bengkel Sentosa Motor", address: "Jl. Brigjen Sudiarto No. 108", field: "Otomotif & Permesinan", phone: "024-6712399", email: "sentosa.motor@gmail.com", quota: 4, is_verified: false },
    { id: "O06", name: "Nusa Network Solution", address: "Jl. Veteran No. 14, Semarang", field: "Infrastruktur IT & Server", phone: "0813-4455-6677", email: "admin@nusanet.id", quota: 5, is_verified: false }
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [form, setForm] = useState({ name: "", address: "", field: "", phone: "", email: "", quota: 4 });

  const handleVerify = (id) => {
    setOffices(offices.map((o) => (o.id === id ? { ...o, is_verified: true } : o)));
  };

  const handleDelete = (id) => {
    if (window.confirm("Hapus mitra industri ini?")) {
      setOffices(offices.filter((o) => o.id !== id));
    }
  };

  const handleSave = (e) => {
    e.preventDefault();
    setOffices([...offices, { id: `O0${offices.length + 1}`, ...form, is_verified: true }]);
    setModalOpen(false);
  };

  const filtered = offices.filter(o => 
    o.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    o.field.toLowerCase().includes(searchTerm.toLowerCase()) ||
    o.address.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl p-6 sm:p-7 border border-slate-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-semibold mb-2">
            Master Data Industri
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
            Mitra Industri & Kantor PKL
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-xl">
            Kelola instansi penerima magang, kuota siswa, serta verifikasi kantor baru usulan siswa.
          </p>
        </div>

        <button
          onClick={() => { setForm({ name: "", address: "", field: "", phone: "", email: "", quota: 4 }); setModalOpen(true); }}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs sm:text-sm font-semibold rounded-xl shadow-xs transition-colors cursor-pointer self-start"
        >
          + Tambah Kantor Mitra
        </button>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden p-5 sm:p-6">
        <div className="flex items-center justify-between gap-4 mb-4">
          <div className="text-sm font-semibold text-slate-700">
            Daftar Instansi ({filtered.length} ditemukan)
          </div>
          <input
            type="text"
            placeholder="Cari kantor / bidang..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-64 px-3 py-1.5 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-slate-800"
          />
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead>
              <tr className="bg-slate-50 text-slate-600 font-semibold border-y border-slate-200">
                <th className="py-3 px-4">Nama Perusahaan</th>
                <th className="py-3 px-4">Bidang Usaha</th>
                <th className="py-3 px-4">Alamat</th>
                <th className="py-3 px-4">Kontak</th>
                <th className="py-3 px-4">Kuota</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.map((office) => (
                <tr key={office.id} className="hover:bg-slate-50/70">
                  <td className="py-3 px-4 font-bold text-slate-900">{office.name}</td>
                  <td className="py-3 px-4 text-slate-600">{office.field}</td>
                  <td className="py-3 px-4 text-slate-600 text-xs max-w-xs">{office.address}</td>
                  <td className="py-3 px-4 font-mono text-xs">{office.phone}</td>
                  <td className="py-3 px-4 font-semibold text-slate-800">{office.quota} Orang</td>
                  <td className="py-3 px-4">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                        office.is_verified
                          ? "bg-emerald-100 text-emerald-800"
                          : "bg-amber-100 text-amber-800"
                      }`}
                    >
                      {office.is_verified ? "Terverifikasi" : "Belum Verifikasi"}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-right space-x-1">
                    {!office.is_verified && (
                      <button
                        onClick={() => handleVerify(office.id)}
                        className="px-2 py-1 text-xs text-emerald-700 hover:bg-emerald-50 font-semibold rounded cursor-pointer"
                      >
                        Setujui
                      </button>
                    )}
                    <button
                      onClick={() => handleDelete(office.id)}
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
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-xl border border-slate-200">
            <h3 className="text-lg font-bold text-slate-900 mb-1">Tambah Kantor Mitra</h3>
            <p className="text-xs text-slate-500 mb-4">Lengkapi informasi instansi untuk penempatan siswa.</p>

            <form onSubmit={handleSave} className="space-y-3 text-xs sm:text-sm">
              <div>
                <label className="block text-slate-700 font-medium mb-1">Nama Perusahaan</label>
                <input
                  type="text"
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="Contoh: PT Telkom Indonesia"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-slate-800"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-700 font-medium mb-1">Bidang Usaha</label>
                  <input
                    type="text"
                    required
                    value={form.field}
                    onChange={(e) => setForm({ ...form, field: e.target.value })}
                    placeholder="Contoh: Jaringan Komputer"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-slate-800"
                  />
                </div>
                <div>
                  <label className="block text-slate-700 font-medium mb-1">Kuota Maksimal</label>
                  <input
                    type="number"
                    min="1"
                    required
                    value={form.quota}
                    onChange={(e) => setForm({ ...form, quota: parseInt(e.target.value) || 1 })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-slate-800"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-700 font-medium mb-1">Alamat Lengkap</label>
                <textarea
                  rows="2"
                  required
                  value={form.address}
                  onChange={(e) => setForm({ ...form, address: e.target.value })}
                  placeholder="Alamat kantor..."
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-slate-800"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-700 font-medium mb-1">Telepon</label>
                  <input
                    type="text"
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    placeholder="Nomor kontak"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-slate-800"
                  />
                </div>
                <div>
                  <label className="block text-slate-700 font-medium mb-1">Email</label>
                  <input
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    placeholder="Email instansi"
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
                  Simpan Mitra
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
