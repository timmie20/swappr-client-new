import {
  IconShieldCheck,
  IconRefresh,
  IconTag,
  IconClipboardCheck,
} from "@tabler/icons-react";

const TRUST_SIGNALS = [
  {
    icon: <IconShieldCheck size={20} />,
    label: "12-Month Warranty",
  },
  {
    icon: <IconRefresh size={20} />,
    label: "30-Day Money-Back",
  },
  {
    icon: <IconTag size={20} />,
    label: "Up to 70% Off",
  },
  {
    icon: <IconClipboardCheck size={20} />,
    label: "90-Point Inspection",
  },
];

export function TrustSignalStrip() {
  return (
    <div className="border-b border-[#E5E7EB] bg-[#F0FAF7]">
      <div className="mx-auto max-w-7xl px-4 lg:px-6">
        <div className="no-scrollbar flex items-center justify-center gap-0 overflow-x-auto py-3 sm:gap-4">
          {TRUST_SIGNALS.map((signal, i) => (
            <div key={signal.label} className="flex items-center">
              <div className="flex shrink-0 items-center gap-2 px-4 text-[#1A6B5A]">
                <span className="text-[#1A6B5A]">{signal.icon}</span>
                <span className="text-xs font-semibold whitespace-nowrap text-[#1A1A1A] sm:text-sm">
                  {signal.label}
                </span>
              </div>
              {i < TRUST_SIGNALS.length - 1 && (
                <div className="hidden h-4 w-px bg-[#D1FAE5] sm:block" />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
