"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowUp, Instagram, Mail, Linkedin, Check } from "lucide-react";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes("@")) return;
    setSubscribed(true);
    setTimeout(() => {
      setSubscribed(false);
      setEmail("");
    }, 4000);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="w-full bg-[#E8DCC6] text-[#342A29] pt-10 sm:pt-12 md:pt-14 pb-6 sm:pb-8 border-t border-[#722F37]/20 relative z-20">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
        
        {/* Top Tier: Left Column (Vision + Newsletter + Socials) & Right Columns (Nav) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-10 items-start pb-8 sm:pb-10 border-b border-[#722F37]/15">
          
          {/* Left Column: Brand Vision + Newsletter + Social Links */}
          <div className="lg:col-span-5 space-y-6">
            <div className="flex items-center gap-3.5">
              <div className="relative w-11 h-11 sm:w-12 sm:h-12 rounded-full overflow-hidden shadow-sm border border-[#722F37]/30 shrink-0 bg-[#722F37] ring-2 ring-[#722F37]/15">
                <Image
                  src="/images/anrika-emblem.jpg"
                  alt="ANRIKA Crest"
                  fill
                  sizes="48px"
                  className="object-cover"
                />
              </div>
              <div>
                <h3 className="text-[#342A29] text-base sm:text-lg font-semibold tracking-tight">
                  Create Different <span className="text-xs text-[#722F37] align-top font-normal">™</span>
                </h3>
                <p className="text-xs text-[#342A29]/70 mt-0.5">
                  Luxury Digital Innovation Studio — Est. 2026
                </p>
              </div>
            </div>

            {/* Email Subscription Bar in Site Brand Colors (Burgundy Button) */}
            <form onSubmit={handleSubscribe} className="space-y-2">
              <div className="flex items-center gap-2 max-w-md">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="email@gmail.com"
                  required
                  className="flex-1 bg-white/70 border border-[#722F37]/25 hover:border-[#722F37]/50 focus:border-[#722F37] text-[#342A29] placeholder-[#342A29]/50 text-xs sm:text-sm px-4 py-3 rounded-lg outline-none transition-colors"
                />
                <button
                  type="submit"
                  className="bg-[#722F37] hover:bg-[#581d22] text-[#F5EBDD] font-semibold text-xs sm:text-sm px-5 py-3 rounded-lg whitespace-nowrap transition-all shadow-sm active:scale-95"
                >
                  {subscribed ? "Subscribed!" : "Join for free"}
                </button>
              </div>
              {subscribed && (
                <p className="text-[11px] text-[#722F37] flex items-center gap-1.5 pt-1 font-medium">
                  <Check className="w-3.5 h-3.5" /> Welcome to Anrika Digital Innovation.
                </p>
              )}
            </form>

            {/* Circular Social Outline Buttons in Site Brand Colors */}
            <div className="flex items-center gap-3 pt-1">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="w-10 h-10 rounded-full border border-[#722F37]/25 hover:border-[#722F37] hover:bg-[#722F37] hover:text-[#F5EBDD] text-[#722F37] flex items-center justify-center transition-all duration-200"
              >
                <Instagram className="w-4 h-4" />
              </a>

              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Twitter / X"
                className="w-10 h-10 rounded-full border border-[#722F37]/25 hover:border-[#722F37] hover:bg-[#722F37] hover:text-[#F5EBDD] text-[#722F37] flex items-center justify-center transition-all duration-200"
              >
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>

              <a
                href="mailto:contact@anrikadigital.com"
                aria-label="Email Us"
                className="w-10 h-10 rounded-full border border-[#722F37]/25 hover:border-[#722F37] hover:bg-[#722F37] hover:text-[#F5EBDD] text-[#722F37] flex items-center justify-center transition-all duration-200"
              >
                <Mail className="w-4 h-4" />
              </a>

              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="w-10 h-10 rounded-full border border-[#722F37]/25 hover:border-[#722F37] hover:bg-[#722F37] hover:text-[#F5EBDD] text-[#722F37] flex items-center justify-center transition-all duration-200"
              >
                <Linkedin className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Right Columns: 3 Navigation Link Columns with Working Links in Site Colors */}
          <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-8 lg:pl-10">
            {/* Column 1: Services */}
            <div className="space-y-4">
              <h3 className="text-xs sm:text-sm font-semibold tracking-wider uppercase text-[#342A29]">
                Find Work
              </h3>
              <ul className="space-y-3 text-xs sm:text-sm text-[#342A29]/75">
                <li>
                  <Link href="/services" className="hover:text-[#722F37] transition-colors block">
                    Explore Services
                  </Link>
                </li>
                <li>
                  <Link href="/#services" className="hover:text-[#722F37] transition-colors block">
                    Website Development
                  </Link>
                </li>
                <li>
                  <Link href="/#services" className="hover:text-[#722F37] transition-colors block">
                    Meta Ads & Growth
                  </Link>
                </li>
                <li>
                  <Link href="/portfolio" className="hover:text-[#722F37] transition-colors block">
                    Browse Collections
                  </Link>
                </li>
              </ul>
            </div>

            {/* Column 2: Discover & Process */}
            <div className="space-y-4">
              <h3 className="text-xs sm:text-sm font-semibold tracking-wider uppercase text-[#342A29]">
                Find People
              </h3>
              <ul className="space-y-3 text-xs sm:text-sm text-[#342A29]/75">
                <li>
                  <Link href="/about" className="hover:text-[#722F37] transition-colors block">
                    Learn More
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="hover:text-[#722F37] transition-colors block">
                    Sign up
                  </Link>
                </li>
                <li>
                  <Link href="/#process" className="hover:text-[#722F37] transition-colors block">
                    Our Process
                  </Link>
                </li>
                <li>
                  <Link href="/#testimonials" className="hover:text-[#722F37] transition-colors block">
                    Client Stories
                  </Link>
                </li>
              </ul>
            </div>

            {/* Column 3: Company */}
            <div className="space-y-4 col-span-2 sm:col-span-1">
              <h3 className="text-xs sm:text-sm font-semibold tracking-wider uppercase text-[#342A29]">
                Company
              </h3>
              <ul className="space-y-3 text-xs sm:text-sm text-[#342A29]/75">
                <li>
                  <Link href="/about" className="hover:text-[#722F37] transition-colors block">
                    About us
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="hover:text-[#722F37] transition-colors block">
                    Careers
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="hover:text-[#722F37] transition-colors block">
                    Contact
                  </Link>
                </li>
                <li>
                  <Link href="/#why-choose-us" className="hover:text-[#722F37] transition-colors block">
                    Why Choose Us
                  </Link>
                </li>
              </ul>
            </div>
          </div>

        </div>

        {/* Giant Title Case Wordmark: "Anrika" (Tight, Compact Spacing without Unwanted Gaps) */}
        <div className="w-full py-2 sm:py-3 md:py-4 select-none overflow-hidden text-center pointer-events-none">
          <h2 className="text-[17vw] sm:text-[18vw] font-bold text-[#722F37] tracking-tight leading-[0.75] select-none block m-0 p-0 whitespace-nowrap">
            Anrika
          </h2>
        </div>

        {/* Bottom Bar: Brand Logo & Legal Links in Site Colors */}
        <div className="pt-4 sm:pt-5 border-t border-[#722F37]/20 flex flex-col sm:flex-row items-center justify-between text-xs text-[#342A29]/70 gap-3">
          <div className="flex items-center gap-2.5">
            <div className="relative w-6 h-6 rounded-full overflow-hidden border border-[#722F37]/30 shrink-0 bg-[#722F37]">
              <Image
                src="/images/anrika-emblem.jpg"
                alt="ANRIKA Logo"
                fill
                sizes="24px"
                className="object-cover"
              />
            </div>
            <span className="font-bold tracking-widest uppercase text-[#722F37] text-sm">
              ANRIKA
            </span>
            <span className="text-[#722F37]/40">•</span>
            <span>© 2026 ANRIKA DIGITAL INNOVATION. All rights reserved.</span>
          </div>

          <div className="flex items-center gap-5 sm:gap-6">
            <Link href="/about" className="hover:text-[#722F37] transition-colors">
              About Anrika
            </Link>
            <Link href="/services" className="hover:text-[#722F37] transition-colors">
              Services
            </Link>
            <Link href="/contact" className="hover:text-[#722F37] transition-colors">
              Privacy
            </Link>
            <Link href="/contact" className="hover:text-[#722F37] transition-colors">
              Terms
            </Link>
            <button
              onClick={scrollToTop}
              className="p-2 rounded-full border border-[#722F37]/25 hover:bg-[#722F37] hover:text-[#F5EBDD] text-[#722F37] transition-colors flex items-center justify-center ml-2"
              aria-label="Scroll back to top"
            >
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
}
