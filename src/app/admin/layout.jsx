"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function AdminLayout({ children }) {
  const pathname = usePathname();

  const primaryNav = [
    {
      href: "/admin",
      label: "Ringkasan",
      icon: (
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      )
    },
    {
      href: "/admin/attendances",
      label: "Rekap Presensi",
      icon: (
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      )
    }
  ];

  const masterNav = [
    {
      href: "/admin/offices",
      label: "Mitra Industri",
      icon: (
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>
      )
    },
    {
      href: "/admin/groups",
      label: "Kelompok PKL",
      icon: (
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      )
    },
    {
      href: "/admin/students",
      label: "Data Siswa",
      icon: (
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" />
        </svg>
      )
    },
    {
      href: "/admin/teachers",
      label: "Guru Pembimbing",
      icon: (
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
      )
    },
    {
      href: "/admin/settings",
      label: "Pengaturan Sistem",
      icon: (
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      )
    }
  ];

  return (
    <div className="min-h-screen bg-[#f5f5f7] text-[#1d1d1f] font-sans flex flex-col md:flex-row antialiased selection:bg-[#0071e3]/20">
      {/* macOS Translucent Vibrancy Sidebar */}
      <aside className="w-full md:w-64 bg-[#1c1c1e] text-white shrink-0 md:min-h-screen border-r border-white/[0.08] flex flex-col justify-between select-none">
        <div>
          {/* macOS Window Title Bar with Traffic Light Dots */}
          <div className="p-4 border-b border-white/[0.08]">
            <div className="flex items-center gap-2 mb-3.5 pl-1">
              <span className="w-3 h-3 rounded-full bg-[#ff5f56] inline-block border border-black/10"></span>
              <span className="w-3 h-3 rounded-full bg-[#ffbd2e] inline-block border border-black/10"></span>
              <span className="w-3 h-3 rounded-full bg-[#27c93f] inline-block border border-black/10"></span>
            </div>

            <Link href="/admin" className="flex items-center gap-3 group">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-b from-[#0071e3] to-[#005bb5] text-white font-bold text-sm flex items-center justify-center shadow-sm border border-white/20 transition-transform group-hover:scale-105">
                CK
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="font-semibold text-sm text-white tracking-tight">Cakrawala</span>
                  <span className="text-[10px] bg-white/10 text-white/80 font-medium px-2 py-0.2 rounded-full border border-white/10">
                    Admin
                  </span>
                </div>
                <div className="text-[11px] text-white/50 font-normal">Tata Kelola PKL SMK</div>
              </div>
            </Link>
          </div>

          {/* Navigation Groups */}
          <div className="p-3 space-y-4">
            {/* Primary Section */}
            <div>
              <div className="px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-white/40">
                Aktivitas
              </div>
              <nav className="space-y-0.5 mt-1">
                {primaryNav.map((item) => {
                  const isActive = pathname === item.href;
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={`flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium transition-all ${
                        isActive
                          ? "bg-[#0071e3] text-white shadow-sm font-semibold"
                          : "text-white/70 hover:text-white hover:bg-white/[0.06]"
                      }`}
                    >
                      <span className="shrink-0">{item.icon}</span>
                      <span>{item.label}</span>
                    </Link>
                  );
                })}
              </nav>
            </div>

            {/* Master Data Section */}
            <div>
              <div className="px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-white/40">
                Master Data
              </div>
              <nav className="space-y-0.5 mt-1">
                {masterNav.map((item) => {
                  const isActive = pathname === item.href;
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={`flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium transition-all ${
                        isActive
                          ? "bg-[#0071e3] text-white shadow-sm font-semibold"
                          : "text-white/70 hover:text-white hover:bg-white/[0.06]"
                      }`}
                    >
                      <span className="shrink-0">{item.icon}</span>
                      <span>{item.label}</span>
                    </Link>
                  );
                })}
              </nav>
            </div>
          </div>
        </div>

        {/* User Card & Workspace Switcher */}
        <div className="p-3 border-t border-white/[0.08] space-y-2.5">
          <div className="bg-white/[0.04] p-2.5 rounded-xl border border-white/[0.06] flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-[#5856d6] to-[#af52de] text-white font-semibold text-xs flex items-center justify-center shrink-0">
              AD
            </div>
            <div className="overflow-hidden min-w-0">
              <div className="text-xs font-semibold text-white truncate">Administrator SMK</div>
              <div className="text-[10px] text-white/50 truncate font-mono">admin@smk.sch.id</div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-1.5 text-xs">
            <Link
              href="/teacher"
              className="py-1.5 px-2 rounded-lg bg-white/[0.06] hover:bg-white/[0.1] text-white/80 text-center text-[11px] font-medium transition-colors"
            >
              Panel Guru
            </Link>
            <Link
              href="/"
              className="py-1.5 px-2 rounded-lg bg-white/[0.06] hover:bg-red-500/20 text-white/80 hover:text-red-400 text-center text-[11px] font-medium transition-colors"
            >
              Keluar
            </Link>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
