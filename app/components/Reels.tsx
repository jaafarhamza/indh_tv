"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { createPortal } from "react-dom";

const reels = [
  {
    id: "reel-1",
    title: "INDH — Moments forts",
    videoUrl: "/videos/WhatsApp Video 2026-05-09 at 5.14.52 PM.mp4",
  },
  {
    id: "reel-2",
    title: "INDH — Sur le terrain",
    videoUrl: "/videos/WhatsApp Video 2026-05-09 at 5.14.54 PM.mp4",
  },
  {
    id: "reel-3",
    title: "INDH — Impact local",
    videoUrl: "/videos/WhatsApp Video 2026-05-09 at 5.14.58 PM.mp4",
  },
  {
    id: "reel-4",
    title: "INDH — Témoignages",
    videoUrl: "/videos/WhatsApp Video 2026-05-09 at 5.14.58 PM (1).mp4",
  },
  {
    id: "reel-5",
    title: "INDH — Nouveautés",
    videoUrl: "/videos/new.mp4",
  },
  {
    id: "reel-6",
    title: "INDH — Coopératives",
    videoUrl: "https://nq3v18uj8o.ufs.sh/f/ZvpqXEDI3YkpxD1wFW5EZpSwqiz1kYVsALudTbxQ70KmIMUJ",
  },
  {
    id: "reel-7",
    title: "INDH — Agriculture",
    videoUrl: "https://nq3v18uj8o.ufs.sh/f/ZvpqXEDI3YkpnhLsEKopqcN1OKD5JohWM0mbxAQU7CTdSPa3",
  },
  {
    id: "reel-8",
    title: "INDH — Élevage",
    videoUrl: "https://nq3v18uj8o.ufs.sh/f/ZvpqXEDI3YkpkDCCQF2gej36S4focRZ0FbEBhDGa1mYuts2r",
  },
];

function ReelModal({
  reel,
  onClose,
  onPrev,
  onNext,
  currentIdx,
  total,
  canPrev,
  canNext,
}: {
  reel: typeof reels[0];
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
  currentIdx: number;
  total: number;
  canPrev: boolean;
  canNext: boolean;
}) {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [onClose]);

  return createPortal(
    <div
      className="fixed inset-0 flex items-center justify-center"
      style={{ zIndex: 99999 }}
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-black" />

      <div
        className="relative z-10 w-full max-w-[380px] mx-4"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute -top-14 right-0 w-11 h-11 bg-white/10 border border-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition-all duration-200 hover:scale-110 hover:rotate-90"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="relative aspect-[9/16] rounded-2xl overflow-hidden bg-black shadow-2xl ring-1 ring-white/10">
          <video
            key={reel.id}
            autoPlay
            loop
            playsInline
            controls
            preload="metadata"
            className="w-full h-full object-contain bg-black"
          >
            <source src={reel.videoUrl} type="video/mp4" />
          </video>

          <div className="absolute bottom-0 left-0 right-0 p-5 bg-gradient-to-t from-black/90 to-transparent pointer-events-none">
            <h3 className="text-base font-bold text-white drop-shadow-lg">{reel.title}</h3>
            <p className="text-xs text-white/50 mt-1 flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-gradient-to-br from-[#E31B23] to-[#00A651]" />
              INDH TV
            </p>
          </div>
        </div>

        <div className="flex items-center justify-between mt-5">
          <button
            onClick={onPrev}
            className="w-11 h-11 bg-white/10 border border-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition-all duration-200 hover:scale-110 disabled:opacity-30"
            disabled={!canPrev}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <span className="text-xs text-white/40 font-semibold tracking-wider">{currentIdx + 1} / {total}</span>
          <button
            onClick={onNext}
            className="w-11 h-11 bg-white/10 border border-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition-all duration-200 hover:scale-110 disabled:opacity-30"
            disabled={!canNext}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
}

export default function Reels() {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalIndex, setModalIndex] = useState(0);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

  // Lazy-load: only play reels when they're visible in viewport
  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const video = entry.target as HTMLVideoElement;
          if (entry.isIntersecting) {
            video.play().catch(() => {});
          } else {
            video.pause();
          }
        });
      },
      { threshold: 0.3 }
    );

    videoRefs.current.forEach((video) => {
      if (video) observerRef.current?.observe(video);
    });

    return () => observerRef.current?.disconnect();
  }, []);

  const openModal = (index: number) => {
    setModalIndex(index);
    setModalOpen(true);
  };

  const closeModal = useCallback(() => {
    setModalOpen(false);
  }, []);

  return (
    <>
      <section id="reels" className="py-10 md:py-14">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-12">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-1 h-8 rounded-full bg-gradient-to-b from-[#E31B23] to-[#00A651]" />
            <h2 className="text-xl md:text-2xl font-bold text-white tracking-tight">Reels</h2>
            <div className="flex-1 h-px bg-gradient-to-r from-white/10 to-transparent" />
            <span className="text-xs text-[#a3a3a3] font-semibold uppercase tracking-widest bg-white/5 px-3 py-1 rounded-full border border-white/5">
              {reels.length} clips
            </span>
          </div>

          <div
            ref={containerRef}
            className="flex gap-5 overflow-x-auto scrollbar-hide pb-4 snap-x snap-mandatory"
          >
            {reels.map((reel, index) => (
              <div
                key={reel.id}
                className="snap-center shrink-0 cursor-pointer group"
                onClick={() => openModal(index)}
              >
                <div className="relative w-[180px] md:w-[220px] aspect-[9/16] rounded-2xl overflow-hidden bg-[#141414] border border-white/[0.06] transition-all duration-400 hover:scale-[1.04] hover:shadow-2xl hover:shadow-[#E31B23]/10 hover:border-[#E31B23]/30">
                  <video
                    ref={(el) => { videoRefs.current[index] = el; }}
                    muted
                    loop
                    playsInline
                    preload="metadata"
                    className="w-full h-full object-cover"
                  >
                    <source src={`${reel.videoUrl}#t=${index * 3}`} type="video/mp4" />
                  </video>

                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20" />

                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
                    <div className="w-14 h-14 bg-[#E31B23]/90 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/20 transition-transform group-hover:scale-110 glow-red">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white ml-0.5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                      </svg>
                    </div>
                  </div>

                  <div className="absolute top-3 left-3">
                    <div className="badge-red rounded-full px-2.5 py-1 flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 bg-[#a60000] rounded-full animate-pulse" />
                      <span className="text-[9px] font-bold uppercase tracking-wider ">Reel</span>
                    </div>
                  </div>

                  <div className="absolute bottom-4 left-3 right-3">
                    <h3 className="text-sm font-bold text-white leading-tight drop-shadow-lg">{reel.title}</h3>
                    <p className="text-[10px] text-white/50 font-medium mt-1.5 flex items-center gap-1">
                      <span className="w-2.5 h-2.5 rounded-full bg-gradient-to-br from-[#E31B23] to-[#00A651]" />
                      INDH TV
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {modalOpen && (
        <ReelModal
          reel={reels[modalIndex]}
          onClose={closeModal}
          onPrev={() => setModalIndex((prev) => prev - 1)}
          onNext={() => setModalIndex((prev) => prev + 1)}
          currentIdx={modalIndex}
          total={reels.length}
          canPrev={modalIndex > 0}
          canNext={modalIndex < reels.length - 1}
        />
      )}
    </>
  );
}
