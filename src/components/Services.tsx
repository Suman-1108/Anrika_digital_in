"use client";

import React, { useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { SERVICES_DATA } from "@/lib/data";
import { ServiceItem } from "@/types";
import { EditorialStar } from "./BotanicalDecorations";
import ServiceModal from "./ServiceModal";

// Curated high-resolution visual imagery mapped to each service for the giant masked numbers
const SERVICE_IMAGES: Record<string, string> = {
  "web-development":
    "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1200&auto=format&fit=crop",
  "meta-ads":
    "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1200&auto=format&fit=crop",
  "photo-video":
    "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?q=80&w=1200&auto=format&fit=crop",
  "creative-ads":
    "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?q=80&w=1200&auto=format&fit=crop",
  "social-media":
    "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1200&auto=format&fit=crop",
  "seo-strategy":
    "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200&auto=format&fit=crop",
};

export default function Services({
  onSelectService,
}: {
  onSelectService?: (serviceTitle: string) => void;
}) {
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null);

  const handleSelectForContact = (serviceTitle: string) => {
    if (onSelectService) {
      onSelectService(serviceTitle);
    }
    const contactSection = document.getElementById("contact");
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="services"
      className="relative bg-white text-[#1a1a1a] overflow-hidden scroll-mt-20 md:scroll-mt-24"
    >
      {/* Subtle Doodle Wallpaper Texture Across the Section Background */}
      <div
        className="absolute inset-0 opacity-[0.06] bg-repeat bg-[length:400px_auto] pointer-events-none"
        style={{
          backgroundImage: "url('/images/service-doodle-pattern.jpg')",
        }}
      />

      {/* Top Shape Divider: Smooth Curve from About (#E8DCC6) into White (#ffffff) */}
      <div className="w-full overflow-hidden leading-none bg-[#E8DCC6] relative z-10">
        <svg
          viewBox="0 0 1200 80"
          preserveAspectRatio="none"
          className="relative block w-full h-8 sm:h-12 md:h-16"
        >
          <path
            d="M0,0 C300,70 900,70 1200,0 L1200,80 L0,80 Z"
            fill="#ffffff"
          />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-14 relative z-10">
        {/* Section Header: Styled like 'THE COMPLETE CREATIVE STACK!' from user reference */}
        <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-neutral-100 border border-[#722F37]/20 text-[#722F37]">
            <EditorialStar size={12} color="#722F37" />
            <span className="text-[10px] md:text-xs font-editorial-sans tracking-[0.2em] uppercase font-bold">
              SERVICES & DISCIPLINES
            </span>
          </div>

          <h2 className="font-editorial-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-[#1a1a1a] tracking-tight leading-[1.08] font-bold">
            THE COMPLETE <br className="hidden sm:inline" />
            <span className="text-[#722F37] italic font-serif">CREATIVE STACK!</span>
          </h2>

          <p className="font-editorial-sans text-sm sm:text-base text-neutral-600 max-w-2xl mx-auto leading-relaxed">
            From bespoke code architectures to algorithmic ad blitzes, cinema production, and organic brand authority, we provide end-to-end capabilities engineered to scale your market presence.
          </p>
        </div>

        {/* The 6 Services Stack: Alternating List with Image-Masked Numbers & Dividers */}
        <div className="border-t border-neutral-200">
          {SERVICES_DATA.map((service, idx) => {
            const isEven = idx % 2 === 0;
            const imageUrl =
              SERVICE_IMAGES[service.id] ||
              "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1200&auto=format&fit=crop";

            return (
              <div
                key={service.id}
                className={`flex flex-col ${
                  isEven ? "md:flex-row" : "md:flex-row-reverse"
                } items-center justify-between gap-8 md:gap-16 py-10 md:py-14 border-b border-neutral-200 group`}
              >
                {/* Text Content Column */}
                <div className="w-full md:w-1/2 space-y-4 text-left">
                  <div className="flex items-center gap-3">
                    <span className="text-[11px] font-editorial-sans tracking-[0.25em] uppercase font-bold text-[#722F37]">
                      {service.badge}
                    </span>
                    <span className="w-1.5 h-1.5 rounded-full bg-[#722F37]/40" />
                    <span className="text-xs font-editorial-sans text-neutral-400">
                      DISCIPLINE {service.number}
                    </span>
                  </div>

                  <h3
                    onClick={() => setSelectedService(service)}
                    className="font-editorial-sans text-2xl sm:text-3xl md:text-4xl text-[#1a1a1a] font-bold tracking-tight group-hover:text-[#722F37] transition-colors cursor-pointer"
                  >
                    {service.title}
                  </h3>

                  <div className="w-12 h-0.5 bg-[#722F37] rounded-full" />

                  <p className="font-editorial-sans text-sm sm:text-base text-neutral-600 leading-relaxed font-normal max-w-xl">
                    {service.description}
                  </p>

                  {/* Sub-Offerings / Deliverable Tags */}
                  <div className="flex flex-wrap gap-2 pt-1">
                    {service.items.map((item, itemIdx) => (
                      <span
                        key={itemIdx}
                        className="px-3 py-1 rounded-full text-xs font-editorial-sans bg-neutral-100 hover:bg-[#722F37]/10 text-neutral-700 hover:text-[#722F37] transition-colors border border-neutral-200/80"
                      >
                        {item}
                      </span>
                    ))}
                  </div>

                  {/* Actions: Explore Discipline Modal & Contact */}
                  <div className="flex items-center gap-4 pt-3">
                    <button
                      onClick={() => setSelectedService(service)}
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#722F37] text-white hover:bg-[#5E242B] text-xs font-editorial-sans tracking-wider uppercase font-semibold transition-all duration-300 shadow-sm hover:shadow-md focus:outline-none group/btn"
                    >
                      <span>Explore Discipline</span>
                      <ArrowUpRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
                    </button>

                    <button
                      onClick={() => handleSelectForContact(service.title)}
                      className="inline-flex items-center gap-1.5 text-xs font-editorial-sans tracking-wider uppercase font-semibold text-neutral-500 hover:text-[#722F37] transition-colors py-2 px-3 rounded-full hover:bg-neutral-100"
                    >
                      <span>Inquire Now</span>
                      <span>→</span>
                    </button>
                  </div>
                </div>

                {/* Giant Image-Masked Number Column with Doodle Pattern Background */}
                <div
                  onClick={() => setSelectedService(service)}
                  className="w-full md:w-1/2 flex items-center justify-center cursor-pointer select-none group/num"
                >
                  <div className="relative w-full max-w-[360px] sm:max-w-[420px] md:max-w-[460px] h-[230px] sm:h-[260px] md:h-[290px] rounded-3xl overflow-hidden border border-[#722F37]/15 bg-[#FAF6EE] shadow-sm hover:shadow-2xl hover:border-[#722F37]/40 transition-all duration-500 flex items-center justify-center group-hover/num:-translate-y-1">
                    {/* Doodle Pattern Background Wallpaper (from user's uploaded pattern) */}
                    <div
                      className="absolute inset-0 opacity-50 group-hover/num:opacity-75 transition-opacity duration-500 bg-repeat bg-[length:320px_auto]"
                      style={{
                        backgroundImage: "url('/images/service-doodle-pattern.jpg')",
                      }}
                    />

                    {/* Soft Editorial Vignette Gradient to keep digits crisp */}
                    <div className="absolute inset-0 bg-gradient-to-t from-white/60 via-transparent to-white/60 pointer-events-none" />
                    <div className="absolute inset-0 bg-gradient-to-r from-white/30 via-transparent to-white/30 pointer-events-none" />

                    {/* Ambient Glow */}
                    <div
                      className="absolute inset-0 max-w-[260px] h-32 mx-auto rounded-full bg-cover bg-center opacity-0 group-hover/num:opacity-25 blur-3xl transition-opacity duration-700 pointer-events-none"
                      style={{ backgroundImage: `url('${imageUrl}')` }}
                    />

                    {/* Top Badges on the Card */}
                    <div className="absolute top-3.5 left-4 right-4 flex items-center justify-between z-10 pointer-events-none">
                      <span className="text-[10px] font-editorial-sans tracking-[0.2em] uppercase font-bold text-[#722F37] bg-white/90 backdrop-blur-sm px-2.5 py-0.5 rounded-full border border-[#722F37]/15 shadow-sm">
                        DISCIPLINE // {service.number}
                      </span>
                      <span className="text-[10px] font-editorial-sans text-[#342A29]/60 font-semibold bg-white/80 backdrop-blur-sm px-2 py-0.5 rounded-full">
                        ADI • 2026
                      </span>
                    </div>

                    {/* Giant Cutout Masked Digits with Photo Fill */}
                    <div className="relative z-10 transform transition-all duration-700 ease-out group-hover/num:scale-105">
                      <span
                        className="block font-black text-8xl sm:text-9xl md:text-[140px] lg:text-[170px] xl:text-[195px] tracking-tighter leading-none bg-cover bg-center bg-clip-text text-transparent filter drop-shadow-xl transition-all duration-500"
                        style={{
                          backgroundImage: `url('${imageUrl}'), linear-gradient(135deg, #722F37 0%, #342A29 100%)`,
                          WebkitBackgroundClip: "text",
                          WebkitTextFillColor: "transparent",
                        }}
                      >
                        {service.number}
                      </span>

                      {/* Miniature Category Pill on Number */}
                      <span className="absolute -bottom-2 right-1 sm:right-2 px-3 py-1 rounded-full bg-white/95 text-[#1a1a1a] text-[10px] font-editorial-sans tracking-widest uppercase font-bold shadow-lg border border-[#722F37]/20 backdrop-blur-sm opacity-95 group-hover/num:opacity-100 transition-opacity">
                        {service.subtitle.split(" ")[0]} • {service.number}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Bottom Shape Divider: Smooth Curve into Portfolio (#E8DCC6) */}
      <div className="w-full overflow-hidden leading-none bg-white">
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

      {/* Service Detailed Modal */}
      <ServiceModal
        service={selectedService}
        onClose={() => setSelectedService(null)}
        onSelectServiceForContact={handleSelectForContact}
      />
    </section>
  );
}
