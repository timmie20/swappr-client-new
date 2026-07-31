import type { Metadata } from "next";
import PageContainer from "@/components/layout/page-container";
import { AboutPage } from "@/features/about";

export const metadata: Metadata = {
  title: "About Swappr",
  description:
    "Swappr is a marketplace for buying pre-owned phones, laptops, and accessories from verified vendors, starting in markets like Computer Village, Lagos.",
};

export default function Page() {
  return (
    <PageContainer>
      <AboutPage />
    </PageContainer>
  );
}
