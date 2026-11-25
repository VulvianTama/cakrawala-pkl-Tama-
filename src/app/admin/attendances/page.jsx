"use client";

import React, { useState } from "react";
import Link from "next/link";

export default function AdminAttendancesPage() {
  const [attendances] = useState([
    { id: "A01", studentName: "Budi Santoso", class_name: "XII RPL 1", date: "23 Nov 2026", time: "07:25 WIB", status: "present", notes: "Hadir tepat waktu di kantor", location: "-6.9924, 110.4201 (Radius aman)" },
    { id: "A02", studentName: "Siti Rahmawati", class_name: "XII RPL 1", date: "23 Nov 2026", time: "07:28 WIB", status: "present", notes: "Hadir tepat waktu di kantor", location: "-6.9925, 110.4200 (Radius aman)" },
    { id: "A03", studentName: "Ahmad Fauzi", class_name: "XII TKJ 2", date: "23 Nov 2026", time: "07:35 WIB", status: "present", notes: "Hadir di ruang server", location: "-6.9811, 110.4122 (Radius aman)" },
    { id: "A04", studentName: "Dewi Lestari", class_name: "XII TKJ 2", date: "23 Nov 2026", time: "08:10 WIB", status: "sick", notes: "Sakit demam sejak semalam, surat dokter terlampir di akun.", location: "Rumah siswa" },
    { id: "A05", studentName: "Rizky Pratama", class_name: "XII RPL 2", date: "23 Nov 2026", time: "07:40 WIB", status: "permission", notes: "Izin menghadiri pemakaman keluarga kandung, izin disetujui pembimbing.", location: "Luar area kantor" }
  ]);

  const [filterStatus, setFilterStatus] = useState("all");

  const filtered = attendances.filter(a => filterStatus === "all" || a.status === filterStatus);

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl p-6 sm:p-7 border border-slate-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-semibold mb-2">
            Disiplin & Kehadiran
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
            Rekap Presensi Harian Siswa
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-xl">
            Monitoring waktu masuk, catatan sakit atau izin, serta kesesuaian koordinat GPS kantor mitra.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="py-2 px-3 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-slate-800 text-slate-700 cursor-pointer"
          >
            <option value="all">Semua Status</option>
            <option value="present">Hadir Saja</option>
            <option value="sick">Sakit Saja</option>
            <option value="permission">Izin Saja</option>
          </select>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden p-5 sm:p-6">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead>
              <tr className="bg-slate-50 text-slate-600 font-semibold border-y border-slate-200">
                <th className="py-3 px-4">Nama Siswa</th>
                <th className="py-3 px-4">Kelas</th>
                <th className="py-3 px-4">Tanggal & Waktu</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4">Keterangan / Alasan</th>
                <th className="py-3 px-4">Titik Koordinat GPS</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.map((att) => (
                <tr key={att.id} className="hover:bg-slate-50/70">
                  <td className="py-3 px-4 font-bold text-slate-900">{att.studentName}</td>
                  <td className="py-3 px-4 text-slate-600">{att.class_name}</td>
                  <td className="py-3 px-4 font-mono text-xs text-slate-700">{att.date} &bull; {att.time}</td>
                  <td className="py-3 px-4">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                        att.status === "present"
                          ? "bg-emerald-100 text-emerald-800"
                          : att.status === "sick"
                          ? "bg-amber-100 text-amber-800"
                          : "bg-blue-100 text-blue-800"
                      }`}
                    >
                      {att.status === "present" ? "Hadir Tepat Waktu" : att.status === "sick" ? "Sakit" : "Izin"}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-slate-600 text-xs max-w-sm">{att.notes}</td>
                  <td className="py-3 px-4 font-mono text-[11px] text-slate-500">{att.location}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
