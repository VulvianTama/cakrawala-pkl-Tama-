"use client";

import React, { useState, useRef } from "react";
import Link from "next/link";

export default function TeacherDashboard() {
  const [activeTab, setActiveTab] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [studentPage, setStudentPage] = useState(1);
  const rowsPerPage = 5;

  const [students, setStudents] = useState([
    { id: "S01", nis: "20241001", name: "Budi Santoso", class_name: "XII RPL 1", email: "budi.santoso@smk.sch.id", group: "Alpha Dev", office: "PT Telkom Indonesia", status: "Aktif" },
    { id: "S02", nis: "20241002", name: "Siti Rahmawati", class_name: "XII RPL 1", email: "siti.rahma@smk.sch.id", group: "Alpha Dev", office: "PT Telkom Indonesia", status: "Aktif" },
    { id: "S03", nis: "20241003", name: "Ahmad Fauzi", class_name: "XII TKJ 2", email: "ahmad.f@smk.sch.id", group: "Cyber Ops", office: "Diskominfo Kota", status: "Aktif" },
    { id: "S04", nis: "20241004", name: "Dewi Lestari", class_name: "XII TKJ 2", email: "dewi.l@smk.sch.id", group: "Cyber Ops", office: "Diskominfo Kota", status: "Menunggu" },
    { id: "S05", nis: "20241005", name: "Rizky Pratama", class_name: "XII RPL 2", email: "rizky.p@smk.sch.id", group: "Pixel Studio", office: "CV Inovasi Digital", status: "Aktif" },
    { id: "S06", nis: "20241006", name: "Nabila Az-Zahra", class_name: "XII DKV 1", email: "nabila.a@smk.sch.id", group: "Creative Hub", office: "Studio Animasi Nusantara", status: "Aktif" },
    { id: "S07", nis: "20241007", name: "Fajar Nugraha", class_name: "XII RPL 2", email: "fajar.n@smk.sch.id", group: "-", office: "-", status: "Belum PKL" }
  ]);

  const [teachers, setTeachers] = useState([
    { id: "T01", nip: "198504122010011002", name: "Drs. Hendro Wibowo, M.Kom", email: "hendro.wibowo@guru.smk.sch.id", role: "Koordinator PKL", groupsCount: 4, phone: "0812-3456-7890" },
    { id: "T02", nip: "198909152014022003", name: "Sri Wahyuni, S.Pd", email: "sri.wahyuni@guru.smk.sch.id", role: "Pembimbing Lapangan", groupsCount: 3, phone: "0812-9876-5432" },
    { id: "T03", nip: "199201202018011004", name: "Arief Wicaksono, M.T", email: "arief.w@guru.smk.sch.id", role: "Pembimbing Lapangan", groupsCount: 5, phone: "0813-7788-9900" }
  ]);

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
      isSigned: true,
      signedAt: "18 Nov 2026, 09:30 WIB"
    },
    { 
      id: "G02", 
      name: "Cyber Ops", 
      leader: "Ahmad Fauzi", 
      membersCount: 3, 
      office: "Diskominfo Kota", 
      teacher: "Sri Wahyuni, S.Pd", 
      status: "applying",
      letterFile: "Surat_Pengantar_CyberOps.pdf",
      letterNo: "421.5/PKL-SMK/018/2026",
      isSigned: true,
      signedAt: "20 Nov 2026, 14:15 WIB"
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
      isSigned: true,
      signedAt: "15 Nov 2026, 11:00 WIB"
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
      isSigned: false,
      signedAt: null
    }
  ]);

  // Modal States
  const [modalType, setModalType] = useState(null); // 'student', 'teacher', 'group', 'qr', 'canvas', 'acc'
  const [editingItem, setEditingItem] = useState(null);
  const [formData, setFormData] = useState({});

  // ACC & PDF Signature State
  const defaultAccGroup = {
    id: "",
    name: "",
    leader: "",
    membersCount: 0,
    office: "",
    teacher: "",
    status: "",
    letterFile: null,
    letterNo: "",
    isSigned: false,
    signedAt: null
  };
  const [selectedGroupForAcc, setSelectedGroupForAcc] = useState(defaultAccGroup);
  const [pdfFileName, setPdfFileName] = useState("");
  const [signatureMethod, setSignatureMethod] = useState("canvas"); // 'canvas' atau 'qr'
  const [accSuccessMessage, setAccSuccessMessage] = useState("");

  const accCanvasRef = useRef(null);
  const [isAccDrawing, setIsAccDrawing] = useState(false);
  const [hasAccSignature, setHasAccSignature] = useState(false);

  // Filtered Students
  const filteredStudents = students.filter((s) => {
    const term = searchTerm.toLowerCase();
    const matchSearch =
      s.name.toLowerCase().includes(term) ||
      s.nis.includes(term) ||
      s.class_name.toLowerCase().includes(term) ||
      s.office.toLowerCase().includes(term);
    const matchStatus = statusFilter === "all" || s.status.toLowerCase() === statusFilter.toLowerCase();
    return matchSearch && matchStatus;
  });

  const totalStudentPages = Math.ceil(filteredStudents.length / rowsPerPage) || 1;
  const paginatedStudents = filteredStudents.slice((studentPage - 1) * rowsPerPage, studentPage * rowsPerPage);

  const openAccModal = (group) => {
    setSelectedGroupForAcc(group);
    setPdfFileName(group.letterFile || `Surat_Pengantar_${group.name.replace(/\s+/g, "_")}.pdf`);
    setHasAccSignature(group.isSigned || false);
    setModalType("acc");
  };

  const handleExecuteAcc = (e) => {
    e.preventDefault();
    if (!hasAccSignature && signatureMethod === "canvas") {
      alert("Harap bubuhkan tanda tangan di canvas sebelum menyetujui dokumen.");
      return;
    }

    const targetId = selectedGroupForAcc?.id;
    const targetName = selectedGroupForAcc?.name || "";
    if (!targetId) return;

    const updatedGroups = groups.map((g) => {
      if (g && g.id === targetId) {
        return {
          ...g,
          status: "accept",
          isSigned: true,
          letterFile: pdfFileName || `Surat_Pengantar_${g.name.replace(/\s+/g, "_")}.pdf`,
          signedAt: new Date().toLocaleDateString("id-ID", { day: "numeric", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" }) + " WIB"
        };
      }
      return g;
    });

    setGroups(updatedGroups);
    setModalType(null);
    setAccSuccessMessage(`Surat pengantar untuk "${targetName}" berhasil di-ACC.`);
    setTimeout(() => setAccSuccessMessage(""), 4500);
  };

  const startAccDrawing = (e) => {
    const canvas = accCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const rect = canvas.getBoundingClientRect();
    ctx.beginPath();
    ctx.moveTo(e.clientX - rect.left, e.clientY - rect.top);
    setIsAccDrawing(true);
    setHasAccSignature(true);
  };

  const drawAcc = (e) => {
    if (!isAccDrawing) return;
    const canvas = accCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const rect = canvas.getBoundingClientRect();
    ctx.lineTo(e.clientX - rect.left, e.clientY - rect.top);
    ctx.strokeStyle = "#0f172a";
    ctx.lineWidth = 2.5;
    ctx.lineCap = "round";
    ctx.stroke();
  };

  const stopAccDrawing = () => setIsAccDrawing(false);

  const clearAccCanvas = () => {
    const canvas = accCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    setHasAccSignature(false);
  };

  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setPdfFileName(file.name);
    }
  };

  const handleDeleteStudent = (id) => {
    if (window.confirm("Hapus siswa ini dari daftar bimbingan Anda?")) {
      setStudents(students.filter((s) => s.id !== id));
    }
  };

  const handleDeleteTeacher = (id) => {
    if (window.confirm("Hapus data guru pendamping ini?")) {
      setTeachers(teachers.filter((t) => t.id !== id));
    }
  };

  const handleDeleteGroup = (id) => {
    if (window.confirm("Bubarkan kelompok magang ini?")) {
      setGroups(groups.filter((g) => g.id !== id));
    }
  };

  const openStudentModal = (student = null) => {
    setEditingItem(student);
    setFormData(
      student || {
        id: `S0${students.length + 1}`,
        nis: "",
        name: "",
        class_name: "XII RPL 1",
        email: "",
        group: "-",
        office: "-",
        status: "Aktif"
      }
    );
    setModalType("student");
  };

  const openTeacherModal = (teacher = null) => {
    setEditingItem(teacher);
    setFormData(
      teacher || {
        id: `T0${teachers.length + 1}`,
        nip: "",
        name: "",
        email: "",
        role: "Pembimbing Lapangan",
        groupsCount: 0,
        phone: ""
      }
    );
    setModalType("teacher");
  };

  const openGroupModal = (group = null) => {
    setEditingItem(group);
    setFormData(
      group || {
        id: `G0${groups.length + 1}`,
        name: "",
        leader: "",
        membersCount: 1,
        office: "",
        teacher: teachers[0]?.name || "",
        status: "requesting",
        letterFile: null,
        isSigned: false
      }
    );
    setModalType("group");
  };

  const handleSaveItem = (e) => {
    e.preventDefault();
    if (modalType === "student") {
      setStudents(editingItem ? students.map((s) => (s.id === editingItem.id ? formData : s)) : [...students, formData]);
    } else if (modalType === "teacher") {
      setTeachers(editingItem ? teachers.map((t) => (t.id === editingItem.id ? formData : t)) : [...teachers, formData]);
    } else if (modalType === "group") {
      setGroups(editingItem ? groups.map((g) => (g.id === editingItem.id ? formData : g)) : [...groups, formData]);
    }
    setModalType(null);
  };

  return (
    <div className="min-h-screen bg-[#fbfbfd] text-[#1d1d1f] font-sans pb-20 antialiased selection:bg-[#0071e3]/20">
      {/* Apple Translucent Navigation Bar */}
      <header className="sticky top-0 z-30 backdrop-blur-xl bg-white/75 border-b border-slate-200/80 transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-b from-blue-500 to-blue-600 text-white flex items-center justify-center font-bold text-base shadow-[0_4px_12px_rgba(59,130,246,0.3)] border border-white/20">
              CK
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-base text-slate-900 tracking-tight">Cakrawala</span>
                <span className="bg-slate-200/70 text-slate-700 text-[11px] font-semibold px-2 py-0.5 rounded-full border border-slate-300/40">
                  Guru
                </span>
              </div>
              <p className="text-[11px] text-slate-400 font-normal hidden sm:block">Panel Kerja Pembimbing PKL</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Link
              href="/admin"
              className="px-3.5 py-1.5 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100 text-xs font-semibold transition-colors hidden md:inline-block"
            >
              Admin
            </Link>
            <Link
              href="/student"
              className="px-3.5 py-1.5 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100 text-xs font-semibold transition-colors hidden md:inline-block"
            >
              Portal Siswa
            </Link>
            <div className="h-5 w-px bg-slate-200 mx-1"></div>
            
            <div className="flex items-center gap-2 pl-1.5">
              <div className="w-8 h-8 rounded-full bg-slate-900 text-white flex items-center justify-center font-bold text-xs shadow-xs">
                G
              </div>
              <div className="hidden lg:block text-left">
                <div className="text-xs font-bold text-slate-900 leading-tight">Drs. Hendro Wibowo</div>
                <div className="text-[10px] text-slate-400 font-mono">198504122010...</div>
              </div>
            </div>

            <Link
              href="/"
              className="ml-2 px-3 py-1.5 rounded-xl text-rose-600 hover:text-rose-700 hover:bg-rose-50 text-xs font-semibold transition-colors"
            >
              Keluar
            </Link>
          </div>
        </div>
      </header>

      {/* Main Layout */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
        {/* Toast Alert */}
        {accSuccessMessage && (
          <div className="mb-6 p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-900 flex items-center gap-3 animate-in fade-in shadow-xs backdrop-blur-md">
            <div className="w-7 h-7 rounded-full bg-emerald-600 text-white flex items-center justify-center shrink-0">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <div className="text-xs sm:text-sm font-medium">
              <strong className="font-bold">Dokumen Berhasil Diterbitkan:</strong> {accSuccessMessage}
            </div>
          </div>
        )}

        {/* Apple Style Workspace Hero */}
        <div className="relative rounded-3xl p-6 sm:p-8 mb-8 overflow-hidden bg-white border border-black/[0.05] shadow-[0_4px_24px_rgba(0,0,0,0.03)]">
          <div className="absolute top-0 right-0 w-96 h-48 bg-gradient-to-bl from-blue-500/[0.06] via-indigo-500/[0.03] to-transparent rounded-full blur-2xl pointer-events-none"></div>
          
          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#34c759]/10 text-[#1b7a37] text-[11px] font-semibold border border-[#34c759]/20 mb-3">
                <span className="w-2 h-2 rounded-full bg-[#34c759] animate-pulse"></span>
                Tahun Ajaran 2026/2027 Aktif
              </div>
              <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#1d1d1f]">
                Pantau siswa PKL tanpa tumpukan berkas fisik.
              </h1>
              <p className="mt-2 text-[#6e6e73] text-xs sm:text-sm max-w-2xl leading-relaxed">
                Kelola penempatan magang, cek kehadiran harian, dan setujui (ACC) surat pengantar siswa langsung dari satu layar. Siswa dapat mengunduh berkas bertanda tangan digital Anda tanpa perlu bolak-balik ke ruang guru.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <button
                onClick={() => {
                  const pending = groups.find(g => g.status === "requesting") || groups[0];
                  openAccModal(pending);
                }}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-gradient-to-b from-[#0077ed] to-[#0066cc] hover:from-[#007bf5] hover:to-[#0071e3] active:scale-[0.98] text-white font-semibold text-xs sm:text-sm shadow-[0_2px_10px_rgba(0,102,204,0.28)] transition-all cursor-pointer"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
                </svg>
                ACC Surat Pengantar ({groups.filter(g => g.status === "requesting").length})
              </button>
            </div>
          </div>
        </div>

        {/* Apple Style Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {/* Card 1 */}
          <div className="bg-white rounded-3xl p-5 border border-slate-200/80 shadow-[0_2px_12px_rgba(0,0,0,0.03)] hover:shadow-md hover:border-slate-300 transition-all">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Siswa Aktif</span>
              <div className="w-6 h-6 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold text-[10px]">
                OK
              </div>
            </div>
            <div className="flex items-baseline justify-between mt-2">
              <span className="text-3xl font-extrabold text-slate-900 tracking-tight">
                {students.filter(s => s.status === "Aktif").length}
              </span>
              <span className="text-xs text-slate-400 font-medium">dari {students.length} siswa</span>
            </div>
            <p className="text-[11px] text-slate-500 mt-2">Siswa magang aktif yang terikat absensi harian.</p>
            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
              <button onClick={() => openStudentModal()} className="text-blue-600 hover:text-blue-800 font-semibold cursor-pointer">
                + Tambah Siswa
              </button>
              <button onClick={() => setActiveTab("students")} className="text-slate-400 hover:text-slate-600">
                Lihat &rarr;
              </button>
            </div>
          </div>

          {/* Card 2: Menunggu ACC */}
          <div className="bg-gradient-to-b from-amber-500/[0.08] to-transparent rounded-3xl p-5 border-2 border-amber-400/50 shadow-[0_4px_16px_rgba(245,158,11,0.1)] transition-all">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-bold text-amber-800 uppercase tracking-wider">Menunggu ACC Guru</span>
              <div className="w-6 h-6 rounded-lg bg-amber-200 text-amber-900 flex items-center justify-center font-bold text-xs">
                !
              </div>
            </div>
            <div className="flex items-baseline justify-between mt-2">
              <span className="text-3xl font-extrabold text-amber-900 tracking-tight">
                {groups.filter(g => g.status === "requesting").length}
              </span>
              <span className="text-xs text-amber-800 font-bold bg-amber-200/60 px-2 py-0.5 rounded-full">
                Perlu Tanda Tangan
              </span>
            </div>
            <p className="text-[11px] text-amber-900/80 mt-2">Permohonan izin magang yang menunggu pengesahan Anda.</p>
            <div className="mt-4 pt-3 border-t border-amber-300/40 flex items-center justify-between text-xs">
              <button 
                onClick={() => {
                  const req = groups.find(g => g.status === "requesting") || groups[0];
                  openAccModal(req);
                }}
                className="text-emerald-700 hover:text-emerald-900 font-bold flex items-center gap-1 cursor-pointer"
              >
                <span>ACC Sekarang</span> &rarr;
              </button>
              <button onClick={() => setActiveTab("groups")} className="text-slate-500 hover:text-slate-700">
                Buka Berkas
              </button>
            </div>
          </div>

          {/* Card 3 */}
          <div className="bg-white rounded-3xl p-5 border border-slate-200/80 shadow-[0_2px_12px_rgba(0,0,0,0.03)] hover:shadow-md hover:border-slate-300 transition-all">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Menunggu Balasan Kantor</span>
              <div className="w-6 h-6 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center font-bold text-[10px]">
                WAIT
              </div>
            </div>
            <div className="flex items-baseline justify-between mt-2">
              <span className="text-3xl font-extrabold text-slate-900 tracking-tight">
                {groups.filter(g => g.status === "applying").length}
              </span>
              <span className="text-xs text-blue-700 bg-blue-50 px-2 py-0.5 rounded-full font-semibold">Proses Kantor</span>
            </div>
            <p className="text-[11px] text-slate-500 mt-2">Berkas sudah dikirim ke kantor dan menunggu konfirmasi.</p>
            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
              <button onClick={() => setActiveTab("groups")} className="text-blue-600 hover:text-blue-800 font-semibold cursor-pointer">
                Cek Mitra Kantor &rarr;
              </button>
            </div>
          </div>

          {/* Card 4 */}
          <div className="bg-white rounded-3xl p-5 border border-slate-200/80 shadow-[0_2px_12px_rgba(0,0,0,0.03)] hover:shadow-md hover:border-slate-300 transition-all">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Belum Penempatan</span>
              <div className="w-6 h-6 rounded-lg bg-rose-50 text-rose-600 flex items-center justify-center font-bold text-[10px]">
                0
              </div>
            </div>
            <div className="flex items-baseline justify-between mt-2">
              <span className="text-3xl font-extrabold text-slate-900 tracking-tight">
                {students.filter(s => s.status === "Belum PKL").length}
              </span>
              <span className="text-xs text-rose-700 bg-rose-50 px-2 py-0.5 rounded-full font-semibold">Butuh Arahan</span>
            </div>
            <p className="text-[11px] text-slate-500 mt-2">Siswa yang perlu diarahkan ke mitra industri sekolah.</p>
            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
              <button onClick={() => { setSearchTerm("Belum PKL"); setActiveTab("students"); }} className="text-blue-600 hover:text-blue-800 font-semibold cursor-pointer">
                Arahkan Siswa &rarr;
              </button>
            </div>
          </div>
        </div>

        {/* Content Section with Apple Segmented Control */}
        <div className="bg-white rounded-3xl border border-slate-200/80 shadow-[0_2px_16px_rgba(0,0,0,0.04)] overflow-hidden mb-8">
          <div className="p-4 sm:p-5 border-b border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
            {/* Apple Segmented Bar */}
            <div className="p-1 bg-slate-100/80 rounded-2xl flex gap-1 overflow-x-auto border border-slate-200/50">
              {[
                { id: "all", label: "Ringkasan" },
                { id: "groups", label: `Kelompok & ACC (${groups.length})` },
                { id: "students", label: `Data Siswa (${students.length})` },
                { id: "teachers", label: `Guru (${teachers.length})` }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all whitespace-nowrap cursor-pointer ${
                    activeTab === tab.id
                      ? "bg-white text-slate-900 shadow-sm font-bold"
                      : "text-slate-500 hover:text-slate-800"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Apple Search Input */}
            <div className="relative w-full sm:w-72">
              <input
                type="text"
                placeholder="Cari siswa, kelompok, kantor..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 pr-4 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-200/80 rounded-2xl focus:outline-none focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all placeholder-slate-400"
              />
              <svg className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>

          {/* TAB: KELOMPOK & FITUR ACC */}
          {(activeTab === "all" || activeTab === "groups") && (
            <div className="p-5 sm:p-6 border-b border-slate-100 last:border-0">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="text-base font-bold text-slate-900 tracking-tight">Daftar Kelompok & Otorisasi Surat Magang</h2>
                  <p className="text-xs text-slate-500 mt-0.5">Periksa berkas permohonan, lampirkan dokumen PDF, dan terbitkan persetujuan resmi.</p>
                </div>
                <button
                  onClick={() => openGroupModal()}
                  className="px-3.5 py-2 bg-blue-600 hover:bg-blue-500 active:scale-95 text-white rounded-2xl text-xs font-semibold shadow-xs transition-all cursor-pointer"
                >
                  + Buat Kelompok
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs sm:text-sm">
                  <thead>
                    <tr className="bg-slate-50/70 text-slate-400 font-bold uppercase text-[11px] tracking-wider border-y border-slate-200/70">
                      <th className="py-3 px-4">Nama Kelompok</th>
                      <th className="py-3 px-4">Ketua & Anggota</th>
                      <th className="py-3 px-4">Instansi Kantor</th>
                      <th className="py-3 px-4">Dokumen PDF</th>
                      <th className="py-3 px-4">Status Alur</th>
                      <th className="py-3 px-4 text-right">Otorisasi / ACC</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {groups.map((group) => (
                      <tr key={group.id} className="hover:bg-slate-50/60 transition-colors">
                        <td className="py-3.5 px-4">
                          <div className="font-bold text-slate-900">{group.name}</div>
                          <div className="text-[11px] font-mono text-slate-400">{group.letterNo}</div>
                        </td>
                        <td className="py-3.5 px-4">
                          <div className="font-semibold text-slate-800">{group.leader}</div>
                          <div className="text-[11px] text-slate-500">{group.membersCount} Siswa</div>
                        </td>
                        <td className="py-3.5 px-4 font-semibold text-slate-800">{group.office}</td>
                        <td className="py-3.5 px-4">
                          {group.letterFile ? (
                            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-slate-100 text-slate-700 text-xs font-mono border border-slate-200/60">
                              <span className="w-2 h-2 rounded-full bg-rose-500"></span>
                              <span className="truncate max-w-[130px] font-semibold">{group.letterFile}</span>
                            </span>
                          ) : (
                            <span className="text-xs text-slate-400 italic">Belum ada file PDF</span>
                          )}
                        </td>
                        <td className="py-3.5 px-4">
                          <span
                            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                              group.status === "accept"
                                ? "bg-emerald-500/10 text-emerald-700 border border-emerald-500/20"
                                : group.status === "applying"
                                ? "bg-blue-500/10 text-blue-700 border border-blue-500/20"
                                : group.status === "requesting"
                                ? "bg-amber-500/10 text-amber-800 border border-amber-500/25"
                                : "bg-rose-500/10 text-rose-700 border border-rose-500/20"
                            }`}
                          >
                            {group.status === "accept"
                              ? "Resmi Masuk / ACC"
                              : group.status === "applying"
                              ? "Menunggu Respon Kantor"
                              : group.status === "requesting"
                              ? "Menunggu ACC Guru"
                              : "Ditolak"}
                          </span>
                        </td>
                        <td className="py-3.5 px-4 text-right">
                          <div className="inline-flex items-center gap-2 justify-end">
                            {group.status === "requesting" ? (
                              <button
                                onClick={() => openAccModal(group)}
                                className="px-3.5 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl text-xs shadow-xs transition-all flex items-center gap-1.5 cursor-pointer active:scale-95"
                              >
                                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                                </svg>
                                <span>ACC & Tanda Tangan</span>
                              </button>
                            ) : (
                              <button
                                onClick={() => openAccModal(group)}
                                className="px-3 py-1.5 text-xs text-emerald-700 hover:bg-emerald-50 border border-emerald-300 font-semibold rounded-xl transition-colors cursor-pointer"
                              >
                                {group.isSigned ? "Lihat Surat ACC" : "Buka Surat"}
                              </button>
                            )}
                            <button
                              onClick={() => openGroupModal(group)}
                              className="px-2 py-1 text-xs text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-lg cursor-pointer"
                            >
                              Edit
                            </button>
                            <button
                              onClick={() => handleDeleteGroup(group.id)}
                              className="px-2 py-1 text-xs text-rose-500 hover:text-rose-700 hover:bg-rose-50 rounded-lg cursor-pointer"
                            >
                              Hapus
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB: DATA SISWA */}
          {(activeTab === "all" || activeTab === "students") && (
            <div className="p-5 sm:p-6 border-b border-slate-100 last:border-0">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="text-base font-bold text-slate-900 tracking-tight">Rekap Data Siswa Bimbingan</h2>
                  <p className="text-xs text-slate-500 mt-0.5">Daftar penempatan dan kelas siswa aktif.</p>
                </div>
                <button
                  onClick={() => openStudentModal()}
                  className="px-3.5 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-2xl text-xs font-semibold shadow-xs cursor-pointer"
                >
                  + Tambah Siswa
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs sm:text-sm">
                  <thead>
                    <tr className="bg-slate-50/70 text-slate-400 font-bold uppercase text-[11px] tracking-wider border-y border-slate-200/70">
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
                    {paginatedStudents.map((student) => (
                      <tr key={student.id} className="hover:bg-slate-50/60 transition-colors">
                        <td className="py-3 px-4 font-mono text-slate-600">{student.nis}</td>
                        <td className="py-3 px-4 font-semibold text-slate-900">
                          <div>{student.name}</div>
                          <div className="text-[11px] font-normal text-slate-400">{student.email}</div>
                        </td>
                        <td className="py-3 px-4 text-slate-600">{student.class_name}</td>
                        <td className="py-3 px-4 text-slate-800 font-semibold">{student.group}</td>
                        <td className="py-3 px-4 text-slate-600">{student.office}</td>
                        <td className="py-3 px-4">
                          <span
                            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                              student.status === "Aktif"
                                ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                                : student.status === "Menunggu"
                                ? "bg-amber-50 text-amber-800 border border-amber-200"
                                : "bg-slate-100 text-slate-600"
                            }`}
                          >
                            {student.status}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-right">
                          <button
                            onClick={() => openStudentModal(student)}
                            className="px-2 py-1 text-xs text-blue-600 hover:bg-blue-50 rounded-lg cursor-pointer font-medium"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDeleteStudent(student.id)}
                            className="px-2 py-1 text-xs text-rose-600 hover:bg-rose-50 rounded-lg cursor-pointer font-medium"
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
        </div>
      </main>

      {/* APPLE HIG MODAL SHEET: ACC & TANDA TANGAN SURAT PKL */}
      {modalType === "acc" && selectedGroupForAcc?.id ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-md p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-[0_25px_60px_rgba(0,0,0,0.3)] border border-slate-200/80 animate-in fade-in zoom-in-95 my-8">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div>
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-700 text-xs font-bold mb-1 border border-emerald-500/20">
                  Otorisasi Guru
                </div>
                <h3 className="text-xl font-extrabold text-slate-900 tracking-tight">
                  Pengesahan Surat Pengantar PKL
                </h3>
              </div>
              <button
                onClick={() => setModalType(null)}
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 flex items-center justify-center cursor-pointer transition-colors"
                title="Tutup"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <form onSubmit={handleExecuteAcc} className="mt-5 space-y-5">
              {/* Info Group Banner */}
              <div className="bg-slate-50/80 p-4 rounded-2xl border border-slate-200/70 text-xs sm:text-sm grid grid-cols-2 sm:grid-cols-3 gap-3">
                <div>
                  <span className="text-slate-400 block text-[11px] font-semibold uppercase">Nama Kelompok</span>
                  <span className="font-bold text-slate-900">{selectedGroupForAcc.name}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[11px] font-semibold uppercase">Ketua Kelompok</span>
                  <span className="font-semibold text-slate-800">{selectedGroupForAcc.leader}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[11px] font-semibold uppercase">Instansi Kantor</span>
                  <span className="font-semibold text-slate-800">{selectedGroupForAcc.office}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[11px] font-semibold uppercase">Nomor Surat</span>
                  <span className="font-mono text-slate-700">{selectedGroupForAcc.letterNo}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[11px] font-semibold uppercase">Jumlah Siswa</span>
                  <span className="font-medium text-slate-700">{selectedGroupForAcc.membersCount} Orang</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[11px] font-semibold uppercase">Pembimbing</span>
                  <span className="font-medium text-slate-700">{selectedGroupForAcc.teacher}</span>
                </div>
              </div>

              {/* 1. Add / Upload PDF Section */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-2">
                  1. Berkas Surat Pengantar (Format PDF)
                </label>
                
                <div className="border border-slate-200 rounded-2xl p-4 bg-slate-50/50 hover:bg-slate-50 transition-colors">
                  <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center font-bold text-sm shrink-0 border border-rose-200/50 shadow-xs">
                        PDF
                      </div>
                      <div>
                        <div className="text-xs sm:text-sm font-bold text-slate-900 font-mono">
                          {pdfFileName || "Surat_Pengantar_Otomatis.pdf"}
                        </div>
                        <div className="text-[11px] text-slate-400">
                          Lampirkan draf PDF dari tata usaha atau gunakan draf resmi sistem.
                        </div>
                      </div>
                    </div>

                    <label className="px-3.5 py-1.5 bg-white hover:bg-slate-50 border border-slate-300/80 text-slate-700 rounded-xl text-xs font-semibold cursor-pointer shadow-xs whitespace-nowrap transition-colors">
                      Pilih Berkas PDF
                      <input
                        type="file"
                        accept="application/pdf"
                        onChange={handleFileUpload}
                        className="hidden"
                      />
                    </label>
                  </div>
                </div>
              </div>

              {/* 2. Apple Styled Document Preview Sheet */}
              <div className="border border-slate-200 rounded-2xl p-5 bg-white shadow-xs">
                <div className="text-center pb-3 border-b border-slate-100 mb-3">
                  <div className="text-[11px] font-bold uppercase tracking-wider text-slate-800">SMK NEGERI INDONESIA &bull; TEKNOLOGI & REKAYASA</div>
                  <div className="text-[10px] text-slate-400 uppercase font-semibold">SURAT PENGANTAR PRAKTIK KERJA LAPANGAN (PKL) 2026/2027</div>
                  <div className="text-[11px] font-mono text-slate-600 mt-1">Nomor: {selectedGroupForAcc.letterNo}</div>
                </div>

                <div className="text-xs text-slate-700 space-y-2 leading-relaxed">
                  <p>
                    Dengan hormat, melalui surat resmi ini pihak sekolah mengizinkan kelompok <strong>{selectedGroupForAcc.name}</strong> ({selectedGroupForAcc.membersCount} siswa) yang dipimpin oleh <strong>{selectedGroupForAcc.leader}</strong> untuk melaksanakan program Praktik Kerja Lapangan di <strong>{selectedGroupForAcc.office}</strong>.
                  </p>
                </div>

                {/* Kolom Tanda Tangan */}
                <div className="mt-4 pt-3 border-t border-dashed border-slate-200 flex justify-end">
                  <div className="w-56 text-center text-xs">
                    <div className="text-slate-400 text-[11px]">Semarang, {new Date().toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" })}</div>
                    <div className="font-semibold text-slate-800 mt-0.5">Guru Pembimbing Lapangan</div>

                    <div className="h-16 my-2 flex items-center justify-center border border-slate-200/80 rounded-xl bg-slate-50/70 overflow-hidden relative">
                      {hasAccSignature ? (
                        <div className="text-center">
                          <span className="text-emerald-700 font-serif italic font-bold text-sm">
                            {signatureMethod === "canvas" ? "Tanda Tangan Digital" : "Stempel QR Valid"}
                          </span>
                          <div className="text-[9px] font-mono text-slate-400">Tersertifikasi Sekolah</div>
                        </div>
                      ) : (
                        <span className="text-slate-400 text-[11px] italic">
                          Bubuhkan tanda tangan di bawah...
                        </span>
                      )}
                    </div>

                    <div className="font-bold text-slate-900 underline">{selectedGroupForAcc.teacher}</div>
                    <div className="text-[10px] text-slate-400 font-mono">NIP 198504122010011002</div>
                  </div>
                </div>
              </div>

              {/* 3. Tanda Tangan Digital Guru */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-600">
                    2. Bubuhkan Tanda Tangan Guru
                  </label>
                  <div className="p-0.5 bg-slate-100 rounded-xl flex gap-1 border border-slate-200/50">
                    <button
                      type="button"
                      onClick={() => setSignatureMethod("canvas")}
                      className={`px-3 py-1 rounded-lg text-xs font-semibold cursor-pointer transition-all ${
                        signatureMethod === "canvas" ? "bg-white text-slate-900 shadow-xs font-bold" : "text-slate-500"
                      }`}
                    >
                      Canvas Layar
                    </button>
                    <button
                      type="button"
                      onClick={() => { setSignatureMethod("qr"); setHasAccSignature(true); }}
                      className={`px-3 py-1 rounded-lg text-xs font-semibold cursor-pointer transition-all ${
                        signatureMethod === "qr" ? "bg-white text-slate-900 shadow-xs font-bold" : "text-slate-500"
                      }`}
                    >
                      Stempel QR
                    </button>
                  </div>
                </div>

                {signatureMethod === "canvas" ? (
                  <div className="border border-slate-300/80 rounded-2xl p-2 bg-slate-50 relative">
                    <canvas
                      ref={accCanvasRef}
                      width={480}
                      height={120}
                      onMouseDown={startAccDrawing}
                      onMouseMove={drawAcc}
                      onMouseUp={stopAccDrawing}
                      onMouseLeave={stopAccDrawing}
                      className="w-full h-28 bg-white rounded-xl cursor-crosshair touch-none border border-slate-200"
                    />
                    {!hasAccSignature && (
                      <div className="absolute inset-0 flex items-center justify-center pointer-events-none text-slate-400 text-xs">
                        Goreskan tanda tangan Anda di sini
                      </div>
                    )}
                    <div className="flex justify-between items-center mt-2 px-1">
                      <span className="text-[11px] text-slate-400">Tanda tangan otomatis disematkan ke PDF siswa.</span>
                      <button
                        type="button"
                        onClick={clearAccCanvas}
                        className="text-xs text-rose-600 hover:text-rose-700 font-semibold cursor-pointer"
                      >
                        Hapus Goresan
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="border border-emerald-200/80 rounded-2xl p-3.5 bg-emerald-500/[0.08] text-emerald-900 flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-bold text-xs shrink-0 shadow-xs">
                      QR
                    </div>
                    <div className="text-xs">
                      <div className="font-bold">Stempel Resmi Cakrawala E-PKL</div>
                      <div className="text-emerald-700 text-[11px]">Kode verifikasi unik CK-SIGN-{selectedGroupForAcc.id}-2026 akan dicetak pada berkas.</div>
                    </div>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setModalType(null)}
                  className="px-4 py-2.5 rounded-2xl border border-slate-200 text-slate-600 hover:bg-slate-50 font-semibold text-xs sm:text-sm cursor-pointer transition-colors"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-2xl bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 active:scale-95 text-white font-bold text-xs sm:text-sm shadow-md shadow-emerald-600/20 transition-all flex items-center gap-2 cursor-pointer"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>ACC & Terbitkan Surat PKL</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      ) : null}

      {/* Modal Siswa */}
      {modalType === "student" && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-md p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-7 shadow-2xl border border-slate-200 animate-in fade-in zoom-in-95">
            <h3 className="text-lg font-bold text-slate-900 mb-1">
              {editingItem ? "Ubah Data Siswa" : "Tambah Siswa Bimbingan"}
            </h3>
            <p className="text-xs text-slate-500 mb-4">Pastikan NIS dan kelas sesuai data pokok sekolah.</p>

            <form onSubmit={handleSaveItem} className="space-y-3.5 text-xs sm:text-sm">
              <div>
                <label className="block text-slate-700 font-medium mb-1">NIS (Nomor Induk Siswa)</label>
                <input
                  type="text"
                  required
                  value={formData.nis || ""}
                  onChange={(e) => setFormData({ ...formData, nis: e.target.value })}
                  placeholder="Contoh: 20241008"
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-slate-800"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-medium mb-1">Nama Lengkap</label>
                <input
                  type="text"
                  required
                  value={formData.name || ""}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Nama siswa"
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-slate-800"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-700 font-medium mb-1">Kelas</label>
                  <select
                    value={formData.class_name || "XII RPL 1"}
                    onChange={(e) => setFormData({ ...formData, class_name: e.target.value })}
                    className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-slate-800"
                  >
                    <option value="XII RPL 1">XII RPL 1</option>
                    <option value="XII RPL 2">XII RPL 2</option>
                    <option value="XII TKJ 1">XII TKJ 1</option>
                    <option value="XII TKJ 2">XII TKJ 2</option>
                    <option value="XII DKV 1">XII DKV 1</option>
                  </select>
                </div>
                <div>
                  <label className="block text-slate-700 font-medium mb-1">Status Lapangan</label>
                  <select
                    value={formData.status || "Aktif"}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                    className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-slate-800"
                  >
                    <option value="Aktif">Aktif</option>
                    <option value="Menunggu">Menunggu</option>
                    <option value="Belum PKL">Belum PKL</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-slate-700 font-medium mb-1">Instansi Kantor</label>
                <input
                  type="text"
                  value={formData.office || ""}
                  onChange={(e) => setFormData({ ...formData, office: e.target.value })}
                  placeholder="Nama kantor tujuan"
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-slate-800"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setModalType(null)}
                  className="px-4 py-2 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 font-medium cursor-pointer"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-semibold cursor-pointer"
                >
                  Simpan Data
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal Kelompok */}
      {modalType === "group" && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-md p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-7 shadow-2xl border border-slate-200 animate-in fade-in zoom-in-95">
            <h3 className="text-lg font-bold text-slate-900 mb-1">
              {editingItem ? "Ubah Kelompok Magang" : "Buat Kelompok Baru"}
            </h3>
            <p className="text-xs text-slate-500 mb-4">Satukan siswa yang mengajukan permohonan ke instansi yang sama.</p>

            <form onSubmit={handleSaveItem} className="space-y-3.5 text-xs sm:text-sm">
              <div>
                <label className="block text-slate-700 font-medium mb-1">Nama Kelompok</label>
                <input
                  type="text"
                  required
                  value={formData.name || ""}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Contoh: Alpha Dev"
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-slate-800"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-medium mb-1">Ketua Kelompok</label>
                <input
                  type="text"
                  required
                  value={formData.leader || ""}
                  onChange={(e) => setFormData({ ...formData, leader: e.target.value })}
                  placeholder="Nama siswa ketua"
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-slate-800"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-medium mb-1">Instansi Kantor</label>
                <input
                  type="text"
                  required
                  value={formData.office || ""}
                  onChange={(e) => setFormData({ ...formData, office: e.target.value })}
                  placeholder="Nama perusahaan"
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-slate-800"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-medium mb-1">Status Berkas</label>
                <select
                  value={formData.status || "requesting"}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-slate-800"
                >
                  <option value="requesting">Butuh Surat Guru (Menunggu ACC)</option>
                  <option value="applying">Menunggu Balasan Kantor</option>
                  <option value="accept">Resmi Masuk / ACC</option>
                  <option value="rejected">Ditolak Instansi</option>
                </select>
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setModalType(null)}
                  className="px-4 py-2 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 font-medium cursor-pointer"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-semibold cursor-pointer"
                >
                  Simpan Kelompok
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
