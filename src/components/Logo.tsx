import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  showWordmark?: boolean;
  /** Tailwind size for the mark (e.g. "size-9"). Wordmark scales separately. */
  size?: string;
  priority?: boolean;
}

export const LOGO_PULSE_EVENT = "repaywise:logo-pulse";

/**
 * Dispatch `window.dispatchEvent(new CustomEvent(LOGO_PULSE_EVENT, { detail: { state: "calculating" | "settled" } }))`
 * to speed up / slow down the heartbeat. Auto-falls back to "settled" after a short timeout.
 */
export const pulseLogo = (state: "calculating" | "settled") => {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new CustomEvent(LOGO_PULSE_EVENT, { detail: { state } }));
};

/**
 * RepayWise logo: high-DPI mark + crisp HTML wordmark.
 * The mark "beats" like a heart — faster while users tweak calculator inputs,
 * slower once results settle.
 */
export const Logo = ({
  className,
  showWordmark = true,
  size = "size-9",
  priority = false,
}: LogoProps) => {
  const [bpm, setBpm] = useState("1.6s"); // resting

  useEffect(() => {
    if (typeof window === "undefined") return;
    let resetTimer: number | undefined;

    const handler = (e: Event) => {
      const detail = (e as CustomEvent<{ state?: "calculating" | "settled" }>).detail;
      if (detail?.state === "calculating") {
        setBpm("0.7s"); // fast — ~85 bpm feel
        window.clearTimeout(resetTimer);
        resetTimer = window.setTimeout(() => setBpm("1.6s"), 650);
      } else {
        window.clearTimeout(resetTimer);
        resetTimer = window.setTimeout(() => setBpm("1.6s"), 250);
      }
    };

    window.addEventListener(LOGO_PULSE_EVENT, handler);
    return () => {
      window.removeEventListener(LOGO_PULSE_EVENT, handler);
      window.clearTimeout(resetTimer);
    };
  }, []);

  return (
    <span className={cn("flex items-center gap-2.5", className)}>
      <img
        src="/icons/icon-192.png"
        alt="RepayWise logo"
        width={192}
        height={192}
        loading={priority ? "eager" : "lazy"}
        decoding="async"
        style={{ ["--logo-bpm" as string]: bpm }}
        className={cn(
          size,
          "logo-heartbeat rounded-xl ring-1 ring-border transition-[box-shadow,ring-color]",
          "bg-[hsl(var(--background))]/40 p-0.5",
          "group-hover:ring-accent",
        )}
      />
      {showWordmark && (
        <span className="hidden xs:inline text-base sm:text-lg font-bold tracking-tighter text-foreground">
          RepayWise
        </span>
      )}
    </span>
  );
};
