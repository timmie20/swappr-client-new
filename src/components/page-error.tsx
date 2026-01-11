import { ReactNode } from "react";
import {
  Empty,
  EmptyHeader,
  EmptyTitle,
  EmptyDescription,
  EmptyContent,
} from "@/components/ui/empty";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { IconAlertTriangle } from "@tabler/icons-react";

interface ErrorStateProps {
  icon?: ReactNode;
  title: string;
  description: string;
  variant?: "default" | "icon";
  className?: string;
  children?: ReactNode;
}

export function PageError({
  title,
  description,
  className,
  children,
}: ErrorStateProps) {
  return (
    <div className="max-w-lg space-y-6">
      <Empty className={className}>
        <EmptyHeader>
          <IconAlertTriangle className="size-12" />
          <EmptyTitle>{title}</EmptyTitle>
          <EmptyDescription>{description}</EmptyDescription>
        </EmptyHeader>
        <EmptyContent>
          <DotLottieReact src="/assets/icons/fail.lottie" loop autoplay />
        </EmptyContent>
      </Empty>
      {children && <div className="flex justify-center gap-4">{children}</div>}
    </div>
  );
}
