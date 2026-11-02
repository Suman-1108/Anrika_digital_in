import React from "react";
import Navbar from "@/components/Navbar";
import Portfolio from "@/components/Portfolio";
import CreativeStudio from "@/components/CreativeStudio";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Selected Works & Portfolio | ANRIKA DIGITAL INNOVATION",
  description:
    "Curated portfolio of digital flagships, Meta ad campaigns, photography, videography, and brand identities by Anrika Digital Innovation.",
};

export default function PortfolioPage() {
  return (
    <main className="min-h-screen bg-[#E8DCC6] text-[#342A29] pt-16">
      <Navbar />
      <div className="pt-12">
        <Portfolio />
        <CreativeStudio />
        <Contact />
      </div>
      <Footer />
    </main>
  );
}

