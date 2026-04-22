import { Link } from "react-router-dom";

export const Footer = () => (
  <footer className="mt-24 border-t border-border bg-card-muted">
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 grid gap-12 md:grid-cols-12">
      <div className="md:col-span-5 space-y-4">
        <div className="flex items-center gap-2">
          <img src="/favicon.png" alt="RepayWise logo" width={28} height={28} className="size-7 rounded-md" />
          <span className="text-base font-bold tracking-tighter">RepayWise</span>
        </div>
        <p className="text-xs text-muted-foreground leading-relaxed max-w-prose">
          RepayWise provides financial information, not advice. We are not a lender, broker, or
          FCA-authorised adviser. Calculations follow current UK tax bands and standard amortisation
          formulas under the Financial Services and Markets Act 2000.
        </p>
        <div className="rounded-lg border border-border/60 bg-background/40 p-3">
          <p className="text-xs text-foreground leading-relaxed">
            <strong className="font-semibold">Your home may be repossessed if you do not keep up repayments on your mortgage.</strong>
          </p>
        </div>
      </div>

      <div className="md:col-span-3">
        <p className="text-[10px] font-bold uppercase tracking-widest mb-4 text-muted-foreground">
          Calculators
        </p>
        <ul className="space-y-2 text-sm">
          <li><Link to="/calculators/stamp-duty" className="hover:text-accent">Stamp Duty (SDLT/LBTT/LTT)</Link></li>
          <li><Link to="/calculators/repayment" className="hover:text-accent">Mortgage Repayment</Link></li>
          <li><Link to="/calculators/overpayment" className="hover:text-accent">Overpayment Visualiser</Link></li>
          <li><Link to="/calculators/affordability" className="hover:text-accent">Affordability</Link></li>
        </ul>
      </div>

      <div className="md:col-span-4">
        <p className="text-[10px] font-bold uppercase tracking-widest mb-4 text-muted-foreground">
          Compliance
        </p>
        <ul className="space-y-2 text-sm">
          <li className="flex justify-between"><span>FCA Consumer Duty</span><span className="text-success">Aligned</span></li>
          <li className="flex justify-between"><span>UK GDPR</span><span className="text-success">Compliant</span></li>
          <li className="flex justify-between"><span>Data encryption</span><span className="text-muted-foreground">AES-256</span></li>
          <li className="flex justify-between"><span>PII storage</span><span className="text-muted-foreground">Encrypted at rest</span></li>
        </ul>
      </div>
    </div>
    <div className="border-t border-border">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 text-[11px] text-muted-foreground">
        <span>© {new Date().getFullYear()} RepayWise. England & Wales. repaywise.co.uk</span>
        <div className="flex gap-4">
          <Link to="/privacy-policy" className="hover:text-foreground">Privacy</Link>
          <Link to="/cookie-policy" className="hover:text-foreground">Cookies</Link>
          <Link to="/terms-of-service" className="hover:text-foreground">Terms</Link>
        </div>
      </div>
    </div>
    <div className="h-1 w-full bg-gradient-velocity-dark" />
  </footer>
);
