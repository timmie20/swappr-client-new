"use client";

import { TypographyH1 } from "@/components/typography/h1";

interface CountdownUnitProps {
  value: number;
  label: string;
  isLast?: boolean;
}

function pad2(n: number) {
  return n.toString().padStart(2, "0");
}

function CountdownUnit({ value, label, isLast }: CountdownUnitProps) {
  return (
    <div className="flex items-center gap-3 sm:gap-4">
      <div className="flex flex-col items-center gap-1">
        {/* digit block */}
        <div className="flex h-18 items-center justify-center sm:h-24 sm:w-28">
          <TypographyH1 className="font-mono text-2xl tabular-nums">
            {pad2(value)}
          </TypographyH1>
        </div>
        <span className="font-sans text-[10px] font-medium tracking-widest text-slate-400 uppercase sm:text-xs">
          {label}
        </span>
      </div>

      {/* separator colon — hidden after last unit */}
      {!isLast && (
        <span className="mb-5 font-mono text-4xl font-light text-slate-300 select-none sm:text-5xl">
          :
        </span>
      )}
    </div>
  );
}

interface CountdownTimerProps {
  hours: number;
  minutes: number;
  seconds: number;
  isExpired: boolean;
}

export function CountdownTimer({
  hours,
  minutes,
  seconds,
  isExpired,
}: CountdownTimerProps) {
  if (isExpired) {
    return (
      <div className="flex flex-col items-center gap-2 py-6">
        <TypographyH1 className="font-mono text-red-500">00:00:00</TypographyH1>
        <p className="text-xs font-medium tracking-widest text-red-400 uppercase">
          Session expired
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center gap-1 py-6">
      {/* urgency label */}
      <p className="text-muted-foreground mb-3 text-center text-[11px] font-semibold tracking-[0.2em] text-pretty uppercase">
        We&apos;ve held these items just for you. Finish your payment within the
        time shown above to secure your order once the timer expires, your
        reserved stock goes back on the shelf.{" "}
      </p>

      {/* timer row */}
      <div className="flex items-center">
        <CountdownUnit value={hours} label="hrs" />
        <CountdownUnit value={minutes} label="min" />
        <CountdownUnit value={seconds} label="sec" isLast />
      </div>

      {/* subtle progress bar */}
      <ProgressBar seconds={seconds} />
    </div>
  );
}

/** Thin animated bar that pulses every second tick */
function ProgressBar({ seconds }: { seconds: number }) {
  const pct = ((60 - seconds) / 60) * 100;
  return (
    <div className="mt-4 h-0.5 w-40 overflow-hidden rounded-full bg-slate-100">
      <div
        className="h-full rounded-full bg-blue-500 transition-all duration-1000 ease-linear"
        style={{ width: `${pct}%` }}
      />
    </div>
  );
}
