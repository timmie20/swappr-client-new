import PageContainer from "@/components/layout/page-container";
import QuestionnairePage from "@/features/questionnaire/questionnaire-page";
import React from "react";

type PageProps = {
  searchParams: Promise<{ brandId?: string }>;
};

export default async function Page({ searchParams }: PageProps) {
  const { brandId } = await searchParams;

  if (!brandId) {
    return (
      <div className="py-12 text-center">
        <p>Brand information is required. Please go back and select a model.</p>
      </div>
    );
  }

  return (
    <PageContainer>
      <QuestionnairePage brandId={brandId} />
    </PageContainer>
  );
}
