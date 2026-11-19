import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import type { LenderData } from "@/lib/uk/lenders";

interface LenderContextCardProps {
  lender: LenderData;
  title?: string;
  body?: string;
  links?: { to: string; label: string }[];
  eyebrow?: string;
  note?: string;
  className?: string;
  calculatorType?: string;
  contextDescription?: string;
}

export const LenderContextCard = ({
  lender,
  title,
  body,
  links = [],
  eyebrow = "Lender context",
  note,
  className = "",
  calculatorType,
  contextDescription,
}: LenderContextCardProps) => (
  <section
    className={`rounded-3xl border border-accent/20 bg-gradient-to-br from-accent/10 via-background to-background p-5 sm:p-6 ${className}`.trim()}
  >
    <p className="text-[11px] font-bold uppercase tracking-widest text-accent mb-2">{eyebrow}</p>
    <h2 className="text-xl sm:text-2xl font-bold tracking-tight">
      {title ?? `${lender.name} ${calculatorType ? calculatorType.replace(/-/g, " ") : "mortgage"} context`}
    </h2>
    <p className="mt-3 text-sm sm:text-base text-muted-foreground leading-relaxed max-w-[68ch]">
      {body ?? contextDescription}
    </p>

    <p className="mt-4 text-sm text-muted-foreground leading-relaxed max-w-[68ch]">
      Any prefilled rate or lending limit is an example for exploring scenarios. It is not a current{" "}
      {lender.name} rate, lending limit or product offer. Enter the terms from your own quote and
      check any early repayment charges before making a decision.
    </p>

    {links.length > 0 && (
      <div className="mt-5 flex flex-wrap gap-3">
        {links.map((link) => (
          <Link
            key={link.to}
            to={link.to}
            className="inline-flex items-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground hover:ring-2 ring-accent ring-offset-2 ring-offset-background transition-all"
          >
            {link.label} <ArrowRight className="size-4" />
          </Link>
        ))}
      </div>
    )}

    <p className="mt-4 text-[11px] text-muted-foreground leading-relaxed">
      {note ??
        "Rates and lending criteria move regularly. Use these pages as planning tools, then confirm product details and overpayment rules with the lender before you act."}
    </p>
  </section>
);
