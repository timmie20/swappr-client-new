import type { Metadata } from "next";
import PageContainer from "@/components/layout/page-container";
import { FaqPage } from "@/features/faq";

export const metadata: Metadata = {
  title: "Frequently Asked Questions",
  description:
    "Answers to common questions about buying, swapping, becoming a vendor, payments, orders, returns, and accounts on Swappr.",
};

export default function Page() {
  return (
    <PageContainer>
      <FaqPage />
    </PageContainer>
  );
}
