"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  Play,
  Film,
  Camera,
  Maximize2,
  X,
  Volume2,
  VolumeX,
  Sliders,
  Sparkles,
} from "lucide-react";
import { SHOWCASE_MEDIA_DATA } from "@/lib/data";
import { ShowcaseMediaItem } from "@/types";
import { EditorialStar, CornerOrnament } from "./BotanicalDecorations";

export default function CreativeStudio() {
  const [activeMedia, setActiveMedia] = useState<ShowcaseMediaItem>(SHOWCASE_MEDIA_DATA[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [videoModalOpen, setVideoModalOpen] = useState(false);

  return (
    <section
      id="studio"
      className="relative pt-6 pb-0 bg-white overflow-hidden scroll-mt-20 md:scroll-mt-24"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-5 md:mb-7 gap-4">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F5EBDD] border border-[#722F37]/25 text-[#722F37]">
              <EditorialStar size={12} color="#722F37" />
              <span className="text-[10px] md:text-xs font-editorial-sans tracking-[0.2em] uppercase font-bold">
                CINEMA & PRODUCTION ATELIER
              </span>
            </div>

            <h2 className="font-editorial-serif text-3xl sm:text-4xl md:text-5xl text-[#342A29] leading-[1.05] tracking-tight">
              WE CAPTURE. WE CREATE. <br />
              <span className="italic font-serif text-[#722F37] font-semibold">WE TELL STORIES.</span>
            </h2>

            <p className="font-editorial-sans text-sm sm:text-base text-[#342A29]/80 leading-relaxed font-normal">
              Commercial films, macro product cinematography, and documentary-grade storytelling
              engineered to command attention and evoke deep emotional resonance.
            </p>
          </div>

          <div className="text-right hidden md:block">
            <span className="text-xs font-editorial-sans tracking-[0.25em] text-[#722F37] uppercase font-bold block">
              STUDIO SUITE
            </span>
            <span className="text-xs font-editorial-sans text-[#342A29]/60">
              COMMERCIAL PHOTOGRAPHY & 4K CINEMA
            </span>
          </div>
        </div>

        {/* Hero Cinematic Screen Display */}
        <div className="relative w-full rounded-3xl overflow-hidden bg-[#342A29] border border-[#722F37]/30 shadow-2xl group">
          <div className="relative h-[280px] sm:h-[360px] md:h-[440px] lg:h-[480px] w-full overflow-hidden">
            <Image
              src={activeMedia.thumbnail}
              alt={activeMedia.title}
              fill
              unoptimized
              priority
              sizes="(max-width: 1200px) 100vw, 1200px"
              className="object-cover transition-transform duration-1000 ease-out group-hover:scale-102 filter brightness-90 group-hover:brightness-95"
            />

            {/* Cinematic Gradient Vignette */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#342A29] via-transparent to-[#342A29]/40" />

            {/* Corner Markers */}
            <CornerOrnament className="absolute top-6 left-6 opacity-60 text-[#E8DCC6]" color="#E8DCC6" />
            <CornerOrnament
              position="top-right"
              className="absolute top-6 right-6 opacity-60 text-[#E8DCC6]"
              color="#E8DCC6"
            />

            {/* Top Badges */}
            <div className="absolute top-6 left-12 right-12 flex items-center justify-between z-10 text-white">
              <div className="flex items-center gap-3">
                <span className="px-3.5 py-1.5 rounded-full bg-[#342A29]/80 backdrop-blur-md border border-[#E8DCC6]/20 text-[10px] sm:text-xs font-editorial-sans tracking-widest uppercase font-semibold text-[#E8DCC6]">
                  {activeMedia.category}
                </span>
                <span className="hidden sm:inline-block px-3 py-1 rounded-full bg-[#722F37]/80 backdrop-blur-md text-[10px] font-editorial-sans tracking-widest uppercase font-bold text-[#E8DCC6]">
                  {activeMedia.resolution}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-xs font-editorial-sans tracking-widest uppercase text-[#E8DCC6]/80 hidden sm:inline">
                  {activeMedia.duration}
                </span>
              </div>
            </div>

            {/* Central Play Trigger Button */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
              <button
                onClick={() => setVideoModalOpen(true)}
                className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-[#E8DCC6]/90 backdrop-blur-md text-[#722F37] flex items-center justify-center hover:bg-[#722F37] hover:text-[#E8DCC6] transition-all duration-300 transform hover:scale-110 shadow-2xl focus:outline-none group/play"
                aria-label="Play commercial film showcase"
              >
                <Play className="w-8 h-8 sm:w-10 sm:h-10 ml-1 fill-current transition-transform group-hover/play:scale-105" />
              </button>
            </div>

            {/* Bottom Caption Inside Cinematic Screen */}
            <div className="absolute bottom-6 left-6 right-6 sm:bottom-10 sm:left-12 sm:right-12 z-10 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
              <div className="space-y-2 max-w-xl">
                <span className="text-[10px] font-editorial-sans tracking-[0.25em] text-[#E8DCC6]/70 uppercase font-semibold block">
                  SHOWCASE REEL // ANRIKA STUDIO
                </span>
                <h3 className="font-editorial-serif text-2xl sm:text-4xl text-[#F5EBDD] font-normal leading-tight">
                  {activeMedia.title}
                </h3>
                <p className="font-editorial-sans text-xs sm:text-sm text-[#E8DCC6]/85 line-clamp-2">
                  {activeMedia.description}
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                {activeMedia.tags.map((tag, idx) => (
                  <span
                    key={idx}
                    className="px-2.5 py-1 rounded-md bg-[#E8DCC6]/15 backdrop-blur-md text-[10px] font-editorial-sans tracking-wider text-[#E8DCC6]"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Thumbnail Selector Strip (4 Reels) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mt-4 md:mt-5">
          {SHOWCASE_MEDIA_DATA.map((item) => {
            const isSelected = activeMedia.id === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveMedia(item)}
                className={`text-left p-3 rounded-2xl transition-all duration-300 border flex items-center gap-3.5 focus:outline-none ${
                  isSelected
                    ? "bg-[#F5EBDD] border-[#722F37] shadow-md -translate-y-1"
                    : "bg-[#F5EBDD]/60 border-[#722F37]/15 hover:bg-[#F5EBDD] hover:border-[#722F37]/30"
                }`}
              >
                <div className="relative w-16 h-16 rounded-xl overflow-hidden shrink-0 border border-[#722F37]/20">
                  <Image
                    src={item.thumbnail}
                    alt={item.title}
                    fill
                    unoptimized
                    sizes="64px"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-[#342A29]/20 flex items-center justify-center">
                    <Play className="w-4 h-4 text-white fill-white" />
                  </div>
                </div>

                <div className="overflow-hidden">
                  <span className="text-[9px] font-editorial-sans tracking-widest text-[#722F37] uppercase font-bold block truncate">
                    {item.category} • {item.duration}
                  </span>
                  <h4 className="font-editorial-serif text-sm sm:text-base text-[#342A29] font-medium truncate mt-0.5">
                    {item.title}
                  </h4>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Bottom Shape Divider: Smooth Curve into WhyChooseUs (#E8DCC6) */}
      <div className="w-full overflow-hidden leading-none bg-white mt-10 md:mt-14 -mb-[1px]">
        <svg
          viewBox="0 0 1200 80"
          preserveAspectRatio="none"
          className="relative block w-full h-8 sm:h-12 md:h-16"
        >
          <path
            d="M0,0 C300,70 900,70 1200,0 L1200,80 L0,80 Z"
            fill="#E8DCC6"
          />
        </svg>
      </div>

      {/* Cinematic Modal Player Simulation */}
      <AnimatePresence>
        {videoModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setVideoModalOpen(false)}
              className="absolute inset-0 bg-[#342A29]/90 backdrop-blur-md"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-5xl bg-[#1D1615] rounded-3xl border border-[#722F37]/40 shadow-2xl overflow-hidden z-10 text-white flex flex-col"
            >
              {/* Player Topbar */}
              <div className="p-4 sm:px-6 bg-[#271E1C] border-b border-[#722F37]/25 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Film className="w-5 h-5 text-[#C5A059]" />
                  <span className="text-xs font-editorial-sans tracking-widest uppercase font-semibold text-[#E8DCC6]">
                    {activeMedia.title} — 4K CINEMA PREVIEW
                  </span>
                </div>
                <button
                  onClick={() => setVideoModalOpen(false)}
                  className="p-1.5 rounded-full hover:bg-white/10 text-white transition-colors focus:outline-none"
                  aria-label="Close cinema modal"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Player Main Screen */}
              <div className="relative w-full h-[320px] sm:h-[460px] md:h-[540px] bg-black overflow-hidden flex items-center justify-center">
                <Image
                  src={activeMedia.thumbnail}
                  alt={activeMedia.title}
                  fill
                  className="object-cover opacity-80"
                />

                {/* Simulated Audio/Visualizer Wave */}
                <div className="absolute inset-x-8 bottom-16 flex items-end justify-center gap-1.5 h-16 pointer-events-none">
                  {[40, 65, 85, 30, 95, 70, 50, 90, 45, 60, 75, 100, 55, 35, 80, 45].map(
                    (height, i) => (
                      <motion.div
                        key={i}
                        animate={{ height: [`${height * 0.4}%`, `${height}%`, `${height * 0.3}%`] }}
                        transition={{
                          duration: 1.2,
                          repeat: Infinity,
                          repeatType: "mirror",
                          delay: i * 0.08,
                        }}
                        className="w-1.5 rounded-full bg-[#E8DCC6]/60"
                      />
                    )
                  )}
                </div>

                {/* Center Badge */}
                <div className="relative z-10 text-center p-6 bg-[#342A29]/80 backdrop-blur-md rounded-2xl border border-[#722F37]/30 max-w-md">
                  <span className="text-[10px] font-editorial-sans tracking-[0.25em] text-[#C5A059] uppercase font-bold block mb-1">
                    ANRIKA DIGITAL CINEMA MASTER
                  </span>
                  <h4 className="font-editorial-serif text-xl sm:text-2xl text-[#E8DCC6]">
                    {activeMedia.title}
                  </h4>
                  <p className="text-xs font-editorial-sans text-[#B7A89A] mt-2">
                    Commercial film pipeline featuring RAW color grading, Dolby sound design, and
                    macro optics. High-resolution company master ready for deployment.
                  </p>
                </div>
              </div>

              {/* Player Bottom Control Bar */}
              <div className="p-4 sm:px-6 bg-[#271E1C] border-t border-[#722F37]/25 flex items-center justify-between text-xs font-editorial-sans text-[#E8DCC6]">
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => setIsPlaying(!isPlaying)}
                    className="p-2 rounded-full bg-[#722F37] text-[#E8DCC6] hover:bg-[#581e25] transition-colors"
                  >
                    <Play className="w-4 h-4 fill-current" />
                  </button>
                  <button
                    onClick={() => setIsMuted(!isMuted)}
                    className="p-2 rounded-full hover:bg-white/10 text-[#E8DCC6] transition-colors"
                  >
                    {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                  </button>
                  <span>00:14 / {activeMedia.duration}</span>
                </div>

                <div className="text-right">
                  <span className="text-[10px] tracking-widest text-[#B7A89A] uppercase">
                    Format: {activeMedia.resolution}
                  </span>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
