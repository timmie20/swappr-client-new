"use client";

import { HeroSection } from "@/components/vendor-landing/hero-section";
import { WhoIsVendor } from "@/components/vendor-landing/who-is-vendor";
import { BenefitsSection } from "@/components/vendor-landing/benefits-section";
import { ApplicationProcess } from "@/components/vendor-landing/application-process";
import { FeaturesCarousel } from "@/components/vendor-landing/features-carousel";
import { FaqSection } from "@/components/vendor-landing/faq-section";
import { FinalCta } from "@/components/vendor-landing/final-cta";
import { FooterSection } from "@/components/vendor-landing/footer-section";

export default function LandingPage() {
  return (
    <main>
      <HeroSection />
      <WhoIsVendor />
      <BenefitsSection />
      <ApplicationProcess />
      <FeaturesCarousel />
      <FaqSection />
      <FinalCta />
      <FooterSection />
    </main>
  );
}
