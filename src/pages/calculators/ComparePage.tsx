import { useMemo, useState } from "react";
import { GitCompare, Trophy } from "lucide-react";
import { CalculatorShell } from "@/components/calculators/CalculatorShell";
import { DepositField } from "@/components/calculators/DepositField";
import { ShareCalculation } from "@/components/calculators/ShareCalculation";
import { SEO } from "@/components/SEO";
import { calculateRepayment } from "@/lib/finance/repayment";
import { formatGBP } from "@/lib/finance/decimal";
import { BreadcrumbJsonLd } from "@/components/seo/BreadcrumbJsonLd";
import { RelatedCalculators } from "@/components/calculators/RelatedCalculators";
import { LastUpdated } from "@/components/calculators/LastUpdated";

interface PlanInputs {
  deposit: number;
  apr: number;
  termYears: number;
  productFee: number;
  addFeeToLoan: boolean;
  interestOnly: boolean;
}

const defaultPlanA: PlanInputs = {
  deposit: 35_000,
  apr: 4.49,
  termYears: 25,
  productFee: 999,
  addFeeToLoan: true,
  interestOnly: false,
};

const defaultPlanB: PlanInputs = {
  deposit: 35_000,
  apr: 4.79,
  termYears: 25,
  productFee: 0,
  addFeeToLoan: false,
  interestOnly: false,
};

const NumberField = ({
  label,
  value,
  onChange,
  step = 1,
  prefix,
  suffix,
  min = 0,
}: {
  label: string;
  value: number;
  onChange: (v: number) => void;
  step?: number;
  prefix?: string;
  suffix?: string;
  min?: number;
}) => (
  <label className="block">
    <span className="block text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-2">
      {label}
    </span>
    <div className="relative">
      {prefix && (
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">
          {prefix}
        </span>
      )}
      <input
        type="number"
        inputMode="decimal"
        value={Number.isFinite(value) ? value : 0}
        min={min}
        step={step}
        onChange={(e) => onChange(Number(e.target.value) || 0)}
        className={`w-full bg-secondary border border-border rounded-xl py-2.5 ${
          prefix ? "pl-7" : "pl-3"
        } ${suffix ? "pr-10" : "pr-3"} text-sm font-semibold tabular-nums focus:outline-none focus:border-accent`}
      />
      {suffix && (
        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">
          {suffix}
        </span>
      )}
    </div>
  </label>
);

const PlanForm = ({
  label,
  plan,
  onChange,
  housePrice,
  showDeposit,
}: {
  label: string;
  plan: PlanInputs;
  onChange: (next: PlanInputs) => void;
  housePrice: number;
  showDeposit: boolean;
}) => (
  <div className="glass-card rounded-2xl p-5 space-y-4">
    <h3 className="text-base font-bold">{label}</h3>
    {showDeposit && (
      <DepositField
        label="Deposit"
        value={plan.deposit}
        referencePrice={housePrice}
        onChange={(v) => onChange({ ...plan, deposit: v })}
        amountMin={0}
        amountMax={housePrice}
      />
    )}
    <NumberField
      label="Interest rate (APR)"
      value={plan.apr}
      step={0.01}
      suffix="%"
      onChange={(v) => onChange({ ...plan, apr: v })}
    />
    <NumberField
      label="Term"
      value={plan.termYears}
      step={1}
      min={1}
      suffix="yrs"
      onChange={(v) => onChange({ ...plan, termYears: Math.max(1, Math.round(v)) })}
    />
    <NumberField
      label="Product / arrangement fee"
      value={plan.productFee}
      step={50}
      prefix="£"
      onChange={(v) => onChange({ ...plan, productFee: v })}
    />
    <div className="flex flex-wrap gap-2">
      <button
        type="button"
        onClick={() => onChange({ ...plan, addFeeToLoan: !plan.addFeeToLoan })}
        className={`px-3 py-2 rounded-lg text-xs font-semibold border transition-colors ${
          plan.addFeeToLoan
            ? "bg-accent text-accent-foreground border-accent"
            : "bg-secondary border-border text-foreground"
        }`}
      >
        {plan.addFeeToLoan ? "Fee added to loan" : "Fee paid upfront"}
      </button>
      <button
        type="button"
        onClick={() => onChange({ ...plan, interestOnly: !plan.interestOnly })}
        className={`px-3 py-2 rounded-lg text-xs font-semibold border transition-colors ${
          plan.interestOnly
            ? "bg-accent text-accent-foreground border-accent"
            : "bg-secondary border-border text-foreground"
        }`}
      >
        {plan.interestOnly ? "Interest-only" : "Repayment"}
      </button>
    </div>
  </div>
);

