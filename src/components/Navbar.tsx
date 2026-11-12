"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

const NAV_LINKS = [
  { name: "Home", href: "/#hero" },
  { name: "About", href: "/#about" },
  { name: "Services", href: "/#services" },
  { name: "Our Work", href: "/#portfolio" },
  { name: "Process", href: "/#process" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 30) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 font-gill bg-white/95 backdrop-blur-md border-b border-[#722F37]/15 shadow-sm ${
          scrolled ? "h-16 md:h-18" : "h-20 md:h-22"
        }`}
      >
        <div className="max-w-7xl mx-auto h-full px-6 md:px-12 flex items-center justify-between">
          {/* Brand Logo - Golden Winged Crest + ANRIKA Wordmark */}
          <Link
            href="/"
            onClick={() => setMobileMenuOpen(false)}
            className="group flex items-center gap-2.5 sm:gap-3 focus:outline-none"
            aria-label="ANRIKA DIGITAL INNOVATION Homepage"
          >
            <div className="relative w-9 h-9 sm:w-11 sm:h-11 rounded-full overflow-hidden shadow-sm border border-[#722F37]/30 shrink-0 group-hover:scale-105 group-hover:shadow-md transition-all duration-300 ring-2 ring-[#722F37]/10 bg-[#722F37]">
              <Image
                src="/images/logo_emblem.png"
                alt="ANRIKA Crest"
                fill
                sizes="(max-width: 640px) 36px, 44px"
                className="object-cover"
                priority
              />
            </div>
            <div className="flex flex-col">
              <span className="text-2xl sm:text-3xl lg:text-[34px] tracking-[0.14em] text-[#722F37] font-semibold leading-none transition-opacity hover:opacity-90 uppercase">
                ANRIKA
              </span>
              <span className="text-[8px] sm:text-[9px] tracking-[0.25em] text-[#342A29]/70 uppercase font-medium mt-0.5 hidden sm:block">
                Digital Innovation
              </span>
            </div>
          </Link>

          {/* Center Navigation Links - Clean Gill Sans text directly on ceiling */}
          <nav className="hidden md:flex items-center gap-8 lg:gap-12">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-sm lg:text-[15px] text-[#342A29] hover:text-[#722F37] transition-colors font-medium tracking-[0.06em] relative group py-1"
              >
                {link.name}
                <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-[#722F37] transition-all duration-300 group-hover:w-full" />
              </Link>
            ))}
          </nav>

          {/* Right Action - Solid Burgundy Pill 'Contact Us' */}
          <div className="hidden sm:flex items-center">
            <Link
              href="#contact"
              className="px-6 sm:px-7 py-2.5 rounded-full bg-[#722F37] hover:bg-[#581d22] text-[#F5EBDD] hover:text-white text-xs sm:text-sm font-semibold tracking-[0.06em] transition-all duration-300 shadow-sm hover:shadow-md hover:-translate-y-0.5 active:translate-y-0"
            >
              Contact Us
            </Link>
          </div>

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-full text-[#722F37] hover:bg-[#722F37]/10 transition-colors focus:outline-none"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </header>

      {/* Mobile Drawer with Clean Solid White Background */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-40 bg-white pt-24 px-6 sm:px-8 pb-8 flex flex-col justify-between overflow-y-auto md:hidden font-gill shadow-2xl"
          >
            <div className="space-y-6 pt-2">
              <div className="flex items-center justify-between pb-3 border-b border-[#722F37]/15">
                <span className="text-[11px] tracking-[0.25em] text-[#722F37] uppercase font-bold">
                  NAVIGATION
                </span>
                <span className="text-[10px] tracking-widest text-[#722F37]/60 uppercase font-semibold">
                  ATELIER MENU
                </span>
              </div>

              <div className="flex flex-col space-y-2">
                {NAV_LINKS.map((link, idx) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-2xl sm:text-3xl text-[#342A29] hover:text-[#722F37] py-2 transition-all flex items-center justify-between tracking-wide font-medium border-b border-[#722F37]/5 group"
                  >
                    <span className="group-hover:translate-x-1.5 transition-transform duration-200">
                      {link.name}
                    </span>
                    <span className="text-xs font-mono text-[#722F37] px-2.5 py-0.5 rounded-full bg-[#722F37]/10 font-semibold">
                      0{idx + 1}
                    </span>
                  </Link>
                ))}
              </div>
            </div>

            <div className="pt-6 mt-4 border-t border-[#722F37]/15 flex flex-col gap-3">
              <Link
                href="#contact"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full py-3.5 rounded-full bg-[#722F37] hover:bg-[#581d22] text-white text-center text-sm font-semibold tracking-wider shadow-md transition-all active:scale-[0.98]"
              >
                Contact Us
              </Link>
              <div className="text-center text-[11px] text-[#722F37]/80 font-medium tracking-widest uppercase pt-1">
                ANRIKA DIGITAL INNOVATION • EST. 2026
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
