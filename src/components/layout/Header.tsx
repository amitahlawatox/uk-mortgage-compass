import { Link } from "react-router-dom";
import { ThemeToggle } from "@/components/ThemeToggle";

const items = [
  { to: "/calculators/stamp-duty", label: "Stamp Duty" },
  { to: "/calculators/repayment", label: "Repayment" },
  { to: "/calculators/overpayment", label: "Overpayment" },
  { to: "/calculators/affordability", label: "Affordability" },
];

export const Header = () => (
  <header className="sticky top-0 z-40 px-4 pt-4">
    <div className="max-w-6xl mx-auto glass-card rounded-2xl px-4 sm:px-6 py-3 flex items-center justify-between">
      <Link to="/" className="flex items-center gap-2.5 group" aria-label="RepayWise home">
        <img
          src="/favicon.png"
          alt="RepayWise logo"
          width={36}
          height={36}
          className="size-9 rounded-xl ring-1 ring-border group-hover:ring-accent transition-all"
        />
        <span className="text-lg font-bold tracking-tighter">RepayWise</span>
      </Link>
      <nav className="hidden md:flex items-center gap-6">
        {items.map(i => (
          <Link
            key={i.to}
            to={i.to}
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            {i.label}
          </Link>
        ))}
      </nav>
      <div className="flex items-center gap-2">
        <ThemeToggle />
        <Link
          to="/calculators/stamp-duty"
          className="bg-primary text-primary-foreground px-4 py-2 rounded-xl text-sm font-semibold hover:ring-2 ring-accent ring-offset-2 ring-offset-background transition-all"
        >
          Get started
        </Link>
      </div>
    </div>
  </header>
);