interface PlanResult {
  monthly: number;
  totalInterest: number;
  totalCost: number;
  totalPaid: number;
  effectiveLoan: number;
  baseLoan: number;
}

const computePlan = (plan: PlanInputs, housePrice: number): PlanResult => {
  const baseLoan = Math.max(0, housePrice - plan.deposit);
  const principal = plan.addFeeToLoan ? baseLoan + plan.productFee : baseLoan;
  const r = calculateRepayment({
    principal,
    annualRate: plan.apr,
    termYears: plan.termYears,
    interestOnly: plan.interestOnly,
  });
  const upfrontFee = plan.addFeeToLoan ? 0 : plan.productFee;
  return {
    monthly: r.monthlyPayment,
    totalInterest: r.totalInterest,
    totalCost: r.totalInterest + plan.productFee,
    totalPaid: r.totalPaid + upfrontFee,
    effectiveLoan: principal,
    baseLoan,
  };
};

const ComparePage = () => {
  const [housePrice, setHousePrice] = useState(350_000);
  const [sameDeposit, setSameDeposit] = useState(true);
  const [sharedDeposit, setSharedDeposit] = useState(35_000);
  const [planA, setPlanA] = useState<PlanInputs>(defaultPlanA);
  const [planB, setPlanB] = useState<PlanInputs>(defaultPlanB);

  // When "same deposit" is on, both plans use sharedDeposit. Otherwise each plan keeps its own.
  const effectiveA: PlanInputs = sameDeposit ? { ...planA, deposit: sharedDeposit } : planA;
  const effectiveB: PlanInputs = sameDeposit ? { ...planB, deposit: sharedDeposit } : planB;

  const a = useMemo(() => computePlan(effectiveA, housePrice), [effectiveA, housePrice]);
  const b = useMemo(() => computePlan(effectiveB, housePrice), [effectiveB, housePrice]);

  const totalCostDiff = a.totalCost - b.totalCost;
  const monthlyDiff = a.monthly - b.monthly;
  const winner: "A" | "B" | "tie" =
    Math.abs(totalCostDiff) < 1 ? "tie" : totalCostDiff < 0 ? "A" : "B";
  const savings = Math.abs(totalCostDiff);

  const handleSameDepositToggle = (next: boolean) => {
    if (next) {
      // Switching back to "same" — seed sharedDeposit from plan A so it doesn't jump.
      setSharedDeposit(planA.deposit);
    } else {
      // Switching to "individual" — seed each plan with the current shared value.
      setPlanA((p) => ({ ...p, deposit: sharedDeposit }));
      setPlanB((p) => ({ ...p, deposit: sharedDeposit }));
    }
    setSameDeposit(next);
  };

  return (
    <CalculatorShell
      eyebrow="Compare two mortgage plans"
      title="Compare Mortgages"
      intro="Put two offers head-to-head. Enter your house price and deposit, then the APR, term and product fee for each plan — we'll show monthly payment, total interest and lifetime cost so you can pick the cheaper deal with confidence."
      leadCalculator="compare"
      leadContext={{ housePrice, sameDeposit, sharedDeposit, planA, planB }}
    >
      <div className="grid lg:grid-cols-[1.1fr_1fr] gap-6">
        <div className="space-y-6">
          <div className="glass-card rounded-2xl p-5 space-y-4">
            <h3 className="text-base font-bold flex items-center gap-2">
              <GitCompare className="size-4 text-accent" /> Property & deposit
            </h3>
            <NumberField
              label="House price"
              value={housePrice}
              step={1000}
              prefix="£"
              onChange={setHousePrice}
            />

            {sameDeposit && (
              <DepositField
                label="Deposit (both plans)"
                value={sharedDeposit}
                referencePrice={housePrice}
                onChange={setSharedDeposit}
                amountMin={0}
                amountMax={housePrice}
              />
            )}

            <label className="flex items-start gap-3 cursor-pointer select-none rounded-xl border border-border bg-secondary/40 p-3">
              <input
                type="checkbox"
                checked={sameDeposit}
                onChange={(e) => handleSameDepositToggle(e.target.checked)}
                className="mt-0.5 size-4 accent-[hsl(var(--accent))] cursor-pointer"
              />
              <span className="text-sm">
                <span className="font-semibold">Deposit is the same in both plans</span>
                <span className="block text-xs text-muted-foreground mt-0.5">
                  Uncheck to put a different deposit on each plan (useful when comparing 10% vs 25% LTV).
                </span>
              </span>
            </label>

            {sameDeposit && (
              <div className="rounded-xl bg-secondary p-3 flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Loan required (both plans)</span>
                <span className="font-bold tabular-nums">{formatGBP(a.baseLoan)}</span>
              </div>
            )}
            {!sameDeposit && (
              <div className="grid grid-cols-2 gap-2">
                <div className="rounded-xl bg-secondary p-3 text-sm">
                  <p className="text-[10px] uppercase tracking-widest font-bold text-muted-foreground mb-1">
                    Loan A
                  </p>
                  <p className="font-bold tabular-nums">{formatGBP(a.baseLoan)}</p>
                </div>
                <div className="rounded-xl bg-secondary p-3 text-sm">
                  <p className="text-[10px] uppercase tracking-widest font-bold text-muted-foreground mb-1">
                    Loan B
                  </p>
                  <p className="font-bold tabular-nums">{formatGBP(b.baseLoan)}</p>
                </div>
              </div>
            )}
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <PlanForm
              label="Plan A"
              plan={planA}
              onChange={setPlanA}
              housePrice={housePrice}
              showDeposit={!sameDeposit}
            />
            <PlanForm
              label="Plan B"
              plan={planB}
              onChange={setPlanB}
              housePrice={housePrice}
              showDeposit={!sameDeposit}
            />
          </div>
        </div>

        <div className="space-y-4">
          <div className="glass-card rounded-2xl p-5">
            <p className="text-[11px] font-bold uppercase tracking-widest text-accent mb-2">
              Verdict
            </p>
            {winner === "tie" ? (
              <p className="text-xl font-bold">Both plans cost the same overall.</p>
            ) : (
              <p className="text-xl font-bold flex items-start gap-2">
                <Trophy className="size-5 text-accent-secondary shrink-0 mt-1" />
                <span>
                  Plan {winner} is cheaper by{" "}
                  <span className="text-gradient-velocity">{formatGBP(savings)}</span> over the
                  full term.
                </span>
              </p>
            )}
            <p className="text-sm text-muted-foreground mt-2">
              {Math.abs(monthlyDiff) < 0.5
                ? "Monthly payments are identical."
                : `Monthly payment differs by ${formatGBP(Math.abs(monthlyDiff))}.`}
            </p>
          </div>

          <ComparisonTable a={a} b={b} sameDeposit={sameDeposit} />

          <ShareCalculation
            title="Mortgage comparison"
            calculator="compare"
            intro={`Comparing two mortgage offers on a ${formatGBP(housePrice)} property${
              sameDeposit
                ? ` with a shared ${formatGBP(sharedDeposit)} deposit (loan: ${formatGBP(a.baseLoan)}).`
                : ` with separate deposits per plan.`
            }`}
            summary={[
              {
                label: "Cheaper plan overall",
                value: winner === "tie" ? "Tie" : `Plan ${winner} (saves ${formatGBP(savings)})`,
              },
              { label: "Plan A monthly", value: formatGBP(a.monthly) },
              { label: "Plan B monthly", value: formatGBP(b.monthly) },
            ]}
            sections={[
              {
                heading: "Plan A details",
                lines: [
                  { label: "Deposit", value: formatGBP(effectiveA.deposit) },
                  { label: "Loan amount", value: formatGBP(a.baseLoan) },
                  { label: "APR", value: `${planA.apr.toFixed(2)}%` },
                  { label: "Term", value: `${planA.termYears} years` },
                  { label: "Product fee", value: formatGBP(planA.productFee) },
                  {
                    label: "Fee handling",
                    value: planA.addFeeToLoan ? "Added to loan" : "Paid upfront",
                  },
                  { label: "Type", value: planA.interestOnly ? "Interest-only" : "Repayment" },
                  { label: "Effective loan", value: formatGBP(a.effectiveLoan) },
                  { label: "Monthly payment", value: formatGBP(a.monthly) },
                  { label: "Total interest", value: formatGBP(a.totalInterest) },
                  { label: "Total cost (interest + fee)", value: formatGBP(a.totalCost) },
                  { label: "Total paid over term", value: formatGBP(a.totalPaid) },
                ],
              },
              {
                heading: "Plan B details",
                lines: [
                  { label: "Deposit", value: formatGBP(effectiveB.deposit) },
                  { label: "Loan amount", value: formatGBP(b.baseLoan) },
                  { label: "APR", value: `${planB.apr.toFixed(2)}%` },
                  { label: "Term", value: `${planB.termYears} years` },
                  { label: "Product fee", value: formatGBP(planB.productFee) },
                  {
                    label: "Fee handling",
                    value: planB.addFeeToLoan ? "Added to loan" : "Paid upfront",
                  },
                  { label: "Type", value: planB.interestOnly ? "Interest-only" : "Repayment" },
                  { label: "Effective loan", value: formatGBP(b.effectiveLoan) },
                  { label: "Monthly payment", value: formatGBP(b.monthly) },
                  { label: "Total interest", value: formatGBP(b.totalInterest) },
                  { label: "Total cost (interest + fee)", value: formatGBP(b.totalCost) },
                  { label: "Total paid over term", value: formatGBP(b.totalPaid) },
                ],
              },
            ]}
            notes={[
              "Total cost = interest paid plus product fee, the true 'extra' you pay above the loan amount.",
              "Adding the product fee to the loan reduces upfront cash but adds interest over the term.",
              "Different deposits change the loan size — a larger deposit usually unlocks lower lender APRs in real life.",
              "Interest-only plans require you to repay the original loan in full at the end of the term.",
            ]}
          />
        </div>
      </div>

      <SEO
        title="Compare Mortgages | Side-by-side UK Plan Comparison — RepayWise"
        description="Compare two UK mortgage offers side by side. Enter house price, deposit, APR, term and product fee — see monthly payment, total interest and lifetime cost."
        path="/calculators/compare"
      />

      <BreadcrumbJsonLd
        items={[
          { name: "Home", href: "/" },
          { name: "Calculators", href: "/" },
          { name: "Compare Mortgages", href: "/calculators/compare" },
        ]}
      />

      <LastUpdated date="30 April 2026" />
      <RelatedCalculators currentPath="/calculators/compare" />
    </CalculatorShell>
  );
};

