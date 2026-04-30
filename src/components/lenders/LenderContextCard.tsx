import { Link } from "react-router-dom";
import { ArrowRight, ShieldCheck, Landmark, Percent, Star } from "lucide-react";
import type { LenderData } from "@/lib/uk/lenders";

interface LenderContextCardProps {
  lender: LenderData;
  title: string;
  body: string;
  links?: { to: string; label: string }[];
  eyebrow?: string;
  note?: string;
  className?: string;
}

export const LenderContextCard = ({
  lender,
  title,
  body,
  links = [],
  eyebrow = "Lender context",
  note,
  className = "",
}: LenderContextCardProps) => (
  <section
    className={`rounded-3xl border border-accent/20 bg-gradient-to-br from-accent/10 via-background to-background p-5 sm:p-6 ${className}`.trim()}
  >
    <p className="text-[11px] font-bold uppercase tracking-widest text-accent mb-2">{eyebrow}</p>
    <h2 className="text-xl sm:text-2xl font-bold tracking-tight">{title}</h2>
    <p className="mt-3 text-sm sm:text-base text-muted-foreground leading-relaxed max-w-[68ch]">{body}</p>

    {lender.description && (
      <p className="mt-3 text-sm text-muted-foreground/80 leading-relaxed max-w-[68ch]">{lender.description}</p>
    )}

    <div className="mt-5 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
      <Stat icon={Landmark} label="Category" value={lender.category} />
      <Stat icon={Percent} label="Indicative SVR" value={`${lender.estimatedSvr.toFixed(2)}%`} />
      <Stat icon={ShieldCheck} label="Max LTV" value={`${lender.maxLtv}%`} />
      <Stat icon={Star} label="Trust rating" value={`${lender.trustRating.toFixed(1)} / 5`} />
    </div>

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

const Stat = ({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof Landmark;
  label: string;
  value: string;
}) => (
  <div className="rounded-2xl border border-border/60 bg-background/80 p-4">
    <Icon className="size-4 text-accent mb-2" />
    <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">{label}</p>
    <p className="mt-1 text-sm font-semibold leading-tight">{value}</p>
  </div>
);
