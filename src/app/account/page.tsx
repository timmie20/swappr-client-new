"use client";

import PageContainer from "@/components/layout/page-container";
import PageLoader from "@/components/page-loader";
import AccountPage from "@/features/account/account-page";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

function AccountPageWrapper() {
  const searchParams = useSearchParams();
  const activeTab = searchParams.get("tab") || "profile";

  return <AccountPage activeTab={activeTab} />;
}

export default function Page() {
  return (
    <PageContainer>
      <Suspense fallback={<PageLoader isLoading text="loading" />}>
        <AccountPageWrapper />
      </Suspense>
    </PageContainer>
  );
}
