import { Link } from "react-router-dom";
import { trackIntentClick } from "@/lib/analytics";

export const Footer = () => (
  <footer className="mt-24 border-t border-border bg-card-muted">
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 grid gap-12 md:grid-cols-12">
      <div className="md:col-span-5 space-y-4">
        <div className="flex items-center gap-2">
          <img src="/icons/icon-192.png" alt="RepayWise logo" width={28} height={28} className="size-7 rounded-md" />
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
          <li><Link to="/calculators/repayment" onClick={() => trackIntentClick("footer_calculators", "/calculators/repayment", "Mortgage Repayment")} className="hover:text-accent">Mortgage Repayment</Link></li>
          <li><Link to="/calculators/overpayment" onClick={() => trackIntentClick("footer_calculators", "/calculators/overpayment", "Overpayment Visualiser")} className="hover:text-accent">Overpayment Visualiser</Link></li>
          <li><Link to="/calculators/stamp-duty" onClick={() => trackIntentClick("footer_calculators", "/calculators/stamp-duty", "Stamp Duty")} className="hover:text-accent">Stamp Duty (SDLT/LBTT/LTT)</Link></li>
          <li><Link to="/calculators/remortgage" onClick={() => trackIntentClick("footer_calculators", "/calculators/remortgage", "Remortgage")} className="hover:text-accent">Should I Remortgage?</Link></li>
          <li><Link to="/calculators/rate-compare" onClick={() => trackIntentClick("footer_calculators", "/calculators/rate-compare", "Rate Compare")} className="hover:text-accent">Compare Mortgage Rates</Link></li>
          <li><Link to="/calculators/fix-or-track" onClick={() => trackIntentClick("footer_calculators", "/calculators/fix-or-track", "Fix or Track")} className="hover:text-accent">Fix or Track?</Link></li>
          <li><Link to="/calculators/salary-to-mortgage" onClick={() => trackIntentClick("footer_calculators", "/calculators/salary-to-mortgage", "Salary to Mortgage")} className="hover:text-accent">Salary to Mortgage</Link></li>
          <li><Link to="/calculators/home-improvement" onClick={() => trackIntentClick("footer_calculators", "/calculators/home-improvement", "Home Improvement")} className="hover:text-accent">Home Improvement Loan vs Remortgage</Link></li>
          <li><Link to="/calculators/max-borrowing" onClick={() => trackIntentClick("footer_calculators", "/calculators/max-borrowing", "Affordability")} className="hover:text-accent">Affordability Calculator</Link></li>
          <li><Link to="/calculators/equity" onClick={() => trackIntentClick("footer_calculators", "/calculators/equity", "Home Equity Calculator")} className="hover:text-accent">Home Equity Calculator</Link></li>
          <li><Link to="/calculators/interest-only" onClick={() => trackIntentClick("footer_calculators", "/calculators/interest-only", "Interest Only")} className="hover:text-accent">Interest-Only Calculator</Link></li>
          <li><Link to="/calculators/stamp-duty/scotland" onClick={() => trackIntentClick("footer_calculators", "/calculators/stamp-duty/scotland", "Scotland LBTT")} className="hover:text-accent">Scotland Stamp Duty (LBTT)</Link></li>
          <li><Link to="/calculators/stamp-duty/wales" onClick={() => trackIntentClick("footer_calculators", "/calculators/stamp-duty/wales", "Wales LTT")} className="hover:text-accent">Wales Stamp Duty (LTT)</Link></li>
          <li><Link to="/for-brokers" className="hover:text-accent">For Mortgage Brokers</Link></li>
          <li><Link to="/guides" onClick={() => trackIntentClick("footer_calculators", "/guides", "Guides")} className="hover:text-accent">Guides</Link></li>
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
        <span>&copy; {new Date().getFullYear()} RepayWise. England & Wales. repaywise.co.uk</span>
        <div className="flex gap-4">
          <Link to="/about" className="hover:text-foreground">About</Link>
          <Link to="/contact" className="hover:text-foreground">Contact</Link>
          <Link to="/privacy-policy" className="hover:text-foreground">Privacy</Link>
          <Link to="/cookie-policy" className="hover:text-foreground">Cookies</Link>
          <Link to="/terms-of-service" className="hover:text-foreground">Terms</Link>
        </div>
      </div>
    </div>
    <div className="h-1 w-full bg-gradient-velocity-dark" />
  
        {/* Legal compliance section — mandatory */}
        <div className="border-t border-border/40 mt-8 pt-6 space-y-4 text-xs text-muted-foreground">
          {/* FCA mandatory warning */}
          <p className="font-medium text-foreground/70">
            ⚠️ Your home may be repossessed if you do not keep up repayments on your mortgage.
          </p>
          {/* Independence notice — anti-phishing */}
          <p>
            <strong>RepayWise is an independent financial calculation tool.</strong> We are not affiliated with,
            endorsed by, or acting on behalf of any bank, building society, or mortgage lender named on this website.
            We will never ask for your bank login, account details, passwords, or personal financial credentials.
            All lender names are used for descriptive identification purposes only.
          </p>
          {/* FCA disclaimer */}
          <p>
            RepayWise provides mathematical modelling and information for educational purposes only.
            It does not constitute regulated financial advice under the Financial Services and Markets Act 2000.
            Calculations are estimates and may not reflect exact lender terms, fees, or conditions.
            Always consult a qualified, FCA-regulated mortgage adviser before making financial decisions.
          </p>
          {/* Privacy / no data collection */}
          <p>
            <strong>Privacy:</strong> RepayWise does not collect, store, or transmit any personal data.
            No cookies are used for tracking. No email addresses, financial details, or usage data are
            retained. All calculations are performed locally in your browser.
          </p>
          <p className="text-muted-foreground/60">
            © {new Date().getFullYear()} RepayWise. All rights reserved. RepayWise is not regulated by
            the Financial Conduct Authority (FCA). Registered in England and Wales.
          </p>
        </div>
    </footer>
);
