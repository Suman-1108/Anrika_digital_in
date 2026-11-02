"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight, ChevronDown, Film, Camera, TrendingUp } from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const TOTAL_FRAMES = 239;

export default function AnrikaCinematicHero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const pinnedRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Frame cache and render tracking
  const imagesRef = useRef<Map<number, HTMLImageElement>>(new Map());
  const currentFrameRef = useRef<number>(1);
  const lastRenderedFrameRef = useRef<number>(-1);
  const rafIdRef = useRef<number | null>(null);

  const [loadedCount, setLoadedCount] = useState<number>(0);
  const [scrollProgress, setScrollProgress] = useState<number>(0);
  const [isInitialReady, setIsInitialReady] = useState<boolean>(false);

  // ========================================================
  // TYPING ANIMATION ENGINE (For "WE CREATE DIGITAL EXPERIENCES")
  // ========================================================
  const [line1, setLine1] = useState<string>("");
  const [line2, setLine2] = useState<string>("");
  const [line3, setLine3] = useState<string>("");
  const [cursorLine, setCursorLine] = useState<number>(1);
  const [typingComplete, setTypingComplete] = useState<boolean>(false);

  useEffect(() => {
    const l1Full = "WE CREATE";
    const l2Full = "DIGITAL";
    const l3Full = "EXPERIENCES";

    let charIdx = 0;
    let timer: NodeJS.Timeout | null = null;

    const startDelay = setTimeout(() => {
      timer = setInterval(() => {
        charIdx++;

        if (charIdx <= l1Full.length) {
          setLine1(l1Full.slice(0, charIdx));
          setCursorLine(1);
        } else if (charIdx <= l1Full.length + l2Full.length) {
          const l2Idx = charIdx - l1Full.length;
          setLine2(l2Full.slice(0, l2Idx));
          setCursorLine(2);
        } else if (charIdx <= l1Full.length + l2Full.length + l3Full.length) {
          const l3Idx = charIdx - l1Full.length - l2Full.length;
          setLine3(l3Full.slice(0, l3Idx));
          setCursorLine(3);
        } else {
          setTypingComplete(true);
          setCursorLine(0);
          if (timer) clearInterval(timer);
        }
      }, 70);
    }, 400);

    return () => {
      clearTimeout(startDelay);
      if (timer) clearInterval(timer);
    };
  }, []);

  // Helper to format frame path
  const getFrameUrl = useCallback((index: number, ext: "webp" | "png" = "webp") => {
    const padded = String(index).padStart(4, "0");
    return `/anrika-sequence/frame-${padded}.${ext}`;
  }, []);

  // Draw a frame onto the canvas with high-DPI and center-cover math
  const renderFrame = useCallback((frameIndex: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let img = imagesRef.current.get(frameIndex);
    if (!img || !img.complete || img.naturalWidth === 0) {
      let closestDiff = Infinity;
      let closestImg: HTMLImageElement | null = null;
      imagesRef.current.forEach((cachedImg, idx) => {
        if (cachedImg.complete && cachedImg.naturalWidth > 0) {
          const diff = Math.abs(idx - frameIndex);
          if (diff < closestDiff) {
            closestDiff = diff;
            closestImg = cachedImg;
          }
        }
      });
      img = closestImg || undefined;
    }

    if (!img) return;

    const cw = canvas.width;
    const ch = canvas.height;
    const iw = img.naturalWidth;
    const ih = img.naturalHeight;
    if (!iw || !ih) return;

    const hRatio = cw / iw;
    const vRatio = ch / ih;
    const ratio = Math.max(hRatio, vRatio);
    const nw = iw * ratio;
    const nh = ih * ratio;
    const ox = (cw - nw) / 2;
    const oy = (ch - nh) / 2;

    ctx.clearRect(0, 0, cw, ch);
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = "high";
    ctx.drawImage(img, ox, oy, nw, nh);

    lastRenderedFrameRef.current = frameIndex;
  }, []);

  // Canvas resize listener
  const handleResize = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const w = Math.round(rect.width * dpr);
    const h = Math.round(rect.height * dpr);

    if (canvas.width !== w || canvas.height !== h) {
      canvas.width = w;
      canvas.height = h;
      renderFrame(currentFrameRef.current);
    }
  }, [renderFrame]);

  // Frame preloader engine
  useEffect(() => {
    let isCancelled = false;

    const loadSingleImage = (index: number): Promise<HTMLImageElement> => {
      return new Promise((resolve, reject) => {
        if (imagesRef.current.has(index)) {
          resolve(imagesRef.current.get(index)!);
          return;
        }

        const img = new Image();
        img.src = getFrameUrl(index, "webp");

        img.onload = () => {
          if (!isCancelled) {
            imagesRef.current.set(index, img);
            setLoadedCount((prev) => prev + 1);
            if (index === 1 && !isInitialReady) {
              setIsInitialReady(true);
              renderFrame(1);
            }
          }
          resolve(img);
        };

        img.onerror = () => {
          const fallback = new Image();
          fallback.src = getFrameUrl(index, "png");
          fallback.onload = () => {
            if (!isCancelled) {
              imagesRef.current.set(index, fallback);
              setLoadedCount((prev) => prev + 1);
              if (index === 1 && !isInitialReady) {
                setIsInitialReady(true);
                renderFrame(1);
              }
            }
            resolve(fallback);
          };
          fallback.onerror = () => reject();
        };
      });
    };

    const priorityIndices: number[] = [];
    for (let i = 1; i <= Math.min(25, TOTAL_FRAMES); i++) {
      priorityIndices.push(i);
    }

    Promise.all(priorityIndices.map(loadSingleImage)).then(() => {
      if (isCancelled) return;
      handleResize();
      renderFrame(1);

      const remainingIndices: number[] = [];
      for (let i = 26; i <= TOTAL_FRAMES; i++) {
        remainingIndices.push(i);
      }

      const batchSize = 12;
      let currentIdx = 0;

      const loadNextBatch = () => {
        if (isCancelled || currentIdx >= remainingIndices.length) return;
        const nextBatch = remainingIndices.slice(currentIdx, currentIdx + batchSize);
        currentIdx += batchSize;
        Promise.all(nextBatch.map(loadSingleImage)).then(() => {
          if (!isCancelled) {
            renderFrame(currentFrameRef.current);
            setTimeout(loadNextBatch, 20);
          }
        });
      };

      loadNextBatch();
    });

    return () => {
      isCancelled = true;
    };
  }, [getFrameUrl, handleResize, isInitialReady, renderFrame]);

  // Unified Scroll & GSAP ScrollTrigger Scrub Controller
  useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize, { passive: true });

    const updateFromProgress = (progress: number) => {
      const p = Math.max(0, Math.min(1, progress));
      setScrollProgress(p);

      const targetFrame = Math.min(
        TOTAL_FRAMES,
        Math.max(1, Math.round(p * (TOTAL_FRAMES - 1)) + 1)
      );

      currentFrameRef.current = targetFrame;

      if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
      rafIdRef.current = requestAnimationFrame(() => {
        renderFrame(targetFrame);
      });
    };

    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const total = containerRef.current.offsetHeight - window.innerHeight;
      if (total <= 0) return;
      const p = Math.max(0, Math.min(1, -rect.top / total));
      updateFromProgress(p);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    let ctx: gsap.Context | null = null;
    if (typeof window !== "undefined" && containerRef.current) {
      ctx = gsap.context(() => {
        ScrollTrigger.create({
          trigger: containerRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.35,
          onUpdate: (self) => {
            updateFromProgress(self.progress);
          },
        });
      }, containerRef);
    }

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("scroll", handleScroll);
      if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
      if (ctx) ctx.revert();
    };
  }, [handleResize, renderFrame]);

  // Interpolate scene overlay opacity and translation
  const getSceneStyle = (index: number) => {
    let opacity = 0;
    let translateY = 0;

    const ranges = [
      { start: 0.0, peak: 0.05, end: 0.2 }, // Scene 1: Initial Centered Title
      { start: 0.18, peak: 0.28, end: 0.4 }, // Scene 2: Movie Title Intro (Top-Left / Bottom-Right)
      { start: 0.38, peak: 0.48, end: 0.6 }, // Scene 3: Movie Title Intro (Top-Right / Bottom-Left)
      { start: 0.58, peak: 0.68, end: 0.8 }, // Scene 4: Movie Title Intro (Top-Left / Bottom-Right)
      { start: 0.78, peak: 0.88, end: 1.0 }, // Scene 5: Movie Title Intro (Top-Right / Bottom-Left)
    ];

    const r = ranges[index];
    if (r && scrollProgress >= r.start && scrollProgress <= r.end) {
      if (scrollProgress < r.peak) {
        opacity = (scrollProgress - r.start) / (r.peak - r.start);
        translateY = (1 - opacity) * 14;
      } else {
        opacity = 1 - (scrollProgress - r.peak) / (r.end - r.peak);
        translateY = (1 - opacity) * -14;
      }
    }

    if (index === 0 && scrollProgress < 0.12) {
      opacity = 1;
      translateY = 0;
    }
    if (index === 4 && scrollProgress > 0.94) {
      opacity = 1;
      translateY = 0;
    }

    const clamped = Math.max(0, Math.min(1, opacity));

    return {
      opacity: clamped,
      transform: `translateY(${translateY}px)`,
      pointerEvents: clamped > 0.3 ? ("auto" as const) : ("none" as const),
      visibility: clamped > 0.02 ? ("visible" as const) : ("hidden" as const),
      transition: "opacity 0.3s ease-out, transform 0.3s ease-out",
    };
  };

  return (
    <section
      id="hero"
      ref={containerRef}
      className="relative bg-[#E8DCC6] h-[550vh] md:h-[600vh] selection:bg-[#722F37] selection:text-[#E8DCC6]"
    >
      {/* Sticky Pinned Cinematic Viewport (100vh) */}
      <div
        ref={pinnedRef}
        className="sticky top-0 h-screen w-full overflow-hidden"
      >
        {/* ======================================================== */}
        {/* 1. CONTINUOUS SCROLL-CONTROLLED VIDEO CANVAS */}
        {/* ======================================================== */}
        <div className="absolute inset-0 z-0 bg-[#E2DED6]">
          <canvas
            ref={canvasRef}
            className="w-full h-full object-cover block"
            style={{ width: "100%", height: "100%" }}
          />

          {/* Bottom subtle blend gradient into About section */}
          <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#E8DCC6]/90 via-[#E8DCC6]/20 to-transparent pointer-events-none" />
        </div>

        {/* ======================================================== */}
        {/* 2. CINEMATIC MOVIE TITLE INTRO SCENE OVERLAYS */}
        {/* ======================================================== */}

        {/* ---------------------------------------------------- */}
        {/* SCENE 01: INITIAL OPENING - CENTERED WITH TYPING ANIMATION */}
        {/* Safely positioned above the models in the upper burgundy wall pocket */}
        {/* ---------------------------------------------------- */}
        <div
          style={getSceneStyle(0)}
          className="absolute inset-x-0 top-[19vh] sm:top-[16vh] md:top-[16vh] z-20 max-w-3xl mx-auto px-4 sm:px-6 pointer-events-none flex flex-col items-center text-center font-gill"
        >
          <div className="space-y-0.5 sm:space-y-1 w-full">
            <h1 className="text-2xl xs:text-[28px] sm:text-4xl md:text-5xl lg:text-[54px] xl:text-[58px] leading-[1.14] sm:leading-[1.15] tracking-[0.08em] sm:tracking-[0.14em] text-white font-normal drop-shadow-[0_2px_14px_rgba(20,5,8,0.95)] uppercase">
              <span className="block min-h-[1.15em]">
                {line1}
                {cursorLine === 1 && (
                  <span className="inline-block w-[2px] h-[0.8em] bg-white ml-1.5 align-middle animate-pulse" />
                )}
              </span>
              <span className="block min-h-[1.15em]">
                {line2}
                {cursorLine === 2 && (
                  <span className="inline-block w-[2px] h-[0.8em] bg-white ml-1.5 align-middle animate-pulse" />
                )}
              </span>
              <span className="block min-h-[1.15em]">
                {line3}
                {cursorLine === 3 && (
                  <span className="inline-block w-[2px] h-[0.8em] bg-white ml-1.5 align-middle animate-pulse" />
                )}
              </span>
            </h1>

            {/* Hand-Drawn Curve Flourish Under 'EXPERIENCES' */}
            <div
              className={`w-36 sm:w-52 md:w-64 mx-auto pt-2 flex justify-center transition-opacity duration-700 ${
                typingComplete ? "opacity-100" : "opacity-0"
              }`}
            >
              <svg
                viewBox="0 0 240 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-full h-auto text-[#E8DCC6] drop-shadow-sm"
              >
                <path
                  d="M6 13C50 6 135 5 234 14C175 10 90 10 6 13Z"
                  fill="currentColor"
                />
                <path
                  d="M20 18C75 14 155 14 220 19"
                  stroke="currentColor"
                  strokeWidth="1.2"
                  strokeLinecap="round"
                  opacity="0.6"
                />
              </svg>
            </div>
          </div>
        </div>

        {/* ---------------------------------------------------- */}
        {/* SCENE 02: MOVIE TITLE INTRO (SIDE VIEW) */}
        {/* Title in TOP-LEFT, Details & CTA in OPPOSITE BOTTOM-RIGHT */}
        {/* Center models and camera are 100% UNTOUCHED & UNOBSTRUCTED */}
        {/* ---------------------------------------------------- */}
        <div
          style={getSceneStyle(1)}
          className="absolute inset-0 z-20 pointer-events-none p-5 sm:p-10 md:p-16 flex flex-col justify-between font-gill"
        >
          {/* Top-Left: Cinematic Title Intro */}
          <div className="pt-20 sm:pt-20 md:pt-24 max-w-xs sm:max-w-md text-left space-y-1.5 pointer-events-auto">
            <span className="text-[10px] sm:text-[11px] md:text-xs tracking-[0.25em] text-[#E8DCC6] uppercase font-semibold block drop-shadow-sm">
              01 // BESPOKE CODE
            </span>
            <h2 className="text-xl sm:text-3xl md:text-4xl lg:text-[44px] leading-[1.08] tracking-[0.08em] text-white font-normal uppercase drop-shadow-[0_2px_14px_rgba(20,5,8,0.95)]">
              WE BUILD
              <br />
              DIGITAL EXPERIENCES.
            </h2>
          </div>

          {/* Opposite Bottom-Right: Credits & CTA */}
          <div className="self-end max-w-[270px] sm:max-w-sm text-right space-y-2.5 pointer-events-auto pb-4 sm:pb-6 flex flex-col items-end">
            <p className="text-xs sm:text-[13px] text-white/95 leading-relaxed font-normal tracking-wide drop-shadow-md">
              Next.js 16 • Three.js 3D flagships engineered for effortless luxury and conversion.
            </p>
            <div className="flex flex-wrap justify-end gap-1.5">
              <span className="px-2.5 py-0.5 rounded-full bg-[#F5EBDD] text-[10px] text-[#342A29] font-medium shadow-sm">
                Web Flagships
              </span>
              <span className="px-2.5 py-0.5 rounded-full bg-[#F5EBDD] text-[10px] text-[#342A29] font-medium shadow-sm">
                E-commerce
              </span>
              <span className="px-2.5 py-0.5 rounded-full bg-[#F5EBDD] text-[10px] text-[#342A29] font-medium shadow-sm">
                Custom Apps
              </span>
            </div>
            <Link
              href="#services"
              className="px-5 sm:px-6 py-2 sm:py-2.5 rounded-full bg-[#722F37] hover:bg-[#581d22] text-white text-[11px] sm:text-xs tracking-[0.16em] uppercase font-semibold inline-flex items-center gap-2 shadow-lg transition-all"
            >
              <span>Explore Services</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* ---------------------------------------------------- */}
        {/* SCENE 03: MOVIE TITLE INTRO (META PERFORMANCE) */}
        {/* Alternates: Title in TOP-RIGHT, Details in OPPOSITE BOTTOM-LEFT */}
        {/* ---------------------------------------------------- */}
        <div
          style={getSceneStyle(2)}
          className="absolute inset-0 z-20 pointer-events-none p-5 sm:p-10 md:p-16 flex flex-col justify-between font-gill"
        >
          {/* Top-Right: Title */}
          <div className="pt-20 sm:pt-20 md:pt-24 self-end max-w-xs sm:max-w-md text-right space-y-1.5 pointer-events-auto flex flex-col items-end">
            <span className="text-[10px] sm:text-[11px] md:text-xs tracking-[0.25em] text-[#E8DCC6] uppercase font-semibold block drop-shadow-sm">
              02 // PERFORMANCE
            </span>
            <h2 className="text-xl sm:text-3xl md:text-4xl lg:text-[44px] leading-[1.08] tracking-[0.08em] text-white font-normal uppercase drop-shadow-[0_2px_14px_rgba(20,5,8,0.95)]">
              REACH THE
              <br />
              RIGHT AUDIENCE.
            </h2>
          </div>

          {/* Opposite Bottom-Left: Credits & CTA */}
          <div className="max-w-[270px] sm:max-w-sm text-left space-y-2.5 pointer-events-auto pb-4 sm:pb-6 flex flex-col items-start">
            <p className="text-xs sm:text-[13px] text-white/95 leading-relaxed font-normal tracking-wide drop-shadow-md">
              Precision Meta & Instagram paid ad ecosystems. Predictive creative testing & 4.8x ROAS.
            </p>
            <div className="flex flex-wrap justify-start gap-1.5">
              <span className="px-2.5 py-0.5 rounded-full bg-[#F5EBDD] text-[10px] text-[#342A29] font-medium shadow-sm">
                Meta Ads
              </span>
              <span className="px-2.5 py-0.5 rounded-full bg-[#F5EBDD] text-[10px] text-[#342A29] font-medium shadow-sm">
                Instagram Funnels
              </span>
              <span className="px-2.5 py-0.5 rounded-full bg-[#F5EBDD] text-[10px] text-[#342A29] font-medium shadow-sm">
                Audience Scaling
              </span>
            </div>
            <Link
              href="#services"
              className="px-5 sm:px-6 py-2 sm:py-2.5 rounded-full bg-[#722F37] hover:bg-[#581d22] text-white text-[11px] sm:text-xs tracking-[0.16em] uppercase font-semibold inline-flex items-center gap-2 shadow-lg transition-all"
            >
              <span>Launch Campaign</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* ---------------------------------------------------- */}
        {/* SCENE 04: MOVIE TITLE INTRO (COMMERCIAL CINEMA) */}
        {/* Title in TOP-LEFT, Details in OPPOSITE BOTTOM-RIGHT */}
        {/* ---------------------------------------------------- */}
        <div
          style={getSceneStyle(3)}
          className="absolute inset-0 z-20 pointer-events-none p-5 sm:p-10 md:p-16 flex flex-col justify-between font-gill"
        >
          {/* Top-Left: Title */}
          <div className="pt-20 sm:pt-20 md:pt-24 max-w-xs sm:max-w-md text-left space-y-1.5 pointer-events-auto">
            <span className="text-[10px] sm:text-[11px] md:text-xs tracking-[0.25em] text-[#E8DCC6] uppercase font-semibold block drop-shadow-sm">
              03 // STUDIO PRODUCTION
            </span>
            <h2 className="text-xl sm:text-3xl md:text-4xl lg:text-[44px] leading-[1.08] tracking-[0.08em] text-white font-normal uppercase drop-shadow-[0_2px_14px_rgba(20,5,8,0.95)]">
              WE CAPTURE
              <br />
              YOUR STORY.
            </h2>
          </div>

          {/* Opposite Bottom-Right: Credits & CTA */}
          <div className="self-end max-w-[270px] sm:max-w-sm text-right space-y-2.5 pointer-events-auto pb-4 sm:pb-6 flex flex-col items-end">
            <p className="text-xs sm:text-[13px] text-white/95 leading-relaxed font-normal tracking-wide drop-shadow-md">
              Commercial studio photography, cinematic 4K video, and editorial art direction.
            </p>
            <div className="flex flex-wrap justify-end gap-1.5">
              <span className="px-2.5 py-0.5 rounded-full bg-[#F5EBDD] text-[10px] text-[#342A29] font-medium shadow-sm">
                Commercial Stills
              </span>
              <span className="px-2.5 py-0.5 rounded-full bg-[#F5EBDD] text-[10px] text-[#342A29] font-medium shadow-sm">
                4K Video
              </span>
              <span className="px-2.5 py-0.5 rounded-full bg-[#F5EBDD] text-[10px] text-[#342A29] font-medium shadow-sm">
                Cinema Direction
              </span>
            </div>
            <Link
              href="#studio"
              className="px-5 sm:px-6 py-2 sm:py-2.5 rounded-full bg-[#722F37] hover:bg-[#581d22] text-white text-[11px] sm:text-xs tracking-[0.16em] uppercase font-semibold inline-flex items-center gap-2 shadow-lg transition-all"
            >
              <span>View Cinema Reel</span>
              <Film className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* ---------------------------------------------------- */}
        {/* SCENE 05: MOVIE TITLE INTRO (FULL ATELIER ELEVATION) */}
        {/* Title in TOP-RIGHT, Details in OPPOSITE BOTTOM-LEFT */}
        {/* ---------------------------------------------------- */}
        <div
          style={getSceneStyle(4)}
          className="absolute inset-0 z-20 pointer-events-none p-5 sm:p-10 md:p-16 flex flex-col justify-between font-gill"
        >
          {/* Top-Right: Title */}
          <div className="pt-20 sm:pt-20 md:pt-24 self-end max-w-xs sm:max-w-md text-right space-y-1.5 pointer-events-auto flex flex-col items-end">
            <span className="text-[10px] sm:text-[11px] md:text-xs tracking-[0.25em] text-[#E8DCC6] uppercase font-semibold block drop-shadow-sm">
              04 // THE COMPLETE ATELIER
            </span>
            <h2 className="text-xl sm:text-3xl md:text-4xl lg:text-[44px] leading-[1.08] tracking-[0.08em] text-white font-normal uppercase drop-shadow-[0_2px_14px_rgba(20,5,8,0.95)]">
              WE CREATE.
              <br />
              WE INNOVATE.
              <br />
              WE ELEVATE.
            </h2>
          </div>

          {/* Opposite Bottom-Left: Credits & CTA */}
          <div className="max-w-[270px] sm:max-w-sm text-left space-y-2.5 pointer-events-auto pb-4 sm:pb-6 flex flex-col items-start">
            <p className="text-xs sm:text-[13px] text-white/95 leading-relaxed font-normal tracking-wide drop-shadow-md">
              From bespoke code to commercial cinema: one synchronized creative agency.
            </p>
            <div className="flex flex-wrap items-center gap-2.5 pt-1">
              <Link
                href="#contact"
                className="px-5 sm:px-6 py-2 sm:py-2.5 rounded-full bg-[#722F37] hover:bg-[#581d22] text-white text-[11px] sm:text-xs tracking-[0.16em] uppercase font-semibold inline-flex items-center gap-2 shadow-xl transition-all"
              >
                <span>Build Together</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
              <Link
                href="#about"
                className="px-4 sm:px-5 py-2 sm:py-2.5 rounded-full bg-[#F5EBDD] hover:bg-white text-[#342A29] text-[11px] sm:text-xs tracking-[0.16em] uppercase font-semibold inline-flex items-center gap-2 shadow-lg transition-all"
              >
                <span>Explore Atelier</span>
                <ChevronDown className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
