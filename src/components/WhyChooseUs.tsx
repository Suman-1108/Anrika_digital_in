"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Check, Sparkles, Phone, MapPin } from "lucide-react";

interface AtelierPillar {
  number: string;
  title: string;
  description: string;
  highlight: string;
  image: string;
  headline: string;
  deliverables: string[];
}

const PILLARS: AtelierPillar[] = [
  {
    number: "01",
    title: "CREATIVE-FIRST ARCHITECTURE",
    description:
      "We reject sterile agency templates. Every layout, typography scale, and aesthetic nuance is crafted like an haute couture gallery monograph to captivate discerning audiences.",
    highlight: "Bespoke Art Direction",
    image:
      "https://images.unsplash.com/photo-1542744094-3a31f272c490?q=80&w=1200&auto=format&fit=crop",
    headline:
      "Behind the scenes: how we sculpt iconic digital identities that dominate luxury markets.",
    deliverables: ["Editorial Monograph", "Bespoke Typography", "Luxury Brand Identity"],
  },
  {
    number: "02",
    title: "NEXT-GEN SPEED & 3D WEB ENGINEERING",
    description:
      "Engineered on high-velocity Next.js 15, sub-second edge deployment, and fluid interactive physics, guaranteeing 100/100 Google PageSpeed and flawless luxury fidelity.",
    highlight: "High-Performance Stack",
    image:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200&auto=format&fit=crop",
    headline:
      "Sub-second edge velocity paired with interactive WebGL shader transitions.",
    deliverables: ["Next.js 15 App Router", "WebGL / Three.js Interaction", "100/100 PageSpeed"],
  },
  {
    number: "03",
    title: "ALGORITHMIC META ADS & COMMERCIAL SCALE",
    description:
      "Paid acquisition, predictive creative testing, and multi-tier audience funnels engineered strictly around measurable revenue return rather than hollow vanity metrics.",
    highlight: "Proven ROAS Multipliers",
    image:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1200&auto=format&fit=crop",
    headline:
      "Conversion-optimized algorithmic advertising driving exceptional client revenue.",
    deliverables: ["Full-Funnel Meta Strategy", "A/B Dynamic Ad Variants", "Predictive Scaling"],
  },
  {
    number: "04",
    title: "BROADCAST-GRADE CINEMA & STILL PRODUCTION",
    description:
      "In-house cinema lenses, master lighting rigs, macro horological optics, and skilled art directors producing commercial photography and video of international distinction.",
    highlight: "In-House Film Studio",
    image:
      "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?q=80&w=1200&auto=format&fit=crop",
    headline:
      "Anamorphic cinema optics and macro commercial lighting captured in our private studio.",
    deliverables: ["Commercial Hero Films", "Editorial Macro Stills", "High-Resolution Motion"],
  },
  {
    number: "05",
    title: "END-TO-END INTEGRATED STRATEGIC PARTNERSHIP",
    description:
      "From code to commercial film: one unified atelier delivering seamless brand dominance from initial brand positioning to sustainable global market expansion.",
    highlight: "Full-Funnel Alignment",
    image:
      "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1200&auto=format&fit=crop",
    headline:
      "One synchronized partner delivering an integrated, high-velocity digital ecosystem.",
    deliverables: ["Strategic Consultation", "Conversion Optimization", "Global Brand Scale"],
  },
];

