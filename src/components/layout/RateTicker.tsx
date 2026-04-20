// Static snapshot of indicative UK mortgage rates. Replace with live API
// (Twenty7Tec / Mortgage Brain) via Supabase Edge Function in Phase 2.
const rates = [
  { label: "2yr Fixed", value: "4.12%", accent: true },
  { label: "5yr Fixed", value: "3.89%" },
  { label: "Tracker", value: "BBR + 0.45%" },
  { label: "Best Buy", value: "3.64%", lime: true },
  { label: "BoE Base", value: "5.00%" },
  { label: "SVR Avg", value: "7.99%" },
];

export const RateTicker = () => (
  <div className="w-full bg-primary text-primary-foreground py-2">
    <div className="max-w-6xl mx-auto px-4 flex items-center gap-4 sm:gap-8 overflow-hidden ticker-mask">
      <div className="flex items-center gap-2 shrink-0">
        <span className="size-1.5 rounded-full bg-accent animate-pulse" />
        <span className="text-[10px] uppercase tracking-widest font-semibold text-primary-foreground/50 whitespace-nowrap">
          Live Rates
        </span>
      </div>
      <div className="flex gap-6 sm:gap-10 tabular-nums whitespace-nowrap">
        {rates.map(r => (
          <div key={r.label} className="flex gap-2 text-xs items-baseline">
            <span className="text-primary-foreground/40">{r.label}</span>
            <span
              className={
                r.lime
                  ? "text-accent-secondary font-medium"
                  : r.accent
                    ? "text-accent font-medium"
                    : "text-primary-foreground font-medium"
              }
            >
              {r.value}
            </span>
          </div>
        ))}
      </div>
    </div>
  </div>
);
