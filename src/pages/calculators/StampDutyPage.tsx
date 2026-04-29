import { useEffect, useMemo, useState } from "react";
import { CalculatorShell } from "@/components/calculators/CalculatorShell";
import { SEO } from "@/components/SEO";
import { calculateStampDuty, type Region } from "@/lib/finance/stampDuty";
import { formatGBP, formatPercent } from "@/lib/finance/decimal";
import { Loader2, MapPin, CheckCircle2 } from "lucide-react";
import { ShareCalculation } from "@/components/calculators/ShareCalculation";

const PriceInput = ({ value, onChange }: { value: number; onChange: (v: number) => void }) => {
  const [draft, setDraft] = useState(String(value));
  const [focused, setFocused] = useState(false);
  useEffect(() => { if (!focused) setDraft(String(value)); }, [value, focused]);
  return (
    <input
      type="text"
      inputMode="numeric"
      value={draft}
      onFocus={() => setFocused(true)}
      onChange={(e) => {
        const raw = e.target.value;
        setDraft(raw);
        if (raw === "") { onChange(0); return; }
        const n = Number(raw);
        if (Number.isFinite(n) && n >= 0) onChange(n);
      }}
      onBlur={(e) => {
        setFocused(false);
        const n = Math.max(0, Number(e.target.value) || 0);
        onChange(n);
        setDraft(String(n));
      }}
      className="w-full pl-7 pr-3 py-3 rounded-xl bg-background border border-input focus:outline-none focus:ring-2 focus:ring-accent tabular-nums font-medium"
    />
  );
};

const regions: { value: Region; label: string; tax: string }[] = [
  { value: "england", label: "England & N. Ireland", tax: "SDLT" },
  { value: "scotland", label: "Scotland", tax: "LBTT" },
  { value: "wales", label: "Wales", tax: "LTT" },
];

// UK postcode validation (loose, official BS7666 simplified)
const POSTCODE_RE = /^[A-Z]{1,2}\d[A-Z\d]?\s*\d[A-Z]{2}$/i;

// Map a country name (from postcodes.io) to our Region
function countryToRegion(country: string): Region | null {
  const c = country.toLowerCase();
  if (c.includes("scotland")) return "scotland";
  if (c.includes("wales")) return "wales";
  if (c.includes("england") || c.includes("northern ireland")) return "england";
  return null;
}

type LookupState =
  | { status: "idle" }
  | { status: "loading" }
  | { status: "ok"; region: Region; place: string; country: string }
  | { status: "error"; message: string };

