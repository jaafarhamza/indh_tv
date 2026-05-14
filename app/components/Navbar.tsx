"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "glass-strong shadow-2xl shadow-black/50"
            : "bg-gradient-to-b from-black/90 to-transparent"
        }`}
      >
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-12">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 shrink-0 group">
              <Image
                src="/logo/logo png dig_Plan de travail 1.png"
                alt="INDH TV"
                width={120}
                height={120}
                loading="eager"
                className="rounded-lg transition-transform duration-300 group-hover:scale-105"
                style={{ width: "120px", height: "auto" }}
              />
            </Link>

            {/* Desktop Navigation Links */}
            <div className="hidden md:flex items-center gap-1">
              <Link href="/" className="nav-link nav-link-active">
                Accueil
              </Link>
              <Link href="/#reportages" className="nav-link">
                Reportages
              </Link>
              <Link href="/#interviews" className="nav-link">
                Interviews
              </Link>
              <Link href="/#categories" className="nav-link">
                Catégories
              </Link>
              <Link href="/#reels" className="nav-link">
                Reels
              </Link>
              <Link href="/#categories" className="nav-link">
                Podcasts
              </Link>
            </div>

            {/* Right Actions */}
            <div className="flex items-center gap-3">
              {/* Search Button */}
              <button className="p-2.5 rounded-full text-[#a3a3a3] hover:text-white hover:bg-white/10 transition-all duration-200">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </button>

              {/* Live Badge */}
              <div className="hidden sm:flex items-center gap-1.5 badge-red rounded-full px-3 py-1.5">
                <span className="w-2 h-2 bg-[#E31B23] rounded-full animate-pulse" />
                <span className="text-xs font-semibold uppercase tracking-wide">Live</span>
              </div>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="md:hidden p-2.5 rounded-full text-white hover:bg-white/10 transition-all duration-200"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  {mobileOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Bottom gradient line when scrolled */}
        {scrolled && (
          <div className="h-[2px] bg-gradient-to-r from-transparent via-[#E31B23] to-transparent opacity-60" />
        )}
      </nav>

      {/* Mobile Menu Overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 z-[60] md:hidden">
          <div className="absolute inset-0 bg-black/90 backdrop-blur-xl" onClick={() => setMobileOpen(false)} />
          <div className="relative z-10 flex flex-col items-center justify-center h-full gap-6">
            <Link href="/" onClick={() => setMobileOpen(false)} className="text-2xl font-bold text-white hover:text-[#E31B23] transition-colors">
              Accueil
            </Link>
            <Link href="/#reportages" onClick={() => setMobileOpen(false)} className="text-2xl font-bold text-[#a3a3a3] hover:text-[#E31B23] transition-colors">
              Reportages
            </Link>
            <Link href="/#interviews" onClick={() => setMobileOpen(false)} className="text-2xl font-bold text-[#a3a3a3] hover:text-[#00A651] transition-colors">
              Interviews
            </Link>
            <Link href="/#categories" onClick={() => setMobileOpen(false)} className="text-2xl font-bold text-[#a3a3a3] hover:text-[#00A651] transition-colors">
              Catégories
            </Link>
            <Link href="/#reels" onClick={() => setMobileOpen(false)} className="text-2xl font-bold text-[#a3a3a3] hover:text-[#E31B23] transition-colors">
              Reels
            </Link>
            {/* Decorative gradient line */}
            <div className="w-32 h-1 rounded-full bg-gradient-to-r from-[#E31B23] to-[#00A651] mt-4" />
          </div>
        </div>
      )}
    </>
  );
}
