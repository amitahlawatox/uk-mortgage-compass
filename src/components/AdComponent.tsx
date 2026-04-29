interface AdComponentProps {
  slot: "sidebar" | "inline";
  className?: string;
}

const slotCopy: Record<AdComponentProps["slot"], { title: string; size: string; aspectRatio: string; minHeight: string }> = {
  sidebar: {
    title: "Ad slot placeholder",
    size: "300 x 250 or 300 x 600",
    aspectRatio: "6 / 5",
    minHeight: "250px",
  },
  inline: {
    title: "In-content ad placeholder",
    size: "728 x 90 or responsive display unit",
    aspectRatio: "8 / 1",
    minHeight: "90px",
  },
};

export const AdComponent = ({ slot, className = "" }: AdComponentProps) => {
  const copy = slotCopy[slot];

  return (
    <aside
      aria-label={copy.title}
      className={`rounded-2xl border border-dashed border-border bg-card-muted/60 ${className}`.trim()}
    >
      <div
        className="flex h-full flex-col justify-between rounded-2xl p-4"
        style={{ aspectRatio: copy.aspectRatio, minHeight: copy.minHeight }}
      >
        <div>
          <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
            {copy.title}
          </p>
          <p className="mt-2 text-sm font-semibold text-foreground">Reserved for AdSense integration</p>
          <p className="mt-1 text-xs text-muted-foreground">
            Recommended unit: {copy.size}
          </p>
        </div>
        <p className="text-[11px] text-muted-foreground">
          Stable placeholder to prevent layout shift when an ad unit loads.
        </p>
      </div>
    </aside>
  );
};
