import React from "react";
import Navbar from "@/components/Navbar";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Contact Atelier | ANRIKA DIGITAL INNOVATION — Let's Create Together",
  description:
    "Have an idea, a business, or a project in mind? Reach out to ANRIKA DIGITAL INNOVATION. Established 2026.",
};

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-[#722F37] text-[#E8DCC6] pt-16">
      <Navbar />
      <div className="pt-12">
        <Contact />
      </div>
      <Footer />
    </main>
  );
}

