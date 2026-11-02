"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Send,
  MessageSquare,
  Mail,
  MapPin,
  Phone,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
} from "lucide-react";
import { EditorialStar, CornerOrnament } from "./BotanicalDecorations";

interface ContactProps {
  selectedService?: string;
}

const SERVICE_OPTIONS = [
  "Website Development",
  "Meta Ads & Performance Marketing",
  "Photography & Videography",
  "Creative Advertising",
  "Social Media Management",
  "SEO & Digital Strategy",
  "Full Brand Digital Transformation",
];

export default function Contact({ selectedService }: ContactProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    service: selectedService || "Website Development",
    description: "",
  });

  useEffect(() => {
    if (selectedService) {
      setFormData((prev) => ({ ...prev, service: selectedService }));
    }
  }, [selectedService]);

  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [confirmationCode, setConfirmationCode] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setStatus("idle");
    setErrorMessage("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to submit inquiry.");
      }

      setStatus("success");
      setConfirmationCode(data.inquiryCode || "ADI-2026-CONFIRMED");
      setFormData({
        name: "",
        email: "",
        phone: "",
        company: "",
        service: "Website Development",
        description: "",
      });
    } catch (err: any) {
      setStatus("error");
      setErrorMessage(err.message || "An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const generateWhatsAppLink = () => {
    const text = `Hello ANRIKA DIGITAL INNOVATION, I would like to inquire about ${formData.service || "your digital agency services"}. My name is ${formData.name || "Client"}.`;
    return `https://wa.me/?text=${encodeURIComponent(text)}`;
  };

  return (
    <section
      id="contact"
      className="relative py-10 md:py-12 bg-[#722F37] text-[#E8DCC6] overflow-hidden scroll-mt-20 md:scroll-mt-24"
    >
      {/* Background Decorative Rings */}
      <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full border border-[#E8DCC6]/10 pointer-events-none" />
      <div className="absolute -bottom-32 -left-32 w-96 h-96 rounded-full border border-[#E8DCC6]/10 pointer-events-none" />

      <CornerOrnament className="absolute top-12 left-8 md:left-16 opacity-30 text-[#E8DCC6]" color="#E8DCC6" />
      <CornerOrnament
        position="top-right"
        className="absolute top-12 right-8 md:right-16 opacity-30 text-[#E8DCC6]"
        color="#E8DCC6"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="max-w-3xl mb-6 md:mb-8 space-y-2 text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E8DCC6]/15 border border-[#E8DCC6]/25 text-[#E8DCC6]">
            <EditorialStar size={12} color="#E8DCC6" />
            <span className="text-[10px] md:text-xs font-editorial-sans tracking-[0.2em] uppercase font-bold">
              START A CONVERSATION
            </span>
          </div>

          <h2 className="font-editorial-serif text-3xl sm:text-4xl md:text-5xl text-[#E8DCC6] leading-[1.05] tracking-tight">
            LET&apos;S CREATE SOMETHING <br />
            <span className="italic font-serif text-[#F5EBDD] font-semibold">MEANINGFUL.</span>
          </h2>

          <p className="font-editorial-sans text-sm sm:text-base text-[#E8DCC6]/85 leading-relaxed font-normal">
            Have an idea, a business, or a project in mind? Let&apos;s turn it into something
            remarkable.
          </p>
        </div>

        {/* 2-Column Layout: Contact Details & Form */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
          {/* Left Column: Direct Inquiries & Agency Info (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            <div className="p-5 md:p-6 rounded-3xl bg-[#5E242B] border border-[#E8DCC6]/15 space-y-4">
              <span className="text-[10px] font-editorial-sans tracking-[0.25em] text-[#E8DCC6]/70 uppercase font-bold block">
                DIRECT CHANNELS
              </span>

              {/* WhatsApp CTA Button */}
              <a
                href={generateWhatsAppLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-between p-4 rounded-2xl bg-[#25D366]/20 hover:bg-[#25D366]/30 border border-[#25D366]/40 text-[#E8DCC6] transition-all group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#25D366] text-white flex items-center justify-center font-bold">
                    <MessageSquare className="w-5 h-5" />
                  </div>
                  <div className="text-left">
                    <span className="text-xs font-editorial-sans font-bold uppercase tracking-wider block">
                      Connect via WhatsApp
                    </span>
                    <span className="text-[11px] text-[#E8DCC6]/70">Direct Studio Desk</span>
                  </div>
                </div>
                <ExternalLink className="w-4 h-4 text-[#E8DCC6]/70 group-hover:text-white transition-colors" />
              </a>

              {/* Email Direct */}
              <div className="flex items-start gap-4 pt-2">
                <div className="w-10 h-10 rounded-full bg-[#E8DCC6]/10 text-[#E8DCC6] flex items-center justify-center shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[11px] font-editorial-sans tracking-wider uppercase text-[#E8DCC6]/60 font-semibold block">
                    Official Email Inquiries
                  </span>
                  <a
                    href="mailto:contact@anrikadigital.com"
                    className="font-editorial-serif text-lg text-[#E8DCC6] hover:text-[#F5EBDD] transition-colors"
                  >
                    contact@anrikadigital.com
                  </a>
                </div>
              </div>

              {/* Location */}
              <div className="flex items-start gap-4 pt-2">
                <div className="w-10 h-10 rounded-full bg-[#E8DCC6]/10 text-[#E8DCC6] flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[11px] font-editorial-sans tracking-wider uppercase text-[#E8DCC6]/60 font-semibold block">
                    Studio Atelier
                  </span>
                  <p className="font-editorial-sans text-sm text-[#E8DCC6]/85">
                    ANRIKA DIGITAL INNOVATION • Est. 2026
                  </p>
                  <p className="text-xs text-[#E8DCC6]/60">Serving Global Visionary Brands</p>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div className="p-5 md:p-6 rounded-3xl bg-[#5E242B] border border-[#E8DCC6]/15 space-y-3">
              <span className="text-[10px] font-editorial-sans tracking-[0.25em] text-[#E8DCC6]/70 uppercase font-bold block">
                DIGITAL NETWORKS
              </span>
              <div className="flex flex-wrap gap-2">
                {[
                  { name: "Instagram", href: "https://instagram.com" },
                  { name: "LinkedIn", href: "https://linkedin.com" },
                  { name: "Meta Business", href: "https://facebook.com" },
                  { name: "Behance", href: "https://behance.net" },
                ].map((s) => (
                  <a
                    key={s.name}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3.5 py-1.5 rounded-full bg-[#E8DCC6]/10 hover:bg-[#E8DCC6] hover:text-[#722F37] text-xs font-editorial-sans tracking-wider transition-all duration-300 font-medium"
                  >
                    {s.name} ↗
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Functional Inquiry Form (7 cols) */}
          <div className="lg:col-span-7 bg-[#5E242B] rounded-3xl p-5 md:p-6 border border-[#E8DCC6]/20 shadow-2xl relative">
            <h3 className="font-editorial-serif text-xl sm:text-2xl text-[#E8DCC6] mb-3">
              Project Brief & Inquiry
            </h3>

            {/* Feedback Banners */}
            <AnimatePresence>
              {status === "success" && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="mb-5 p-4 rounded-2xl bg-[#E8DCC6] text-[#342A29] border border-[#E8DCC6] flex items-start gap-3 shadow-lg"
                >
                  <CheckCircle2 className="w-5 h-5 text-[#722F37] shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-editorial-serif text-lg font-bold text-[#722F37]">
                      Inquiry Received With Gratitude.
                    </h4>
                    <p className="text-xs font-editorial-sans mt-1 leading-relaxed">
                      Thank you for reaching out to ANRIKA DIGITAL INNOVATION. Our creative directors
                      will review your brief and respond within 24 hours.
                    </p>
                    <span className="inline-block mt-2 text-[10px] font-mono bg-[#722F37] text-[#E8DCC6] px-2.5 py-1 rounded-md font-semibold">
                      Ref: {confirmationCode}
                    </span>
                  </div>
                </motion.div>
              )}

              {status === "error" && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="mb-5 p-4 rounded-2xl bg-red-950/80 border border-red-500/40 text-red-200 flex items-center gap-3 text-xs font-editorial-sans"
                >
                  <AlertCircle className="w-5 h-5 text-red-400 shrink-0" />
                  <span>{errorMessage}</span>
                </motion.div>
              )}
            </AnimatePresence>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Name */}
                <div className="space-y-1">
                  <label className="text-[11px] font-editorial-sans tracking-wider uppercase text-[#E8DCC6]/80 font-medium">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="e.g. Elena Rostova"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#722F37]/60 border border-[#E8DCC6]/25 text-[#E8DCC6] placeholder-[#E8DCC6]/40 focus:outline-none focus:border-[#E8DCC6] text-sm font-editorial-sans transition-colors"
                  />
                </div>

                {/* Email */}
                <div className="space-y-1">
                  <label className="text-[11px] font-editorial-sans tracking-wider uppercase text-[#E8DCC6]/80 font-medium">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="elena@company.com"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#722F37]/60 border border-[#E8DCC6]/25 text-[#E8DCC6] placeholder-[#E8DCC6]/40 focus:outline-none focus:border-[#E8DCC6] text-sm font-editorial-sans transition-colors"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Phone */}
                <div className="space-y-1">
                  <label className="text-[11px] font-editorial-sans tracking-wider uppercase text-[#E8DCC6]/80 font-medium">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+1 (555) 000-0000"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#722F37]/60 border border-[#E8DCC6]/25 text-[#E8DCC6] placeholder-[#E8DCC6]/40 focus:outline-none focus:border-[#E8DCC6] text-sm font-editorial-sans transition-colors"
                  />
                </div>

                {/* Company Name */}
                <div className="space-y-1">
                  <label className="text-[11px] font-editorial-sans tracking-wider uppercase text-[#E8DCC6]/80 font-medium">
                    Company Name
                  </label>
                  <input
                    type="text"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    placeholder="e.g. Maison de Mode"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#722F37]/60 border border-[#E8DCC6]/25 text-[#E8DCC6] placeholder-[#E8DCC6]/40 focus:outline-none focus:border-[#E8DCC6] text-sm font-editorial-sans transition-colors"
                  />
                </div>
              </div>

              {/* Service Interested In */}
              <div className="space-y-1">
                <label className="text-[11px] font-editorial-sans tracking-wider uppercase text-[#E8DCC6]/80 font-medium">
                  Service Interested In *
                </label>
                <select
                  name="service"
                  value={formData.service}
                  onChange={handleChange}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#722F37] border border-[#E8DCC6]/25 text-[#E8DCC6] focus:outline-none focus:border-[#E8DCC6] text-sm font-editorial-sans transition-colors cursor-pointer"
                >
                  {SERVICE_OPTIONS.map((opt) => (
                    <option key={opt} value={opt} className="bg-[#5E242B] text-[#E8DCC6]">
                      {opt}
                    </option>
                  ))}
                </select>
              </div>

              {/* Project Description */}
              <div className="space-y-1">
                <label className="text-[11px] font-editorial-sans tracking-wider uppercase text-[#E8DCC6]/80 font-medium">
                  Project Description & Vision *
                </label>
                <textarea
                  name="description"
                  required
                  rows={3}
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Tell us about your objectives, timeline, audience, and creative vision..."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#722F37]/60 border border-[#E8DCC6]/25 text-[#E8DCC6] placeholder-[#E8DCC6]/40 focus:outline-none focus:border-[#E8DCC6] text-sm font-editorial-sans transition-colors resize-none"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 rounded-full bg-[#E8DCC6] text-[#722F37] hover:bg-[#F5EBDD] transition-all duration-300 font-editorial-sans text-xs tracking-[0.2em] uppercase font-bold flex items-center justify-center gap-2 shadow-lg disabled:opacity-50 focus:outline-none"
              >
                {loading ? (
                  <div className="w-5 h-5 rounded-full border-2 border-[#722F37] border-t-transparent animate-spin" />
                ) : (
                  <>
                    <span>Submit Project Inquiry</span>
                    <Send className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

