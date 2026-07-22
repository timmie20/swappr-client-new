import { Icons, type Icon } from "@/components/icons";

/**
 * Frontend-only: the backend has no notion of category icons.
 * Keyed by slug, one entry per top-level category we know about — anything
 * unmapped (e.g. newly added categories) falls back to DEFAULT_CATEGORY_ICON.
 */
export const CATEGORY_ICONS: Record<string, Icon> = {
  phones: Icons.phone,
  tablets: Icons.phone,
  "laptops-and-computers": Icons.laptop,
  "desktops-and-monitors": Icons.desktop,
  "computer-accessories": Icons.mouse,
  "phone-accessories": Icons.plug,
  "chargers-and-power": Icons.bolt,
  adapters: Icons.plug,
  "gaming-consoles": Icons.gamepad,
  "gaming-accessories": Icons.gamepad,
  "audio-and-headphones": Icons.headphones,
  "smartwatches-and-wearables": Icons.watch,
  "networking-equipment": Icons.router,
  "cameras-and-photography": Icons.camera,
  "printers-and-scanners": Icons.printer,
  "software-and-licenses": Icons.cloud,
  "refurbished-and-clearance": Icons.recycle,
};

export const DEFAULT_CATEGORY_ICON: Icon = Icons.category;
