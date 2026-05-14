import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";
import ServiceWorkerRegister from "./components/ServiceWorkerRegister";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "INDH TV — Plateforme de Reportages",
  description:
    "Découvrez les reportages et documentaires sur les projets de l'Initiative Nationale pour le Développement Humain au Maroc.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="fr"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#0a0a0a] text-white selection:bg-[var(--primary-red)]/30 selection:text-white">
        <ServiceWorkerRegister />
        <Navbar />
        <div className="flex-1">{children}</div>
      </body>
    </html>
  );
}
