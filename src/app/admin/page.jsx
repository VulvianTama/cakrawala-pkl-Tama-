"use client";

import React, { useState } from "react";
import Link from "next/link";

export default function AdminDashboardPage() {
  const [activeTab, setActiveTab] = useState("overview");
  const [searchTerm, setSearchTerm] = useState("");

  // Data Mitra Kantor
  const [offices, setOffices] = useState([
    { id: "O01", name: "PT Telkom Indonesia", address: "Jl. Pahlawan No. 10, Semarang", field: "Telekomunikasi & Jaringan", phone: "024-8412345", email: "pkl@telkom.co.id", quota: 8, is_verified: true },
    { id: "O02", name: "Diskominfo Provinsi", address: "Jl. Pemuda No. 45, Semarang", field: "Pemerintahan & Layanan Publik", phone: "024-3511222", email: "diskominfo@prov.go.id", quota: 6, is_verified: true },
    { id: "O03", name: "CV Inovasi Digital", address: "Kawasan Industri Candi Blok A-12", field: "Pengembangan Perangkat Lunak", phone: "0811-2233-4455", email: "hr@inovasidigital.id", quota: 4, is_verified: true },
    { id: "O04", name: "Studio Animasi Nusantara", address: "Ruko Mataram Square No. 3", field: "Multimedia & Desain Grafis", phone: "0812-9988-7766", email: "studio@animasinusantara.com", quota: 3, is_verified: true },
    { id: "O05", name: "Bengkel Sentosa Motor", address: "Jl. Brigjen Sudiarto No. 108", field: "Otomotif & Permesinan", phone: "024-6712399", email: "sentosa.motor@gmail.com", quota: 4, is_verified: false },
    { id: "O06", name: "Nusa Network Solution", address: "Jl. Veteran No. 14, Semarang", field: "Infrastruktur IT & Server", phone: "0813-4455-6677", email: "admin@nusanet.id", quota: 5, is_verified: false }
  ]);

  // Data Siswa PKL
  const [students, setStudents] = useState([
    { id: "S01", nis: "20241001", name: "Budi Santoso", class_name: "XII RPL 1", email: "budi.santoso@smk.sch.id", group: "Alpha Dev", office: "PT Telkom Indonesia", status: "Aktif" },
    { id: "S02", nis: "20241002", name: "Siti Rahmawati", class_name: "XII RPL 1", email: "siti.rahma@smk.sch.id", group: "Alpha Dev", office: "PT Telkom Indonesia", status: "Aktif" },
    { id: "S03", nis: "20241003", name: "Ahmad Fauzi", class_name: "XII TKJ 2", email: "ahmad.f@smk.sch.id", group: "Cyber Ops", office: "Diskominfo Provinsi", status: "Aktif" },
    { id: "S04", nis: "20241004", name: "Dewi Lestari", class_name: "XII TKJ 2", email: "dewi.l@smk.sch.id", group: "Cyber Ops", office: "Diskominfo Provinsi", status: "Menunggu" },
    { id: "S05", nis: "20241005", name: "Rizky Pratama", class_name: "XII RPL 2", email: "rizky.p@smk.sch.id", group: "Pixel Studio", office: "CV Inovasi Digital", status: "Aktif" },
    { id: "S06", nis: "20241006", name: "Nabila Az-Zahra", class_name: "XII DKV 1", email: "nabila.a@smk.sch.id", group: "Creative Hub", office: "Studio Animasi Nusantara", status: "Aktif" },
    { id: "S07", nis: "20241007", name: "Fajar Nugraha", class_name: "XII RPL 2", email: "fajar.n@smk.sch.id", group: "-", office: "-", status: "Belum PKL" }
  ]);

  // Data Guru Pembimbing
  const [teachers, setTeachers] = useState([
    { id: "T01", nip: "198504122010011002", name: "Drs. Hendro Wibowo, M.Kom", email: "hendro.wibowo@guru.smk.sch.id", role: "Koordinator PKL", groupsCount: 4, phone: "0812-3456-7890" },
    { id: "T02", nip: "198909152014022003", name: "Sri Wahyuni, S.Pd", email: "sri.wahyuni@guru.smk.sch.id", role: "Pembimbing Lapangan", groupsCount: 3, phone: "0812-9876-5432" },
    { id: "T03", nip: "199201202018011004", name: "Arief Wicaksono, M.T", email: "arief.w@guru.smk.sch.id", role: "Pembimbing Lapangan", groupsCount: 5, phone: "0813-7788-9900" }
  ]);

  // Data Kelompok PKL
  const [groups, setGroups] = useState([
    { id: "G01", name: "Alpha Dev", leader: "Budi Santoso", membersCount: 4, office: "PT Telkom Indonesia", teacher: "Drs. Hendro Wibowo, M.Kom", status: "accept" },
    { id: "G02", name: "Cyber Ops", leader: "Ahmad Fauzi", membersCount: 3, office: "Diskominfo Provinsi", teacher: "Sri Wahyuni, S.Pd", status: "applying" },
    { id: "G03", name: "Pixel Studio", leader: "Rizky Pratama", membersCount: 2, office: "CV Inovasi Digital", teacher: "Arief Wicaksono, M.T", status: "accept" },
    { id: "G04", name: "Creative Hub", leader: "Nabila Az-Zahra", membersCount: 3, office: "Studio Animasi Nusantara", teacher: "Sri Wahyuni, S.Pd", status: "requesting" }
  ]);

  // Data Rekap Presensi
  const [attendances, setAttendances] = useState([
    { id: "A01", studentName: "Budi Santoso", class_name: "XII RPL 1", date: "23 Nov 2026", time: "07:25 WIB", status: "present", notes: "Hadir tepat waktu di kantor", location: "-6.9924, 110.4201" },
    { id: "A02", studentName: "Siti Rahmawati", class_name: "XII RPL 1", date: "23 Nov 2026", time: "07:28 WIB", status: "present", notes: "Hadir tepat waktu di kantor", location: "-6.9925, 110.4200" },
    { id: "A03", studentName: "Ahmad Fauzi", class_name: "XII TKJ 2", date: "23 Nov 2026", time: "07:35 WIB", status: "present", notes: "Hadir di ruang server", location: "-6.9811, 110.4122" },
    { id: "A04", studentName: "Dewi Lestari", class_name: "XII TKJ 2", date: "23 Nov 2026", time: "08:10 WIB", status: "sick", notes: "Sakit demam, surat dokter terlampir di akun.", location: "Rumah siswa" },
    { id: "A05", studentName: "Rizky Pratama", class_name: "XII RPL 2", date: "23 Nov 2026", time: "07:40 WIB", status: "permission", notes: "Izin keperluan keluarga mendesak.", location: "Luar area kantor" }
  ]);

  // Modal State
  const [modalType, setModalType] = useState(null);
  const [editingItem, setEditingItem] = useState(null);
  const [officeForm, setOfficeForm] = useState({ name: "", address: "", field: "", phone: "", email: "", quota: 4 });

  const handleVerifyOffice = (id) => {
    setOffices((prev) => prev.map((o) => (o.id === id ? { ...o, is_verified: true } : o)));
  };

  const handleDeleteOffice = (id) => {
    if (window.confirm("Hapus mitra industri ini dari sistem master data?")) {
      setOffices((prev) => prev.filter((o) => o.id !== id));
    }
  };

  const openOfficeModal = (office = null) => {
    setEditingItem(office);
    if (office) {
      setOfficeForm(office);
    } else {
      setOfficeForm({
        name: "",
        address: "",
        field: "Teknologi Informasi",
        phone: "",
        email: "",
        quota: 4
      });
    }
    setModalType("office");
  };

  const handleSaveOffice = (e) => {
    e.preventDefault();
    const editId = editingItem?.id;
    if (editId) {
      setOffices((prev) => prev.map((o) => (o.id === editId ? { ...o, ...officeForm } : o)));
    } else {
      const newOffice = {
        id: `O0${offices.length + 1}`,
        ...officeForm,
        is_verified: true
      };
      setOffices((prev) => [...prev, newOffice]);
    }
    setModalType(null);
  };

  return (
    <div className="space-y-6">
      {/* Header Utama Admin (Apple Header Style) */}
      <section className="bg-white rounded-3xl p-6 sm:p-8 border border-black/[0.06] shadow-[0_2px_12px_rgba(0,0,0,0.03)] flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-[#1d1d1f]">
              Administrasi PKL
            </h1>
            <span className="text-[10px] font-semibold bg-[#0071e3]/10 text-[#0071e3] px-2.5 py-0.5 rounded-full">
              Pusat Kendali
            </span>
          </div>
          <p className="text-xs text-[#86868b] mt-1 max-w-xl leading-relaxed">
            Pengelolaan terpadu master data mitra industri, siswa, guru pembimbing, dan absensi harian kegiatan PKL.
          </p>
        </div>

        <div className="flex items-center gap-2 self-start md:self-auto">
          <button
            onClick={() => openOfficeModal()}
            className="px-4 py-2 bg-[#0071e3] hover:bg-[#0077ed] text-white text-xs font-semibold rounded-xl transition-all shadow-sm flex items-center gap-1.5 cursor-pointer"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Tambah Mitra Industri
          </button>
          <Link
            href="/admin/settings"
            className="px-3.5 py-2 bg-black/[0.04] hover:bg-black/[0.08] text-[#1d1d1f] text-xs font-semibold rounded-xl transition-all"
          >
            Pengaturan
          </Link>
        </div>
      </section>

      {/* Metric Cards (Apple Grouped Metric Row) */}
      <section className="grid grid-cols-2 sm:grid-cols-5 gap-3">
        <div className="bg-white rounded-2xl p-4 border border-black/[0.06] shadow-sm">
          <p className="text-[11px] font-medium text-[#86868b]">Total Siswa</p>
          <div className="text-2xl font-bold font-mono tabular-nums text-[#1d1d1f] mt-1">
            {students.length}
          </div>
          <p className="text-[10px] text-[#248a3d] font-medium mt-0.5">
            {students.filter(s => s.status === "Aktif").length} aktif magang
          </p>
        </div>

        <div className="bg-white rounded-2xl p-4 border border-black/[0.06] shadow-sm">
          <p className="text-[11px] font-medium text-[#86868b]">Guru Pembimbing</p>
          <div className="text-2xl font-bold font-mono tabular-nums text-[#1d1d1f] mt-1">
            {teachers.length}
          </div>
          <p className="text-[10px] text-[#0071e3] font-medium mt-0.5">
            {groups.length} kelompok bimbingan
          </p>
        </div>

        <div className="bg-white rounded-2xl p-4 border border-black/[0.06] shadow-sm">
          <p className="text-[11px] font-medium text-[#86868b]">Mitra Industri</p>
          <div className="text-2xl font-bold font-mono tabular-nums text-[#1d1d1f] mt-1">
            {offices.length}
          </div>
          <p className="text-[10px] text-[#86868b] font-medium mt-0.5">
            {offices.filter(o => o.is_verified).length} terverifikasi
          </p>
        </div>

        <div className="bg-white rounded-2xl p-4 border border-black/[0.06] shadow-sm">
          <p className="text-[11px] font-medium text-[#86868b]">Usulan Kantor Baru</p>
          <div className="text-2xl font-bold font-mono tabular-nums text-[#ff9500] mt-1">
            {offices.filter(o => !o.is_verified).length}
          </div>
          <p className="text-[10px] text-[#ff9500] font-medium mt-0.5">
            Butuh verifikasi admin
          </p>
        </div>

        <div className="bg-white rounded-2xl p-4 border border-black/[0.06] shadow-sm col-span-2 sm:col-span-1">
          <p className="text-[11px] font-medium text-[#86868b]">Kehadiran Hari Ini</p>
          <div className="text-2xl font-bold font-mono tabular-nums text-[#34c759] mt-1">
            {attendances.filter(a => a.status === "present").length}
          </div>
          <p className="text-[10px] text-[#86868b] font-medium mt-0.5">
            {attendances.filter(a => a.status !== "present").length} izin / sakit
          </p>
        </div>
      </section>

      {/* Main Table Card with Apple Segmented Control */}
      <section className="bg-white rounded-3xl border border-black/[0.06] shadow-[0_2px_12px_rgba(0,0,0,0.03)] overflow-hidden">
        {/* Apple Segmented Control Toolbar */}
        <div className="p-4 sm:p-5 border-b border-black/[0.06] flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="p-1 bg-black/[0.04] rounded-2xl flex gap-1 overflow-x-auto">
            {[
              { id: "overview", label: "Ringkasan" },
              { id: "offices", label: `Mitra (${offices.length})` },
              { id: "students", label: `Siswa (${students.length})` },
              { id: "teachers", label: `Guru (${teachers.length})` },
              { id: "groups", label: `Kelompok (${groups.length})` },
              { id: "attendances", label: "Presensi" }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all whitespace-nowrap cursor-pointer ${
                  activeTab === tab.id
                    ? "bg-white text-[#1d1d1f] shadow-sm font-bold"
                    : "text-[#86868b] hover:text-[#1d1d1f]"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="w-full sm:w-64 relative">
            <input
              type="text"
              placeholder="Cari data..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-8 pr-3 py-1.5 text-xs bg-[#f5f5f7] border border-black/[0.06] rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0071e3] transition-all font-medium"
            />
            <svg className="w-3.5 h-3.5 text-[#86868b] absolute left-2.5 top-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>

        {/* TAB 1: RINGKASAN TINDAKAN */}
        {activeTab === "overview" && (
          <div className="p-5 sm:p-6 space-y-6">
            {/* Box 1: Kantor Baru Butuh Validasi */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <div>
                  <h2 className="text-sm font-bold text-[#1d1d1f]">Mitra Industri Baru Butuh Validasi</h2>
                  <p className="text-xs text-[#86868b]">Periksa izin usaha dan kelaikan kantor yang didaftarkan mandiri oleh siswa.</p>
                </div>
                <span className="text-[10px] bg-amber-50 text-amber-800 font-semibold px-2.5 py-0.5 rounded-full border border-amber-200">
                  {offices.filter(o => !o.is_verified).length} Menunggu
                </span>
              </div>

              <div className="overflow-x-auto border border-black/[0.06] rounded-2xl">
                <table className="w-full text-left text-xs">
                  <thead className="bg-[#f5f5f7] text-[#86868b] font-medium border-b border-black/[0.06]">
                    <tr>
                      <th className="py-2.5 px-3.5">Perusahaan</th>
                      <th className="py-2.5 px-3.5">Bidang Industri</th>
                      <th className="py-2.5 px-3.5">Alamat</th>
                      <th className="py-2.5 px-3.5">Kontak</th>
                      <th className="py-2.5 px-3.5 text-right">Keputusan</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-black/[0.04]">
                    {offices.filter(o => !o.is_verified).length === 0 ? (
                      <tr>
                        <td colSpan={5} className="py-6 text-center text-[#86868b]">
                          Semua mitra industri telah diverifikasi resmi.
                        </td>
                      </tr>
                    ) : (
                      offices.filter(o => !o.is_verified).map((office) => (
                        <tr key={office.id} className="hover:bg-black/[0.02]">
                          <td className="py-3 px-3.5 font-bold text-[#1d1d1f]">{office.name}</td>
                          <td className="py-3 px-3.5 text-[#86868b]">{office.field}</td>
                          <td className="py-3 px-3.5 text-[#86868b] text-[11px]">{office.address}</td>
                          <td className="py-3 px-3.5 font-mono tabular-nums text-xs text-[#1d1d1f]">{office.phone}</td>
                          <td className="py-3 px-3.5 text-right space-x-1.5">
                            <button
                              onClick={() => handleVerifyOffice(office.id)}
                              className="px-3 py-1 bg-[#34c759] hover:bg-[#2fb34f] text-white rounded-lg text-xs font-semibold cursor-pointer transition-colors"
                            >
                              Verifikasi
                            </button>
                            <button
                              onClick={() => handleDeleteOffice(office.id)}
                              className="px-2.5 py-1 text-red-600 hover:bg-red-50 rounded-lg text-xs font-medium cursor-pointer transition-colors"
                            >
                              Tolak
                            </button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Box 2: Log Presensi Hari Ini */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <div>
                  <h2 className="text-sm font-bold text-[#1d1d1f]">Catatan Kehadiran Terbaru</h2>
                  <p className="text-xs text-[#86868b]">Rekap waktu masuk siswa beserta titik koordinat GPS.</p>
                </div>
                <button
                  onClick={() => setActiveTab("attendances")}
                  className="text-xs text-[#0071e3] hover:underline font-semibold cursor-pointer"
                >
                  Lihat Seluruhnya
                </button>
              </div>

              <div className="overflow-x-auto border border-black/[0.06] rounded-2xl">
                <table className="w-full text-left text-xs">
                  <thead className="bg-[#f5f5f7] text-[#86868b] font-medium border-b border-black/[0.06]">
                    <tr>
                      <th className="py-2.5 px-3.5">Nama Siswa</th>
                      <th className="py-2.5 px-3.5">Waktu Presensi</th>
                      <th className="py-2.5 px-3.5">Status</th>
                      <th className="py-2.5 px-3.5">Keterangan</th>
                      <th className="py-2.5 px-3.5">Koordinat Lokasi</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-black/[0.04]">
                    {attendances.slice(0, 4).map((att) => (
                      <tr key={att.id} className="hover:bg-black/[0.02]">
                        <td className="py-3 px-3.5 font-semibold text-[#1d1d1f]">
                          {att.studentName}
                          <span className="ml-2 text-[11px] font-normal text-[#86868b]">{att.class_name}</span>
                        </td>
                        <td className="py-3 px-3.5 font-mono tabular-nums text-xs text-[#1d1d1f]">{att.time}</td>
                        <td className="py-3 px-3.5">
                          <span
                            className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold ${
                              att.status === "present"
                                ? "bg-[#34c759]/15 text-[#248a3d]"
                                : att.status === "sick"
                                ? "bg-amber-100 text-amber-800"
                                : "bg-blue-100 text-blue-800"
                            }`}
                          >
                            {att.status === "present" ? "Hadir" : att.status === "sick" ? "Sakit" : "Izin"}
                          </span>
                        </td>
                        <td className="py-3 px-3.5 text-[#86868b] text-xs">{att.notes}</td>
                        <td className="py-3 px-3.5 font-mono tabular-nums text-[11px] text-[#86868b]">{att.location}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: MITRA INDUSTRI (OFFICES) */}
        {activeTab === "offices" && (
          <div className="p-5 sm:p-6 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-sm font-bold text-[#1d1d1f]">Master Data Mitra Industri</h2>
                <p className="text-xs text-[#86868b]">Daftar instansi, kuota penerimaan magang, dan kontak penanggung jawab kantor.</p>
              </div>
              <button
                onClick={() => openOfficeModal()}
                className="px-3.5 py-1.5 bg-[#0071e3] hover:bg-[#0077ed] text-white rounded-xl text-xs font-semibold shadow-sm cursor-pointer"
              >
                + Tambah Kantor Mitra
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-black/[0.06] text-[#86868b]">
                    <th className="py-3 px-3 font-medium">Perusahaan</th>
                    <th className="py-3 px-3 font-medium">Bidang Usaha</th>
                    <th className="py-3 px-3 font-medium">Alamat</th>
                    <th className="py-3 px-3 font-medium">Kontak & Email</th>
                    <th className="py-3 px-3 font-medium">Kuota</th>
                    <th className="py-3 px-3 font-medium">Status</th>
                    <th className="py-3 px-3 font-medium text-right">Tindakan</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-black/[0.04]">
                  {offices.map((office) => (
                    <tr key={office.id} className="hover:bg-black/[0.02]">
                      <td className="py-3 px-3 font-bold text-[#1d1d1f]">{office.name}</td>
                      <td className="py-3 px-3 text-[#86868b]">{office.field}</td>
                      <td className="py-3 px-3 text-[#86868b] text-[11px] max-w-xs">{office.address}</td>
                      <td className="py-3 px-3">
                        <div className="font-mono tabular-nums text-xs text-[#1d1d1f]">{office.phone}</div>
                        <div className="text-[10px] text-[#86868b]">{office.email}</div>
                      </td>
                      <td className="py-3 px-3 font-semibold font-mono tabular-nums text-[#1d1d1f]">{office.quota} Siswa</td>
                      <td className="py-3 px-3">
                        <span
                          className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold ${
                            office.is_verified
                              ? "bg-[#34c759]/15 text-[#248a3d]"
                              : "bg-amber-100 text-amber-800"
                          }`}
                        >
                          {office.is_verified ? "Terverifikasi" : "Belum Verifikasi"}
                        </span>
                      </td>
                      <td className="py-3 px-3 text-right space-x-1">
                        {!office.is_verified && (
                          <button
                            onClick={() => handleVerifyOffice(office.id)}
                            className="px-2 py-1 text-xs text-[#248a3d] hover:bg-[#34c759]/10 font-semibold rounded-lg cursor-pointer"
                          >
                            Setujui
                          </button>
                        )}
                        <button
                          onClick={() => openOfficeModal(office)}
                          className="px-2 py-1 text-xs text-[#86868b] hover:text-[#1d1d1f] hover:bg-black/[0.04] rounded-lg cursor-pointer"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDeleteOffice(office.id)}
                          className="px-2 py-1 text-xs text-red-600 hover:bg-red-50 rounded-lg cursor-pointer"
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
        )}

        {/* TAB 3: DATA SISWA */}
        {activeTab === "students" && (
          <div className="p-5 sm:p-6 space-y-4">
            <div>
              <h2 className="text-sm font-bold text-[#1d1d1f]">Master Data Siswa PKL</h2>
              <p className="text-xs text-[#86868b]">Daftar siswa peserta Praktik Kerja Lapangan beserta status penempatan.</p>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-black/[0.06] text-[#86868b]">
                    <th className="py-3 px-3 font-medium">NIS</th>
                    <th className="py-3 px-3 font-medium">Nama Siswa</th>
                    <th className="py-3 px-3 font-medium">Kelas</th>
                    <th className="py-3 px-3 font-medium">Kelompok</th>
                    <th className="py-3 px-3 font-medium">Mitra Kantor</th>
                    <th className="py-3 px-3 font-medium">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-black/[0.04]">
                  {students.map((student) => (
                    <tr key={student.id} className="hover:bg-black/[0.02]">
                      <td className="py-3 px-3 font-mono tabular-nums text-xs text-[#86868b]">{student.nis}</td>
                      <td className="py-3 px-3 font-semibold text-[#1d1d1f]">{student.name}</td>
                      <td className="py-3 px-3 text-[#86868b]">{student.class_name}</td>
                      <td className="py-3 px-3 text-[#0071e3] font-medium">{student.group}</td>
                      <td className="py-3 px-3 text-[#1d1d1f]">{student.office}</td>
                      <td className="py-3 px-3">
                        <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-[#34c759]/15 text-[#248a3d]">
                          {student.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 4: GURU PEMBIMBING */}
        {activeTab === "teachers" && (
          <div className="p-5 sm:p-6 space-y-4">
            <div>
              <h2 className="text-sm font-bold text-[#1d1d1f]">Data Guru Pembimbing PKL</h2>
              <p className="text-xs text-[#86868b]">Daftar pembimbing sekolah dan beban kelompok yang diawasi.</p>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-black/[0.06] text-[#86868b]">
                    <th className="py-3 px-3 font-medium">NIP</th>
                    <th className="py-3 px-3 font-medium">Nama Guru</th>
                    <th className="py-3 px-3 font-medium">Peran</th>
                    <th className="py-3 px-3 font-medium">Beban Kelompok</th>
                    <th className="py-3 px-3 font-medium">Kontak</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-black/[0.04]">
                  {teachers.map((teacher) => (
                    <tr key={teacher.id} className="hover:bg-black/[0.02]">
                      <td className="py-3 px-3 font-mono tabular-nums text-xs text-[#86868b]">{teacher.nip}</td>
                      <td className="py-3 px-3 font-semibold text-[#1d1d1f]">{teacher.name}</td>
                      <td className="py-3 px-3 text-[#86868b]">{teacher.role}</td>
                      <td className="py-3 px-3 font-mono tabular-nums font-semibold text-[#1d1d1f]">{teacher.groupsCount} Kelompok</td>
                      <td className="py-3 px-3 font-mono tabular-nums text-xs text-[#86868b]">{teacher.phone}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 5: KELOMPOK PKL */}
        {activeTab === "groups" && (
          <div className="p-5 sm:p-6 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-sm font-bold text-[#1d1d1f]">Monitoring Kelompok PKL</h2>
                <p className="text-xs text-[#86868b]">Status alur persetujuan surat pengantar dan penempatan kelompok.</p>
              </div>
              <Link
                href="/admin/groups"
                className="text-xs font-semibold text-[#0071e3] hover:underline"
              >
                Buka Halaman Otorisasi Kelompok
              </Link>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-black/[0.06] text-[#86868b]">
                    <th className="py-3 px-3 font-medium">Kelompok</th>
                    <th className="py-3 px-3 font-medium">Ketua</th>
                    <th className="py-3 px-3 font-medium">Anggota</th>
                    <th className="py-3 px-3 font-medium">Mitra Kantor</th>
                    <th className="py-3 px-3 font-medium">Pembimbing</th>
                    <th className="py-3 px-3 font-medium">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-black/[0.04]">
                  {groups.map((group) => (
                    <tr key={group.id} className="hover:bg-black/[0.02]">
                      <td className="py-3 px-3 font-bold text-[#1d1d1f]">{group.name}</td>
                      <td className="py-3 px-3 text-[#1d1d1f]">{group.leader}</td>
                      <td className="py-3 px-3 font-mono tabular-nums text-[#86868b]">{group.membersCount} Siswa</td>
                      <td className="py-3 px-3 font-medium text-[#1d1d1f]">{group.office}</td>
                      <td className="py-3 px-3 text-[#86868b]">{group.teacher}</td>
                      <td className="py-3 px-3">
                        <span
                          className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                            group.status === "accept"
                              ? "bg-[#34c759]/15 text-[#248a3d]"
                              : group.status === "applying"
                              ? "bg-blue-50 text-blue-700"
                              : "bg-amber-50 text-amber-800"
                          }`}
                        >
                          {group.status === "accept" ? "Disetujui" : group.status === "applying" ? "Diproses" : "Perlu ACC"}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 6: MONITORING PRESENSI */}
        {activeTab === "attendances" && (
          <div className="p-5 sm:p-6 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-sm font-bold text-[#1d1d1f]">Monitoring Presensi Harian</h2>
                <p className="text-xs text-[#86868b]">Log waktu masuk dan titik verifikasi GPS siswa.</p>
              </div>
              <Link
                href="/admin/attendances"
                className="text-xs font-semibold text-[#0071e3] hover:underline"
              >
                Lihat Rekap Lengkap
              </Link>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-black/[0.06] text-[#86868b]">
                    <th className="py-3 px-3 font-medium">Siswa</th>
                    <th className="py-3 px-3 font-medium">Tanggal & Waktu</th>
                    <th className="py-3 px-3 font-medium">Status</th>
                    <th className="py-3 px-3 font-medium">Keterangan</th>
                    <th className="py-3 px-3 font-medium">Koordinat GPS</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-black/[0.04]">
                  {attendances.map((att) => (
                    <tr key={att.id} className="hover:bg-black/[0.02]">
                      <td className="py-3 px-3 font-semibold text-[#1d1d1f]">
                        {att.studentName}
                        <span className="block text-[10px] text-[#86868b] font-normal">{att.class_name}</span>
                      </td>
                      <td className="py-3 px-3 font-mono tabular-nums text-xs text-[#1d1d1f]">{att.date} • {att.time}</td>
                      <td className="py-3 px-3">
                        <span
                          className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                            att.status === "present"
                              ? "bg-[#34c759]/15 text-[#248a3d]"
                              : att.status === "sick"
                              ? "bg-amber-100 text-amber-800"
                              : "bg-blue-100 text-blue-800"
                          }`}
                        >
                          {att.status === "present" ? "Hadir" : att.status === "sick" ? "Sakit" : "Izin"}
                        </span>
                      </td>
                      <td className="py-3 px-3 text-[#86868b] max-w-xs">{att.notes}</td>
                      <td className="py-3 px-3 font-mono tabular-nums text-[11px] text-[#86868b]">{att.location}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </section>

      {/* Apple Sheet Modal: Tambah / Edit Mitra Industri */}
      {modalType === "office" && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-md p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-black/[0.08]">
            <div className="w-10 h-1 rounded-full bg-slate-300 mx-auto mb-4"></div>

            <div className="flex items-center justify-between pb-3 border-b border-black/[0.06] mb-4">
              <div>
                <h3 className="text-base font-bold text-[#1d1d1f]">
                  {editingItem ? "Ubah Data Mitra Industri" : "Tambah Mitra Industri Baru"}
                </h3>
                <p className="text-xs text-[#86868b] mt-0.5">Lengkapi profil instansi dan kuota penerimaan siswa magang.</p>
              </div>
              <button
                type="button"
                onClick={() => setModalType(null)}
                className="w-7 h-7 rounded-full bg-black/[0.05] hover:bg-black/[0.1] text-[#86868b] flex items-center justify-center cursor-pointer"
                title="Tutup"
              >
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <form onSubmit={handleSaveOffice} className="space-y-4 text-xs">
              <div>
                <label className="block text-xs font-semibold text-[#1d1d1f] mb-1">Nama Perusahaan / Instansi</label>
                <input
                  type="text"
                  required
                  value={officeForm.name}
                  onChange={(e) => setOfficeForm({ ...officeForm, name: e.target.value })}
                  placeholder="Contoh: PT Telkom Indonesia"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-black/10 bg-[#f5f5f7] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0071e3] transition-all"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-[#1d1d1f] mb-1">Bidang Industri</label>
                  <input
                    type="text"
                    required
                    value={officeForm.field}
                    onChange={(e) => setOfficeForm({ ...officeForm, field: e.target.value })}
                    placeholder="Contoh: Perangkat Lunak"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-black/10 bg-[#f5f5f7] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0071e3] transition-all"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#1d1d1f] mb-1">Batas Kuota Siswa</label>
                  <input
                    type="number"
                    min="1"
                    required
                    value={officeForm.quota}
                    onChange={(e) => setOfficeForm({ ...officeForm, quota: parseInt(e.target.value) || 1 })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-black/10 bg-[#f5f5f7] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0071e3] transition-all font-mono tabular-nums"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#1d1d1f] mb-1">Alamat Lengkap</label>
                <textarea
                  rows={2}
                  required
                  value={officeForm.address}
                  onChange={(e) => setOfficeForm({ ...officeForm, address: e.target.value })}
                  placeholder="Alamat kantor tempat kegiatan PKL dilaksanakan"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-black/10 bg-[#f5f5f7] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0071e3] transition-all"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-[#1d1d1f] mb-1">Nomor Telepon PIC</label>
                  <input
                    type="text"
                    value={officeForm.phone}
                    onChange={(e) => setOfficeForm({ ...officeForm, phone: e.target.value })}
                    placeholder="024-xxx / 08xx"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-black/10 bg-[#f5f5f7] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0071e3] transition-all font-mono tabular-nums"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#1d1d1f] mb-1">Email Kantor</label>
                  <input
                    type="email"
                    value={officeForm.email}
                    onChange={(e) => setOfficeForm({ ...officeForm, email: e.target.value })}
                    placeholder="hrd@kantor.com"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-black/10 bg-[#f5f5f7] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0071e3] transition-all font-mono"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 pt-4 border-t border-black/[0.06]">
                <button
                  type="button"
                  onClick={() => setModalType(null)}
                  className="px-4 py-2 text-xs font-semibold text-[#86868b] hover:text-[#1d1d1f] rounded-xl cursor-pointer"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#0071e3] hover:bg-[#0077ed] text-white text-xs font-semibold rounded-xl transition-all shadow-sm cursor-pointer"
                >
                  Simpan Mitra Industri
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
