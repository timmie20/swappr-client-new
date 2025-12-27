import QuestionnairePage from "@/features/questionnaire/questionnaire-page";
import React from "react";

type PageProps = {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ brandId?: string }>;
};

export default async function Page({ params, searchParams }: PageProps) {
  const { slug } = await params;
  const { brandId } = await searchParams;

  if (!brandId) {
    return (
      <div className="py-12 text-center">
        <p>Brand information is required. Please go back and select a model.</p>
      </div>
    );
  }

  return <QuestionnairePage brandId={brandId} />;
}
