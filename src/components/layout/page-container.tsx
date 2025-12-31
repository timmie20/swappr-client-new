import React from "react";
import Navbar from "../shared/nav-bar";

export default function PageContainer({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />
      <div className="mx-auto h-[calc(100dvh-52px)] max-w-212.5 px-4 pb-4 pt-16 sm:pb-0 lg:p-0 lg:pt-16">
        {children}
      </div>
      {/* <div className="flex flex-1 p-4 md:px-6">{children}</div> */}
    </>
  );
}
