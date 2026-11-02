"use client";

import React, { useRef, useState, useLayoutEffect, useEffect } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight, ChevronDown, Sparkles, Compass, Film, Award, CheckCircle2 } from "lucide-react";
import {
  BotanicalBranch,
  EditorialStamp,
  EditorialStar,
  HandDrawnFlourish,
  CornerOrnament,
} from "../BotanicalDecorations";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const ScrollScene = dynamic(() => import("./ScrollScene"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full min-h-screen flex items-center justify-center bg-[#E8DCC6]">
      <div className="w-12 h-12 rounded-full border-2 border-[#722F37] border-t-transparent animate-spin" />
    </div>
  ),
});

const CHAPTERS = [
  { id: 1, number: "01", label: "Creative Intro", short: "Intro" },
  { id: 2, number: "02", label: "Web Architecture", short: "Web" },
  { id: 3, number: "03", label: "Meta Performance", short: "Meta" },
  { id: 4, number: "04", label: "Cinema & Media", short: "Cinema" },
  { id: 5, number: "05", label: "Creative Ads", short: "Ads" },
  { id: 6, number: "06", label: "Elevation", short: "Growth" },
];

export default function CinematicHero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const pinnedRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeChapter, setActiveChapter] = useState(0);

  // Unified Scroll & GSAP ScrollTrigger Controller
  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const total = containerRef.current.offsetHeight - window.innerHeight;
      if (total <= 0) return;
      const p = Math.max(0, Math.min(1, -rect.top / total));
      setScrollProgress(p);
      setActiveChapter(Math.min(5, Math.floor(p * 6)));
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll, { passive: true });
    handleScroll();

    let ctx: gsap.Context | null = null;
    if (typeof window !== "undefined") {
      ctx = gsap.context(() => {
        ScrollTrigger.create({
          trigger: containerRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.5,
          onUpdate: (self) => {
            setScrollProgress(self.progress);
            setActiveChapter(Math.min(5, Math.floor(self.progress * 6)));
          },
        });
      }, containerRef);
    }

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
      if (ctx) ctx.revert();
    };
  }, []);

  // Calculate clean opacity and transform for each of the 6 scenes
  const getSceneStyle = (index: number) => {
    let opacity = 0;
    let translateY = 0;

    // Define generous active brackets for each scene
    const ranges = [
      { start: 0.0, peak: 0.05, end: 0.17 },   // Scene 1: Creative Beginning
      { start: 0.15, peak: 0.25, end: 0.34 },  // Scene 2: Website Development
      { start: 0.32, peak: 0.42, end: 0.51 },  // Scene 3: Meta Advertising
      { start: 0.49, peak: 0.59, end: 0.68 },  // Scene 4: Photography & Videography
      { start: 0.66, peak: 0.76, end: 0.85 },  // Scene 5: Creative Advertising
      { start: 0.83, peak: 0.94, end: 1.0 },   // Scene 6: Digital Growth & Elevation
    ];

    const r = ranges[index];
    if (scrollProgress >= r.start && scrollProgress <= r.end) {
      if (scrollProgress < r.peak) {
        opacity = (scrollProgress - r.start) / (r.peak - r.start);
        translateY = (1 - opacity) * 30;
      } else {
        opacity = 1 - (scrollProgress - r.peak) / (r.end - r.peak);
        translateY = (1 - opacity) * -30;
      }
    }

    // Edge case for initial view at scroll = 0
    if (index === 0 && scrollProgress < 0.1) {
      opacity = 1;
      translateY = 0;
    }

    // Edge case for final elevation view at end
    if (index === 5 && scrollProgress > 0.92) {
      opacity = 1;
      translateY = 0;
    }

    const clampedOpacity = Math.max(0, Math.min(1, opacity));

    return {
      opacity: clampedOpacity,
      transform: `translateY(${translateY}px)`,
      pointerEvents: clampedOpacity > 0.4 ? ("auto" as const) : ("none" as const),
      visibility: clampedOpacity > 0.02 ? ("visible" as const) : ("hidden" as const),
    };
  };

  return (
    <section ref={containerRef} className="relative bg-[#E8DCC6] h-[600vh]">
      {/* Sticky Pinned Screen (100vh) */}
      <div
        ref={pinnedRef}
        className="sticky top-0 h-screen w-full overflow-hidden flex flex-col justify-between"
      >
        {/* Background 3D WebGL Canvas */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <ScrollScene progress={scrollProgress} />
        </div>

        {/* Subtle Botanical Accents */}
        <div className="absolute top-16 left-0 w-64 h-96 pointer-events-none opacity-30 hidden md:block z-0">
          <BotanicalBranch />
        </div>
        <div className="absolute top-24 right-0 w-72 h-[450px] pointer-events-none opacity-25 hidden lg:block z-0">
          <BotanicalBranch flip />
        </div>

        {/* Editorial Border Frames */}
        <CornerOrnament className="absolute top-24 left-6 md:left-12 opacity-50 hidden sm:block z-20" />
        <CornerOrnament
          position="top-right"
          className="absolute top-24 right-6 md:right-12 opacity-50 hidden sm:block z-20"
        />
        <div className="absolute inset-x-6 md:inset-x-12 top-24 h-px bg-[#722F37]/10 z-20" />

        {/* Top Floating Stamp Badge */}
        <div className="absolute top-28 right-6 md:right-16 z-20 pointer-events-none">
          <EditorialStamp size={115} />
        </div>

        {/* Right Side Vertical Filmstrip / Chapter Timeline */}
        <div className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-30 hidden md:flex flex-col items-end space-y-3">
          <div className="text-[9px] font-editorial-sans tracking-[0.25em] text-[#722F37]/80 uppercase font-bold pr-1">
            CHAPTER // 0{activeChapter + 1}
          </div>

          <div className="flex flex-col space-y-2 border-r-2 border-[#722F37]/15 pr-3">
            {CHAPTERS.map((chap, idx) => {
              const isActive = activeChapter === idx;
              return (
                <div
                  key={chap.id}
                  className={`flex items-center gap-2 text-right transition-all duration-300 ${
                    isActive ? "translate-x-0 opacity-100" : "translate-x-1 opacity-40 hover:opacity-75"
                  }`}
                >
                  <span
                    className={`text-[10px] font-editorial-sans tracking-widest uppercase font-semibold ${
                      isActive ? "text-[#722F37]" : "text-[#342A29]"
                    }`}
                  >
                    {chap.short}
                  </span>
                  <div
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      isActive
                        ? "bg-[#722F37] scale-125 shadow-sm shadow-[#722F37]"
                        : "bg-[#722F37]/30"
                    }`}
                  />
                </div>
              );
            })}
          </div>

          {/* Micro Scroll Progress Bar */}
          <div className="w-20 h-1 rounded-full bg-[#722F37]/15 overflow-hidden mt-1">
            <div
              className="h-full bg-[#722F37] transition-all duration-100"
              style={{ width: `${Math.round(scrollProgress * 100)}%` }}
            />
          </div>
        </div>

        {/* ======================================================== */}
        {/* SYNCHRONIZED SCENE TEXT OVERLAYS (6 SCENES) */}
        {/* ======================================================== */}
        <div className="relative z-20 max-w-7xl mx-auto px-6 md:px-12 w-full my-auto pointer-events-none pt-24 pb-12">
          {/* SCENE 01: CREATIVE BEGINNING */}
          <div
            style={getSceneStyle(0)}
            className="transition-opacity duration-300 max-w-xl text-left space-y-6"
          >
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#F5EBDD] border border-[#722F37]/25 text-[#722F37] shadow-sm pointer-events-auto">
              <EditorialStar size={12} color="#722F37" />
              <span className="text-[10px] md:text-xs font-editorial-sans tracking-[0.22em] uppercase font-bold">
                ANRIKA DIGITAL INNOVATION — EST. 2026
              </span>
            </div>

            <div className="space-y-1">
              <h1 className="font-editorial-serif text-5xl sm:text-6xl md:text-7xl lg:text-[80px] leading-[0.94] tracking-tight text-[#342A29]">
                <span className="block font-normal">WE CREATE</span>
                <span className="block italic font-serif text-[#722F37] font-semibold">DIGITAL</span>
                <span className="block font-normal">EXPERIENCES.</span>
              </h1>
              <div className="w-56 sm:w-72 pt-1">
                <HandDrawnFlourish color="#722F37" className="w-full h-auto opacity-75" />
              </div>
            </div>

            <p className="font-editorial-sans text-base sm:text-lg text-[#342A29]/80 leading-relaxed font-normal">
              We transform ideas into digital experiences through technology, creativity and strategic
              marketing.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2 pointer-events-auto">
              <Link
                href="#services"
                className="btn-editorial-primary px-7 py-3 rounded-full text-xs font-editorial-sans tracking-[0.2em] uppercase font-semibold inline-flex items-center gap-2 group shadow-md"
              >
                <span>Explore Our World</span>
                <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>

              <Link
                href="#contact"
                className="btn-editorial-secondary px-7 py-3 rounded-full text-xs font-editorial-sans tracking-[0.2em] uppercase font-semibold inline-flex items-center gap-2"
              >
                <span>Start A Project</span>
              </Link>
            </div>

            <div className="pt-4 border-t border-[#722F37]/15 flex items-center gap-8 text-[#342A29]/75 text-xs font-editorial-sans">
              <div>
                <span className="font-editorial-display text-lg font-bold text-[#722F37] block">
                  2026
                </span>
                <span className="uppercase text-[10px] tracking-wider text-[#342A29]/60">
                  Est. Atelier
                </span>
              </div>
              <div className="h-6 w-px bg-[#722F37]/20" />
              <div>
                <span className="font-editorial-display text-lg font-bold text-[#722F37] block">
                  360°
                </span>
                <span className="uppercase text-[10px] tracking-wider text-[#342A29]/60">
                  Full Spectrum
                </span>
              </div>
              <div className="h-6 w-px bg-[#722F37]/20" />
              <div>
                <span className="font-editorial-display text-lg font-bold text-[#722F37] block">
                  4K / 3D
                </span>
                <span className="uppercase text-[10px] tracking-wider text-[#342A29]/60">
                  Cinema & WebGL
                </span>
              </div>
            </div>
          </div>

          {/* SCENE 02: WEBSITE DEVELOPMENT */}
          <div
            style={getSceneStyle(1)}
            className="absolute top-28 left-6 md:left-12 transition-opacity duration-300 max-w-lg text-left space-y-5"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F5EBDD] border border-[#722F37]/25 text-[#722F37]">
              <span className="text-[10px] font-editorial-sans tracking-[0.25em] uppercase font-bold">
                02 // DISCIPLINE: ARCHITECTURE
              </span>
            </div>

            <h2 className="font-editorial-serif text-4xl sm:text-5xl md:text-6xl leading-[1.0] text-[#342A29]">
              WE BUILD DIGITAL <br />
              <span className="italic font-serif text-[#722F37] font-semibold">EXPERIENCES.</span>
            </h2>

            <p className="font-editorial-sans text-sm sm:text-base text-[#342A29]/80 leading-relaxed">
              Bespoke web flagships engineered with Next.js 16, interactive 3D, and high conversion
              velocity. Tailored for luxury brands demanding speed and tactile beauty.
            </p>

            <div className="flex flex-wrap gap-2 pt-1 pointer-events-auto">
              {[
                "Next.js 16",
                "Headless Commerce",
                "Interactive 3D",
                "Lighthouse 98+",
              ].map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 rounded-md bg-[#F5EBDD] border border-[#722F37]/15 text-[11px] font-editorial-sans text-[#342A29] font-medium"
                >
                  {tag}
                </span>
              ))}
            </div>

            <div className="pt-2 pointer-events-auto">
              <Link
                href="#services"
                className="text-xs font-editorial-sans tracking-widest uppercase font-bold text-[#722F37] hover:text-[#342A29] transition-colors inline-flex items-center gap-1.5"
              >
                <span>Explore Web Engineering</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* SCENE 03: META ADVERTISING */}
          <div
            style={getSceneStyle(2)}
            className="absolute top-28 left-6 md:left-12 transition-opacity duration-300 max-w-lg text-left space-y-5"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F5EBDD] border border-[#722F37]/25 text-[#722F37]">
              <span className="text-[10px] font-editorial-sans tracking-[0.25em] uppercase font-bold">
                03 // PERFORMANCE MARKETING
              </span>
            </div>

            <h2 className="font-editorial-serif text-4xl sm:text-5xl md:text-6xl leading-[1.0] text-[#342A29]">
              REACH THE RIGHT <br />
              <span className="italic font-serif text-[#722F37] font-semibold">AUDIENCE.</span>
            </h2>

            <p className="font-editorial-sans text-sm sm:text-base text-[#342A29]/80 leading-relaxed">
              Precision paid social ecosystems across Instagram and Facebook. Engineered with
              predictive creative testing, custom CAPI tracking, and revenue-scaling funnels.
            </p>

            <div className="flex flex-wrap gap-2 pt-1 pointer-events-auto">
              {["Meta Ads CAPI", "Dynamic Creative A/B", "4.8x ROAS Benchmark", "Audience Funnels"].map(
                (tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 rounded-md bg-[#F5EBDD] border border-[#722F37]/15 text-[11px] font-editorial-sans text-[#342A29] font-medium"
                  >
                    {tag}
                  </span>
                )
              )}
            </div>

            <div className="pt-2 pointer-events-auto">
              <Link
                href="#services"
                className="text-xs font-editorial-sans tracking-widest uppercase font-bold text-[#722F37] hover:text-[#342A29] transition-colors inline-flex items-center gap-1.5"
              >
                <span>Explore Meta Campaigns</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* SCENE 04: PHOTOGRAPHY & VIDEOGRAPHY */}
          <div
            style={getSceneStyle(3)}
            className="absolute top-28 left-6 md:left-12 transition-opacity duration-300 max-w-lg text-left space-y-5"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F5EBDD] border border-[#722F37]/25 text-[#722F37]">
              <span className="text-[10px] font-editorial-sans tracking-[0.25em] uppercase font-bold">
                04 // CINEMA & MEDIA
              </span>
            </div>

            <h2 className="font-editorial-serif text-4xl sm:text-5xl md:text-6xl leading-[1.0] text-[#342A29]">
              WE CAPTURE <br />
              <span className="italic font-serif text-[#722F37] font-semibold">YOUR STORY.</span>
            </h2>

            <p className="font-editorial-sans text-sm sm:text-base text-[#342A29]/80 leading-relaxed">
              Broadcast-grade commercial cinema, anamorphic lens optics, and studio macro stills
              capturing the soul of your craftsmanship with visceral emotional resonance.
            </p>

            <div className="flex flex-wrap gap-2 pt-1 pointer-events-auto">
              {["4K Cinema DCI", "Red Helium 8K", "Studio Lighting", "Sound Architecture"].map(
                (tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 rounded-md bg-[#F5EBDD] border border-[#722F37]/15 text-[11px] font-editorial-sans text-[#342A29] font-medium"
                  >
                    {tag}
                  </span>
                )
              )}
            </div>

            <div className="pt-2 pointer-events-auto">
              <Link
                href="#studio"
                className="text-xs font-editorial-sans tracking-widest uppercase font-bold text-[#722F37] hover:text-[#342A29] transition-colors inline-flex items-center gap-1.5"
              >
                <span>Explore Studio Cinema</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* SCENE 05: CREATIVE ADVERTISING */}
          <div
            style={getSceneStyle(4)}
            className="absolute top-28 left-6 md:left-12 transition-opacity duration-300 max-w-lg text-left space-y-5"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F5EBDD] border border-[#722F37]/25 text-[#722F37]">
              <span className="text-[10px] font-editorial-sans tracking-[0.25em] uppercase font-bold">
                05 // BRAND EXPRESSION
              </span>
            </div>

            <h2 className="font-editorial-serif text-4xl sm:text-5xl md:text-6xl leading-[1.0] text-[#342A29]">
              MAKE YOUR BRAND <br />
              <span className="italic font-serif text-[#722F37] font-semibold">UNFORGETTABLE.</span>
            </h2>

            <p className="font-editorial-sans text-sm sm:text-base text-[#342A29]/80 leading-relaxed">
              Disruptive campaign creative, 3D motion graphics, and conceptual art direction that
              command authority across billboard, print, and high-velocity digital feeds.
            </p>

            <div className="flex flex-wrap gap-2 pt-1 pointer-events-auto">
              {["Brand Identity", "Motion Graphics", "Campaign Toolkits", "Editorial Copy"].map(
                (tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 rounded-md bg-[#F5EBDD] border border-[#722F37]/15 text-[11px] font-editorial-sans text-[#342A29] font-medium"
                  >
                    {tag}
                  </span>
                )
              )}
            </div>

            <div className="pt-2 pointer-events-auto">
              <Link
                href="#services"
                className="text-xs font-editorial-sans tracking-widest uppercase font-bold text-[#722F37] hover:text-[#342A29] transition-colors inline-flex items-center gap-1.5"
              >
                <span>Explore Creative Campaigns</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* SCENE 06: DIGITAL GROWTH & ELEVATION */}
          <div
            style={getSceneStyle(5)}
            className="absolute top-24 left-6 md:left-12 transition-opacity duration-300 max-w-xl text-left space-y-5"
          >
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#F5EBDD] border border-[#722F37]/25 text-[#722F37] shadow-sm pointer-events-auto">
              <Sparkles className="w-3.5 h-3.5 text-[#722F37]" />
              <span className="text-[10px] md:text-xs font-editorial-sans tracking-[0.22em] uppercase font-bold">
                THE COMPLETE DIGITAL ATELIER
              </span>
            </div>

            <h2 className="font-editorial-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-[0.98] text-[#342A29]">
              WE CREATE. <br />
              WE INNOVATE. <br />
              <span className="italic font-serif text-[#722F37] font-semibold">WE ELEVATE.</span>
            </h2>

            <p className="font-editorial-sans text-sm sm:text-base text-[#342A29]/80 leading-relaxed">
              From code to cinema, from paid advertising to technical SEO: one synchronized agency
              delivering an integrated, prestigious digital ecosystem.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2 pointer-events-auto">
              <Link
                href="#contact"
                className="btn-editorial-primary px-8 py-3.5 rounded-full text-xs font-editorial-sans tracking-[0.2em] uppercase font-bold inline-flex items-center gap-2 shadow-lg group"
              >
                <span>Let&apos;s Build Something Great</span>
                <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>

              <Link
                href="#about"
                className="btn-editorial-secondary px-6 py-3.5 rounded-full text-xs font-editorial-sans tracking-[0.2em] uppercase font-semibold inline-flex items-center gap-2"
              >
                <span>Explore Atelier Below</span>
                <ChevronDown className="w-4 h-4 text-[#722F37]" />
              </Link>
            </div>
          </div>
        </div>

        {/* Pinned Bottom Bar / Directing Scrub Cue */}
        <div className="relative z-20 max-w-7xl mx-auto px-6 md:px-12 w-full pb-6 flex items-center justify-between text-xs font-editorial-sans text-[#342A29]/75 border-t border-[#722F37]/15">
          <div className="flex items-center gap-2.5">
            <span className="w-2 h-2 rounded-full bg-[#722F37] animate-ping" />
            <span className="tracking-[0.2em] uppercase font-semibold text-[10px] md:text-xs text-[#722F37]">
              Interactive 3D Movie • Scroll To Scrub Timeline
            </span>
          </div>

          <div className="flex items-center gap-2 text-[#342A29]/70 text-[11px] font-medium">
            <span className="uppercase tracking-wider">
              {Math.round(scrollProgress * 100)}% Scene Timecode
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
