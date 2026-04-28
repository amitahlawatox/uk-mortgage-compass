interface AdComponentProps {
  slot: "sidebar" | "inline";
  className?: string;
}

const slotCopy: Record<AdComponentProps["slot"], { title: string; size: string }> = {
  sidebar: {
    title: "Ad slot placeholder",
    size: "300 x 250 or 300 x 600",
  },
  inline: {
    title: "In-content ad placeholder",
    size: "728 x 90 or responsive display unit",
  },
};

export const AdComponent = ({ slot, className = "" }: AdComponentProps) => {
  const copy = slotCopy[slot];

  return (
    <aside
      aria-label={copy.title}
      className={`rounded-2xl border border-dashed border-border bg-card-muted/60 p-4 ${className}`.trim()}
    >
      <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
        {copy.title}
      </p>
      <p className="mt-2 text-sm font-semibold text-foreground">Reserved for AdSense integration</p>
      <p className="mt-1 text-xs text-muted-foreground">
        Recommended unit: {copy.size}
      </p>
    </aside>
  );
};
