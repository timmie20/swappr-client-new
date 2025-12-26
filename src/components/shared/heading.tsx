import React, { PropsWithChildren } from "react";

export default function Heading({ children }: PropsWithChildren) {
  return (
    <h1 className="text-tertiary  sm:text-xxlarge leading-[105%] font-semibold tracking-tight text-balance">
      {children}
    </h1>
  );
}
