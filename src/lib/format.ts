import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

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
    timeZone: "Africa/Lagos",
  }).format(date);
};

dayjs.extend(relativeTime);

export function formatRelativeDate(date: string | Date): string {
  const d = dayjs(date);
  const diffInDays = dayjs().diff(d, "day");

  if (diffInDays >= 7) {
    return d.format("DD MMM"); // e.g. "14 Mar"
  }

  return d.fromNow(); // e.g. "2 hours ago", "5 days ago"
}