export default function WhyChooseUs() {
  const [activePoint, setActivePoint] = useState(0);
  const pointRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Highly responsive viewport scroll tracker: updates active pillar as user scrolls
  useEffect(() => {
    const handleScroll = () => {
      const triggerY = window.innerHeight * 0.42; // Focal center line of the reading screen
      let bestIndex = 0;
      let minDistance = Infinity;

      pointRefs.current.forEach((el, index) => {
        if (!el) return;
        const rect = el.getBoundingClientRect();
        // Measure distance of the card center from the trigger line
        const cardCenter = rect.top + rect.height * 0.4;
        const distance = Math.abs(cardCenter - triggerY);
        if (distance < minDistance) {
          minDistance = distance;
          bestIndex = index;
        }
      });

      setActivePoint((prev) => (prev !== bestIndex ? bestIndex : prev));
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const currentPillar = PILLARS[activePoint] || PILLARS[0];

  return (
    <section
      id="why-choose-us"
      className="w-full bg-[#E8DCC6] text-[#342A29] py-14 sm:py-18 md:py-20 border-t border-b border-[#722F37]/15 relative scroll-mt-20 md:scroll-mt-24"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Centered Section Title Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16 space-y-2.5">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#F5EBDD] border border-[#722F37]/25 text-[#722F37]">
            <Sparkles className="w-3.5 h-3.5" />
            <span className="text-[10px] md:text-xs font-editorial-sans tracking-[0.25em] uppercase font-bold">
              THE ANRIKA STANDARD
            </span>
          </div>

          <h2 className="font-editorial-serif text-3xl sm:text-4xl md:text-5xl text-[#342A29] leading-tight font-normal">
            WHY PARTNER WITH US
          </h2>

          <p className="font-editorial-sans text-xs sm:text-sm md:text-base text-[#342A29]/75 max-w-xl mx-auto leading-relaxed">
            We bridge the gap between high-art creative distinction and ruthless algorithmic commercial performance.
          </p>
        </div>

        {/* 2-Column Split: Left Side (5 Points Scrollable Grid) + Right Side (Frozen Sticky Preview Card) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start relative">
          
          {/* Left Column: 5 Scrollable Points Grid */}
          <div className="lg:col-span-6 space-y-5 sm:space-y-6">
            {PILLARS.map((pillar, index) => {
              const isActive = activePoint === index;

              return (
                <div
                  key={pillar.number}
                  ref={(el) => {
                    pointRefs.current[index] = el;
                  }}
                  data-index={index}
                  onClick={() => setActivePoint(index)}
                  onMouseEnter={() => setActivePoint(index)}
                  className={`cursor-pointer rounded-2xl p-5 sm:p-6 transition-all duration-300 border min-h-[150px] flex flex-col justify-between ${
                    isActive
                      ? "bg-[#F5EBDD] border-[#722F37]/35 shadow-md -translate-y-1 ring-1 ring-[#722F37]/20"
                      : "bg-[#F5EBDD]/40 border-[#722F37]/10 hover:bg-[#F5EBDD]/70 hover:border-[#722F37]/25"
                  }`}
                >
                  <div className="space-y-3">
                    {/* Top Row: Number + Horizontal Dash + Title + Highlight Tag */}
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-center gap-2.5">
                        <span
                          className={`font-editorial-serif text-xl sm:text-2xl font-light transition-colors w-7 ${
                            isActive ? "text-[#722F37] font-semibold" : "text-[#342A29]/50"
                          }`}
                        >
                          {pillar.number}
                        </span>
                        <span
                          className={`h-[1.5px] transition-all duration-300 ${
                            isActive ? "w-8 bg-[#722F37]" : "w-5 bg-[#722F37]/20"
                          }`}
                        />
                        <h3
                          className={`font-editorial-sans text-xs sm:text-sm font-semibold tracking-wide uppercase transition-colors ${
                            isActive ? "text-[#722F37]" : "text-[#342A29]"
                          }`}
                        >
                          {pillar.title}
                        </h3>
                      </div>

                      <span
                        className={`text-[9px] font-editorial-sans tracking-widest uppercase px-2 py-0.5 rounded shrink-0 transition-colors ${
                          isActive
                            ? "bg-[#722F37] text-[#F5EBDD]"
                            : "bg-[#E8DCC6]/60 text-[#342A29]/60"
                        }`}
                      >
                        {pillar.highlight}
                      </span>
                    </div>

                    {/* Description */}
                    <p className="font-editorial-sans text-xs sm:text-[13px] text-[#342A29]/80 leading-relaxed font-normal pl-9.5 sm:pl-10">
                      {pillar.description}
                    </p>
                  </div>

                  {/* Active Indicator Line */}
                  <div className="pt-2 pl-9.5 sm:pl-10 flex items-center justify-between text-[10px] font-editorial-sans text-[#722F37]">
                    <span className={`tracking-wider transition-opacity duration-300 ${isActive ? "opacity-100 font-semibold" : "opacity-0"}`}>
                      ACTIVE STANDARD
                    </span>
                    <span className={`w-1.5 h-1.5 rounded-full bg-[#722F37] transition-transform duration-300 ${isActive ? "scale-100" : "scale-0"}`} />
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right Column: Frozen Sticky Preview Card at the Top */}
          <div className="lg:col-span-6 lg:sticky lg:top-28 z-20 self-start">
            <div className="bg-[#F5EBDD] rounded-2xl p-5 sm:p-6 border border-[#722F37]/20 shadow-lg space-y-4">
              
              {/* Image Container with Dynamic Cross-Fade Transition */}
              <div className="relative aspect-[4/3] w-full rounded-xl overflow-hidden bg-neutral-900 shadow-md">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentPillar.number}
                    initial={{ opacity: 0, scale: 0.97 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.97 }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                    className="absolute inset-0"
                  >
                    <Image
                      src={currentPillar.image}
                      alt={currentPillar.title}
                      fill
                      unoptimized
                      priority
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      className="object-cover filter brightness-95"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-transparent to-transparent pointer-events-none" />
                  </motion.div>
                </AnimatePresence>

                {/* Progress Pill on Image */}
                <div className="absolute top-3 left-3 z-10 px-3 py-1 rounded-full bg-[#342A29]/75 backdrop-blur-md text-[#F5EBDD] border border-white/10 text-[10px] font-editorial-sans tracking-widest uppercase">
                  Pillar {currentPillar.number} of 05
                </div>

                {/* Bottom Overlay Label */}
                <div className="absolute bottom-3 left-3 right-3 z-10 text-white">
                  <span className="text-[10px] font-editorial-sans tracking-[0.2em] uppercase text-[#F5EBDD]/80 block">
                    {currentPillar.highlight}
                  </span>
                  <p className="font-editorial-serif text-sm sm:text-base text-white truncate font-medium">
                    {currentPillar.title}
                  </p>
                </div>
              </div>

              {/* Dynamic Headline Description */}
              <div className="space-y-2 pt-1">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] sm:text-[11px] font-editorial-sans tracking-[0.25em] uppercase text-[#722F37] font-semibold block">
                    FEATURED DISTINCTION
                  </span>
                  <span className="text-[10px] font-editorial-sans text-[#342A29]/60">
                    Scroll left grid to cycle
                  </span>
                </div>

                <AnimatePresence mode="wait">
                  <motion.h4
                    key={currentPillar.number}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.3 }}
                    className="font-editorial-serif text-lg sm:text-xl md:text-2xl text-[#342A29] leading-snug font-normal min-h-[56px]"
                  >
                    {currentPillar.headline}
                  </motion.h4>
                </AnimatePresence>

                {/* Deliverables Tags */}
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {currentPillar.deliverables.map((item, idx) => (
                    <span
                      key={idx}
                      className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-[#E8DCC6] text-[#342A29] text-[10px] font-editorial-sans tracking-wider font-medium border border-[#722F37]/15"
                    >
                      <Check className="w-2.5 h-2.5 text-[#722F37]" />
                      {item}
                    </span>
                  ))}
                </div>
              </div>

            </div>
          </div>

        </div>

        {/* Bottom Minimal Studio Contact & Location Bar */}
        <div className="mt-12 sm:mt-16 pt-5 border-t border-[#722F37]/15 flex flex-col sm:flex-row items-center justify-between text-xs font-editorial-sans text-[#342A29]/65 gap-3">
          <div className="flex items-center gap-2">
            <Phone className="w-3.5 h-3.5 text-[#722F37]" />
            <span>For bespoke atelier inquiries: </span>
            <a
              href="mailto:contact@anrikadigital.com"
              className="font-medium text-[#342A29] hover:text-[#722F37] transition-colors"
            >
              contact@anrikadigital.com
            </a>
          </div>

          <div className="flex items-center gap-2">
            <MapPin className="w-3.5 h-3.5 text-[#722F37]" />
            <span>Global Creative Studio • Operating Worldwide • Est. 2026</span>
          </div>
        </div>

      </div>
    </section>
  );
}
