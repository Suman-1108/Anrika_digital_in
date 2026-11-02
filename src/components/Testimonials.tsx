"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Quote, ChevronLeft, ChevronRight, Sparkles, Star } from "lucide-react";
import { TESTIMONIALS_DATA } from "@/lib/data";
import { EditorialStar, CornerOrnament } from "./BotanicalDecorations";

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prev = () => {
    setCurrentIndex((prev) => (prev === 0 ? TESTIMONIALS_DATA.length - 1 : prev - 1));
  };

  const next = () => {
    setCurrentIndex((prev) => (prev === TESTIMONIALS_DATA.length - 1 ? 0 : prev + 1));
  };

  const current = TESTIMONIALS_DATA[currentIndex];

  return (
    <section
      id="testimonials"
      className="relative pt-6 pb-14 md:pt-8 md:pb-16 bg-white overflow-hidden scroll-mt-20 md:scroll-mt-24"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-6 md:mb-8 gap-4">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F5EBDD] border border-[#722F37]/25 text-[#722F37]">
              <EditorialStar size={12} color="#722F37" />
              <span className="text-[10px] md:text-xs font-editorial-sans tracking-[0.2em] uppercase font-bold">
                CLIENT PERSPECTIVES
              </span>
            </div>

            <h2 className="font-editorial-serif text-3xl sm:text-4xl md:text-5xl text-[#342A29] leading-[1.05] tracking-tight">
              VOICES OF <br />
              <span className="italic font-serif text-[#722F37] font-semibold">DISTINCTION.</span>
            </h2>

            <p className="font-editorial-sans text-sm sm:text-base text-[#342A29]/80 leading-relaxed font-normal">
              Reflections on collaboration, creative transformation, and measurable commercial
              elevation.
            </p>
          </div>

          <div className="text-right hidden md:block">
            <span className="text-xs font-editorial-sans tracking-[0.25em] text-[#722F37] uppercase font-bold block">
              ATELIER REVIEWS
            </span>
            <span className="text-xs font-editorial-sans text-[#342A29]/60">
              SAMPLE CLIENT EXPERIENCES
            </span>
          </div>
        </div>

        {/* Feature Testimonial Card */}
        <div className="relative bg-[#F5EBDD] rounded-3xl p-5 sm:p-8 md:p-10 border border-[#722F37]/20 shadow-md overflow-hidden">
          <CornerOrnament className="absolute top-6 left-6 opacity-30" />
          <CornerOrnament position="top-right" className="absolute top-6 right-6 opacity-30" />

          <div className="max-w-4xl mx-auto space-y-4 md:space-y-5 relative z-10 text-center">
            {/* Top Stars & Category */}
            <div className="flex flex-col items-center gap-2">
              <div className="flex items-center gap-1 text-[#C5A059]">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current" />
                ))}
              </div>
              <span className="text-[10px] sm:text-xs font-editorial-sans tracking-[0.25em] uppercase font-bold text-[#722F37]">
                {current.category} • {current.year}
              </span>
            </div>

            {/* Quote with AnimatePresence */}
            <AnimatePresence mode="wait">
              <motion.blockquote
                key={current.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.4 }}
                className="font-editorial-serif text-2xl sm:text-3xl md:text-4xl text-[#342A29] italic leading-snug px-4 md:px-8"
              >
                &ldquo;{current.quote}&rdquo;
              </motion.blockquote>
            </AnimatePresence>

            {/* Author Information */}
            <div className="pt-4 space-y-1">
              <h4 className="font-editorial-sans text-base sm:text-lg font-bold text-[#342A29]">
                {current.author}
              </h4>
              <p className="text-xs sm:text-sm font-editorial-sans text-[#722F37] font-medium">
                {current.title} • {current.brand}
              </p>
            </div>

            {/* Navigation Buttons */}
            <div className="flex items-center justify-center gap-3 pt-3 border-t border-[#722F37]/15">
              <button
                onClick={prev}
                className="p-3 rounded-full bg-[#E8DCC6] hover:bg-[#722F37] hover:text-[#E8DCC6] text-[#342A29] transition-all duration-300 border border-[#722F37]/20 focus:outline-none"
                aria-label="Previous testimonial"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-2">
                {TESTIMONIALS_DATA.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentIndex(idx)}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      currentIndex === idx ? "w-8 bg-[#722F37]" : "w-2 bg-[#722F37]/25"
                    }`}
                    aria-label={`Go to slide ${idx + 1}`}
                  />
                ))}
              </div>

              <button
                onClick={next}
                className="p-3 rounded-full bg-[#E8DCC6] hover:bg-[#722F37] hover:text-[#E8DCC6] text-[#342A29] transition-all duration-300 border border-[#722F37]/20 focus:outline-none"
                aria-label="Next testimonial"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

