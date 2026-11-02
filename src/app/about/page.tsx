import React from "react";
import Navbar from "@/components/Navbar";
import About from "@/components/About";
import WhyChooseUs from "@/components/WhyChooseUs";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export const metadata = {
  title: "About Us | ANRIKA DIGITAL INNOVATION — Creativity Meets Technology",
  description:
    "Anrika Digital Innovation is a creative digital agency established in 2026. We combine technology, creativity, and strategic thinking.",
};

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-[#E8DCC6] text-[#342A29] pt-16">
      <Navbar />
      <div className="pt-12">
        <About />
        <WhyChooseUs />
        <Contact />
      </div>
      <Footer />
    </main>
  );
}

