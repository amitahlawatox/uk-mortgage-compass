import { ReactNode, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { SiteShell } from "@/components/layout/SiteShell";
import { LeadCaptureModal } from "@/components/LeadCaptureModal";
import { track } from "@/lib/analytics";
import { AdComponent } from "@/components/AdComponent";
import { pulseLogo } from "@/components/Logo";

interface CalculatorShellProps {
  eyebrow: string;
  title: string;
  intro: string;
  children: ReactNode;
  leadCalculator?: string;
  leadContext?: Record<string, unknown>;
}

export const CalculatorShell = ({ eyebrow, title, intro, children, leadCalculator, leadContext }: CalculatorShellProps) => {
  useEffect(() => {
    if (leadCalculator) track("calculator_viewed", { calculator: leadCalculator });
  }, [leadCalculator]);

  // Heartbeat: speed up the header logo while the user is tweaking inputs,
  // then settle back to a resting pulse once they stop.
  const calcAreaRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const node = calcAreaRef.current;
    if (!node) return;
    let settleTimer: number | undefined;
    const bump = () => {
      pulseLogo("calculating");
      window.clearTimeout(settleTimer);
      settleTimer = window.setTimeout(() => pulseLogo("settled"), 500);
    };
    node.addEventListener("input", bump);
    node.addEventListener("change", bump);
    node.addEventListener("click", bump);
    return () => {
      node.removeEventListener("input", bump);
      node.removeEventListener("change", bump);
      node.removeEventListener("click", bump);
      window.clearTimeout(settleTimer);
      pulseLogo("settled");
    };
  }, []);

  return (
  <SiteShell>
    <section className="px-4 pt-8 sm:pt-12 pb-6 pb-[calc(1.5rem+env(safe-area-inset-bottom))]">
      <div className="max-w-5xl mx-auto grid gap-6 lg:grid-cols-[minmax(0,1fr)_300px] lg:items-start w-full overflow-x-hidden">
        <div>
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-xs font-semibold text-muted-foreground hover:text-foreground mb-6"
        >
          <ArrowLeft className="size-3.5" /> Back to all calculators
        </Link>
        <p className="text-[11px] font-bold uppercase tracking-widest text-accent mb-3">
          {eyebrow}
        </p>
        <h1 className="text-2xl sm:text-4xl lg:text-5xl font-bold tracking-tight leading-tight mb-4">
          {title}
        </h1>
        <p className="text-base sm:text-lg text-muted-foreground max-w-[60ch]">{intro}</p>
        </div>
        <AdComponent slot="sidebar" className="hidden lg:block" />
      </div>
    </section>
    <section className="px-4 pb-12">
      <div className="max-w-5xl mx-auto">
        {children}
        <AdComponent slot="inline" className="mt-6" />
      </div>
    </section>
    {leadCalculator && (
      <LeadCaptureModal calculator={leadCalculator} context={leadContext ?? {}} />
    )}
  </SiteShell>
  );
};
