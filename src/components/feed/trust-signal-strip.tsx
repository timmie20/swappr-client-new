import {
  IconShieldCheck,
  IconRefresh,
  IconTag,
  IconClipboardCheck,
} from "@tabler/icons-react";

const TRUST_SIGNALS = [
  {
    icon: IconClipboardCheck,
    label: "90-Point Inspection",
    caption: "Every device tested and certified before it's listed",
  },
  {
    icon: IconShieldCheck,
    label: "12-Month Warranty",
    caption: "Free coverage included with every purchase",
  },
  {
    icon: IconRefresh,
    label: "30-Day Money-Back",
    caption: "Changed your mind? Return it, no questions asked",
  },
  {
    icon: IconTag,
    label: "Up to 70% Off",
    caption: "Premium tech without the brand-new price tag",
  },
];

export function TrustSignalStrip() {
  return (
    <section className="border-y border-black/5 bg-white">
      <div className="mx-auto max-w-screen-2xl px-4 lg:px-6">
        <div className="no-scrollbar flex gap-8 overflow-x-auto py-5 lg:grid lg:grid-cols-4 lg:gap-0 lg:divide-x lg:divide-black/5 lg:overflow-visible lg:py-6">
          {TRUST_SIGNALS.map((signal) => (
            <div
              key={signal.label}
              className="flex shrink-0 items-center gap-3 lg:justify-center lg:px-6"
            >
              <div className="bg-primary/10 text-primary flex size-10 shrink-0 items-center justify-center rounded-xl">
                <signal.icon size={20} />
              </div>
              <div>
                <p className="text-sm font-semibold whitespace-nowrap text-[#1A1A1A]">
                  {signal.label}
                </p>
                <p className="text-muted-foreground mt-0.5 text-xs whitespace-nowrap lg:whitespace-normal">
                  {signal.caption}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
