"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2, ChevronRight } from "lucide-react";
import { PROCESS_DATA } from "@/lib/data";
import { EditorialStar, CornerOrnament } from "./BotanicalDecorations";

export default function Process() {
  const [activeStep, setActiveStep] = useState(0);

  return (
    <>
      {/* Studio Impact Metric Strip with Organic Wave Edge (Matching Reference) */}
      <div className="relative bg-[#722F37] text-white pt-10 sm:pt-14 overflow-hidden">
        {/* Subtle Dotted Pattern Overlay (Exact match to reference) */}
        <div
          className="absolute inset-0 opacity-20 pointer-events-none"
          style={{
            backgroundImage:
              "radial-gradient(rgba(255, 255, 255, 0.4) 1.2px, transparent 1.2px)",
            backgroundSize: "24px 24px",
          }}
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 pb-5 sm:pb-7">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 text-center">
            {/* Stat 1 */}
            <div className="space-y-1.5 sm:space-y-2">
              <span className="block font-editorial-sans text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight">
                98%
              </span>
              <div className="w-8 sm:w-10 h-0.5 sm:h-1 bg-[#E06D7A] rounded-full mx-auto" />
              <span className="block text-[10px] sm:text-xs font-editorial-sans tracking-[0.2em] uppercase font-bold text-white/90">
                Campaign Success Rate
              </span>
            </div>

            {/* Stat 2 */}
            <div className="space-y-1.5 sm:space-y-2">
              <span className="block font-editorial-sans text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight">
                250K+
              </span>
              <div className="w-8 sm:w-10 h-0.5 sm:h-1 bg-[#E06D7A] rounded-full mx-auto" />
              <span className="block text-[10px] sm:text-xs font-editorial-sans tracking-[0.2em] uppercase font-bold text-white/90">
                Qualified Leads Generated
              </span>
            </div>

            {/* Stat 3 */}
            <div className="space-y-1.5 sm:space-y-2">
              <span className="block font-editorial-sans text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight">
                3.8X
              </span>
              <div className="w-8 sm:w-10 h-0.5 sm:h-1 bg-[#E06D7A] rounded-full mx-auto" />
              <span className="block text-[10px] sm:text-xs font-editorial-sans tracking-[0.2em] uppercase font-bold text-white/90">
                Average ROAS Return
              </span>
            </div>

            {/* Stat 4 */}
            <div className="space-y-1.5 sm:space-y-2">
              <span className="block font-editorial-sans text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight">
                18 Days
              </span>
              <div className="w-8 sm:w-10 h-0.5 sm:h-1 bg-[#E06D7A] rounded-full mx-auto" />
              <span className="block text-[10px] sm:text-xs font-editorial-sans tracking-[0.2em] uppercase font-bold text-white/90">
                Time to Initial Conversion
              </span>
            </div>
          </div>
        </div>

        {/* Fluid Organic Wave Edge Divider (Exact match to reference) */}
        <div className="w-full overflow-hidden leading-none -mb-[1px]">
          <svg
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
            className="relative block w-full h-12 sm:h-16 md:h-20"
          >
            <path
              d="M0,60 C150,95 240,15 360,25 C480,35 540,90 660,85 C780,80 840,15 960,20 C1080,25 1140,85 1200,60 L1200,120 L0,120 Z"
              fill="#ffffff"
            />
          </svg>
        </div>
      </div>

      <section
        id="process"
        className="relative pt-4 pb-12 md:pt-6 md:pb-14 bg-white overflow-hidden scroll-mt-20 md:scroll-mt-24"
      >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-6 md:mb-8 gap-4">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F5EBDD] border border-[#722F37]/25 text-[#722F37]">
              <EditorialStar size={12} color="#722F37" />
              <span className="text-[10px] md:text-xs font-editorial-sans tracking-[0.2em] uppercase font-bold">
                METHODOLOGY & EXECUTION
              </span>
            </div>

            <h2 className="font-editorial-serif text-3xl sm:text-4xl md:text-5xl text-[#342A29] leading-[1.05] tracking-tight">
              OUR WORKING <br />
              <span className="italic font-serif text-[#722F37] font-semibold">PROCESS.</span>
            </h2>

            <p className="font-editorial-sans text-sm sm:text-base text-[#342A29]/80 leading-relaxed font-normal">
              A disciplined five-stage progression engineered to eliminate ambiguity, amplify creative
              velocity, and maximize commercial return.
            </p>
          </div>

          <div className="text-right hidden md:block">
            <span className="text-xs font-editorial-sans tracking-[0.25em] text-[#722F37] uppercase font-bold block">
              5-STAGE CYCLE
            </span>
            <span className="text-xs font-editorial-sans text-[#342A29]/60">
              DISCOVER TO EXPAND
            </span>
          </div>
        </div>

        {/* Step Selector Horizontal Pills */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2.5 sm:gap-3 mb-4 md:mb-5">
          {PROCESS_DATA.map((step, idx) => {
            const isActive = activeStep === idx;
            return (
              <button
                key={step.number}
                onClick={() => setActiveStep(idx)}
                className={`p-4 rounded-2xl text-left border transition-all duration-300 focus:outline-none flex flex-col justify-between ${
                  isActive
                    ? "bg-[#722F37] text-[#E8DCC6] border-[#722F37] shadow-lg -translate-y-1"
                    : "bg-[#F5EBDD]/70 text-[#342A29] border-[#722F37]/15 hover:border-[#722F37]/35 hover:bg-[#F5EBDD] shadow-sm"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span
                    className={`font-editorial-serif text-xl font-bold ${
                      isActive ? "text-[#E8DCC6]" : "text-[#722F37]"
                    }`}
                  >
                    {step.number}
                  </span>
                  <ChevronRight
                    className={`w-4 h-4 transition-transform ${
                      isActive ? "translate-x-1 text-[#E8DCC6]" : "text-[#342A29]/40"
                    }`}
                  />
                </div>
                <div className="mt-3">
                  <span
                    className={`text-xs font-editorial-sans tracking-wider uppercase font-bold block ${
                      isActive ? "text-[#E8DCC6]" : "text-[#342A29]"
                    }`}
                  >
                    {step.title}
                  </span>
                  <span
                    className={`text-[10px] font-editorial-sans block truncate ${
                      isActive ? "text-[#E8DCC6]/70" : "text-[#342A29]/60"
                    }`}
                  >
                    {step.subtitle}
                  </span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Active Stage Detailed Display Card */}
        <motion.div
          key={activeStep}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="bg-[#F5EBDD] rounded-3xl p-5 md:p-6 border border-[#722F37]/20 shadow-md relative overflow-hidden"
        >
          <CornerOrnament className="absolute top-6 left-6 opacity-30" />
          <CornerOrnament position="top-right" className="absolute top-6 right-6 opacity-30" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-center relative z-10">
            <div className="lg:col-span-7 space-y-2.5">
              <div className="flex items-center gap-3">
                <span className="font-editorial-serif text-3xl sm:text-4xl font-bold text-[#722F37]">
                  {PROCESS_DATA[activeStep].number}
                </span>
                <span className="text-xs font-editorial-sans tracking-[0.25em] text-[#9A515A] uppercase font-bold">
                  {PROCESS_DATA[activeStep].subtitle}
                </span>
              </div>

              <h3 className="font-editorial-serif text-xl sm:text-2xl text-[#342A29]">
                Stage {PROCESS_DATA[activeStep].number}: {PROCESS_DATA[activeStep].title}
              </h3>

              <p className="font-editorial-sans text-xs sm:text-sm text-[#342A29]/80 leading-relaxed">
                {PROCESS_DATA[activeStep].description}
              </p>
            </div>

            <div className="lg:col-span-5 bg-[#E8DCC6]/60 rounded-2xl p-4 md:p-5 border border-[#722F37]/15 space-y-2.5">
              <span className="text-[10px] font-editorial-sans tracking-[0.2em] uppercase font-bold text-[#722F37] block">
                DELIVERABLE MILESTONES
              </span>
              <div className="space-y-2.5">
                {PROCESS_DATA[activeStep].details.map((detail, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-2.5 text-xs font-editorial-sans text-[#342A29]"
                  >
                    <CheckCircle2 className="w-4 h-4 text-[#722F37] shrink-0" />
                    <span>{detail}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
    </>
  );
}

