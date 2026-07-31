import type { Metadata } from "next";
import PageContainer from "@/components/layout/page-container";
import { TrustSafetyPage } from "@/features/trust-safety";

export const metadata: Metadata = {
  title: "Trust & Safety",
  description:
    "Verified vendors, structured listings here's what that means for you as a Swappr buyer.",
};

export default function Page() {
  return (
    <PageContainer>
      <TrustSafetyPage />
    </PageContainer>
  );
}
