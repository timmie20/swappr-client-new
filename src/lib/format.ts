import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

import type { OperatingHours } from "@/types/checkout";

export function formatStorageCapacity(
  capacity: number | string | undefined,
): string {
  if (!capacity) return "";

  const numericCapacity =
    typeof capacity === "string" ? parseFloat(capacity) : capacity;

  if (isNaN(numericCapacity)) return "";

  // Convert to TB if >= 1000 GB
  if (numericCapacity >= 1000) {
    const tb = numericCapacity / 1024;
    // Format to 1 decimal place if not a whole number
    const formatted = tb % 1 === 0 ? tb.toFixed(0) : tb.toFixed(1);
    return `${formatted}TB`;
  }

  // Otherwise show in GB
  return `${numericCapacity}GB`;
}

export function formatNaira(amount: number | string | undefined): string {
  if (amount === undefined || amount === null) return "₦0.00";

  const numericAmount =
    typeof amount === "string" ? parseFloat(amount) : amount;

  if (isNaN(numericAmount)) return "₦0.00";

  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(numericAmount);
}

export const formatDate = (dateString: string | Date) => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat("en-NG", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
    timeZone: "Africa/Lagos",
  }).format(date);
};

dayjs.extend(relativeTime);

dayjs.extend(relativeTime);
dayjs.extend(utc);
dayjs.extend(timezone);

const WEEK_ORDER = [
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
  "sunday",
];

const DAY_ABBREVIATIONS: Record<string, string> = {
  monday: "Mon",
  tuesday: "Tue",
  wednesday: "Wed",
  thursday: "Thu",
  friday: "Fri",
  saturday: "Sat",
  sunday: "Sun",
};

function formatDayRanges(days: string[]): string {
  const weekIndices = WEEK_ORDER.map((day) =>
    days.some((d) => d.toLowerCase() === day) ? true : false,
  );

  const ranges: [number, number][] = [];
  let rangeStart: number | null = null;

  weekIndices.forEach((isActive, index) => {
    if (isActive && rangeStart === null) {
      rangeStart = index;
    } else if (!isActive && rangeStart !== null) {
      ranges.push([rangeStart, index - 1]);
      rangeStart = null;
    }
  });

  if (rangeStart !== null) {
    ranges.push([rangeStart, weekIndices.length - 1]);
  }

  return ranges
    .map(([start, end]) =>
      start === end
        ? DAY_ABBREVIATIONS[WEEK_ORDER[start]]
        : `${DAY_ABBREVIATIONS[WEEK_ORDER[start]]}–${DAY_ABBREVIATIONS[WEEK_ORDER[end]]}`,
    )
    .join(", ");
}

function formatTime12h(time: string): string {
  const [hourStr, minuteStr = "00"] = time.split(":");
  const hour = parseInt(hourStr, 10);

  if (isNaN(hour)) return time;

  const period = hour >= 12 ? "PM" : "AM";
  const hour12 = hour % 12 === 0 ? 12 : hour % 12;

  return `${hour12}:${minuteStr.padStart(2, "0")} ${period}`;
}

export function formatOperatingHours(
  hours: OperatingHours | null | undefined,
): string | null {
  if (!hours?.days?.length || !hours.open_time || !hours.close_time) {
    return null;
  }

  const dayRanges = formatDayRanges(hours.days);
  if (!dayRanges) return null;

  return `${dayRanges}, ${formatTime12h(hours.open_time)} – ${formatTime12h(hours.close_time)}`;
}

export function formatRelativeDate(date: string | Date): string {
  const d = dayjs.utc(date).tz("Africa/Lagos");

  const diffInDays = dayjs().diff(d, "day");

  if (diffInDays >= 7) {
    return d.format("DD MMM");
  }

  return d.fromNow();
}

export function deslug(slug: string, uppercase: string[] = []): string {
  return slug
    .replace(/[-_]/g, " ")
    .replace(/\b\w+/g, (word) => {
      if (uppercase.includes(word.toUpperCase())) return word.toUpperCase();
      return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    })
    .trim();
}

export function getInitials(name: string): string {
  return name
    .split(/[^a-zA-Z]+/)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase() ?? "")
    .join("");
}
