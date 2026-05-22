import Image from "next/image";

import { cn } from "@/lib/utils";

type VariantType = "light" | "dark";

type DynamicLogoProps = {
  variant: VariantType;
  alt?: string;
  width?: number;
  height?: number;
  priority?: boolean;
  className?: string;
};

const logoVariant: Record<VariantType, string> = {
  light: "/assets/logos/logo-light.png",
  dark: "/assets/logos/logo-dark.png",
};

export default function Logo({
  variant,
  alt = "Swappr logo",
  width = 120,
  height = 40,
  priority,
  className,
}: DynamicLogoProps) {
  const src = logoVariant[variant];

  return (
    <Image
      src={src}
      alt={alt}
      width={width}
      height={height}
      priority={priority}
      className={cn("h-auto w-auto cursor-pointer", className)}
    />
  );
}
