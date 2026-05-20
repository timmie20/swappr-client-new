import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

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
    // timeZone: "Africa/Lagos",
  }).format(date);
};

dayjs.extend(relativeTime);

dayjs.extend(relativeTime);
dayjs.extend(utc);
dayjs.extend(timezone);

export function formatRelativeDate(date: string | Date): string {
  const d = dayjs.utc(date).tz("Africa/Lagos");

  const diffInDays = dayjs().diff(d, "day");

  if (diffInDays >= 7) {
    return d.format("DD MMM");
  }

  return d.fromNow();
}
