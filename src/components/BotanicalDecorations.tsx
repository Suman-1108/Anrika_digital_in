"use client";

import React from "react";
import { motion } from "framer-motion";

export function BotanicalBranch({
  className = "",
  flip = false,
  color = "#722F37",
}: {
  className?: string;
  flip?: boolean;
  color?: string;
}) {
  return (
    <svg
      viewBox="0 0 160 220"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`${className} ${flip ? "scale-x-[-1]" : ""}`}
    >
      {/* Organic stem */}
      <path
        d="M20 210C35 160 50 110 90 70C110 50 135 30 145 10"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeDasharray="4 2"
        opacity="0.5"
      />
      <path
        d="M20 210C35 160 50 110 90 70C110 50 135 30 145 10"
        stroke={color}
        strokeWidth="1"
        strokeLinecap="round"
        opacity="0.8"
      />

      {/* Botanical leaves along curve */}
      <path
        d="M50 145C40 135 30 140 25 150C35 155 45 153 50 145Z"
        fill={color}
        fillOpacity="0.2"
        stroke={color}
        strokeWidth="0.75"
      />
      <path
        d="M62 125C75 118 85 125 88 135C78 140 68 135 62 125Z"
        fill={color}
        fillOpacity="0.25"
        stroke={color}
        strokeWidth="0.75"
      />
      <path
        d="M75 100C65 90 55 95 50 105C62 110 70 108 75 100Z"
        fill={color}
        fillOpacity="0.2"
        stroke={color}
        strokeWidth="0.75"
      />
      <path
        d="M92 78C105 70 115 78 118 88C108 92 98 88 92 78Z"
        fill={color}
        fillOpacity="0.3"
        stroke={color}
        strokeWidth="0.75"
      />
      <path
        d="M110 52C100 42 90 46 88 56C98 62 106 58 110 52Z"
        fill={color}
        fillOpacity="0.25"
        stroke={color}
        strokeWidth="0.75"
      />
      <path
        d="M130 32C140 25 148 30 150 40C140 44 133 40 130 32Z"
        fill={color}
        fillOpacity="0.35"
        stroke={color}
        strokeWidth="0.75"
      />
      <path
        d="M145 10C146 3 154 5 155 12C151 17 146 16 145 10Z"
        fill={color}
        fillOpacity="0.4"
        stroke={color}
        strokeWidth="0.75"
      />
    </svg>
  );
}

export function EditorialStamp({
  className = "",
  size = 120,
}: {
  className?: string;
  size?: number;
}) {
  return (
    <div
      className={`relative flex items-center justify-center select-none pointer-events-none ${className}`}
      style={{ width: size, height: size }}
    >
      {/* Outer circular rotating text */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        className="absolute inset-0 w-full h-full"
      >
        <svg viewBox="0 0 100 100" className="w-full h-full">
          <defs>
            <path
              id="circlePath"
              d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0"
            />
          </defs>
          <text
            fontSize="7.5"
            letterSpacing="2.2"
            fill="#722F37"
            className="font-editorial-sans uppercase tracking-[0.25em] font-medium"
          >
            <textPath xlinkHref="#circlePath" startOffset="0%">
              • ANRIKA DIGITAL INNOVATION • EST. 2026 • CREATIVE STUDIO
            </textPath>
          </text>
        </svg>
      </motion.div>

      {/* Inner concentric ring */}
      <div className="w-[68%] h-[68%] rounded-full border border-dashed border-[#722F37]/30 flex flex-col items-center justify-center p-2 text-center">
        <span className="text-[10px] tracking-widest text-[#722F37] font-editorial-display font-bold">
          ADI
        </span>
        <span className="text-[7px] tracking-widest text-[#342A29]/70 uppercase">
          Studio
        </span>
      </div>
    </div>
  );
}

export function EditorialStar({
  className = "",
  size = 18,
  color = "#722F37",
}: {
  className?: string;
  size?: number;
  color?: string;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill={color}
      xmlns="http://www.w3.org/2000/svg"
      className={`inline-block ${className}`}
    >
      <path d="M12 0L14.2 8.8L23 11L14.2 13.2L12 22L9.8 13.2L1 11L9.8 8.8L12 0Z" />
    </svg>
  );
}

export function HandDrawnFlourish({
  className = "",
  color = "#722F37",
}: {
  className?: string;
  color?: string;
}) {
  return (
    <svg
      viewBox="0 0 260 28"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M4 18C45 8 110 6 150 14C190 22 225 10 256 12"
        stroke={color}
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <path
        d="M30 22C80 16 160 14 230 19"
        stroke={color}
        strokeWidth="1"
        strokeLinecap="round"
        opacity="0.6"
      />
    </svg>
  );
}

export function CornerOrnament({
  className = "",
  position = "top-left",
  color = "#722F37",
}: {
  className?: string;
  position?: "top-left" | "top-right" | "bottom-left" | "bottom-right";
  color?: string;
}) {
  const getRotation = () => {
    switch (position) {
      case "top-right":
        return "rotate-90";
      case "bottom-right":
        return "rotate-180";
      case "bottom-left":
        return "-rotate-90";
      default:
        return "rotate-0";
    }
  };

  return (
    <div className={`pointer-events-none select-none ${getRotation()} ${className}`}>
      <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
        <path d="M0 0V40H2V2H40V0H0Z" fill={color} fillOpacity="0.4" />
        <circle cx="8" cy="8" r="2" fill={color} fillOpacity="0.7" />
        <line x1="8" y1="14" x2="8" y2="28" stroke={color} strokeWidth="0.8" strokeOpacity="0.4" />
        <line x1="14" y1="8" x2="28" y2="8" stroke={color} strokeWidth="0.8" strokeOpacity="0.4" />
      </svg>
    </div>
  );
}

