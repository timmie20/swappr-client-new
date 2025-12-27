import { cn } from "@/lib/utils";

export function TypographyH1({
  text,
  className,
}: {
  text: string;
  className?: string;
}) {
  return (
    <h1
      className={cn(
        "scroll-m-20 text-center text-3xl font-extrabold tracking-tight text-balance sm:text-4xl",
        className,
      )}
    >
      {text}
    </h1>
  );
}
