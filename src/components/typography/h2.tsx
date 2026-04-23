import { cn } from "@/lib/utils";

type H2Props = {
  children: React.ReactNode;
  className?: string;
};

export function TypographyH2({ children, className }: H2Props) {
  return (
    <h2
      className={cn(
        "scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight first:mt-0 sm:text-3xl",
        className,
      )}
    >
      {children}
    </h2>
  );
}
