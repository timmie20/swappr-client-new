import {
  Empty,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
  EmptyDescription,
  EmptyContent,
} from "@/components/ui/empty";
import { Icons } from "./icons";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

interface ErrorStateProps {
  title: string;
  description: string;
  variant?: "default" | "icon";
  className?: string;
}

export function ErrorState({
  title,
  description,
  variant = "icon",
  className,
}: ErrorStateProps) {
  return (
    <Empty className={className}>
      <EmptyHeader>
        <EmptyMedia variant={variant}>
          <Icons.error />
        </EmptyMedia>
        <EmptyTitle>{title}</EmptyTitle>
        <EmptyDescription>{description}</EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <DotLottieReact src="/assets/icons/fail.lottie" loop autoplay />
      </EmptyContent>
    </Empty>
  );
}
