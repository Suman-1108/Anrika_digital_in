import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        cosmicLatte: "#B7A89A",
        mochaCream: "#E8DCC6",
        deepBurgundy: "#722F37",
        darkBrown: "#342A29",
        lightCream: "#F5EBDD",
        mutedBurgundy: "#9A515A",
      },
      fontFamily: {
        gill: ['"Gill Sans"', '"Gill Sans MT"', 'Calibri', '"Trebuchet MS"', 'sans-serif'],
        serif: ['"Gill Sans"', '"Gill Sans MT"', 'Calibri', 'sans-serif'],
        sans: ['"Gill Sans"', '"Gill Sans MT"', 'Calibri', 'sans-serif'],
        display: ['"Gill Sans"', '"Gill Sans MT"', 'Calibri', 'sans-serif'],
      },
      backgroundImage: {
        'grain-subtle': "radial-gradient(circle at 50% 50%, rgba(114,47,55,0.03) 0%, transparent 100%)",
      },
      animation: {
        'float-slow': 'float 6s ease-in-out infinite',
        'float-reverse': 'floatReverse 7s ease-in-out infinite',
        'spin-slow': 'spin 20s linear infinite',
        'pulse-subtle': 'pulseSubtle 4s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(-12px) rotate(1.5deg)' },
        },
        floatReverse: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(10px) rotate(-1.5deg)' },
        },
        pulseSubtle: {
          '0%, 100%': { opacity: '0.9', transform: 'scale(1)' },
          '50%': { opacity: '1', transform: 'scale(1.02)' },
        },
      },
    },
  },
  plugins: [],
};
export default config;
