import { useMemo, useState } from "react";
import { CalculatorShell } from "@/components/calculators/CalculatorShell";
import { SEO } from "@/components/SEO";
import { calculateAffordability } from "@/lib/finance/affordability";
import { formatGBP } from "@/lib/finance/decimal";
import { SliderField, BigStat } from "./RepaymentPage";
import { CheckCircle2, AlertTriangle } from "lucide-react";

const AffordabilityPage = () => {
  const [income, setIncome] = useState(55_000);
  const [partner, setPartner] = useState(0);
  const [expenditure, setExpenditure] = useState(400);
  const [deposit, setDeposit] = useState(40_000);
  const [rate, setRate] = useState(4.5);
  const [term, setTerm] = useState(30);

  const result = useMemo(
    () =>
      calculateAffordability({
        grossAnnualIncome: income,
        partnerIncome: partner,
        monthlyExpenditure: expenditure,
        deposit,
        productRate: rate,
        termYears: term,
      }),
    [income, partner, expenditure, deposit, rate, term],
  );

  return (
    <CalculatorShell
      eyebrow="How much can you borrow?"
      title="Mortgage Affordability"
      intro="Estimates your maximum borrowing using the 4.5× income multiplier with a +3% stress test, and a 45%-of-disposable-income affordability cap. Open Banking-ready for automated income/expenditure analysis in Phase 2."
      leadCalculator="affordability"
      leadContext={{ income, partner, expenditure, deposit, rate, term, maxBorrowing: result.maxBorrowing, passesStressTest: result.passesStressTest }}
    >
      <SEO
        title="Mortgage Affordability Calculator UK | Velocity"
        description="Estimate UK maximum mortgage borrowing with 4.5x salary multiplier and FCA-aligned +3% stress test. Decimal-precision."
        path="/calculators/affordability"
      />

      <div className="grid lg:grid-cols-5 gap-6">
        <div className="lg:col-span-2 glass-card rounded-2xl p-6 space-y-5">
          <SliderField label="Your gross income (annual)" prefix="£" value={income} min={15_000} max={300_000} step={1_000} onChange={setIncome} />
          <SliderField label="Partner income (annual)" prefix="£" value={partner} min={0} max={300_000} step={1_000} onChange={setPartner} />
          <SliderField label="Monthly committed outgoings" prefix="£" value={expenditure} min={0} max={5_000} step={50} onChange={setExpenditure} />
          <SliderField label="Deposit" prefix="£" value={deposit} min={0} max={500_000} step={1_000} onChange={setDeposit} />
          <div className="h-px bg-border" />
          <SliderField label="Product rate" suffix="%" value={rate} min={0.5} max={12} step={0.05} decimals={2} onChange={setRate} />
          <SliderField label="Term (years)" value={term} min={5} max={40} step={1} onChange={setTerm} />
        </div>

        <div className="lg:col-span-3 space-y-4">
          <div className="grid sm:grid-cols-2 gap-4">
            <BigStat label="Max borrowing" value={formatGBP(result.maxBorrowing)} highlight />
            <BigStat label="Max property value" value={formatGBP(result.maxPropertyValue)} />
            <BigStat label="Monthly payment" value={formatGBP(result.monthlyPayment, { decimals: 2 })} />
            <BigStat label={`Stressed (+3%)`} value={formatGBP(result.monthlyPaymentStressed, { decimals: 2 })} />
          </div>

          <div
            className={`glass-card rounded-2xl p-5 flex items-start gap-3 ${
              result.passesStressTest ? "border-success/40" : "border-destructive/40"
            }`}
          >
            {result.passesStressTest ? (
              <CheckCircle2 className="size-5 text-success shrink-0 mt-0.5" />
            ) : (
              <AlertTriangle className="size-5 text-destructive shrink-0 mt-0.5" />
            )}
            <div>
              <p className="font-semibold text-sm">
                {result.passesStressTest ? "Passes stress test" : "Fails stress test"}
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                Loan-to-income ratio: {result.loanToIncome}×.{" "}
                {result.notes.join(" ")}
              </p>
            </div>
          </div>

          <div className="glass-card rounded-2xl p-5">
            <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-3">
              Open Banking — Phase 2
            </p>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Connect via Moneyhub or Plaid to automatically pull verified income and outgoings,
              lifting accuracy and lender confidence. Your data remains encrypted at rest with
              full UK GDPR compliance.
            </p>
          </div>
        </div>
      </div>
    </CalculatorShell>
  );
};

export default AffordabilityPage;
