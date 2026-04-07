import { cn } from "@/lib/utils";

type MutedProps = {
  children: React.ReactNode;
  className?: string;
};

export function TypographyMuted({ children, className }: MutedProps) {
  return (
    <p className={cn("text-muted-foreground text-sm", className)}>{children}</p>
  );
}
