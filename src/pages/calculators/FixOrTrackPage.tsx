import { useMemo, useState } from "react";
import { CalculatorShell } from "@/components/calculators/CalculatorShell";
import { SEO } from "@/components/SEO";
import { BreadcrumbJsonLd } from "@/components/seo/BreadcrumbJsonLd";
import { RelatedCalculators } from "@/components/calculators/RelatedCalculators";
import { LastUpdated } from "@/components/calculators/LastUpdated";
import { formatGBP } from "@/lib/finance/decimal";
import { calculateRepayment } from "@/lib/finance/repayment";
import { SliderField, BigStat } from "@/pages/calculators/RepaymentPage";
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, Legend } from "recharts";
import { Lock, TrendingUp, Landmark, Shield } from "lucide-react";

const FixOrTrackPage = () => {
  const [loanAmount, setLoanAmount] = useState(250_000);
  const [term, setTerm] = useState(25);

  // Fixed option
  const [fixedRate, setFixedRate] = useState(4.29);
  const [fixedPeriod, setFixedPeriod] = useState(5);

  // Tracker option
  const [trackerRate, setTrackerRate] = useState(4.74);
  const [baseRateNow, setBaseRateNow] = useState(4.25);
  const [expectedRateChange, setExpectedRateChange] = useState(-0.5); // expected BoE cuts over period

  const fixedResult = useMemo(
    () => calculateRepayment({ principal: loanAmount, annualRate: fixedRate, termYears: term }),
    [loanAmount, fixedRate, term],
  );

  const trackerResult = useMemo(
    () => calculateRepayment({ principal: loanAmount, annualRate: trackerRate, termYears: term }),
    [loanAmount, trackerRate, term],
  );

  // Scenario: tracker rate changes linearly over the fixed period
  const trackerAvgRate = trackerRate + (expectedRateChange / 2);
  const trackerScenarioResult = useMemo(
    () => calculateRepayment({ principal: loanAmount, annualRate: trackerAvgRate, termYears: term }),
    [loanAmount, trackerAvgRate, term],
  );

  // Cost over fixed period only
  const fixedCostOverPeriod = fixedResult.monthlyPayment * fixedPeriod * 12;
  const trackerCostOverPeriod = trackerScenarioResult.monthlyPayment * fixedPeriod * 12;
  const differencePeriod = fixedCostOverPeriod - trackerCostOverPeriod;

  // Break-even: what rate would tracker need to average for both to cost the same?
  const breakEvenRate = fixedRate; // if tracker averages the fixed rate, they're equal

  // Build scenario chart — monthly cost over the fixed period
  const chartData = useMemo(() => {
    const points = [];
    for (let year = 0; year <= fixedPeriod; year++) {
      const trackerRateAtYear = trackerRate + (expectedRateChange * (year / fixedPeriod));
      const trackerMonthly = calculateRepayment({ principal: loanAmount, annualRate: trackerRateAtYear, termYears: term }).monthlyPayment;
      points.push({
        year: `Year ${year}`,
        "Fixed": fixedResult.monthlyPayment,
        "Tracker (projected)": trackerMonthly,
      });
    }
    return points;
  }, [loanAmount, term, fixedRate, trackerRate, expectedRateChange, fixedPeriod, fixedResult.monthlyPayment]);

  const recommendation = differencePeriod > 0 ? "tracker" : "fixed";
  const savingAmount = Math.abs(differencePeriod);

  const pagePath = "calculators/fix-or-track";
  const seoTitle = "Should I Fix or Track? Mortgage Rate Calculator UK 2026 | RepayWise";
  const seoDescription = "Fixed vs tracker mortgage calculator. Model different Bank of England rate scenarios and see which option costs less over 2, 3, or 5 years. Make an informed decision.";

  return (
    <CalculatorShell
      eyebrow="Fix or Track?"
      title="Should I Fix or Track My Mortgage?"
      intro="Model what happens if the Bank of England cuts, holds, or raises rates. See the projected cost difference between locking in a fixed rate and riding a tracker — over your chosen comparison period."
      leadCalculator="fix-or-track"
      leadContext={{ loanAmount, fixedRate, trackerRate, recommendation }}
    >
      <SEO
        title={seoTitle}
        description={seoDescription}
        path={pagePath}
        calculatorType="Fix or Track Calculator"
      />

      <BreadcrumbJsonLd
        items={[
          { name: "Home", href: "/" },
          { name: "Calculators", href: "/" },
          { name: "Fix or Track?", href: "/calculators/fix-or-track" },
        ]}
      />

      <div className="grid lg:grid-cols-5 gap-6">
        {/* Inputs */}
        <div className="lg:col-span-2 space-y-4">
          <div className="glass-card rounded-2xl p-6 space-y-5">
            <div className="flex items-center gap-2">
              <Landmark className="size-4 text-accent" />
              <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Your mortgage</p>
            </div>
            <SliderField label="Loan amount" prefix="£" value={loanAmount} min={25_000} max={1_500_000} step={5_000} onChange={setLoanAmount} />
            <SliderField label="Full term (years)" value={term} min={5} max={40} step={1} onChange={setTerm} />
          </div>

          <div className="glass-card rounded-2xl p-6 space-y-5">
            <div className="flex items-center gap-2">
              <Lock className="size-4 text-accent" />
              <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Fixed option</p>
            </div>
            <SliderField label="Fixed rate" suffix="%" value={fixedRate} min={1} max={8} step={0.01} decimals={2} onChange={setFixedRate} />
            <SliderField label="Fixed period (years)" value={fixedPeriod} min={2} max={10} step={1} onChange={setFixedPeriod} />
          </div>

          <div className="glass-card rounded-2xl p-6 space-y-5">
            <div className="flex items-center gap-2">
              <TrendingUp className="size-4 text-accent" />
              <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Tracker option</p>
            </div>
            <SliderField label="Current tracker rate" suffix="%" value={trackerRate} min={1} max={10} step={0.01} decimals={2} onChange={setTrackerRate} />
            <SliderField label="BoE base rate now" suffix="%" value={baseRateNow} min={0} max={8} step={0.25} decimals={2} onChange={setBaseRateNow} />
            <SliderField label="Expected rate change over period" suffix="%" value={expectedRateChange} min={-3} max={3} step={0.25} decimals={2} onChange={setExpectedRateChange} />
            <p className="text-[10px] text-muted-foreground">
              Negative = you expect BoE to cut rates. Positive = you expect rises.
              Current BoE base rate: {baseRateNow}%. Tracker ends at ~{(trackerRate + expectedRateChange).toFixed(2)}%.
            </p>
          </div>
        </div>

        {/* Results */}
        <div className="lg:col-span-3 space-y-4">
          {/* Verdict */}
          <div className={`rounded-2xl p-6 border ${recommendation === "tracker" ? "border-blue-500/30 bg-blue-50/5" : "border-green-500/30 bg-green-50/5"}`}>
            <div className="flex items-center gap-2 mb-2">
              <Shield className={`size-4 ${recommendation === "tracker" ? "text-blue-500" : "text-green-500"}`} />
              <p className="text-sm font-bold">
                {recommendation === "tracker"
                  ? `Tracker projected to save ${formatGBP(savingAmount)} over ${fixedPeriod} years`
                  : `Fixed saves ${formatGBP(savingAmount)} over ${fixedPeriod} years`
                }
              </p>
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed">
              {recommendation === "tracker"
                ? `If rates move as you expect (${expectedRateChange > 0 ? "+" : ""}${expectedRateChange}%), the tracker averages ~${trackerAvgRate.toFixed(2)}% vs your fixed at ${fixedRate}%. But remember: fixed gives certainty — tracker exposes you to risk if rates rise instead.`
                : `Even with ${expectedRateChange < 0 ? "expected cuts" : "stable rates"}, the fixed deal at ${fixedRate}% works out cheaper over ${fixedPeriod} years. Plus you get payment certainty — no surprises if the BoE changes course.`
              }
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <BigStat label="Fixed monthly" value={formatGBP(fixedResult.monthlyPayment)} highlight={recommendation === "fixed"} />
            <BigStat label="Tracker monthly (now)" value={formatGBP(trackerResult.monthlyPayment)} highlight={recommendation === "tracker"} />
            <BigStat label={`Fixed cost (${fixedPeriod}yr)`} value={formatGBP(fixedCostOverPeriod)} />
            <BigStat label={`Tracker cost (${fixedPeriod}yr proj.)`} value={formatGBP(trackerCostOverPeriod)} />
          </div>

          {/* Scenario explanation */}
          <div className="glass-card rounded-2xl p-5 space-y-2">
            <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Scenario assumptions</p>
            <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-xs">
              <p><span className="text-muted-foreground">Tracker now:</span> <span className="font-semibold">{trackerRate}%</span></p>
              <p><span className="text-muted-foreground">Tracker end:</span> <span className="font-semibold">{(trackerRate + expectedRateChange).toFixed(2)}%</span></p>
              <p><span className="text-muted-foreground">Tracker average:</span> <span className="font-semibold">{trackerAvgRate.toFixed(2)}%</span></p>
              <p><span className="text-muted-foreground">Break-even rate:</span> <span className="font-semibold">{breakEvenRate}%</span></p>
            </div>
          </div>

          {/* Chart */}
          <div className="glass-card rounded-2xl p-6">
            <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-4">Monthly payment projection</p>
            <div className="h-52">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData}>
                  <XAxis dataKey="year" tick={{ fontSize: 11 }} />
                  <YAxis tick={{ fontSize: 11 }} tickFormatter={(v: number) => `£${v.toFixed(0)}`} />
                  <Tooltip formatter={(value: number) => formatGBP(value)} />
                  <Legend wrapperStyle={{ fontSize: 11 }} />
                  <Line type="monotone" dataKey="Fixed" stroke="hsl(var(--accent))" strokeWidth={2} dot={false} />
                  <Line type="monotone" dataKey="Tracker (projected)" stroke="hsl(var(--accent-secondary))" strokeWidth={2} strokeDasharray="5 3" dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          <RelatedCalculators currentPath="/calculators/fix-or-track" />
          <LastUpdated />
        </div>
      </div>
    </CalculatorShell>
  );
};

export default FixOrTrackPage;
