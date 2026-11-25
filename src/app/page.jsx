"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();

  const [roleMode, setRoleMode] = useState("teacher"); // 'teacher' atau 'student'
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const fillDemoAccount = (role) => {
    setErrorMessage("");
    if (role === "admin") {
      setRoleMode("teacher");
      setUsername("admin_cakrawala");
      setPassword("admin123");
    } else if (role === "teacher") {
      setRoleMode("teacher");
      setUsername("198504122010011002");
      setPassword("guru123");
    } else {
      setRoleMode("student");
      setUsername("20241001");
      setPassword("siswa123");
    }
  };

  const handleLogin = (e) => {
    e.preventDefault();
    setErrorMessage("");

    if (!username.trim() || !password.trim()) {
      setErrorMessage("Username dan kata sandi wajib diisi.");
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      if (roleMode === "teacher") {
        if (username.toLowerCase().includes("admin")) {
          router.push("/admin");
        } else {
          router.push("/teacher");
        }
      } else {
        router.push("/student");
      }
    }, 320);
  };

  return (
    <div className="min-h-screen bg-[#07090e] text-slate-100 flex flex-col justify-center items-center px-4 py-12 font-sans relative overflow-hidden antialiased selection:bg-blue-500/30">
      {/* Apple Ambient Glow Effect */}
      <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[720px] h-[400px] bg-gradient-to-b from-blue-600/20 via-indigo-600/10 to-transparent blur-[120px] pointer-events-none rounded-full"></div>
      <div className="absolute -bottom-40 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-gradient-to-t from-emerald-600/10 via-blue-600/5 to-transparent blur-[140px] pointer-events-none rounded-full"></div>

      <div className="relative z-10 w-full max-w-[420px]">
        {/* Brand Lockup */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-b from-blue-500 to-blue-700 text-white font-bold text-xl shadow-[0_8px_25px_rgba(59,130,246,0.35)] border border-white/20 mb-4 transition-transform hover:scale-105 duration-300">
            CK
          </div>
          <div className="flex items-center justify-center gap-2">
            <span className="font-extrabold text-2xl text-white tracking-tight">Cakrawala</span>
            <span className="text-[11px] font-semibold bg-white/10 text-blue-300 px-2.5 py-0.5 rounded-full border border-white/15 backdrop-blur-md">
              E-PKL
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-2 font-normal max-w-xs mx-auto leading-relaxed">
            Portal masuk terpadu pembimbing, siswa, dan pengelola kegiatan magang SMK.
          </p>
        </div>

        {/* Frosted Glass Login Sheet */}
        <div className="backdrop-blur-2xl bg-white/[0.05] border border-white/[0.12] rounded-3xl p-6 sm:p-8 shadow-[0_25px_60px_rgba(0,0,0,0.6)]">
          {/* Apple Segmented Control */}
          <div className="p-1 bg-black/40 rounded-2xl mb-6 border border-white/[0.08] flex gap-1">
            <button
              type="button"
              onClick={() => { setRoleMode("teacher"); setErrorMessage(""); }}
              className={`flex-1 py-2 text-xs font-semibold rounded-xl transition-all duration-200 cursor-pointer ${
                roleMode === "teacher"
                  ? "bg-white/15 text-white shadow-[0_2px_8px_rgba(0,0,0,0.4)] backdrop-blur-md border border-white/15 font-bold"
                  : "text-slate-400 hover:text-slate-200"
              }`}
            >
              Guru & Staf
            </button>
            <button
              type="button"
              onClick={() => { setRoleMode("student"); setErrorMessage(""); }}
              className={`flex-1 py-2 text-xs font-semibold rounded-xl transition-all duration-200 cursor-pointer ${
                roleMode === "student"
                  ? "bg-white/15 text-white shadow-[0_2px_8px_rgba(0,0,0,0.4)] backdrop-blur-md border border-white/15 font-bold"
                  : "text-slate-400 hover:text-slate-200"
              }`}
            >
              Siswa PKL
            </button>
          </div>

          {/* Error Banner */}
          {errorMessage && (
            <div className="mb-5 p-3 rounded-2xl bg-rose-500/10 border border-rose-500/25 text-rose-300 text-xs flex items-center gap-2.5 animate-in fade-in">
              <span className="w-4 h-4 rounded-full bg-rose-500/30 text-rose-300 flex items-center justify-center text-[10px] font-bold shrink-0">!</span>
              <span>{errorMessage}</span>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-[11px] font-semibold uppercase tracking-wider text-slate-400 mb-1.5 ml-0.5">
                {roleMode === "teacher" ? "Username / NIP Guru" : "NIS (Nomor Induk Siswa)"}
              </label>
              <div className="relative">
                <input
                  type="text"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder={roleMode === "teacher" ? "NIP atau username akun" : "Nomor Induk Siswa"}
                  className="w-full px-4 py-3 bg-black/30 border border-white/10 rounded-2xl text-white placeholder-slate-500 text-sm focus:outline-none focus:border-blue-500/80 focus:ring-4 focus:ring-blue-500/15 transition-all"
                />
                <div className="absolute right-3.5 top-3.5 text-slate-500 pointer-events-none">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.75" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5 ml-0.5">
                <label className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">Kata Sandi</label>
                <button
                  type="button"
                  onClick={() => alert("Hubungi administrator sekolah atau guru koordinator untuk bantuan reset kata sandi.")}
                  className="text-[11px] text-blue-400 hover:text-blue-300 transition-colors cursor-pointer"
                >
                  Bantuan Sandi
                </button>
              </div>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Masukkan kata sandi"
                  className="w-full px-4 py-3 bg-black/30 border border-white/10 rounded-2xl text-white placeholder-slate-500 text-sm focus:outline-none focus:border-blue-500/80 focus:ring-4 focus:ring-blue-500/15 transition-all pr-11"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3 text-slate-500 hover:text-slate-300 p-0.5 cursor-pointer transition-colors"
                >
                  {showPassword ? (
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.75" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l18 18" />
                    </svg>
                  ) : (
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.75" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.75" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3.5 px-4 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 active:scale-[0.99] text-white font-semibold text-sm rounded-2xl shadow-[0_8px_20px_rgba(59,130,246,0.3)] transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                {isLoading ? (
                  <>
                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                    <span>Memproses...</span>
                  </>
                ) : (
                  <span>Masuk ke Akun</span>
                )}
              </button>
            </div>
          </form>

          {/* Quick Demo Switcher */}
          <div className="mt-6 pt-5 border-t border-white/[0.08]">
            <div className="text-[11px] text-slate-400 font-medium mb-2.5 text-center">
              Akses cepat pengujian:
            </div>
            <div className="grid grid-cols-3 gap-2">
              {[
                { label: "Admin", role: "admin" },
                { label: "Guru", role: "teacher" },
                { label: "Siswa", role: "student" }
              ].map((item) => (
                <button
                  key={item.role}
                  type="button"
                  onClick={() => fillDemoAccount(item.role)}
                  className="py-1.5 px-2 bg-white/[0.04] hover:bg-white/[0.1] text-slate-300 hover:text-white rounded-xl border border-white/[0.08] text-xs font-medium text-center transition-all cursor-pointer active:scale-95"
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-6 text-[11px] text-slate-500 font-medium tracking-tight">
          Cakrawala E-PKL &bull; Tata Kelola Praktik Kerja Lapangan SMK
        </div>
      </div>
    </div>
  );
}
