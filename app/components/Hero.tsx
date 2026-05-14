"use client";

import Link from "next/link";
import { useState, useEffect, useRef, useCallback } from "react";
import { videos } from "../data/videos";

const heroVideos = [
  {
    id: videos[0].id,
    videoUrl: videos[0].videoUrl,
    title: videos[0].title,
  },
  {
    id: videos[5].id,
    videoUrl: videos[5].videoUrl,
    title: videos[5].title,
  },
  {
    id: videos[7].id,
    videoUrl: "https://res.cloudinary.com/dgavshhxy/video/upload/v1778343796/reportage_interw_4_kabbar_indh_tv_haj_aissa_k0mzzi.mp4",
    title: videos[7].title,
  },
];

export default function Hero() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const current = heroVideos[currentIndex];

  // Auto-slide every 2 seconds
  const startAutoSlide = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      goNext();
    }, 4000);
  }, []);

  useEffect(() => {
    startAutoSlide();
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [startAutoSlide]);

  // Play current video when index changes
  useEffect(() => {
    videoRefs.current.forEach((video, index) => {
      if (video) {
        if (index === currentIndex) {
          video.currentTime = 0;
          video.play().catch(() => {});
        } else {
          video.pause();
        }
      }
    });
  }, [currentIndex]);

  const goNext = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % heroVideos.length);
      setIsTransitioning(false);
    }, 300);
  };

  const handleNext = () => {
    goNext();
    startAutoSlide();
  };

  return (
    <section className="relative w-full h-[90vh] min-h-[650px] overflow-hidden">
      {/* Background Videos */}
      {heroVideos.map((heroVideo, index) => (
        <div
          key={heroVideo.id}
          className={`absolute inset-0 transition-opacity duration-700 ${
            index === currentIndex ? "opacity-100" : "opacity-0"
          }`}
        >
          <video
            ref={(el) => { videoRefs.current[index] = el; }}
            muted
            loop
            playsInline
            preload="metadata"
            className="w-full h-full object-cover"
          >
            <source src={heroVideo.videoUrl} type="video/mp4" />
          </video>
        </div>
      ))}

      {/* Gradient Overlays */}
      <div className="absolute inset-0 hero-gradient" />
      <div className="absolute bottom-0 left-0 right-0 h-[250px] hero-gradient-bottom" />

      {/* Decorative Glow Elements */}
      <div className="absolute top-20 right-10 w-72 h-72 bg-[#E31B23] rounded-full blur-[150px] opacity-10 float-animation" />
      <div className="absolute bottom-40 right-40 w-48 h-48 bg-[#00A651] rounded-full blur-[120px] opacity-10 float-animation" style={{ animationDelay: "3s" }} />

      {/* Title & Content (TOP) */}
      <div className="absolute top-10 left-0 right-0 z-10 pt-28 md:pt-32">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-12">
          <div className={`max-w-2xl space-y-4 transition-all duration-300 ${isTransitioning ? "opacity-0 translate-y-4" : "opacity-100 translate-y-0"}`}>
            {/* Top Badge */}
            <div className="inline-flex items-center gap-2 badge-green rounded-full px-4 py-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
              </svg>
              <span className="text-xs font-semibold uppercase tracking-wider">
                Nouveau reportage disponible
              </span>
            </div>

            {/* Main Title */}
            <h1 className="text-4xl md:text-5xl lg:text-8xl font-black leading-[1.05] tracking-tight">
              <span className="text-white">Découvrez</span>
              <br />
              <span className="text-[#E31B23] text-glow-red">l&apos;impact</span>
              <span className="text-white"> de l&apos;</span>
              <span className="text-[#00A651] text-glow-green">INDH</span>
            </h1>

            {/* Description */}
            <p className="text-base md:text-lg text-[#a3a3a3] leading-relaxed max-w-lg">
              Explorez une collection exclusive de reportages sur le terrain,
              des témoignages inspirants et des documentaires qui racontent
              le développement humain au Maroc.
            </p>
          </div>
        </div>
      </div>

      {/* Center Play Button (no red circle) */}
      <div className="absolute inset-0 flex items-center justify-center z-20">
        <Link
          href={`/watch/${current.id}`}
          className="group flex items-center justify-center"
        >
          <div className="w-16 h-16 md:w-20 md:h-20 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center border border-white/30 transition-all duration-300 group-hover:scale-110 group-hover:bg-white/20">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-7 w-7 md:h-9 md:w-9 text-white ml-1"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M8 5v14l11-7z" />
            </svg>
          </div>
        </Link>
      </div>

      {/* Next Button (Right Side) */}
      <button
        onClick={handleNext}
        className="absolute right-6 md:right-12 top-1/2 -translate-y-1/2 z-20 w-12 h-12 md:w-14 md:h-14 glass hover:bg-white/15 rounded-full flex items-center justify-center text-white transition-all duration-300 hover:scale-110 hover:border-white/20"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 md:h-6 md:w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2.5}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Now Playing (Bottom Left) */}
      <div className="absolute bottom-10 left-0 z-10">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-12">
          <div className={`inline-flex items-center gap-3 glass rounded-full px-5 py-3 transition-all duration-300 ${isTransitioning ? "opacity-0" : "opacity-100"}`}>
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#E31B23] opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#E31B23]" />
            </span>
            <span className="text-xs font-medium text-white/60 uppercase tracking-wider">
              En lecture
            </span>
            <span className="w-px h-3 bg-white/20" />
            <span className="text-sm font-semibold text-white">
              {current.title}
            </span>
          </div>
        </div>
      </div>

      {/* Slide Indicators (Bottom Center) */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2">
        {heroVideos.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              setIsTransitioning(true);
              setTimeout(() => {
                setCurrentIndex(index);
                setIsTransitioning(false);
              }, 300);
              startAutoSlide();
            }}
            className={`transition-all duration-300 rounded-full ${
              index === currentIndex
                ? "w-8 h-2 bg-[#E31B23]"
                : "w-2 h-2 bg-white/30 hover:bg-white/50"
            }`}
          />
        ))}
      </div>

      {/* Bottom Decorative Line */}
      <div className="absolute bottom-0 left-0 right-0 section-divider" />
    </section>
  );
}
