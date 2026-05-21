import {
  Empty,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
  EmptyDescription,
  EmptyContent,
} from "@/components/ui/empty";
import { Icons } from "./icons";
import { Lottie } from "./lottie";
import failAnimation from "@/lottie/fail.json";

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
        <Lottie
          animationData={failAnimation}
          loop
          autoplay
          className="size-64"
        />
      </EmptyContent>
    </Empty>
  );
}
