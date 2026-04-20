import { ReactNode } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { SiteShell } from "@/components/layout/SiteShell";

interface CalculatorShellProps {
  eyebrow: string;
  title: string;
  intro: string;
  children: ReactNode;
}

export const CalculatorShell = ({ eyebrow, title, intro, children }: CalculatorShellProps) => (
  <SiteShell>
    <section className="px-4 pt-12 pb-6">
      <div className="max-w-5xl mx-auto">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-xs font-semibold text-muted-foreground hover:text-foreground mb-6"
        >
          <ArrowLeft className="size-3.5" /> Back to all calculators
        </Link>
        <p className="text-[11px] font-bold uppercase tracking-widest text-accent mb-3">
          {eyebrow}
        </p>
        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight leading-tight mb-4">
          {title}
        </h1>
        <p className="text-base sm:text-lg text-muted-foreground max-w-[60ch]">{intro}</p>
      </div>
    </section>
    <section className="px-4 pb-12">
      <div className="max-w-5xl mx-auto">{children}</div>
    </section>
  </SiteShell>
);
