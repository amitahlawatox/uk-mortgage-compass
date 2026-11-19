import { Link } from "react-router-dom";
import { ArrowRight, Calculator, TrendingDown, Wallet, Home, Building2, Scale, LineChart, PoundSterling } from "lucide-react";
import { trackIntentClick } from "@/lib/analytics";

interface RelatedItem {
  to: string;
  title: string;
  blurb: string;
  icon: React.ComponentType<{ className?: string }>;
  noSlug?: boolean;
}

const allCalculators: RelatedItem[] = [
  { to: "/calculators/repayment", title: "Mortgage Repayment", blurb: "Monthly payment, total interest and balance over time", icon: LineChart },
  { to: "/calculators/stamp-duty", title: "Stamp Duty", blurb: "SDLT, LBTT & LTT for England, Scotland and Wales", icon: Calculator },
  { to: "/calculators/overpayment", title: "Overpayment Savings", blurb: "See how overpayments cut your interest and term", icon: TrendingDown },
  { to: "/calculators/affordability", title: "Total Cost to Buy", blurb: "Full purchase costs including fees and stamp duty", icon: Wallet },
  { to: "/calculators/max-borrowing", title: "How Much Can I Borrow?", blurb: "Lender-style income multiplier with stress test", icon: PoundSterling },
  { to: "/calculators/equity", title: "Home Equity", blurb: "Your equity, LTV and net proceeds if you sell", icon: Home },
  { to: "/calculators/buy-to-let", title: "Buy-to-Let", blurb: "BTL modeller with rental yield and ICR", icon: Building2 },
  { to: "/calculators/remortgage", title: "Should I Remortgage?", blurb: "Compare your current deal vs a new rate", icon: Scale, noSlug: true },
  { to: "/calculators/rate-compare", title: "Compare Rates", blurb: "Put up to 5 mortgage deals side-by-side", icon: Calculator, noSlug: true },
  { to: "/calculators/fix-or-track", title: "Fix or Track?", blurb: "Model BoE rate scenarios for fixed vs tracker", icon: LineChart, noSlug: true },
  { to: "/calculators/salary-to-mortgage", title: "Salary to Mortgage", blurb: "How much can your salary get you?", icon: PoundSterling, noSlug: true },
  { to: "/calculators/home-improvement", title: "Home Improvement", blurb: "Loan vs remortgage — which is cheaper?", icon: Home, noSlug: true },
  { to: "/calculators/compare", title: "Compare Mortgages", blurb: "Put two mortgage offers head-to-head", icon: Scale, noSlug: true },
  { to: "/guides/help-to-buy-repayment", title: "Help to Buy Repayment", blurb: "Calculate your equity loan repayment schedule", icon: Home, noSlug: true },
];

// Only these calculators have lender-specific routes in App.tsx.
const lenderCalculatorPaths = new Set([
  "/calculators/repayment",
  "/calculators/overpayment",
  "/calculators/max-borrowing",
]);

interface RelatedCalculatorsProps {
  currentPath: string;
  max?: number;
  lenderSlug?: string;
  lenderName?: string;
  citySlug?: string;
  cityName?: string;
}

export const RelatedCalculators = ({ currentPath, max = 4, lenderSlug, lenderName }: RelatedCalculatorsProps) => {
  const related = allCalculators
    .filter((c) => c.to !== "/calculators/compare" && c.to !== "/guides/help-to-buy-repayment")
    .map((c) => {
      const hasLenderRoute = Boolean(lenderSlug) && !c.noSlug && lenderCalculatorPaths.has(c.to);
      return {
        ...c,
        to: hasLenderRoute ? `${c.to}/${lenderSlug}` : c.to,
        title: hasLenderRoute && lenderName ? `${lenderName} ${c.title}` : c.title,
      };
    })
    .filter((c) => c.to !== currentPath)
    .slice(0, max);

  return (
    <section className="mt-12 pt-10 border-t border-border">
      <h2 className="text-xl font-bold tracking-tight mb-1">Related calculators</h2>
      <p className="text-sm text-muted-foreground mb-6">
        {lenderName ? `Independent tools to plan a mortgage with ${lenderName}` : "Explore more free UK mortgage tools"}
      </p>
      <div className="grid sm:grid-cols-2 gap-3">
        {related.map((calc) => {
          const Icon = calc.icon;
          return (
            <Link
              key={calc.to}
              to={calc.to}
              onClick={() => trackIntentClick("related_calculators", calc.to, calc.title)}
              className="group flex items-start gap-4 p-4 rounded-2xl border border-border hover:border-foreground transition-all"
            >
              <div className="size-9 rounded-xl bg-secondary flex items-center justify-center shrink-0">
                <Icon className="size-4 text-accent" />
              </div>
              <div className="min-w-0">
                <p className="text-sm font-semibold group-hover:text-accent transition-colors">
                  {calc.title}
                </p>
                <p className="text-xs text-muted-foreground mt-0.5">{calc.blurb}</p>
              </div>
              <ArrowRight className="size-4 text-muted-foreground group-hover:text-foreground mt-1 shrink-0 transition-colors" />
            </Link>
          );
        })}
      </div>
    </section>
  );
};
