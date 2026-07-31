import type { Metadata } from "next";
import PageContainer from "@/components/layout/page-container";
import { ContactPage } from "@/features/contact";

export const metadata: Metadata = {
  title: "Get in touch",
  description:
    "Questions about an order or a listing? Reach Swappr support at support@swappr.com.ng.",
};

export default function Page() {
  return (
    <PageContainer>
      <ContactPage />
    </PageContainer>
  );
}
