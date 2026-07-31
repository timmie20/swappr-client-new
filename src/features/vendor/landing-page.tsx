"use client";

import { HeroSection } from "@/components/vendor-landing/hero-section";
import { WhoIsVendor } from "@/components/vendor-landing/who-is-vendor";
import { BenefitsSection } from "@/components/vendor-landing/benefits-section";
import { ApplicationProcess } from "@/components/vendor-landing/application-process";
import { FeaturesCarousel } from "@/components/vendor-landing/features-carousel";
import { FaqSection } from "@/components/vendor-landing/faq-section";
import { FinalCta } from "@/components/vendor-landing/final-cta";
import { AppNavbar } from "@/components/shared/nav/app-navbar";
import { FeedFooter } from "@/components/shared/feed-footer";

export default function LandingPage() {
  return (
    <main>
      <AppNavbar />
      <HeroSection />
      <WhoIsVendor />
      <BenefitsSection />
      <ApplicationProcess />
      <FeaturesCarousel />
      <FaqSection />
      <FinalCta />
      <FeedFooter />
    </main>
  );
}
