import React from "react";
import { AppNavbar } from "../shared/nav/app-navbar";

export default function Container({ children }: { children: React.ReactNode }) {
  return (
    <>
      <AppNavbar />
      <div className="mx-auto h-[calc(100dvh-116px)] max-w-212.5 px-4 pb-4 sm:pb-0 lg:p-0">
        {children}
      </div>
      {/* <div className="flex flex-1 p-4 md:px-6">{children}</div> */}
    </>
  );
}
