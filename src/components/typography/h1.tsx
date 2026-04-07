import { cn } from "@/lib/utils";

type H1Props = {
  children: React.ReactNode;
  className?: string;
};

export function TypographyH1({ children, className }: H1Props) {
  return (
    <h1
      className={cn(
        "scroll-m-20 text-center text-3xl font-extrabold tracking-tight text-balance sm:text-4xl",
        className,
      )}
    >
      {children}
    </h1>
  );
}
