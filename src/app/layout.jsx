import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const baseURL = process.env.NEXT_PUBLIC_APP_URL || "https://cakrawala.id";

export const metadata = {
  metadataBase: new URL(baseURL),
  applicationName: "Cakrawala",
  title: {
    default: "Cakrawala",
    template: "%s - Cakrawala",
  },
  description:
    "Menjelajah Dunia Kerja, Merangkai Pengalaman Nyata. Platform manajemen Praktik Kerja Lapangan, absensi, dan jurnal kegiatan siswa secara terpadu.",
  keywords: [
    "Cakrawala",
    "e-PKL",
    "Praktik Kerja Lapangan",
    "Magang SMK",
    "Absensi PKL",
    "Jurnal Kegiatan",
    "Sistem Informasi PKL",
    "Pendidikan Vokasi",
  ],
  referrer: "origin-when-cross-origin",
  creator: "Cakrawala Team",
  publisher: "Cakrawala",
  authors: [{ name: "Cakrawala Team", url: baseURL }],
  openGraph: {
    siteName: "Cakrawala",
    title: {
      default: "Cakrawala",
      template: "%s - Cakrawala",
    },
    description:
      "Menjelajah Dunia Kerja, Merangkai Pengalaman Nyata. Platform manajemen Praktik Kerja Lapangan, absensi, dan jurnal kegiatan siswa secara terpadu.",
    url: baseURL,
    locale: "id_ID",
    type: "website",
    images: [],
  },
  twitter: {
    card: "summary_large_image",
    title: {
      default: "Cakrawala",
      template: "%s - Cakrawala",
    },
    description:
      "Menjelajah Dunia Kerja, Merangkai Pengalaman Nyata. Platform manajemen Praktik Kerja Lapangan, absensi, dan jurnal kegiatan siswa secara terpadu.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
