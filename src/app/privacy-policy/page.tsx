import type { Metadata } from "next";
import PageContainer from "@/components/layout/page-container";
import { PrivacyPolicyPage } from "@/features/privacy-policy";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How Swappr collects, uses, and protects your personal data across the marketplace.",
  robots: {
    index: true,
    follow: true,
  },
};

export default function Page() {
  return (
    <PageContainer>
      <PrivacyPolicyPage />
    </PageContainer>
  );
}
