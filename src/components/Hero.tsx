"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import { ArrowUpRight, Sparkles, ChevronDown, Compass, Award } from "lucide-react";

const HeroScene = dynamic(() => import("./HeroScene"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full min-h-[460px] flex flex-col items-center justify-center p-8 text-center bg-[#F5EBDD]/40 rounded-3xl border border-[#722F37]/15">
      <div className="w-14 h-14 rounded-full border-2 border-[#722F37] border-t-transparent animate-spin mb-4" />
      <span className="text-xs font-editorial-sans tracking-[0.2em] text-[#722F37] uppercase font-bold">
        Staging 3D Creative Scene...
      </span>
      <span className="text-[11px] font-editorial-sans text-[#342A29]/60 mt-1">
        Bespoke Web Flagship • Meta Advertising • Studio Cinema
      </span>
    </div>
  ),
});
import {
  BotanicalBranch,
  EditorialStamp,
  EditorialStar,
  HandDrawnFlourish,
  CornerOrnament,
} from "./BotanicalDecorations";

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen pt-32 pb-20 md:pt-36 md:pb-28 overflow-hidden bg-[#E8DCC6] flex flex-col justify-between"
    >
      {/* Background Subtle Botanical & Grid Details */}
      <div className="absolute top-16 left-0 w-64 h-96 pointer-events-none opacity-40 hidden md:block">
        <BotanicalBranch />
      </div>
      <div className="absolute top-24 right-0 w-72 h-[450px] pointer-events-none opacity-30 hidden lg:block">
        <BotanicalBranch flip />
      </div>

      {/* Decorative Corner Ornaments */}
      <CornerOrnament className="absolute top-28 left-6 md:left-12 opacity-60 hidden sm:block" />
      <CornerOrnament
        position="top-right"
        className="absolute top-28 right-6 md:right-12 opacity-60 hidden sm:block"
      />

      {/* Editorial Frame Border Guides */}
      <div className="absolute inset-x-6 md:inset-x-12 top-28 h-px bg-[#722F37]/10" />

      {/* Main Content Container */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 w-full my-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Artistic Typography & Narrative (5 cols on lg) */}
          <div className="lg:col-span-6 xl:col-span-5 space-y-6 md:space-y-8 text-left">
            {/* Small Label */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-[#F5EBDD] border border-[#722F37]/25 text-[#722F37] shadow-sm"
            >
              <EditorialStar size={12} color="#722F37" />
              <span className="text-[10px] md:text-xs font-editorial-sans tracking-[0.22em] uppercase font-bold">
                EST. 2026 — DIGITAL CREATIVE STUDIO
              </span>
            </motion.div>

            {/* Main Headline */}
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="space-y-1 relative"
            >
              <h1 className="font-editorial-serif text-5xl sm:text-6xl md:text-7xl lg:text-[76px] xl:text-[84px] leading-[0.94] tracking-[-0.02em] text-[#342A29]">
                <span className="block font-normal">WE CREATE</span>
                <span className="block italic font-serif text-[#722F37] font-semibold tracking-[-0.01em]">
                  DIGITAL
                </span>
                <span className="block font-normal">EXPERIENCES.</span>
              </h1>

              {/* Hand-drawn underline under the italic emphasis */}
              <div className="w-56 sm:w-72 pt-1">
                <HandDrawnFlourish color="#722F37" className="w-full h-auto opacity-75" />
              </div>
            </motion.div>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="font-editorial-sans text-base sm:text-lg text-[#342A29]/80 leading-relaxed max-w-xl font-normal"
            >
              We transform creative ideas into powerful digital experiences. From websites and
              advertising to photography and brand storytelling, we help businesses grow in the
              digital world.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="flex flex-wrap items-center gap-4 pt-2"
            >
              <Link
                href="#services"
                className="btn-editorial-primary px-8 py-3.5 rounded-full text-xs font-editorial-sans tracking-[0.2em] uppercase font-semibold inline-flex items-center gap-2 group shadow-md"
              >
                <span>Explore Our Services</span>
                <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>

              <Link
                href="#contact"
                className="btn-editorial-secondary px-8 py-3.5 rounded-full text-xs font-editorial-sans tracking-[0.2em] uppercase font-semibold inline-flex items-center gap-2"
              >
                <span>Let&apos;s Work Together</span>
              </Link>
            </motion.div>

            {/* Editorial Mini Credibility Marks */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.45 }}
              className="pt-6 border-t border-[#722F37]/15 grid grid-cols-3 gap-4"
            >
              <div>
                <span className="block font-editorial-display text-xl sm:text-2xl font-bold text-[#722F37]">
                  2026
                </span>
                <span className="text-[10px] sm:text-xs font-editorial-sans text-[#342A29]/70 uppercase tracking-wider">
                  Origin & Vision
                </span>
              </div>
              <div>
                <span className="block font-editorial-display text-xl sm:text-2xl font-bold text-[#722F37]">
                  360°
                </span>
                <span className="text-[10px] sm:text-xs font-editorial-sans text-[#342A29]/70 uppercase tracking-wider">
                  Full Spectrum
                </span>
              </div>
              <div>
                <span className="block font-editorial-display text-xl sm:text-2xl font-bold text-[#722F37]">
                  4K / 3D
                </span>
                <span className="text-[10px] sm:text-xs font-editorial-sans text-[#342A29]/70 uppercase tracking-wider">
                  Cinema & WebGL
                </span>
              </div>
            </motion.div>
          </div>

          {/* Right Column: 3D Centerpiece Composition & Editorial Stamps (7 cols on lg) */}
          <div className="lg:col-span-6 xl:col-span-7 relative flex items-center justify-center">
            {/* Stamp Badge floating on the top-right corner */}
            <div className="absolute -top-10 -right-2 md:top-2 md:right-4 z-20">
              <EditorialStamp size={130} />
            </div>

            {/* Floating Tag Annotations */}
            <div className="absolute top-1/4 -left-4 z-20 hidden md:block">
              <motion.div
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="px-3.5 py-1.5 rounded-lg bg-[#F5EBDD]/90 backdrop-blur-md border border-[#722F37]/20 shadow-md text-left"
              >
                <div className="flex items-center gap-1.5 text-[10px] text-[#722F37] font-bold tracking-widest uppercase">
                  <Compass className="w-3 h-3" />
                  <span>CRAFTED IN 2026</span>
                </div>
                <p className="text-[11px] text-[#342A29]/80 font-medium">Bespoke Flagship Code</p>
              </motion.div>
            </div>

            <div className="absolute bottom-16 -right-2 z-20 hidden md:block">
              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="px-3.5 py-1.5 rounded-lg bg-[#F5EBDD]/90 backdrop-blur-md border border-[#722F37]/20 shadow-md text-left"
              >
                <div className="flex items-center gap-1.5 text-[10px] text-[#722F37] font-bold tracking-widest uppercase">
                  <Award className="w-3 h-3" />
                  <span>META PARTNER READY</span>
                </div>
                <p className="text-[11px] text-[#342A29]/80 font-medium">Performance Creative Suite</p>
              </motion.div>
            </div>

            {/* 3D Canvas Container */}
            <div className="w-full h-[460px] sm:h-[540px] md:h-[620px] lg:h-[680px] relative rounded-3xl overflow-hidden">
              <HeroScene />
            </div>
          </div>
        </div>
      </div>

      {/* Hero Bottom Bar / Scroll Cue */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 w-full pt-8 relative z-10 flex items-center justify-between border-t border-[#722F37]/15 text-xs font-editorial-sans text-[#342A29]/70">
        <div className="flex items-center gap-3">
          <span className="w-2 h-2 rounded-full bg-[#722F37]" />
          <span className="tracking-[0.18em] uppercase font-medium">
            ANRIKA DIGITAL INNOVATION — EST. 2026
          </span>
        </div>

        <Link
          href="#about"
          className="flex items-center gap-1.5 hover:text-[#722F37] transition-colors group cursor-pointer"
        >
          <span className="tracking-widest uppercase font-medium text-[11px]">Explore Below</span>
          <ChevronDown className="w-4 h-4 transition-transform group-hover:translate-y-1 text-[#722F37]" />
        </Link>
      </div>
    </section>
  );
}
