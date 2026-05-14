"use client";

import { useRef, useState, useEffect } from "react";

const PODCAST_URL = "https://smbiz2u60k.ufs.sh/f/jhCrop5VF1MdL80xg5utTkXJKpm940oiHUBLYfrQbg1RwvN6";

export default function Podcast() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [showVideo, setShowVideo] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Load the video element and seek to frame 2 to show a thumbnail
  useEffect(() => {
    if (videoRef.current && !isPlaying) {
      videoRef.current.currentTime = 2;
    }
  }, [showVideo]);

  const handlePlay = () => {
    setShowVideo(true);
    // Small delay to let the video element mount if not yet shown
    setTimeout(() => {
      if (videoRef.current) {
        videoRef.current.currentTime = 0;
        videoRef.current.play();
        setIsPlaying(true);
      }
    }, 100);
  };

  return (
    <section id="podcast" className="py-14 md:py-20">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-12">
        {/* Section Header */}
        <div className="flex items-center gap-4 mb-10">
          <div className="w-1 h-8 rounded-full bg-gradient-to-b from-[#E31B23] to-[#00A651]" />
          <h2 className="text-xl md:text-2xl font-bold text-white tracking-tight">
            Podcast
          </h2>
          <div className="flex-1 h-px bg-gradient-to-r from-white/10 to-transparent" />
          <span className="text-xs text-[#a3a3a3] font-semibold uppercase tracking-widest bg-white/5 px-3 py-1 rounded-full border border-white/5">
            Nouveau
          </span>
        </div>

        {/* Two Column Layout */}
        <div className="relative rounded-3xl overflow-hidden border border-white/[0.08] bg-[#111]">
          {/* Decorative gradient glow */}
          <div className="absolute -top-20 -left-20 w-60 h-60 bg-[#E31B23] rounded-full blur-[120px] opacity-[0.06]" />
          <div className="absolute -bottom-20 -right-20 w-60 h-60 bg-[#00A651] rounded-full blur-[120px] opacity-[0.06]" />

          <div className="relative grid grid-cols-1 lg:grid-cols-2">
            {/* LEFT - Content */}
            <div className="flex flex-col justify-center p-6 sm:p-8 md:p-12 lg:p-14 space-y-6 order-2 lg:order-1">
              {/* Badge */}
              <div className="flex items-center gap-3">
                <div className="badge-red rounded-full px-3 py-1.5 flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M7 4a3 3 0 016 0v4a3 3 0 11-6 0V4zm4 10.93A7.001 7.001 0 0017 8a1 1 0 10-2 0A5 5 0 015 8a1 1 0 00-2 0 7.001 7.001 0 006 6.93V17H6a1 1 0 100 2h8a1 1 0 100-2h-3v-2.07z" clipRule="evenodd" />
                  </svg>
                  <span className="text-[10px] font-bold uppercase tracking-wider">Podcast</span>
                </div>
                <span className="text-xs text-[#a3a3a3] font-medium">INDH TV</span>
              </div>

              {/* Title */}
              <h3 className="text-2xl md:text-3xl lg:text-4xl font-black text-white leading-tight">
                Podcast INDH —{" "}
                <span className="text-[#00A651] text-glow-green">Voix du Développement</span>
              </h3>

              {/* Description */}
              <p className="text-sm md:text-base text-[#a3a3a3] leading-relaxed">
                Écoutez les témoignages et analyses sur l&apos;impact de l&apos;Initiative Nationale
                pour le Développement Humain. Un regard approfondi sur les projets qui
                transforment le Maroc.
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 pt-2">
                <span className="text-[10px] font-semibold uppercase tracking-wider text-[#00A651] bg-[#00A651]/10 border border-[#00A651]/20 px-3 py-1.5 rounded-full">
                  Développement
                </span>
                <span className="text-[10px] font-semibold uppercase tracking-wider text-[#E31B23] bg-[#E31B23]/10 border border-[#E31B23]/20 px-3 py-1.5 rounded-full">
                  INDH
                </span>
                <span className="text-[10px] font-semibold uppercase tracking-wider text-white/60 bg-white/5 border border-white/10 px-3 py-1.5 rounded-full">
                  Maroc
                </span>
              </div>

              {/* Play Button */}
              <div className="pt-2">
                <button
                  onClick={handlePlay}
                  className="inline-flex items-center gap-3 bg-[#E31B23] hover:bg-[#ff2d35] text-white font-bold px-6 py-3.5 rounded-xl transition-all duration-300 hover:scale-105 shadow-lg shadow-[#E31B23]/20"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                  Écouter maintenant
                </button>
              </div>
            </div>

            {/* RIGHT - Video */}
            <div className="relative order-1 lg:order-2">
              <div className="relative w-full aspect-video lg:aspect-auto lg:h-full lg:min-h-[450px] bg-black overflow-hidden">
                {/* Always-visible video that loads a frame for thumbnail */}
                <video
                  ref={videoRef}
                  controls={isPlaying}
                  playsInline
                  preload="auto"
                  muted={!isPlaying}
                  className="w-full h-full object-cover bg-black"
                  onPlay={() => setIsPlaying(true)}
                  onPause={() => setIsPlaying(false)}
                  onLoadedData={() => {
                    // Seek to 2s to show a nice frame as thumbnail
                    if (videoRef.current && !isPlaying) {
                      videoRef.current.currentTime = 2;
                    }
                  }}
                >
                  <source src={`${PODCAST_URL}#t=2`} type="video/mp4" />
                </video>

                {/* Thumbnail overlay when not playing */}
                {!isPlaying && (
                  <div
                    className="absolute inset-0 flex items-center justify-center cursor-pointer bg-gradient-to-t from-black/60 via-transparent to-black/20"
                    onClick={handlePlay}
                  >
                    {/* Play Button */}
                    <div className="w-16 h-16 md:w-20 md:h-20 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center border-2 border-white/30 transition-all duration-300 hover:scale-110 hover:bg-white/20">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-7 w-7 md:h-9 md:w-9 text-white ml-1"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                      >
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </div>

                    {/* Bottom label */}
                    <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full bg-gradient-to-br from-[#E31B23] to-[#00A651]" />
                        <span className="text-xs font-semibold text-white/80">INDH TV — Podcast</span>
                      </div>
                      <div className="badge-red rounded-full px-2.5 py-1">
                        <span className="text-[9px] font-bold uppercase tracking-wider">Nouveau</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
