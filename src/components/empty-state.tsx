import { ReactNode } from "react";
import {
  Empty,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
  EmptyDescription,
  EmptyContent,
} from "@/components/ui/empty";
import { Lottie } from "./lottie";
import ghost from "@/lottie/ghost.json";
import emptyCart from "@/lottie/empty shopping bag.json";
import comingSoon from "@/lottie/coming soon.json";

type LottieType = "ghost" | "cart" | "comingSoon";

const lottieAnimations: Record<LottieType, object> = {
  ghost,
  comingSoon,
  cart: emptyCart,
};

type BaseProps = {
  title: string;
  description: string;
  className?: string;
  actions?: ReactNode;
};

type IconVariantProps = BaseProps & {
  variant: "icon";
  icon: ReactNode;
};

type LottieVariantProps = BaseProps & {
  size?: "small" | "medium" | "large";
  variant: "lottie";
  lottieType: LottieType;
};

const sizeClasses = {
  small: "size-32",
  medium: "size-40",
  large: "size-52",
};

type EmptyStateProps = IconVariantProps | LottieVariantProps;

export function EmptyState(props: EmptyStateProps) {
  return (
    <Empty className={props.className}>
      <EmptyHeader>
        {props.variant === "icon" && (
          <EmptyMedia variant="icon">{props.icon}</EmptyMedia>
        )}

        <EmptyTitle>{props.title}</EmptyTitle>

        <EmptyDescription>{props.description}</EmptyDescription>
      </EmptyHeader>

      <EmptyContent>
        {props.variant === "lottie" && (
          <Lottie
            animationData={lottieAnimations[props.lottieType]}
            loop
            autoPlay
            className={sizeClasses[props.size || "medium"]}
          />
        )}

        {props.actions && (
          <div className="flex justify-center">{props.actions}</div>
        )}
      </EmptyContent>
    </Empty>
  );
}
