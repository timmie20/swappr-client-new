"use client";
import Image, { ImageProps } from "next/image";
import { useState } from "react";

interface SafeImageProps extends Omit<ImageProps, "src" | "onError"> {
  src: string;
  fallback?: string;
  alt: string;
}

export function SafeImage({
  src,
  fallback = "/assets/images/placeholder.jpg",
  alt,
  ...props
}: SafeImageProps) {
  const [imgSrc, setImgSrc] = useState(src || fallback);

  return (
    <Image
      {...props}
      src={imgSrc || fallback}
      onError={() => setImgSrc(fallback)}
      alt={alt}
      priority
    />
  );
}
