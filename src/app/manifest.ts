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
    theme_color: "#08161f",
    icons: [
      {
        src: "/icon-192x192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/icon-512x512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}
