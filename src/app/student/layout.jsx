"use client";

import React from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

export default function StudentLayout({ children }) {
  const pathname = usePathname();
  const router = useRouter();

  const navItems = [
    {
      name: "Beranda",
      href: "/student",
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
      )
    },
    {
      name: "Presensi",
      href: "/student/attendance",
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    },
    {
      name: "Izin & Sakit",
      href: "/student/attendance/absence",
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      )
    },
    {
      name: "Kelompok PKL",
      href: "/student/group",
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      )
    }
  ];

  return (
    <div className="min-h-screen bg-[#fbfbfd] text-[#1d1d1f] flex flex-col font-sans pb-24 md:pb-8 selection:bg-[#0071e3]/20">
      {/* Apple Frosted Navigation Bar */}
      <header className="sticky top-0 z-40 apple-glass">
        <div className="max-w-5xl mx-auto px-4 h-14 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-b from-[#0077ed] to-[#005bb5] text-white flex items-center justify-center font-bold text-xs shadow-sm border border-white/20">
              CK
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-semibold text-sm tracking-tight text-[#1d1d1f]">Cakrawala</span>
                <span className="text-[10px] font-semibold bg-[#0071e3]/10 text-[#0071e3] px-2 py-0.5 rounded-full">
                  Siswa
                </span>
              </div>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1 bg-black/[0.04] p-1 rounded-xl">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                    isActive
                      ? "bg-white text-[#1d1d1f] shadow-sm font-semibold"
                      : "text-[#6e6e73] hover:text-[#1d1d1f]"
                  }`}
                >
                  {item.name}
                </Link>
              );
            })}
          </nav>

          {/* User profile & exit */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => router.push("/")}
              title="Keluar ke Halaman Masuk"
              className="text-xs text-[#6e6e73] hover:text-[#d70015] px-2.5 py-1 rounded-lg hover:bg-black/[0.04] transition-colors flex items-center gap-1 font-medium cursor-pointer"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              <span className="hidden sm:inline">Keluar</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 max-w-5xl w-full mx-auto px-4 py-6">
        {children}
      </main>

      {/* Mobile iOS Floating Bottom Tab Bar */}
      <nav className="fixed bottom-3 left-4 right-4 z-40 md:hidden">
        <div className="apple-glass-card rounded-3xl p-1.5 shadow-[0_8px_30px_rgba(0,0,0,0.12)] flex items-center justify-around">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex flex-col items-center justify-center flex-1 py-1.5 rounded-2xl transition-all ${
                  isActive
                    ? "text-[#0071e3] font-semibold"
                    : "text-[#6e6e73] hover:text-[#1d1d1f]"
                }`}
              >
                <div className={`p-1 rounded-xl transition-all ${isActive ? "bg-[#0071e3]/10" : ""}`}>
                  {item.icon}
                </div>
                <span className="text-[10px] mt-0.5 tracking-tight">{item.name}</span>
              </Link>
            );
          })}
        </div>
      </nav>
    </div>
  );
}
