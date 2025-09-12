"use client";

import React from "react";
import SiteHeader from "@/components/SiteHeader";
import HeroSection from "@/components/HeroSection";
import ServicesSection from "@/components/ServicesSection";
import HowItWorksSection from "@/components/HowItWorksSection";
import TestimonialsSection from "@/components/TestimonialsSection";

import TemplatesSliderSection from "@/components/TemplatesSliderSection";
import TestimonialsSlider from "@/components/CustomerSlider"; // (still available if you want)
import CampaignPromo from "@/components/CampaignPromo";
import DriveUDownloadSection from "@/components/DriveUDownload";
import ContactSection from "@/components/ContactSection";
import SiteFooter from "@/components/SiteFooter";
import DriveHeroVideo from "@/components/DriveHeroVideo";

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-white text-gray-900">
      <SiteHeader />

      <HeroSection />
      <ServicesSection />
      <HowItWorksSection />

      {/* Optional video + promos */}
      <DriveHeroVideo fileId="1paQF1npKD8plpshfOfkq1dJmjB_7U1uh" />
      <TemplatesSliderSection />
      <CampaignPromo />

      <TestimonialsSection />
      {/* <TestimonialsSlider /> */}

      <DriveUDownloadSection />
      <ContactSection />
      <SiteFooter />

      {/* Dummy anchors for nav routes not implemented here */}
      <section id="case-studies" className="sr-only" aria-hidden="true"></section>
      <section id="career" className="sr-only" aria-hidden="true"></section>
      <section id="quote" className="sr-only" aria-hidden="true"></section>
      {/* keep or remove the #contact dummy based on your ContactSection implementation */}
      {/* <section id="contact" className="sr-only" aria-hidden="true"></section> */}
    </main>
  );
}
