"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Check, ArrowRight, Sparkles } from "lucide-react";
import { ServiceItem } from "@/types";

interface ServiceModalProps {
  service: ServiceItem | null;
  onClose: () => void;
  onSelectServiceForContact: (serviceTitle: string) => void;
}

export default function ServiceModal({
  service,
  onClose,
  onSelectServiceForContact,
}: ServiceModalProps) {
  return (
    <AnimatePresence>
      {service && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-[#342A29]/70 backdrop-blur-sm"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.35, ease: "easeOut" }}
          className="relative w-full max-w-2xl bg-[#F5EBDD] rounded-3xl border border-[#722F37]/25 shadow-2xl p-6 sm:p-10 z-10 overflow-hidden max-h-[90vh] flex flex-col justify-between"
        >
          {/* Header Bar */}
          <div className="flex items-center justify-between border-b border-[#722F37]/15 pb-5">
            <div className="flex items-center gap-3">
              <span className="font-editorial-serif text-2xl font-bold text-[#722F37]">
                {service.number}
              </span>
              <span className="text-[10px] sm:text-xs font-editorial-sans tracking-[0.2em] uppercase font-bold text-[#342A29]/70">
                {service.badge}
              </span>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-full hover:bg-[#E8DCC6] text-[#342A29] transition-colors focus:outline-none"
              aria-label="Close service modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Modal Content Body */}
          <div className="overflow-y-auto py-6 space-y-6 pr-1">
            <div>
              <span className="text-xs font-editorial-sans tracking-widest text-[#722F37] uppercase font-semibold">
                {service.subtitle}
              </span>
              <h3 className="font-editorial-serif text-3xl sm:text-4xl text-[#342A29] font-normal mt-1">
                {service.title}
              </h3>
              <p className="font-editorial-sans text-sm sm:text-base text-[#342A29]/80 leading-relaxed mt-3">
                {service.description}
              </p>
            </div>

            {/* Core Offerings */}
            <div className="space-y-3 pt-2">
              <h4 className="text-xs font-editorial-sans tracking-[0.2em] uppercase font-bold text-[#722F37]">
                Core Capabilities & Deliverables
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {service.items.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-2.5 p-3 rounded-xl bg-[#E8DCC6]/60 border border-[#722F37]/10 text-xs font-editorial-sans text-[#342A29] font-medium"
                  >
                    <Check className="w-3.5 h-3.5 text-[#722F37] shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Architectural & Strategic Highlights */}
            <div className="space-y-3 pt-2">
              <h4 className="text-xs font-editorial-sans tracking-[0.2em] uppercase font-bold text-[#722F37]">
                Studio Standards & Technology
              </h4>
              <ul className="space-y-2">
                {service.features.map((feat, idx) => (
                  <li
                    key={idx}
                    className="flex items-start gap-2.5 text-xs sm:text-sm font-editorial-sans text-[#342A29]/80"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-[#722F37] mt-0.5 shrink-0" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Footer Action */}
          <div className="pt-5 border-t border-[#722F37]/15 flex flex-wrap items-center justify-between gap-4">
            <span className="text-xs font-editorial-sans text-[#342A29]/70">
              Tailored for 2026 digital standards
            </span>

            <button
              onClick={() => {
                onSelectServiceForContact(service.title);
                onClose();
              }}
              className="btn-editorial-primary px-6 py-2.5 rounded-full text-xs font-editorial-sans tracking-[0.18em] uppercase font-semibold inline-flex items-center gap-2"
            >
              <span>Inquire For {service.title}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </motion.div>
      </div>
      )}
    </AnimatePresence>
  );
}

