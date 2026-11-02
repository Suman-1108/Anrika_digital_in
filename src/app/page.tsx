"use client";

import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import AnrikaCinematicHero from "@/components/AnrikaCinematicHero";
import About from "@/components/About";
import Services from "@/components/Services";
import Portfolio from "@/components/Portfolio";
import CreativeStudio from "@/components/CreativeStudio";
import WhyChooseUs from "@/components/WhyChooseUs";
import Process from "@/components/Process";
import Testimonials from "@/components/Testimonials";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  const [inquiryService, setInquiryService] = useState<string>("Website Development");

  const handleSelectService = (serviceTitle: string) => {
    setInquiryService(serviceTitle);
  };

  return (
    <main className="min-h-screen bg-[#E8DCC6] text-[#342A29] flex flex-col justify-between selection:bg-[#722F37] selection:text-[#E8DCC6]">
      <Navbar />
      <AnrikaCinematicHero />
      <About />
      <Services onSelectService={handleSelectService} />
      <Portfolio />
      <CreativeStudio />
      <WhyChooseUs />
      <Process />
      <Testimonials />
      <Contact selectedService={inquiryService} />
      <Footer />
    </main>
  );
}
