import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Swappr - Phone Trade-in Platform",
    short_name: "Swappr",
    description:
      "Nigeria's first phone valuation system for trading, buying, and selling devices",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#3B82FD",
    icons: [
      {
        src: "/assets/favicon/android-chrome-192x192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/assets/favicon/android-chrome-512x512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}
