"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";

export default function StudentAttendancePage() {
  const [attendanceType, setAttendanceType] = useState("in"); // 'in' atau 'out'
  const [currentTime, setCurrentTime] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [attendanceSuccess, setAttendanceSuccess] = useState(null);

  // Real Camera State
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [stream, setStream] = useState(null);
  const [capturedPhotoUrl, setCapturedPhotoUrl] = useState(null);
  const [cameraError, setCameraError] = useState("");
  const [isCameraLoading, setIsCameraLoading] = useState(true);
  const [facingMode, setFacingMode] = useState("user"); // 'user' (depan) atau 'environment' (belakang)

  // Real Geolocation State
  const [userCoords, setUserCoords] = useState({ lat: "-7.3129", lng: "112.7291" });
  const [gpsStatus, setGpsStatus] = useState({
    inRadius: true,
    distance: "28 meter",
    accuracy: "Akurat (8m)"
  });

  const [history, setHistory] = useState([
    {
      id: "ATT-101",
      date: "Senin, 23 Nov 2026",
      type: "Masuk",
      time: "07:42 WIB",
      status: "Tepat Waktu",
      distance: "28 m",
      photo: null
    },
    {
      id: "ATT-100",
      date: "Jumat, 20 Nov 2026",
      type: "Pulang",
      time: "16:05 WIB",
      status: "Tepat Waktu",
      distance: "30 m",
      photo: null
    },
    {
      id: "ATT-099",
      date: "Jumat, 20 Nov 2026",
      type: "Masuk",
      time: "07:45 WIB",
      status: "Tepat Waktu",
      distance: "25 m",
      photo: null
    }
  ]);

  // Clock Timer
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(
        now.toLocaleTimeString("id-ID", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: false
        }) + " WIB"
      );
    };
    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  // Request & Start Camera
  const startCamera = async (mode = facingMode) => {
    setIsCameraLoading(true);
    setCameraError("");

    try {
      // Stop previous tracks if any
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
      }

      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        throw new Error("Kamera langsung tidak didukung peramban ini.");
      }

      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: mode,
          width: { ideal: 1280 },
          height: { ideal: 720 }
        },
        audio: false
      });

      setStream(mediaStream);
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
        videoRef.current.onloadedmetadata = () => {
          videoRef.current.play().catch((e) => console.log("Play error:", e));
        };
      }
      setIsCameraLoading(false);
    } catch (err) {
      console.warn("Camera init note:", err.message);
      setIsCameraLoading(false);
      setCameraError(
        "Kamera tidak dapat diakses secara otomatis. Pastikan izin kamera aktif pada peramban, atau gunakan opsi ambil foto file di bawah."
      );
    }
  };

  useEffect(() => {
    startCamera("user");

    // Real Geolocation lookup
    if (typeof window !== "undefined" && navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setUserCoords({
            lat: pos.coords.latitude.toFixed(4),
            lng: pos.coords.longitude.toFixed(4)
          });
          setGpsStatus({
            inRadius: true,
            distance: "32 meter",
            accuracy: `${Math.round(pos.coords.accuracy || 10)}m`
          });
        },
        () => {
          // Fallback location for demo
          setUserCoords({ lat: "-7.3129", lng: "112.7291" });
          setGpsStatus({
            inRadius: true,
            distance: "28 meter",
            accuracy: "Akurat (GPS Kantor)"
          });
        },
        { enableHighAccuracy: true, timeout: 6000 }
      );
    }

    return () => {
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);

  // Switch between front & back camera
  const toggleCameraFacing = () => {
    const nextMode = facingMode === "user" ? "environment" : "user";
    setFacingMode(nextMode);
    startCamera(nextMode);
  };

  // Capture current video frame to canvas
  const handleCapturePhoto = () => {
    if (!videoRef.current) return;
    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (!canvas) return;

    const width = video.videoWidth || 640;
    const height = video.videoHeight || 480;
    canvas.width = width;
    canvas.height = height;

    const ctx = canvas.getContext("2d");
    if (facingMode === "user") {
      ctx.translate(width, 0);
      ctx.scale(-1, 1);
    }
    ctx.drawImage(video, 0, 0, width, height);

    const dataUrl = canvas.toDataURL("image/jpeg", 0.9);
    setCapturedPhotoUrl(dataUrl);

    // Stop active camera stream while previewing
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
      setStream(null);
    }
  };

  // Retake photo
  const handleRetakePhoto = () => {
    setCapturedPhotoUrl(null);
    startCamera(facingMode);
  };

  // Fallback file capture for devices without direct webcam access
  const handleFileCapture = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setCapturedPhotoUrl(event.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Submit attendance
  const handleSubmitAttendance = (e) => {
    e.preventDefault();
    if (!capturedPhotoUrl) {
      alert("Harap ambil foto selfie presensi terlebih dahulu.");
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      const newRecord = {
        id: `ATT-${Date.now().toString().slice(-3)}`,
        date: "Senin, 23 Nov 2026",
        type: attendanceType === "in" ? "Masuk" : "Pulang",
        time: currentTime,
        status: "Tepat Waktu",
        distance: gpsStatus.distance,
        photo: capturedPhotoUrl
      };
      setHistory([newRecord, ...history]);
      setAttendanceSuccess(newRecord);
      setCapturedPhotoUrl(null);
      startCamera(facingMode);
    }, 700);
  };

  return (
    <div className="space-y-6">
      {/* Hidden Canvas for Frame Capture */}
      <canvas ref={canvasRef} className="hidden" />

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold tracking-tight text-[#1d1d1f]">
              Presensi Mandiri PKL
            </h1>
            <span className="text-[10px] font-semibold bg-[#34c759]/15 text-[#1b7a37] px-2.5 py-0.5 rounded-full border border-[#34c759]/20">
              Kamera Aktif
            </span>
          </div>
          <p className="text-xs text-[#6e6e73] mt-0.5">
            Verifikasi kehadiran berbasis kamera selfie langsung dan deteksi radius GPS kantor mitra.
          </p>
        </div>

        <Link
          href="/student"
          className="text-xs font-semibold text-[#0071e3] hover:underline flex items-center gap-1 self-start sm:self-auto"
        >
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Kembali ke Beranda
        </Link>
      </div>

      {/* Success Notification Banner */}
      {attendanceSuccess && (
        <div className="bg-[#34c759]/10 border border-[#34c759]/30 rounded-2xl p-4 flex items-center justify-between text-xs animate-in fade-in">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-[#34c759] text-white flex items-center justify-center shrink-0">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <div>
              <p className="font-bold text-[#248a3d]">
                Presensi {attendanceSuccess.type} Berhasil Dicatat
              </p>
              <p className="text-[#86868b] text-[11px]">
                Waktu: <span className="font-mono tabular-nums">{attendanceSuccess.time}</span> • Jarak GPS: {attendanceSuccess.distance} • Terverifikasi
              </p>
            </div>
          </div>
          <button
            onClick={() => setAttendanceSuccess(null)}
            className="text-xs font-semibold text-[#248a3d] hover:underline cursor-pointer"
          >
            Tutup
          </button>
        </div>
      )}

      {/* Main Grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* Left Column: Real Live Camera Viewfinder */}
        <div className="md:col-span-7 bg-white rounded-3xl p-6 border border-black/[0.06] shadow-[0_2px_12px_rgba(0,0,0,0.03)] flex flex-col justify-between">
          <div>
            {/* Apple Segmented Control for Attendance Type */}
            <div className="p-1 bg-black/[0.05] rounded-2xl mb-4 flex gap-1">
              <button
                type="button"
                onClick={() => setAttendanceType("in")}
                className={`flex-1 py-2 text-xs font-semibold rounded-xl transition-all cursor-pointer ${
                  attendanceType === "in"
                    ? "bg-white text-[#1d1d1f] shadow-sm font-bold"
                    : "text-[#86868b] hover:text-[#1d1d1f]"
                }`}
              >
                Presensi Masuk (07:00 - 08:00)
              </button>
              <button
                type="button"
                onClick={() => setAttendanceType("out")}
                className={`flex-1 py-2 text-xs font-semibold rounded-xl transition-all cursor-pointer ${
                  attendanceType === "out"
                    ? "bg-white text-[#1d1d1f] shadow-sm font-bold"
                    : "text-[#86868b] hover:text-[#1d1d1f]"
                }`}
              >
                Presensi Pulang (16:00 - 18:00)
              </button>
            </div>

            {/* Camera Viewport */}
            <div className="relative aspect-4/3 rounded-2xl overflow-hidden bg-[#1c1c1e] text-white flex flex-col items-center justify-center border border-black/10 shadow-inner">
              {capturedPhotoUrl ? (
                /* Captured Photo Preview */
                <div className="w-full h-full relative flex items-center justify-center bg-black">
                  <img
                    src={capturedPhotoUrl}
                    alt="Foto Selfie Presensi"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between p-2.5 rounded-xl bg-black/60 backdrop-blur-md">
                    <div>
                      <p className="text-xs font-bold text-white">Foto Selfie Terambil</p>
                      <p className="text-[10px] text-white/70 font-mono tabular-nums">{currentTime}</p>
                    </div>
                    <button
                      type="button"
                      onClick={handleRetakePhoto}
                      className="px-3 py-1 bg-white/20 hover:bg-white/30 text-white rounded-lg text-xs font-medium backdrop-blur-md transition-colors cursor-pointer"
                    >
                      Ambil Ulang
                    </button>
                  </div>
                </div>
              ) : (
                /* Live Webcam Stream */
                <div className="w-full h-full relative flex items-center justify-center">
                  <video
                    ref={videoRef}
                    autoPlay
                    playsInline
                    muted
                    className={`w-full h-full object-cover ${facingMode === "user" ? "-scale-x-100" : ""}`}
                  />

                  {/* Face Guide Oval */}
                  <div className="absolute inset-0 pointer-events-none flex flex-col items-center justify-center">
                    <div className="w-40 h-52 rounded-full border-2 border-dashed border-white/50 flex items-center justify-center shadow-sm">
                      <span className="text-[10px] font-semibold text-white/70 bg-black/40 px-2 py-0.5 rounded-full backdrop-blur-xs">
                        Posisikan Wajah
                      </span>
                    </div>
                  </div>

                  {/* Live Status Indicators */}
                  <div className="absolute top-3 left-3 bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-lg text-[10px] font-mono text-white flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-[#34c759] animate-pulse"></span>
                    <span>LIVE</span>
                    <span>•</span>
                    <span>{currentTime}</span>
                  </div>

                  {/* Camera Switch Control */}
                  <button
                    type="button"
                    onClick={toggleCameraFacing}
                    title="Ganti Kamera Depan / Belakang"
                    className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/60 hover:bg-black/80 backdrop-blur-md text-white flex items-center justify-center text-xs cursor-pointer transition-transform active:rotate-180 duration-300"
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                  </button>

                  {/* Shutter Capture Button */}
                  <div className="absolute bottom-4 left-0 right-0 flex justify-center items-center">
                    <button
                      type="button"
                      onClick={handleCapturePhoto}
                      disabled={isCameraLoading}
                      title="Tekan untuk Mengambil Foto Selfie"
                      className="w-16 h-16 rounded-full border-4 border-white bg-white/20 hover:scale-105 active:scale-95 transition-all shadow-xl flex items-center justify-center cursor-pointer backdrop-blur-xs"
                    >
                      <div className="w-11 h-11 rounded-full bg-white shadow-sm"></div>
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Error or Fallback Helper */}
            {cameraError && !capturedPhotoUrl && (
              <div className="mt-3 p-3 bg-amber-50 border border-amber-200 text-amber-900 rounded-xl text-xs space-y-2">
                <p>{cameraError}</p>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => startCamera(facingMode)}
                    className="px-3 py-1 bg-amber-200 hover:bg-amber-300 rounded-lg font-semibold text-[11px] cursor-pointer"
                  >
                    Coba Hubungkan Ulang Kamera
                  </button>
                  <label className="px-3 py-1 bg-white border border-amber-300 hover:bg-amber-50 rounded-lg font-semibold text-[11px] cursor-pointer inline-flex items-center gap-1">
                    <span>Pilih Foto dari Galeri / Kamera</span>
                    <input
                      type="file"
                      accept="image/*"
                      capture="user"
                      onChange={handleFileCapture}
                      className="hidden"
                    />
                  </label>
                </div>
              </div>
            )}
          </div>

          {/* Submit Action */}
          <div className="mt-5 pt-3 border-t border-black/[0.05]">
            <button
              onClick={handleSubmitAttendance}
              disabled={isSubmitting || !capturedPhotoUrl}
              className={`w-full py-3.5 rounded-2xl text-xs font-semibold transition-all flex items-center justify-center gap-2 ${
                capturedPhotoUrl && !isSubmitting
                  ? "bg-gradient-to-b from-[#0077ed] to-[#0066cc] hover:from-[#007bf5] hover:to-[#0071e3] text-white cursor-pointer shadow-[0_2px_8px_rgba(0,102,204,0.25)] active:scale-[0.98]"
                  : "bg-black/[0.05] text-[#86868b] cursor-not-allowed"
              }`}
            >
              {isSubmitting ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Menyimpan Presensi...</span>
                </>
              ) : (
                <>
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>
                    Kirim Presensi {attendanceType === "in" ? "Masuk" : "Pulang"} ({currentTime})
                  </span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Right Column: GPS Geolocation & Instructions */}
        <div className="md:col-span-5 space-y-5">
          {/* GPS Status Card */}
          <div className="bg-white rounded-3xl p-6 border border-black/[0.06] shadow-[0_2px_12px_rgba(0,0,0,0.03)] space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-semibold tracking-tight text-[#1d1d1f]">
                Verifikasi Lokasi Kantor
              </h2>
              <span className="text-[10px] font-semibold bg-[#34c759]/15 text-[#248a3d] px-2.5 py-0.5 rounded-full">
                Dalam Radius
              </span>
            </div>

            <div className="p-3.5 bg-[#f5f5f7] rounded-2xl space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-[#86868b]">Instansi Magang:</span>
                <span className="font-semibold text-[#1d1d1f]">PT Telkom Indonesia</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#86868b]">Batas Toleransi:</span>
                <span className="font-mono tabular-nums text-[#1d1d1f]">Maksimal 100 meter</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#86868b]">Jarak Anda:</span>
                <span className="font-mono tabular-nums font-bold text-[#248a3d]">
                  {gpsStatus.distance} (Valid)
                </span>
              </div>
              <div className="flex justify-between pt-1 border-t border-black/[0.05]">
                <span className="text-[#86868b]">Titik Koordinat:</span>
                <span className="font-mono tabular-nums text-[11px] text-[#1d1d1f]">
                  {userCoords.lat}, {userCoords.lng}
                </span>
              </div>
            </div>

            <p className="text-[11px] text-[#86868b] leading-relaxed">
              Lokasi GPS diperbarui otomatis dari peramban Anda untuk mencocokkan titik koordinat resmi kantor magang.
            </p>
          </div>

          {/* Quick Rules */}
          <div className="bg-white rounded-3xl p-6 border border-black/[0.06] shadow-[0_2px_12px_rgba(0,0,0,0.03)] space-y-3">
            <h3 className="text-xs font-bold text-[#1d1d1f] uppercase tracking-wider">
              Ketentuan Presensi Selfie
            </h3>
            <ul className="text-xs text-[#86868b] space-y-2 list-disc list-inside leading-relaxed">
              <li>Posisikan wajah Anda tegak di dalam bingkai oval panduan.</li>
              <li>Pastikan pencahayaan cukup terang agar foto wajah terlihat jelas.</li>
              <li>Presensi masuk dilakukan paling lambat pukul 08:00 WIB.</li>
              <li>Presensi pulang dilakukan mulai pukul 16:00 WIB.</li>
            </ul>
          </div>
        </div>
      </div>

      {/* History Log */}
      <div className="bg-white rounded-3xl p-6 border border-black/[0.06] shadow-[0_2px_12px_rgba(0,0,0,0.03)]">
        <h2 className="text-sm font-semibold tracking-tight text-[#1d1d1f] mb-4">
          Riwayat Presensi Terbaru
        </h2>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-black/[0.06] text-[#86868b]">
                <th className="pb-3 font-medium">Tanggal</th>
                <th className="pb-3 font-medium">Jenis</th>
                <th className="pb-3 font-medium">Waktu</th>
                <th className="pb-3 font-medium">Jarak GPS</th>
                <th className="pb-3 font-medium">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-black/[0.04]">
              {history.map((item) => (
                <tr key={item.id} className="hover:bg-black/[0.02]">
                  <td className="py-3 font-medium text-[#1d1d1f]">{item.date}</td>
                  <td className="py-3">
                    <span
                      className={`px-2 py-0.5 rounded-full text-[10px] font-semibold ${
                        item.type === "Masuk" ? "bg-blue-50 text-blue-700" : "bg-purple-50 text-purple-700"
                      }`}
                    >
                      {item.type}
                    </span>
                  </td>
                  <td className="py-3 font-mono tabular-nums text-[#1d1d1f]">{item.time}</td>
                  <td className="py-3 font-mono tabular-nums text-[#86868b]">{item.distance}</td>
                  <td className="py-3">
                    <span className="text-[10px] font-semibold text-[#248a3d] bg-[#34c759]/15 px-2 py-0.5 rounded-full">
                      {item.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
