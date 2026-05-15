"use client";

import Hero from "./components/Hero";
import VideoRow from "./components/VideoRow";
import VideoCard from "./components/VideoCard";
import Reels from "./components/Reels";
import Podcast from "./components/Podcast";
import Footer from "./components/Footer";
import { getVideosByCategory } from "./data/videos";

export default function Home() {
  const reportages = getVideosByCategory("Reportages");
  const interviews = getVideosByCategory("Interviews");
  const categories = getVideosByCategory("Catégories");
  const allVideos = getVideosByCategory("Tous");

  return (
    <>
      {/* Hero Section */}
      <Hero />

      {/* Content */}
      <div className="-mt-20 relative z-10">

        {/* Reels */}
        <Reels />

        {/* Divider */}
        <div className="section-divider max-w-[1400px] mx-auto" />

        {/* Podcast */}
        <Podcast />

        {/* Divider */}
        <div className="section-divider max-w-[1400px] mx-auto" />

        {/* Reportages */}
        <VideoRow id="reportages" title="Reportages" videos={reportages} />

        {/* Divider */}
        <div className="section-divider max-w-[1400px] mx-auto" />

        {/* Interviews */}
        <VideoRow id="interviews" title="Interviews" videos={interviews} />

        {/* Divider */}
        <div className="section-divider max-w-[1400px] mx-auto" />

        {/* Catégories */}
        <VideoRow id="categories" title="Catégories Thématiques" videos={categories} />

        {/* All Videos Grid */}
        <section className="py-12">
          <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-12">
            {/* Section Header */}
            <div className="flex items-center gap-4 mb-8">
              <div className="w-1 h-8 rounded-full bg-gradient-to-b from-[#E31B23] to-[#00A651]" />
              <h2 className="text-xl md:text-2xl font-bold text-white tracking-tight">
                Toutes les vidéos
              </h2>
              <div className="flex-1 h-px bg-gradient-to-r from-white/10 to-transparent" />
              <span className="text-xs text-[#a3a3a3] font-semibold uppercase tracking-widest bg-white/5 px-3 py-1 rounded-full border border-white/5">
                {allVideos.length} vidéos
              </span>
            </div>

            {/* Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {allVideos.map((video) => (
                <div key={video.id} className="fade-in-scale">
                  <VideoCard video={video} index={index} />
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>

      {/* Footer */}
      <Footer />
    </>
  );
}
