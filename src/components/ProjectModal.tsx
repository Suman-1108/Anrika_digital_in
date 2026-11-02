"use client";

import React from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X, ArrowRight, Sparkles, CheckCircle2 } from "lucide-react";
import { PortfolioItem } from "@/types";

interface ProjectModalProps {
  project: PortfolioItem | null;
  onClose: () => void;
  onInquire: () => void;
}

export default function ProjectModal({ project, onClose, onInquire }: ProjectModalProps) {
  return (
    <AnimatePresence>
      {project && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-[#342A29]/75 backdrop-blur-sm"
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.35, ease: "easeOut" }}
          className="relative w-full max-w-4xl bg-[#F5EBDD] rounded-3xl border border-[#722F37]/25 shadow-2xl z-10 overflow-hidden max-h-[92vh] flex flex-col justify-between"
        >
          {/* Top Bar */}
          <div className="p-6 md:px-8 border-b border-[#722F37]/15 flex items-center justify-between">
            <div>
              <span className="text-[10px] font-editorial-sans tracking-[0.25em] uppercase font-bold text-[#722F37]">
                {project.categoryLabel} • {project.year}
              </span>
              <h3 className="font-editorial-serif text-2xl md:text-3xl text-[#342A29]">
                {project.title}
              </h3>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-full hover:bg-[#E8DCC6] text-[#342A29] transition-colors focus:outline-none"
              aria-label="Close project modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body */}
          <div className="overflow-y-auto p-6 md:p-8 space-y-6">
            {/* Visual Image Preview */}
            <div className="relative w-full h-64 sm:h-80 md:h-96 rounded-2xl overflow-hidden border border-[#722F37]/15">
              <Image
                src={project.image}
                alt={project.title}
                fill
                unoptimized
                sizes="(max-width: 1024px) 100vw, 800px"
                className="object-cover"
              />
              <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-[#E8DCC6]/90 backdrop-blur-md text-[10px] font-editorial-sans tracking-widest text-[#722F37] uppercase font-bold">
                {project.client}
              </div>
            </div>

            {/* Description & Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:col-span-2 space-y-3">
                <h4 className="text-xs font-editorial-sans tracking-[0.2em] uppercase font-bold text-[#722F37]">
                  Concept & Execution Overview
                </h4>
                <p className="font-editorial-sans text-sm text-[#342A29]/80 leading-relaxed">
                  {project.description}
                </p>
                <p className="text-xs font-editorial-sans text-[#342A29]/60 italic">
                  Note: This project is displayed as representative sample content for ANRIKA DIGITAL
                  INNOVATION studio capabilities until actual company work is published.
                </p>
              </div>

              <div className="space-y-4 p-4 rounded-2xl bg-[#E8DCC6]/60 border border-[#722F37]/15">
                <div>
                  <span className="text-[10px] font-editorial-sans tracking-wider uppercase text-[#722F37] font-bold block">
                    SAMPLE BENCHMARK
                  </span>
                  <span className="font-editorial-serif text-lg font-bold text-[#342A29] block">
                    {project.metrics || "Excellence Rating"}
                  </span>
                </div>

                <div>
                  <span className="text-[10px] font-editorial-sans tracking-wider uppercase text-[#722F37] font-bold block mb-2">
                    KEY DELIVERABLES
                  </span>
                  <div className="space-y-1.5">
                    {project.deliverables.map((del, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-xs font-editorial-sans text-[#342A29]/80">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#722F37]" />
                        <span>{del}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="p-6 md:px-8 border-t border-[#722F37]/15 flex flex-wrap items-center justify-between gap-4 bg-[#E8DCC6]/30">
            <span className="text-xs font-editorial-sans text-[#342A29]/60">
              Inquire about tailored creative direction for your business
            </span>
            <button
              onClick={() => {
                onInquire();
                onClose();
              }}
              className="btn-editorial-primary px-6 py-2.5 rounded-full text-xs font-editorial-sans tracking-[0.18em] uppercase font-semibold inline-flex items-center gap-2"
            >
              <span>Discuss Similar Project</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </motion.div>
      </div>
      )}
    </AnimatePresence>
  );
}
