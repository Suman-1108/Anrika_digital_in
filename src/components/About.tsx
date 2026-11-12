"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  Compass,
  Lightbulb,
  Eye,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
} from "lucide-react";
import { BotanicalBranch, EditorialStar, CornerOrnament } from "./BotanicalDecorations";

export default function About() {
  const [activeTab, setActiveTab] = useState<"mission" | "vision" | "philosophy">("mission");

  return (
    <section
      id="about"
      className="relative py-10 md:py-12 bg-[#E8DCC6] overflow-hidden border-t border-[#722F37]/15 scroll-mt-20 md:scroll-mt-24"
    >
      {/* Botanical Accents */}
      <div className="absolute -bottom-12 -left-12 w-64 h-80 pointer-events-none opacity-25">
        <BotanicalBranch />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header with Editorial Tag */}
        <div className="flex flex-col items-start space-y-3 max-w-3xl mb-6 md:mb-8">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#F5EBDD] border border-[#722F37]/25 text-[#722F37]">
            <EditorialStar size={12} color="#722F37" />
            <span className="text-[10px] md:text-xs font-editorial-sans tracking-[0.2em] uppercase font-bold">
              ABOUT OUR ATELIER
            </span>
          </div>

          <h2 className="font-editorial-serif text-4xl sm:text-5xl md:text-6xl text-[#342A29] leading-[1.05] tracking-tight">
            CREATIVITY MEETS <br />
            <span className="italic font-serif text-[#722F37] font-semibold">TECHNOLOGY.</span>
          </h2>

          <p className="font-editorial-sans text-base sm:text-lg text-[#342A29]/80 leading-relaxed font-normal pt-2">
            Anrika Digital Innovation is a creative digital agency established in 2026. We combine
            technology, creativity, and strategic thinking to help businesses establish their
            digital presence and reach their audience.
          </p>
        </div>

        {/* Asymmetrical Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-6 items-stretch">
          {/* Left Column: Editorial Philosophy Canvas / Manifesto Card (7 cols) */}
          <div className="lg:col-span-7 bg-[#F5EBDD] rounded-3xl p-5 md:p-6 border border-[#722F37]/20 shadow-sm relative overflow-hidden flex flex-col justify-between">
            <CornerOrnament className="absolute top-6 left-6 opacity-40" />
            <CornerOrnament position="top-right" className="absolute top-6 right-6 opacity-40" />

            <div className="space-y-4 pt-2 relative z-10">
              <div className="flex items-center justify-between border-b border-[#722F37]/15 pb-3">
                <span className="text-xs font-editorial-sans tracking-[0.25em] text-[#722F37] uppercase font-bold">
                  MANIFESTO // EST. 2026
                </span>
                <span className="text-xs font-editorial-sans text-[#342A29]/60">
                  DIGITAL ARCHITECTURE & CINEMA
                </span>
              </div>

              <blockquote className="font-editorial-serif text-xl sm:text-2xl md:text-3xl text-[#342A29] italic leading-snug">
                &ldquo;We reject the mundane commoditization of agency templates. Every website,
                every Meta campaign, and every cinema frame must echo luxury, purpose, and
                unapologetic craftsmanship.&rdquo;
              </blockquote>

              <p className="font-editorial-sans text-sm sm:text-base text-[#342A29]/75 leading-relaxed">
                Founded with a conviction that digital touchpoints should resonate like physical
                flagships, Anrika Digital Innovation blends cutting-edge web technologies (Next.js,
                Three.js) with commercial art direction, algorithmic advertising, and high-fashion
                editorial design.
              </p>
            </div>

            {/* Interactive Pillar Tabs */}
            <div className="mt-6 pt-5 border-t border-[#722F37]/15">
              <div className="flex flex-wrap gap-2 mb-4">
                <button
                  onClick={() => setActiveTab("mission")}
                  className={`px-4 py-2 rounded-full text-xs font-editorial-sans tracking-wider uppercase font-semibold transition-all ${
                    activeTab === "mission"
                      ? "bg-[#722F37] text-[#E8DCC6] shadow-sm"
                      : "bg-[#E8DCC6]/60 text-[#342A29] hover:bg-[#E8DCC6]"
                  }`}
                >
                  Our Mission
                </button>
                <button
                  onClick={() => setActiveTab("vision")}
                  className={`px-4 py-2 rounded-full text-xs font-editorial-sans tracking-wider uppercase font-semibold transition-all ${
                    activeTab === "vision"
                      ? "bg-[#722F37] text-[#E8DCC6] shadow-sm"
                      : "bg-[#E8DCC6]/60 text-[#342A29] hover:bg-[#E8DCC6]"
                  }`}
                >
                  Our Vision
                </button>
                <button
                  onClick={() => setActiveTab("philosophy")}
                  className={`px-4 py-2 rounded-full text-xs font-editorial-sans tracking-wider uppercase font-semibold transition-all ${
                    activeTab === "philosophy"
                      ? "bg-[#722F37] text-[#E8DCC6] shadow-sm"
                      : "bg-[#E8DCC6]/60 text-[#342A29] hover:bg-[#E8DCC6]"
                  }`}
                >
                  Working Philosophy
                </button>
              </div>

              <div className="p-4 sm:p-5 rounded-2xl bg-[#E8DCC6]/50 border border-[#722F37]/10 min-h-[85px] flex items-center">
                {activeTab === "mission" && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-start gap-3.5"
                  >
                    <div className="p-2.5 rounded-xl bg-[#722F37] text-[#E8DCC6] mt-0.5">
                      <Compass className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-editorial-serif text-lg font-bold text-[#722F37]">
                        Mission
                      </h4>
                      <p className="text-xs sm:text-sm text-[#342A29]/80 font-editorial-sans leading-relaxed">
                        To empower emerging and established brands with world-class digital platforms,
                        precision marketing, and evocative media that drive both prestige and
                        measurable revenue growth.
                      </p>
                    </div>
                  </motion.div>
                )}

                {activeTab === "vision" && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-start gap-3.5"
                  >
                    <div className="p-2.5 rounded-xl bg-[#722F37] text-[#E8DCC6] mt-0.5">
                      <Eye className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-editorial-serif text-lg font-bold text-[#722F37]">
                        Vision
                      </h4>
                      <p className="text-xs sm:text-sm text-[#342A29]/80 font-editorial-sans leading-relaxed">
                        To be the defining digital creative atelier of the post-2026 era, celebrated
                        internationally for pioneering 3D web design, cinema-grade commercial
                        advertising, and high-conversion algorithmic marketing.
                      </p>
                    </div>
                  </motion.div>
                )}

                {activeTab === "philosophy" && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-start gap-3.5"
                  >
                    <div className="p-2.5 rounded-xl bg-[#722F37] text-[#E8DCC6] mt-0.5">
                      <Sparkles className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-editorial-serif text-lg font-bold text-[#722F37]">
                        Creative Philosophy
                      </h4>
                      <p className="text-xs sm:text-sm text-[#342A29]/80 font-editorial-sans leading-relaxed">
                        Form honors function; artistry honors conversion. We refuse to compromise
                        speed for beauty or sacrifice elegance for algorithms. We orchestrate both
                        in symphony.
                      </p>
                    </div>
                  </motion.div>
                )}
              </div>
            </div>
          </div>

          {/* Right Column: Editorial Visual Showcase & Capability Badges (5 cols) */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-4">
            {/* Visual Editorial Collage Card */}
            <div className="relative rounded-3xl bg-[#B7A89A]/30 border border-[#722F37]/20 p-5 md:p-6 flex flex-col justify-between overflow-hidden group">
              <div className="space-y-2.5 relative z-10">
                <span className="text-[10px] font-editorial-sans tracking-[0.2em] uppercase font-bold text-[#722F37]">
                  FULL-SPECTRUM MASTERY
                </span>
                <h3 className="font-editorial-serif text-2xl sm:text-3xl text-[#342A29] leading-tight">
                  One Synchronized Creative Studio.
                </h3>
                <p className="text-xs sm:text-sm font-editorial-sans text-[#342A29]/75 leading-relaxed">
                  No disjointed freelancers or fragmented handoffs. From lines of code to cinematic
                  lighting, your digital ecosystem is sculpted under a unified artistic vision.
                </p>
              </div>

              {/* Checklist */}
              <div className="mt-5 space-y-2.5 relative z-10">
                {[
                  "Tailored Next.js & Three.js Architecture",
                  "Performance Meta & Instagram Advertising",
                  "In-House Commercial Cinema & Stills",
                  "High-End Brand Strategy & SEO Authority",
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-xs font-editorial-sans text-[#342A29]/85 font-medium">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#722F37] shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>

              {/* Decorative background geometry */}
              <div className="absolute -right-16 -bottom-16 w-56 h-56 rounded-full border border-[#722F37]/15 pointer-events-none group-hover:scale-105 transition-transform duration-700" />
            </div>

            {/* Quick Quote / Highlight with Official Logo Emblem */}
            <div className="p-4 md:p-5 rounded-3xl bg-[#722F37] text-[#E8DCC6] flex items-center justify-between gap-3 shadow-sm border border-[#E8DCC6]/15">
              <div className="space-y-1">
                <span className="text-[9px] font-editorial-sans tracking-[0.25em] uppercase text-[#E8DCC6]/70 font-semibold block">
                  THE ATELIER EMBLEM // EST. 2026
                </span>
                <p className="font-editorial-serif text-xl sm:text-2xl italic text-[#F5EBDD]">
                  &ldquo;We Create. We Innovate. We Elevate.&rdquo;
                </p>
              </div>
              <div className="relative w-12 h-12 sm:w-14 sm:h-14 rounded-full overflow-hidden border-2 border-[#E8DCC6]/40 shadow-md shrink-0 bg-[#581d22]">
                <Image
                  src="/images/logo_emblem.png"
                  alt="ANRIKA Seal"
                  fill
                  sizes="56px"
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