const StampDutyPage = () => {
  const [price, setPrice] = useState(450_000);
  const [region, setRegion] = useState<Region>("england");
  const [ftb, setFtb] = useState(false);
  const [additional, setAdditional] = useState(false);
  const [postcode, setPostcode] = useState("");
  const [lookup, setLookup] = useState<LookupState>({ status: "idle" });
  const [regionAuto, setRegionAuto] = useState(false);

  // Debounced postcode lookup
  useEffect(() => {
    const pc = postcode.trim();
    if (!pc) {
      setLookup({ status: "idle" });
      return;
    }
    if (!POSTCODE_RE.test(pc)) {
      setLookup({ status: "error", message: "Enter a valid UK postcode (e.g. SW1A 1AA)" });
      return;
    }
    setLookup({ status: "loading" });
    const ctrl = new AbortController();
    const t = window.setTimeout(async () => {
      try {
        const res = await fetch(
          `https://api.postcodes.io/postcodes/${encodeURIComponent(pc)}`,
          { signal: ctrl.signal },
        );
        if (!res.ok) {
          setLookup({ status: "error", message: "Postcode not found" });
          return;
        }
        const data = await res.json();
        const country: string = data?.result?.country ?? "";
        const place: string =
          data?.result?.admin_district || data?.result?.parish || data?.result?.region || "";
        const r = countryToRegion(country);
        if (!r) {
          setLookup({ status: "error", message: "Could not determine region for this postcode" });
          return;
        }
        setLookup({ status: "ok", region: r, place, country });
        setRegion(r);
        setRegionAuto(true);
      } catch (err) {
        if ((err as Error).name === "AbortError") return;
        setLookup({ status: "error", message: "Lookup failed — set region manually" });
      }
    }, 450);
    return () => {
      ctrl.abort();
      window.clearTimeout(t);
    };
  }, [postcode]);

  const result = useMemo(
    () => calculateStampDuty({ price, region, firstTimeBuyer: ftb, additionalProperty: additional }),
    [price, region, ftb, additional],
  );

  return (
    <CalculatorShell
      eyebrow="Property purchase tax"
      title="UK Stamp Duty Calculator"
      intro="Calculate exact SDLT (England & NI), LBTT (Scotland) or LTT (Wales) for any UK property. Includes first-time buyer relief and additional-property surcharges. All amounts computed with 28-digit decimal precision."
      leadCalculator="stamp-duty"
      leadContext={{ price, region, firstTimeBuyer: ftb, additionalProperty: additional, total: result.total, effectiveRate: result.effectiveRate, postcode: postcode || null }}
    >
      <SEO
        title="Stamp Duty Calculator UK — SDLT, LBTT, LTT — RepayWise"
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
                <PriceInput value={price} onChange={setPrice} />
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

            <Field label="Postcode (optional)">
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                <input
                  type="text"
                  value={postcode}
                  onChange={(e) => {
                    setPostcode(e.target.value.toUpperCase());
                    setRegionAuto(false);
                  }}
                  placeholder="e.g. SW1A 1AA"
                  maxLength={10}
                  autoComplete="postal-code"
                  spellCheck={false}
                  className="w-full pl-9 pr-10 py-3 rounded-xl bg-background border border-input focus:outline-none focus:ring-2 focus:ring-accent uppercase tracking-wide font-medium placeholder:normal-case placeholder:text-muted-foreground/60"
                />
                {lookup.status === "loading" && (
                  <Loader2 className="absolute right-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground animate-spin" />
                )}
                {lookup.status === "ok" && (
                  <CheckCircle2 className="absolute right-3 top-1/2 -translate-y-1/2 size-4 text-success" />
                )}
              </div>
              {lookup.status === "ok" && (
                <p className="mt-2 text-xs text-muted-foreground">
                  {lookup.place ? `${lookup.place}, ` : ""}{lookup.country} —{" "}
                  <span className="text-foreground font-semibold">
                    {regions.find((r) => r.value === lookup.region)?.tax} applies
                  </span>
                </p>
              )}
              {lookup.status === "error" && (
                <p className="mt-2 text-xs text-destructive">{lookup.message}</p>
              )}
            </Field>

            <Field label={regionAuto ? "Region (auto-detected from postcode)" : "Region"}>
              <div className="grid grid-cols-3 gap-1.5 p-1 bg-secondary rounded-xl">
                {regions.map(r => (
                  <button
                    key={r.value}
                    onClick={() => {
                      setRegion(r.value);
                      setRegionAuto(false);
                    }}
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

          <ShareCalculation
            title={`UK Stamp Duty (${result.taxName}) Calculation`}
            calculator="stamp-duty"
            intro={`${regions.find(r => r.value === region)?.label} · ${ftb ? "First-time buyer" : additional ? "Additional property" : "Standard purchase"}`}
            summary={[
              { label: "Property price", value: formatGBP(price) },
              { label: "Region", value: regions.find(r => r.value === region)?.label ?? region },
              { label: "Buyer status", value: ftb ? "First-time buyer" : additional ? "Additional property (2nd home / BTL)" : "Standard" },
              { label: `Total ${result.taxName}`, value: formatGBP(result.total) },
              { label: "Effective rate", value: `${result.effectiveRate.toFixed(2)}%` },
            ]}
          />
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
