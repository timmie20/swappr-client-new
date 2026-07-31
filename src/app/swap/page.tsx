import type { Metadata } from "next";
import PageContainer from "@/components/layout/page-container";
import { SwapPage } from "@/features/swap";

export const metadata: Metadata = {
  title: "Swap your device",
  description:
    "Swap your device for something better, directly with the vendor — some listings let you offer your own device, plus cash if needed, instead of paying full price.",
};

export default function Page() {
  return (
    <PageContainer>
      <SwapPage />
    </PageContainer>
  );
}
