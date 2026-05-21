import { cn } from "@/lib/utils";

type H1Props = {
  children: React.ReactNode;
  className?: string;
  ref?: React.Ref<HTMLHeadingElement>;
};

export function TypographyH1({ children, className, ref }: H1Props) {
  return (
    <h1
      ref={ref}
      className={cn(
        "scroll-m-20 text-center text-3xl font-extrabold tracking-tight text-balance sm:text-4xl",
        className,
      )}
    >
      {children}
    </h1>
  );
}
