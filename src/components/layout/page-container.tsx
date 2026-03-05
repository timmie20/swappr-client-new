import React from "react";
import { AppNavbar } from "../shared/app-navbar";
import { FeedFooter } from "../shared/feed-footer";

export default function PageContainer({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <AppNavbar />
      <main className="mx-auto min-h-[calc(100dvh-3.5rem)] pt-16 pb-4 sm:pb-0 lg:p-0 lg:pt-16">
        {children}
      </main>
      <FeedFooter />
    </>
  );
}
