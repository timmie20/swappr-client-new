import React from "react";
import { AppNavbar } from "../shared/app-navbar";

export default function PageContainer({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <AppNavbar />
      <main className="mx-auto h-[calc(100dvh-52px)] pt-16 pb-4 sm:pb-0 lg:p-0 lg:pt-16">
        {children}
      </main>
    </>
  );
}
