"use client";

import Link from "next/link";
import { Video } from "../data/videos";
import { useRef, useState, useEffect } from "react";

interface VideoCardProps {
  video: Video;
  index?: number; // position in the list for staggered loading
}

export default function VideoCard({ video, index = 0 }: VideoCardProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [thumbnailReady, setThumbnailReady] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  // Small time offset per video (1-4 seconds - safe range)
  const timeOffset = ((parseInt(video.id) || 1) % 4) + 1;

  // Lazy load: only start when visible
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1, rootMargin: "200px" }
    );
    if (cardRef.current) observer.observe(cardRef.current);
    return () => observer.disconnect();
  }, []);

  // Staggered load: capture a frame into canvas then remove video src
  useEffect(() => {
    if (!isVisible) return;

    // Stagger by 300ms per card to avoid saturating connections
    const delay = index * 300;
    const timer = setTimeout(() => {
      if (videoRef.current) {
        videoRef.current.src = `${video.videoUrl}#t=${timeOffset}`;
        videoRef.current.load();
      }
    }, delay);

    return () => clearTimeout(timer);
  }, [isVisible]);

  // When video loads enough data, capture frame to canvas and free the connection
  const handleSeeked = () => {
    if (videoRef.current && canvasRef.current) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");
      if (ctx) {
        canvas.width = videoRef.current.videoWidth || 480;
        canvas.height = videoRef.current.videoHeight || 270;
        ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
        setThumbnailReady(true);
        // Free the video connection
        videoRef.current.removeAttribute("src");
        videoRef.current.load();
      }
    }
  };

  const handleLoadedData = () => {
    if (videoRef.current) {
      videoRef.current.currentTime = timeOffset;
    }
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
    if (videoRef.current) {
      videoRef.current.src = video.videoUrl;
      videoRef.current.currentTime = 0;
      videoRef.current.play().catch(() => {});
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.removeAttribute("src");
      videoRef.current.load();
    }
  };

  const getCategoryBadge = () => {
    switch (video.category) {
      case "Reportages": return "badge-red";
      case "Interviews": return "badge-green";
      default: return "badge-red";
    }
  };

  return (
    <Link href={`/watch/${video.id}`}>
      <div
        ref={cardRef}
        className="video-card relative rounded-xl overflow-hidden cursor-pointer group bg-[#141414] border border-white/[0.06] min-w-[220px] max-w-[240px] md:min-w-[240px] md:max-w-[260px]"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div className="relative aspect-video bg-[#141414]">
          {/* Canvas thumbnail (captured frame - instant, no network) */}
          <canvas
            ref={canvasRef}
            className={`absolute inset-0 w-full h-full object-cover ${
              thumbnailReady && !isHovered ? "opacity-100" : "opacity-0"
            }`}
          />

          {/* Hidden video for frame capture + hover playback */}
          <video
            ref={videoRef}
            muted
            loop
            playsInline
            preload="none"
            onLoadedData={handleLoadedData}
            onSeeked={handleSeeked}
            className={`w-full h-full object-cover ${
              isHovered ? "opacity-100" : "opacity-0"
            }`}
          />

          {/* Shimmer while loading */}
          {!thumbnailReady && !isHovered && (
            <div className="absolute inset-0 shimmer rounded" />
          )}

          {/* Play icon overlay on hover */}
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
