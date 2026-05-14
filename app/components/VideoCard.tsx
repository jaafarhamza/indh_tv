"use client";

import Link from "next/link";
import { Video } from "../data/videos";
import { useRef, useState } from "react";

interface VideoCardProps {
  video: Video;
}

export default function VideoCard({ video }: VideoCardProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  // Generate a unique time offset per video so each shows a different frame
  const getTimeOffset = () => {
    const num = parseInt(video.id) || 1;
    const offsets = [2, 5, 8, 12, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60, 10, 18, 22];
    return offsets[(num - 1) % offsets.length];
  };

  const timeOffset = getTimeOffset();

  const handleMouseEnter = () => {
    setIsHovered(true);
    // Only load and play video on hover (saves bandwidth)
    if (videoRef.current) {
      videoRef.current.play().catch(() => {});
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  };

  // Determine category badge class
  const getCategoryBadge = () => {
    switch (video.category) {
      case "Reportages": return "badge-red";
      case "Interviews": return "badge-green";
      default: return "badge-red";
    }
  };

  const hasThumbnail = video.thumbnail && !imageError;

  return (
    <Link href={`/watch/${video.id}`}>
      <div
        className="video-card relative rounded-xl overflow-hidden cursor-pointer group bg-[#141414] border border-white/[0.06] min-w-[220px] max-w-[240px] md:min-w-[240px] md:max-w-[260px]"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {/* Thumbnail / Video Preview */}
        <div className="relative aspect-video bg-[#141414]">
          {/* Static image thumbnail (super fast, tiny file) */}
          {hasThumbnail && (
            <img
              src={video.thumbnail}
              alt={video.title}
              className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ${
                isHovered ? "opacity-0" : "opacity-100"
              }`}
              loading="lazy"
              onError={() => setImageError(true)}
            />
          )}

          {/* Video loads metadata to show a frame as thumbnail */}
          <video
            ref={videoRef}
            muted
            loop
            playsInline
            preload="metadata"
            onLoadedData={() => {
              setIsLoaded(true);
              if (videoRef.current && !isHovered) {
                videoRef.current.currentTime = timeOffset;
              }
            }}
            className={`w-full h-full object-cover transition-opacity duration-300 ${
              isHovered || !hasThumbnail ? "opacity-100" : "opacity-0"
            }`}
          >
            <source src={`${video.videoUrl}#t=${timeOffset}`} type="video/mp4" />
          </video>

          {/* Shimmer when not loaded yet */}
          {!hasThumbnail && !isLoaded && !isHovered && (
            <div className="absolute inset-0 shimmer rounded" />
          )}

          {/* Play icon overlay */}
          <div
            className={`absolute inset-0 flex items-center justify-center transition-all duration-300 ${
              isHovered ? "opacity-100 scale-100" : "opacity-0 scale-90"
            }`}
          >
            <div className="w-11 h-11 bg-[#E31B23] rounded-full flex items-center justify-center shadow-lg glow-red">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 text-white ml-0.5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          </div>

          {/* Duration badge */}
          <div className="absolute bottom-2 right-2 bg-black/80 backdrop-blur-sm text-white text-[10px] font-bold px-2 py-0.5 rounded-md">
            {video.duration}
          </div>

          {/* Bottom gradient */}
          <div className="absolute bottom-0 left-0 right-0 h-14 bg-gradient-to-t from-[#141414] to-transparent" />
        </div>

        {/* Info */}
        <div className="p-3 space-y-2">
          <h3 className="text-xs font-bold text-white line-clamp-2 leading-tight group-hover:text-[#E31B23] transition-colors duration-200">
            {video.title}
          </h3>
          <div className="flex items-center gap-2">
            <span className={`text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${getCategoryBadge()}`}>
              {video.category}
            </span>
            <span className="text-[10px] text-[#a3a3a3]">{video.date}</span>
          </div>
        </div>

        {/* Hover border glow */}
        <div className={`absolute inset-0 rounded-xl border-2 transition-opacity duration-300 pointer-events-none ${
          isHovered ? "border-[#E31B23]/40 opacity-100" : "border-transparent opacity-0"
        }`} />
      </div>
    </Link>
  );
}
