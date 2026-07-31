import type { Metadata } from "next";
import PageContainer from "@/components/layout/page-container";
import { HowItWorksPage } from "@/features/how-it-works";

export const metadata: Metadata = {
  title: "How Swappr works",
  description:
    "Every vendor on Swappr is verified before they can sell. Here's what happens from browsing to delivery — or from swap request to a completed trade.",
};

export default function Page() {
  return (
    <PageContainer>
      <HowItWorksPage />
    </PageContainer>
  );
}
