"use client";

import { useRef } from "react";
import { Video } from "../data/videos";
import VideoCard from "./VideoCard";

interface VideoRowProps {
  title: string;
  videos: Video[];
  id?: string;
}

export default function VideoRow({ title, videos, id }: VideoRowProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = 280;
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  if (videos.length === 0) return null;

  return (
    <section id={id} className="relative py-8 md:py-12">
      {/* Section Title */}
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-12 mb-6">
        <div className="flex items-center gap-4">
          {/* Gradient accent bar (Red to Green) */}
          <div className="w-1 h-8 rounded-full bg-gradient-to-b from-[#E31B23] to-[#00A651]" />
          <h2 className="text-xl md:text-2xl font-bold text-white tracking-tight">
            {title}
          </h2>
          <div className="flex-1 h-px bg-gradient-to-r from-white/10 to-transparent" />
          <span className="text-xs text-[#a3a3a3] font-semibold uppercase tracking-widest bg-white/5 px-3 py-1 rounded-full border border-white/5">
            {videos.length} vidéo{videos.length > 1 ? "s" : ""}
          </span>
        </div>
      </div>

      {/* Scrollable Row */}
      <div className="relative group">
        {/* Left Arrow */}
        <button
          onClick={() => scroll("left")}
          className="absolute left-2 top-1/2 -translate-y-1/2 z-20 w-10 h-10 glass hover:bg-white/15 rounded-full flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2.5}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        {/* Cards Container */}
        <div
          ref={scrollRef}
          className="flex gap-4 overflow-x-auto scrollbar-hide px-4 sm:px-6 lg:px-12 pb-4"
        >
          {videos.map((video, index) => (
            <VideoCard key={video.id} video={video} index={index} />
          ))}
        </div>

        {/* Right Arrow */}
        <button
          onClick={() => scroll("right")}
          className="absolute right-2 top-1/2 -translate-y-1/2 z-20 w-10 h-10 glass hover:bg-white/15 rounded-full flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2.5}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </button>

        {/* Edge fade effects */}
        <div className="absolute top-0 left-0 bottom-0 w-12 bg-gradient-to-r from-[#0a0a0a] to-transparent pointer-events-none z-10" />
        <div className="absolute top-0 right-0 bottom-0 w-12 bg-gradient-to-l from-[#0a0a0a] to-transparent pointer-events-none z-10" />
      </div>
    </section>
  );
}
