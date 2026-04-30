import { Link } from "react-router-dom";
import { ArrowRight, Calculator, TrendingDown, Wallet, Home, Building2, Scale, LineChart, PoundSterling } from "lucide-react";
import { trackIntentClick } from "@/lib/analytics";

interface RelatedItem {
  to: string;
  title: string;
  blurb: string;
  icon: React.ComponentType<{ className?: string }>;
}

const allCalculators: RelatedItem[] = [
  { to: "/calculators/repayment", title: "Mortgage Repayment", blurb: "Monthly payment, total interest and balance over time", icon: LineChart },
  { to: "/calculators/stamp-duty", title: "Stamp Duty", blurb: "SDLT, LBTT & LTT for England, Scotland and Wales", icon: Calculator },
  { to: "/calculators/overpayment", title: "Overpayment Savings", blurb: "See how overpayments cut your interest and term", icon: TrendingDown },
  { to: "/calculators/affordability", title: "Total Cost to Buy", blurb: "Full purchase costs including fees and stamp duty", icon: Wallet },
  { to: "/calculators/max-borrowing", title: "How Much Can I Borrow?", blurb: "Lender-style income multiplier with stress test", icon: PoundSterling },
  { to: "/calculators/equity", title: "Home Equity", blurb: "Your equity, LTV and net proceeds if you sell", icon: Home },
  { to: "/calculators/buy-to-let", title: "Buy-to-Let", blurb: "BTL modeller with rental yield and ICR", icon: Building2 },
  { to: "/calculators/compare", title: "Compare Mortgages", blurb: "Put two mortgage offers head-to-head", icon: Scale },
  { to: "/guides/help-to-buy-repayment", title: "Help to Buy Repayment", blurb: "Calculate your equity loan repayment schedule", icon: Home },
];

interface RelatedCalculatorsProps {
  currentPath: string;
  max?: number;
}

export const RelatedCalculators = ({ currentPath, max = 4 }: RelatedCalculatorsProps) => {
  const related = allCalculators
    .filter((c) => c.to !== currentPath)
    .slice(0, max);

  return (
    <section className="mt-12 pt-10 border-t border-border">
      <h2 className="text-xl font-bold tracking-tight mb-1">Related calculators</h2>
      <p className="text-sm text-muted-foreground mb-6">
        Explore more free UK mortgage tools
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
