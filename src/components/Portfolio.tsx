"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, ArrowUpRight } from "lucide-react";
import { PORTFOLIO_DATA } from "@/lib/data";
import { PortfolioItem } from "@/types";
import ProjectModal from "./ProjectModal";

export default function Portfolio() {
  const [selectedProject, setSelectedProject] = useState<PortfolioItem | null>(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // 20 projects divided across 4 layout sets
  const totalSlides = 4;

  // Auto-cycle every 3 seconds
  useEffect(() => {
    if (isPaused || selectedProject !== null) return;

    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % totalSlides);
    }, 3000);

    return () => clearInterval(timer);
  }, [isPaused, selectedProject, totalSlides]);

  const handleNext = () => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
  };

  const handlePrev = () => {
    setCurrentSlide((prev) => (prev === 0 ? totalSlides - 1 : prev - 1));
  };

  // Get current 6 items for the active slide from the 20 items
  const getSlideItems = () => {
    const items: PortfolioItem[] = [];
    const startIndex = (currentSlide * 5) % PORTFOLIO_DATA.length;
    for (let i = 0; i < 6; i++) {
      const idx = (startIndex + i) % PORTFOLIO_DATA.length;
      items.push(PORTFOLIO_DATA[idx]);
    }
    return items;
  };

  const slideItems = getSlideItems();

  // Reusable Image Card matching the exact minimalist reference design
  const renderCard = (item: PortfolioItem, heightClass: string, isPriority = false) => {
    if (!item) return null;

    return (
      <div
        key={item.id}
        onClick={() => setSelectedProject(item)}
        className={`group relative ${heightClass} w-full rounded-sm overflow-hidden bg-neutral-900 cursor-pointer shadow-sm hover:shadow-xl transition-all duration-500`}
      >
        <Image
          src={item.image}
          alt={item.title}
          fill
          unoptimized
          priority={isPriority}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-105 filter brightness-95 group-hover:brightness-100"
        />

        {/* Subtle Dark Gradient at Bottom for Clean Text Contrast */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-85 group-hover:opacity-95 transition-opacity duration-300" />

        {/* Minimal Bottom-Left Caption (Exact Match to Reference Image) */}
        <div className="absolute bottom-3 left-3 right-3 z-10 text-white pointer-events-none">
          <span className="block font-editorial-sans text-sm sm:text-base font-light text-white tracking-wide drop-shadow-md">
            {item.metrics || `${item.year} Collection`}
          </span>
          <span className="block font-serif italic text-xs sm:text-sm text-white/90 drop-shadow-md truncate">
            {item.client ? `${item.client} — ${item.title}` : item.title}
          </span>
        </div>

        {/* Subtle Hover Action Arrow */}
        <div className="absolute top-2.5 right-2.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-white/90">
          <ArrowUpRight className="w-4 h-4" />
        </div>
      </div>
    );
  };

  // 4 Asymmetrical Bento Layout Configurations that Shift Dynamically Every 3 Seconds
  const renderLayout = () => {
    const layoutType = currentSlide % 4;

    switch (layoutType) {
      // Layout 0: Exact match to user's uploaded reference image!
      // Left: [Tall, Small] | Middle: [Wide, Small, Small] | Right: [Towering Tall]
      case 0:
      default:
        return (
          <div className="grid grid-cols-1 md:grid-cols-12 gap-3 sm:gap-4 items-stretch">
            {/* Column 1 (Left 3 cols): Tall Portrait + Square */}
            <div className="md:col-span-3 flex flex-col gap-3 sm:gap-4">
              {renderCard(slideItems[0], "h-[260px] md:h-[320px]", true)}
              {renderCard(slideItems[1], "h-[180px] md:h-[224px]")}
            </div>

            {/* Column 2 (Middle 6 cols): Top Wide Banner + 2 Stacked Landscapes */}
            <div className="md:col-span-6 flex flex-col gap-3 sm:gap-4">
              {renderCard(slideItems[2], "h-[170px] md:h-[196px]")}
              {renderCard(slideItems[3], "h-[140px] md:h-[160px]")}
              {renderCard(slideItems[4], "h-[150px] md:h-[172px]")}
            </div>

            {/* Column 3 (Right 3 cols): Towering Flagship Portrait */}
            <div className="md:col-span-3">
              {renderCard(slideItems[5], "h-[360px] md:h-[560px]")}
            </div>
          </div>
        );

      // Layout 1: Flipped Cinema Layout
      // Left: [Towering Tall] | Middle: [2 Stacked, Wide Banner] | Right: [Small, Tall]
      case 1:
        return (
          <div className="grid grid-cols-1 md:grid-cols-12 gap-3 sm:gap-4 items-stretch">
            {/* Column 1 (Left 3 cols): Towering Tall */}
            <div className="md:col-span-3">
              {renderCard(slideItems[0], "h-[360px] md:h-[560px]", true)}
            </div>

            {/* Column 2 (Middle 6 cols): 2 Stacked + Bottom Wide Banner */}
            <div className="md:col-span-6 flex flex-col gap-3 sm:gap-4">
              <div className="grid grid-cols-2 gap-3 sm:gap-4">
                {renderCard(slideItems[1], "h-[160px] md:h-[180px]")}
                {renderCard(slideItems[2], "h-[160px] md:h-[180px]")}
              </div>
              {renderCard(slideItems[3], "h-[220px] md:h-[364px]")}
            </div>

            {/* Column 3 (Right 3 cols): Small + Tall */}
            <div className="md:col-span-3 flex flex-col gap-3 sm:gap-4">
              {renderCard(slideItems[4], "h-[180px] md:h-[224px]")}
              {renderCard(slideItems[5], "h-[260px] md:h-[320px]")}
            </div>
          </div>
        );

      // Layout 2: Modernist Centerpiece Layout
      // Left: [2 Stacked Squares] | Middle: [Giant Center Hero] | Right: [2 Stacked Squares]
      case 2:
        return (
          <div className="grid grid-cols-1 md:grid-cols-12 gap-3 sm:gap-4 items-stretch">
            {/* Column 1 (Left 3 cols) */}
            <div className="md:col-span-3 flex flex-col gap-3 sm:gap-4">
              {renderCard(slideItems[0], "h-[200px] md:h-[272px]", true)}
              {renderCard(slideItems[1], "h-[200px] md:h-[272px]")}
            </div>

            {/* Column 2 (Middle 6 cols): Giant Center Hero */}
            <div className="md:col-span-6">
              {renderCard(slideItems[2], "h-[380px] md:h-[560px]")}
            </div>

            {/* Column 3 (Right 3 cols) */}
            <div className="md:col-span-3 flex flex-col gap-3 sm:gap-4">
              {renderCard(slideItems[3], "h-[200px] md:h-[272px]")}
              {renderCard(slideItems[4], "h-[200px] md:h-[272px]")}
            </div>
          </div>
        );

      // Layout 3: Panoramic Horizon Layout
      case 3:
        return (
          <div className="flex flex-col gap-3 sm:gap-4">
            {/* Top Row: Panoramic Banner + Vertical Portrait */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-3 sm:gap-4">
              <div className="md:col-span-8">
                {renderCard(slideItems[0], "h-[240px] md:h-[300px]", true)}
              </div>
              <div className="md:col-span-4">
                {renderCard(slideItems[1], "h-[240px] md:h-[300px]")}
              </div>
            </div>

            {/* Bottom Row: Trio */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-12 gap-3 sm:gap-4">
              <div className="md:col-span-4">
                {renderCard(slideItems[2], "h-[190px] md:h-[244px]")}
              </div>
              <div className="md:col-span-4">
                {renderCard(slideItems[3], "h-[190px] md:h-[244px]")}
              </div>
              <div className="sm:col-span-2 md:col-span-4">
                {renderCard(slideItems[4], "h-[190px] md:h-[244px]")}
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <section
      id="portfolio"
      className="relative pt-10 md:pt-14 pb-0 bg-[#E8DCC6] overflow-hidden scroll-mt-20 md:scroll-mt-24"
    >
      {/* Full-width clean header background strip (Keeps header text 100% pattern-free) */}
      <div className="absolute top-0 left-0 right-0 h-[115px] sm:h-[128px] md:h-[142px] bg-[#E8DCC6] z-10 pointer-events-none" />

      {/* Seamless Vector SVG Doodle Pattern Layer (Starts strictly below the header area, ultra-light color) */}
      <div
        className="absolute top-[115px] sm:top-[128px] md:top-[142px] inset-x-0 bottom-0 pointer-events-none opacity-60 bg-repeat z-[5]"
        style={{
          backgroundImage: "url('/images/doodle-pattern.svg')",
          backgroundSize: "360px 360px",
        }}
      />

      <div
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20"
      >
        {/* Top Header Bar (100% clean background, zero pattern interference) */}
        <div className="flex items-end justify-between pb-4 mb-5 border-b border-[#722F37]/15 relative z-20 bg-[#E8DCC6]">
          <div className="bg-[#E8DCC6] pr-4">
            <h2 className="font-editorial-serif text-3xl sm:text-4xl md:text-5xl text-[#342A29] leading-tight font-normal">
              Creative Stories
            </h2>
            <p className="font-editorial-sans text-xs sm:text-sm text-[#342A29]/70 italic mt-0.5">
              curated archive // 20 collection works
            </p>
          </div>

          {/* Faint Italic Watermark Script (matching "on sale" in reference image) */}
          <div className="select-none pointer-events-none text-right bg-[#E8DCC6] pl-4">
            <span className="font-serif italic text-4xl sm:text-5xl md:text-6xl text-[#722F37]/15 block leading-none">
              creative stories
            </span>
          </div>
        </div>

        {/* Dynamic Animated Gallery Layout Canvas (Changes every 3s, cycles 20 images) */}
        <div className="min-h-[480px] md:min-h-[560px] relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="w-full"
            >
              {renderLayout()}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Bottom Minimal Controls (Exact match to reference image #2: 1 / 4, < >, and ") */}
        <div className="pt-4 mt-5 flex items-center justify-between text-[#342A29]">
          <div className="flex items-center gap-4">
            {/* Slide Pagination Counter: 1 / 4 */}
            <div className="flex items-baseline font-editorial-serif">
              <span className="text-3xl font-normal text-[#342A29]">
                {currentSlide + 1}
              </span>
              <span className="text-base text-[#342A29]/50 font-light mx-1">/</span>
              <span className="text-base text-[#342A29]/50 font-light">
                {totalSlides}
              </span>
            </div>

            {/* Chevrons < > */}
            <div className="flex items-center gap-1.5">
              <button
                onClick={handlePrev}
                className="w-8 h-8 rounded-full border border-[#722F37]/25 hover:border-[#722F37] hover:bg-[#722F37] hover:text-white text-[#342A29] flex items-center justify-center transition-all duration-300 focus:outline-none"
                aria-label="Previous"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={handleNext}
                className="w-8 h-8 rounded-full border border-[#722F37]/25 hover:border-[#722F37] hover:bg-[#722F37] hover:text-white text-[#342A29] flex items-center justify-center transition-all duration-300 focus:outline-none"
                aria-label="Next"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Quotation Mark (matching reference image #2) */}
          <span className="font-editorial-serif text-3xl sm:text-4xl text-[#342A29]/40 leading-none select-none">
            ”
          </span>
        </div>
      </div>

      {/* Bottom Shape Divider: Inside Curve into CreativeStudio (White) */}
      <div className="w-full overflow-hidden leading-none bg-[#E8DCC6] mt-8 sm:mt-12 -mb-[1px] relative z-10">
        <svg
          viewBox="0 0 1200 80"
          preserveAspectRatio="none"
          className="relative block w-full h-8 sm:h-12 md:h-16"
        >
          <path
            d="M0,80 C300,10 900,10 1200,80 L1200,80 L0,80 Z"
            fill="#ffffff"
          />
        </svg>
      </div>

      {/* Project Detail Modal */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
        onInquire={() => {
          const contact = document.getElementById("contact");
          if (contact) contact.scrollIntoView({ behavior: "smooth" });
        }}
      />
    </section>
  );
}
