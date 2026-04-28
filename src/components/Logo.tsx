import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  showWordmark?: boolean;
  /** Tailwind size for the mark (e.g. "size-9"). Wordmark scales separately. */
  size?: string;
  priority?: boolean;
}

/**
 * RepayWise logo: high-DPI mark + crisp HTML wordmark.
 * - Mark renders from the public 192px icon to keep header payloads light.
 * - Wordmark uses themed text token so it adapts to light/dark automatically.
 * - Wordmark hides on very small screens, mark stays visible.
 */
export const Logo = ({
  className,
  showWordmark = true,
  size = "size-9",
  priority = false,
}: LogoProps) => (
  <span className={cn("flex items-center gap-2.5", className)}>
    <img
      src="/icons/icon-192.png"
      alt="RepayWise logo"
      width={192}
      height={192}
      loading={priority ? "eager" : "lazy"}
      decoding="async"
      className={cn(
        size,
        "rounded-xl ring-1 ring-border transition-all",
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
