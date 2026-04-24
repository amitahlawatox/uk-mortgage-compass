import { useMemo } from "react";
import { useState } from "react";
import { CalculatorShell } from "@/components/calculators/CalculatorShell";
import { SEO } from "@/components/SEO";
import { calculateAffordability } from "@/lib/finance/affordability";
import { formatGBP } from "@/lib/finance/decimal";
import { SliderField, BigStat } from "./RepaymentPage";
import { ShareCalculation } from "@/components/calculators/ShareCalculation";
import { CheckCircle2, AlertTriangle, Users, Wallet, Calculator } from "lucide-react";

const MaxBorrowingPage = () => {
  const [income, setIncome] = useState(55_000);
  const [partner, setPartner] = useState(0);
  const [expenditure, setExpenditure] = useState(400);
  const [deposit, setDeposit] = useState(40_000);
  const [rate, setRate] = useState(4.75);
  const [term, setTerm] = useState(30);

  const result = useMemo(
    () => calculateAffordability({
      grossAnnualIncome: income,
      partnerIncome: partner,
      monthlyExpenditure: expenditure,
      deposit,
      productRate: rate,
      termYears: term,
    }),
    [income, partner, expenditure, deposit, rate, term],
  );

  const totalIncome = income + partner;
  const lti = totalIncome > 0 ? result.maxBorrowing / totalIncome : 0;

  return (
    <CalculatorShell
      eyebrow="How much can I borrow?"
      title="UK Mortgage Affordability"
      intro="Lender-style 4.5× income multiplier plus a disposable-income check and a +3% interest rate stress test. See your maximum borrowing and the property price you can target."
      leadCalculator="affordability"
      leadContext={{ income, partner, expenditure, deposit, rate, term, maxBorrowing: result.maxBorrowing }}
    >
      <SEO
        title="Mortgage Affordability Calculator UK — How Much Can I Borrow?"
        description="Find out how much you can borrow for a UK mortgage. Income multiplier, disposable income check and +3% stress test built in."
        path="/calculators/affordability"
      />

      <div className="grid lg:grid-cols-5 gap-6">
        <div className="lg:col-span-2 space-y-4">
          <div className="glass-card rounded-2xl p-6 space-y-5">
            <div className="flex items-center gap-2">
              <Users className="size-4 text-accent" />
              <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">1. Your income</p>
            </div>
            <SliderField label="Your gross annual income" prefix="£" value={income} min={15_000} max={300_000} step={1_000} onChange={setIncome} />
            <SliderField label="Partner annual income" prefix="£" value={partner} min={0} max={300_000} step={1_000} onChange={setPartner} />
            <SliderField label="Monthly committed outgoings" prefix="£" value={expenditure} min={0} max={5_000} step={50} onChange={setExpenditure} />
          </div>

          <div className="glass-card rounded-2xl p-6 space-y-5">
            <div className="flex items-center gap-2">
              <Wallet className="size-4 text-accent" />
              <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">2. Your deposit</p>
            </div>
            <SliderField label="Deposit available" prefix="£" value={deposit} min={0} max={500_000} step={1_000} onChange={setDeposit} />
          </div>

          <div className="glass-card rounded-2xl p-6 space-y-5">
            <div className="flex items-center gap-2">
              <Calculator className="size-4 text-accent" />
              <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">3. Mortgage assumptions</p>
            </div>
            <SliderField label="Product rate" suffix="%" value={rate} min={0.5} max={12} step={0.05} decimals={2} onChange={setRate} />
            <SliderField label="Term (years)" value={term} min={5} max={40} step={1} onChange={setTerm} />
          </div>
        </div>

        <div className="lg:col-span-3 space-y-4">
          <div className="glass-card rounded-2xl p-6 bg-gradient-to-br from-accent/10 to-transparent border-accent/30">
            <p className="text-xs font-bold uppercase tracking-widest text-accent mb-2">Maximum you could borrow</p>
            <p className="text-4xl sm:text-5xl font-bold tracking-tight tabular-nums">{formatGBP(result.maxBorrowing)}</p>
            <p className="text-xs text-muted-foreground mt-2">
              Property price you can target: <span className="font-semibold text-foreground">{formatGBP(result.maxPropertyValue)}</span> · Loan-to-income {lti.toFixed(2)}×
            </p>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <BigStat label="Monthly EMI at this loan" value={formatGBP(result.monthlyPayment, { decimals: 2 })} highlight />
            <BigStat label={`Stressed EMI at ${(rate + 3).toFixed(2)}%`} value={formatGBP(result.monthlyPaymentStressed, { decimals: 2 })} />
          </div>

          <div className={`glass-card rounded-2xl p-5 flex items-start gap-3 ${result.passesStressTest ? "border-success/40" : "border-destructive/40"}`}>
            {result.passesStressTest ? (
              <CheckCircle2 className="size-5 text-success shrink-0 mt-0.5" />
            ) : (
              <AlertTriangle className="size-5 text-destructive shrink-0 mt-0.5" />
            )}
            <div className="text-xs">
              <p className="font-semibold text-sm">
                {result.passesStressTest ? "Passes typical lender stress test" : "Fails +3% stress test — reduce loan or increase income"}
              </p>
              <ul className="text-muted-foreground mt-1 space-y-0.5">
                {result.notes.map((n, i) => <li key={i}>• {n}</li>)}
              </ul>
            </div>
          </div>

          <ShareCalculation
            title="UK Mortgage Affordability"
            calculator="affordability"
            intro={`Income ${formatGBP(totalIncome)} · Deposit ${formatGBP(deposit)} · Rate ${rate.toFixed(2)}%`}
            summary={[
              { label: "Combined income", value: formatGBP(totalIncome) },
              { label: "Monthly outgoings", value: formatGBP(expenditure) },
              { label: "Deposit", value: formatGBP(deposit) },
              { label: "Rate · Term", value: `${rate.toFixed(2)}% · ${term} years` },
              { label: "Maximum borrowing", value: formatGBP(result.maxBorrowing) },
              { label: "Max property price", value: formatGBP(result.maxPropertyValue) },
              { label: "Monthly EMI", value: formatGBP(result.monthlyPayment, { decimals: 2 }) },
              { label: `Stressed EMI (+3%)`, value: formatGBP(result.monthlyPaymentStressed, { decimals: 2 }) },
              { label: "Loan-to-income", value: `${lti.toFixed(2)}×` },
            ]}
          />
        </div>
      </div>
    </CalculatorShell>
  );
};

export default MaxBorrowingPage;
