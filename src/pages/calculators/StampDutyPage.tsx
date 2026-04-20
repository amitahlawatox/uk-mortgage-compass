import { useMemo, useState } from "react";
import { CalculatorShell } from "@/components/calculators/CalculatorShell";
import { SEO } from "@/components/SEO";
import { calculateStampDuty, type Region } from "@/lib/finance/stampDuty";
import { formatGBP, formatPercent } from "@/lib/finance/decimal";

const regions: { value: Region; label: string; tax: string }[] = [
  { value: "england", label: "England & N. Ireland", tax: "SDLT" },
  { value: "scotland", label: "Scotland", tax: "LBTT" },
  { value: "wales", label: "Wales", tax: "LTT" },
];

const StampDutyPage = () => {
  const [price, setPrice] = useState(450_000);
  const [region, setRegion] = useState<Region>("england");
  const [ftb, setFtb] = useState(false);
  const [additional, setAdditional] = useState(false);

  const result = useMemo(
    () => calculateStampDuty({ price, region, firstTimeBuyer: ftb, additionalProperty: additional }),
    [price, region, ftb, additional],
  );

  return (
    <CalculatorShell
      eyebrow="Property purchase tax"
      title="UK Stamp Duty Calculator"
      intro="Calculate exact SDLT (England & NI), LBTT (Scotland) or LTT (Wales) for any UK property. Includes first-time buyer relief and additional-property surcharges. All amounts computed with 28-digit decimal precision."
    >
      <SEO
        title="Stamp Duty Calculator UK 2024 — SDLT, LBTT, LTT | Velocity"
        description="Free UK stamp duty calculator covering England (SDLT), Scotland (LBTT) and Wales (LTT). First-time buyer relief, second-home surcharges, and full band-by-band breakdown."
        path="/calculators/stamp-duty"
      />

      <div className="grid lg:grid-cols-5 gap-6">
        {/* Inputs */}
        <div className="lg:col-span-2 space-y-5">
          <div className="glass-card rounded-2xl p-6 space-y-5">
            <Field label="Property price">
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">£</span>
                <input
                  type="number"
                  min={0}
                  step={1000}
                  value={price}
                  onChange={e => setPrice(Math.max(0, Number(e.target.value) || 0))}
                  className="w-full pl-7 pr-3 py-3 rounded-xl bg-background border border-input focus:outline-none focus:ring-2 focus:ring-accent tabular-nums font-medium"
                />
              </div>
              <input
                type="range"
                min={50_000}
                max={2_000_000}
                step={5_000}
                value={price}
                onChange={e => setPrice(Number(e.target.value))}
                className="w-full mt-3 accent-foreground"
              />
            </Field>

            <Field label="Region">
              <div className="grid grid-cols-3 gap-1.5 p-1 bg-secondary rounded-xl">
                {regions.map(r => (
                  <button
                    key={r.value}
                    onClick={() => setRegion(r.value)}
                    className={`px-2 py-2 rounded-lg text-xs font-semibold transition ${
                      region === r.value
                        ? "bg-background shadow-soft"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {r.tax}
                    <div className="text-[9px] font-medium opacity-70 mt-0.5">{r.label.split(" ")[0]}</div>
                  </button>
                ))}
              </div>
            </Field>

            <Toggle checked={ftb} onChange={setFtb} label="First-time buyer" />
            <Toggle
              checked={additional}
              onChange={setAdditional}
              label="Additional property (second home / BTL)"
            />
          </div>
        </div>

        {/* Result */}
        <div className="lg:col-span-3 space-y-4">
          <div className="rounded-2xl bg-primary text-primary-foreground p-6 sm:p-8 shadow-glow-cyan">
            <p className="text-[11px] uppercase tracking-widest text-primary-foreground/60 font-semibold mb-2">
              Total {result.taxName}
            </p>
            <p className="text-5xl sm:text-6xl font-bold tabular-nums tracking-tight">
              {formatGBP(result.total)}
            </p>
            <p className="mt-2 text-sm text-primary-foreground/60">
              Effective rate {formatPercent(result.effectiveRate)} on {formatGBP(price)} purchase
            </p>
          </div>

          <div className="glass-card rounded-2xl overflow-hidden">
            <div className="px-5 py-3 border-b border-border bg-card-muted">
              <p className="text-xs font-bold uppercase tracking-widest">Band breakdown</p>
            </div>
            {result.breakdown.length === 0 ? (
              <p className="p-6 text-sm text-muted-foreground">No tax due at this purchase price.</p>
            ) : (
              <table className="w-full text-sm">
                <thead className="text-[10px] uppercase tracking-widest text-muted-foreground">
                  <tr>
                    <th className="text-left px-5 py-2 font-semibold">Band</th>
                    <th className="text-right px-5 py-2 font-semibold">Rate</th>
                    <th className="text-right px-5 py-2 font-semibold">Taxable</th>
                    <th className="text-right px-5 py-2 font-semibold">Tax</th>
                  </tr>
                </thead>
                <tbody>
                  {result.breakdown.map((row, i) => (
                    <tr key={i} className="border-t border-border tabular-nums">
                      <td className="px-5 py-3">{row.band}</td>
                      <td className="px-5 py-3 text-right">{(row.rate * 100).toFixed(1)}%</td>
                      <td className="px-5 py-3 text-right">{formatGBP(row.taxable)}</td>
                      <td className="px-5 py-3 text-right font-semibold">{formatGBP(row.tax)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>

          {result.notes.length > 0 && (
            <ul className="text-xs text-muted-foreground space-y-1 px-1">
              {result.notes.map((n, i) => (
                <li key={i}>• {n}</li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </CalculatorShell>
  );
};

const Field = ({ label, children }: { label: string; children: React.ReactNode }) => (
  <div>
    <label className="block text-[11px] font-bold uppercase tracking-widest text-muted-foreground mb-2">
      {label}
    </label>
    {children}
  </div>
);

const Toggle = ({
  checked,
  onChange,
  label,
}: {
  checked: boolean;
  onChange: (v: boolean) => void;
  label: string;
}) => (
  <button
    onClick={() => onChange(!checked)}
    className="w-full flex items-center justify-between p-3 rounded-xl border border-border hover:border-foreground/30 transition text-left"
  >
    <span className="text-sm font-medium">{label}</span>
    <span
      className={`relative w-10 h-6 rounded-full transition ${
        checked ? "bg-accent" : "bg-secondary"
      }`}
    >
      <span
        className={`absolute top-0.5 size-5 rounded-full bg-background shadow-soft transition-transform ${
          checked ? "translate-x-[18px]" : "translate-x-0.5"
        }`}
      />
    </span>
  </button>
);

export default StampDutyPage;
