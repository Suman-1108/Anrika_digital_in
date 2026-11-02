import React from "react";
import Navbar from "@/components/Navbar";
import Services from "@/components/Services";
import Process from "@/components/Process";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Services & Disciplines | ANRIKA DIGITAL INNOVATION",
  description:
    "Explore our complete digital solutions: Website Development, Meta Ads, Photography & Videography, Creative Advertising, Social Media Management, and SEO.",
};

export default function ServicesPage() {
  return (
    <main className="min-h-screen bg-[#E8DCC6] text-[#342A29] pt-16">
      <Navbar />
      <div className="pt-12">
        <Services />
        <Process />
        <Contact />
      </div>
      <Footer />
    </main>
  );
}

