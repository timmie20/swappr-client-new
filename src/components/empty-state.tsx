import { ReactNode } from "react";
import {
  Empty,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
  EmptyDescription,
  EmptyContent,
} from "@/components/ui/empty";
import GhostLoading from "./ghost-loading";

interface EmptyStateProps {
  icon?: ReactNode;
  title: string;
  description: string;
  variant?: "default" | "icon";
  className?: string;
  actions?: ReactNode;
}

export function EmptyState({
  icon,
  title,
  description,
  variant = "icon",
  actions,
  className,
}: EmptyStateProps) {
  return (
    <Empty className={className}>
      <EmptyHeader>
        {icon && <EmptyMedia variant={variant}>{icon}</EmptyMedia>}
        <EmptyTitle>{title}</EmptyTitle>
        <EmptyDescription>{description}</EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <GhostLoading />
        {actions && <div className="flex justify-center">{actions}</div>}
      </EmptyContent>
    </Empty>
  );
}