const Row = ({
  label,
  a,
  b,
  highlight,
}: {
  label: string;
  a: string;
  b: string;
  highlight?: "A" | "B" | "none";
}) => (
  <div className="grid grid-cols-[1.4fr_1fr_1fr] gap-2 py-2 border-b border-border last:border-0 text-sm">
    <span className="text-muted-foreground">{label}</span>
    <span
      className={`text-right tabular-nums font-semibold ${
        highlight === "A" ? "text-accent-secondary" : ""
      }`}
    >
      {a}
    </span>
    <span
      className={`text-right tabular-nums font-semibold ${
        highlight === "B" ? "text-accent-secondary" : ""
      }`}
    >
      {b}
    </span>
  </div>
);

const ComparisonTable = ({
  a,
  b,
  sameDeposit,
}: {
  a: PlanResult;
  b: PlanResult;
  sameDeposit: boolean;
}) => {
  const cheaperMonthly: "A" | "B" | "none" =
    Math.abs(a.monthly - b.monthly) < 0.5 ? "none" : a.monthly < b.monthly ? "A" : "B";
  const cheaperInterest: "A" | "B" | "none" =
    Math.abs(a.totalInterest - b.totalInterest) < 1
      ? "none"
      : a.totalInterest < b.totalInterest
        ? "A"
        : "B";
  const cheaperTotal: "A" | "B" | "none" =
    Math.abs(a.totalCost - b.totalCost) < 1 ? "none" : a.totalCost < b.totalCost ? "A" : "B";

  return (
    <div className="glass-card rounded-2xl p-5">
      <div className="grid grid-cols-[1.4fr_1fr_1fr] gap-2 pb-2 border-b border-border text-[11px] font-bold uppercase tracking-widest text-muted-foreground">
        <span></span>
        <span className="text-right">Plan A</span>
        <span className="text-right">Plan B</span>
      </div>
      {!sameDeposit && (
        <Row label="Loan amount" a={formatGBP(a.baseLoan)} b={formatGBP(b.baseLoan)} />
      )}
      <Row label="Effective loan" a={formatGBP(a.effectiveLoan)} b={formatGBP(b.effectiveLoan)} />
      <Row
        label="Monthly payment"
        a={formatGBP(a.monthly)}
        b={formatGBP(b.monthly)}
        highlight={cheaperMonthly}
      />
      <Row
        label="Total interest"
        a={formatGBP(a.totalInterest)}
        b={formatGBP(b.totalInterest)}
        highlight={cheaperInterest}
      />
      <Row
        label="Total cost (incl. fee)"
        a={formatGBP(a.totalCost)}
        b={formatGBP(b.totalCost)}
        highlight={cheaperTotal}
      />
      <Row label="Total paid over term" a={formatGBP(a.totalPaid)} b={formatGBP(b.totalPaid)} />
    </div>
  );
};

export default ComparePage;
