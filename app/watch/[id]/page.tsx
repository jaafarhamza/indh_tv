"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { useRef, useEffect } from "react";
import { getVideoById, getRelatedVideos } from "../../data/videos";
import VideoCard from "../../components/VideoCard";
import Footer from "../../components/Footer";

export default function WatchPage() {
  const params = useParams();
  const id = params.id as string;
  const video = getVideoById(id);
  const relatedVideos = getRelatedVideos(id);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Try HLS adaptive streaming if available
  useEffect(() => {
    if (!video || !video.streamUrl || !videoRef.current) return;

    const videoEl = videoRef.current;

    // Check if browser supports HLS natively (Safari)
    if (videoEl.canPlayType("application/vnd.apple.mpegurl")) {
      videoEl.src = video.streamUrl;
    } else {
      // For Chrome/Firefox, try loading hls.js dynamically
      import("hls.js").then(({ default: Hls }) => {
        if (Hls.isSupported()) {
          const hls = new Hls({
            enableWorker: true,
            lowLatencyMode: true,
            startLevel: -1, // Auto quality selection
          });
          hls.loadSource(video.streamUrl!);
          hls.attachMedia(videoEl);
        } else {
          // Fallback to regular MP4
          videoEl.src = video.videoUrl;
        }
      }).catch(() => {
        // hls.js not installed, fallback to MP4
        videoEl.src = video.videoUrl;
      });
    }
  }, [video]);

  if (!video) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="w-20 h-20 mx-auto bg-[#E31B23]/10 rounded-full flex items-center justify-center mb-6">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-[#E31B23]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-white">Vidéo introuvable</h1>
          <p className="text-[#a3a3a3]">Cette vidéo n&apos;existe pas ou a été supprimée.</p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 bg-[#E31B23] hover:bg-[#ff2d35] text-white font-semibold px-6 py-3 rounded-xl transition-all duration-300 hover:scale-105 glow-red mt-4"
          >
            ← Retour à l&apos;accueil
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
      <main className="pt-20">
        {/* Player */}
        <div className="w-full bg-black">
          <div className="max-w-[1200px] mx-auto">
            <div className="relative aspect-video rounded-b-2xl overflow-hidden">
              <video
                ref={videoRef}
                controls
                autoPlay
                playsInline
                preload="metadata"
                className="w-full h-full object-contain bg-black"
                poster={video.thumbnail || undefined}
              >
                {/* Fallback source if HLS doesn't load */}
                <source src={video.videoUrl} type="video/mp4" />
                Votre navigateur ne supporte pas la lecture de vidéos.
              </video>
            </div>
          </div>
        </div>

        {/* Video Info */}
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="space-y-6">
            <div className="space-y-4">
              <h1 className="text-2xl md:text-3xl font-bold text-white">
                {video.title}
              </h1>
              <div className="flex items-center gap-3 flex-wrap">
                <span className="badge-red text-sm font-semibold px-4 py-1.5 rounded-full">
                  {video.category}
                </span>
                <span className="text-sm text-[#a3a3a3] flex items-center gap-1.5">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {video.duration}
                </span>
                <span className="text-sm text-[#a3a3a3]">•</span>
                <span className="text-sm text-[#a3a3a3]">{video.date}</span>
              </div>
            </div>

            <div className="glass rounded-xl p-6">
              <p className="text-[#a3a3a3] leading-relaxed">{video.description}</p>
            </div>

            <div className="flex items-center gap-3">
              <button className="inline-flex items-center gap-2 glass hover:bg-white/10 text-white text-sm font-medium px-5 py-3 rounded-xl transition-all duration-200 hover:scale-105">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                </svg>
                Partager
              </button>
              <button className="inline-flex items-center gap-2 glass hover:bg-[#E31B23]/20 text-white text-sm font-medium px-5 py-3 rounded-xl transition-all duration-200 hover:scale-105">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-[#E31B23]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
                J&apos;aime
              </button>
              <button className="inline-flex items-center gap-2 glass hover:bg-[#00A651]/20 text-white text-sm font-medium px-5 py-3 rounded-xl transition-all duration-200 hover:scale-105">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-[#00A651]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                </svg>
                Sauvegarder
              </button>
            </div>
          </div>

          {/* Related Videos */}
          <div className="mt-14 space-y-6">
            <div className="flex items-center gap-4">
              <div className="w-1 h-8 rounded-full bg-gradient-to-b from-[#E31B23] to-[#00A651]" />
              <h2 className="text-xl font-bold text-white">Vidéos similaires</h2>
              <div className="flex-1 h-px bg-gradient-to-r from-white/10 to-transparent" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
              {relatedVideos.map((v) => (
                <VideoCard key={v.id} video={v} />
              ))}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
