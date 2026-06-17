import { useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { ChevronDown, Menu, X } from "lucide-react";
import { Logo } from "@/components/Logo";
import { ThemeToggle } from "@/components/ThemeToggle";

const NAV_LINKS = [
  { label: "Mortgage", href: "/calculators/repayment" },
  { label: "Overpayment", href: "/calculators/overpayment" },
  { label: "Stamp Duty", href: "/calculators/stamp-duty" },
  { label: "Guides", href: "/guides" },
];

const MORE_TOOLS = [
  { label: "Max Borrowing", href: "/calculators/max-borrowing" },
  { label: "Affordability", href: "/calculators/affordability" },
  { label: "Remortgage", href: "/calculators/remortgage" },
  { label: "Compare Rates", href: "/calculators/rate-compare" },
  { label: "Fix or Track?", href: "/calculators/fix-or-track" },
  { label: "Salary → Mortgage", href: "/calculators/salary-to-mortgage" },
  { label: "Home Improvement", href: "/calculators/home-improvement" },
  { label: "Equity", href: "/calculators/equity" },
  { label: "Buy-to-Let", href: "/calculators/buy-to-let" },
];

export function Header() {
  const [open, setOpen] = useState(false);
  const [toolsOpen, setToolsOpen] = useState(false);
  const toolsRef = useRef<HTMLDivElement>(null);
  const { pathname } = useLocation();

  const isToolsActive = MORE_TOOLS.some((l) => pathname.startsWith(l.href));

  return (
    <header className="sticky top-0 z-40 px-4 pt-4">
      <div className="max-w-6xl mx-auto glass-card rounded-2xl px-4 sm:px-6 py-3 flex items-center justify-between">
        <Link to="/" className="group" onClick={() => setOpen(false)}>
          <Logo />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-6">
          {NAV_LINKS.map((l) => (
            <Link
              key={l.href}
              to={l.href}
              className={`text-sm font-medium transition-colors ${
                pathname.startsWith(l.href)
                  ? "text-foreground"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {l.label}
            </Link>
          ))}

          {/* More Tools dropdown */}
          <div
            ref={toolsRef}
            className="relative"
            onMouseEnter={() => setToolsOpen(true)}
            onMouseLeave={() => setToolsOpen(false)}
          >
            <button
              className={`text-sm font-medium transition-colors flex items-center gap-1 ${
                isToolsActive ? "text-foreground" : "text-muted-foreground hover:text-foreground"
              }`}
              onClick={() => setToolsOpen((o) => !o)}
            >
              More Tools <ChevronDown className={`size-3.5 transition-transform ${toolsOpen ? "rotate-180" : ""}`} />
            </button>
            {toolsOpen && (
              <div className="absolute top-full right-0 mt-2 w-56 glass-card rounded-xl border border-border/60 p-2 shadow-lg">
                {MORE_TOOLS.map((l) => (
                  <Link
                    key={l.href}
                    to={l.href}
                    onClick={() => setToolsOpen(false)}
                    className={`block px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                      pathname.startsWith(l.href)
                        ? "bg-accent text-accent-foreground"
                        : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                    }`}
                  >
                    {l.label}
                  </Link>
                ))}
              </div>
            )}
          </div>
        </nav>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          {/* Mobile hamburger */}
          <button
            className="md:hidden p-2 rounded-lg hover:bg-accent transition-colors touch-manipulation"
            onClick={() => setOpen((o) => !o)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>

      {/* Mobile dropdown menu */}
      {open && (
        <div className="md:hidden mt-2 max-w-6xl mx-auto glass-card rounded-2xl px-4 py-4 flex flex-col gap-1 max-h-[70vh] overflow-y-auto">
          <p className="px-3 pt-1 pb-2 text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Popular</p>
          {NAV_LINKS.map((l) => (
            <Link
              key={l.href}
              to={l.href}
              onClick={() => setOpen(false)}
              className={`flex items-center px-3 py-3 rounded-xl text-sm font-medium transition-colors touch-manipulation ${
                pathname.startsWith(l.href)
                  ? "bg-accent text-accent-foreground"
                  : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
              }`}
            >
              {l.label}
            </Link>
          ))}
          <p className="px-3 pt-4 pb-2 text-[10px] font-bold uppercase tracking-widest text-muted-foreground">More Tools</p>
          {MORE_TOOLS.map((l) => (
            <Link
              key={l.href}
              to={l.href}
              onClick={() => setOpen(false)}
              className={`flex items-center px-3 py-3 rounded-xl text-sm font-medium transition-colors touch-manipulation ${
                pathname.startsWith(l.href)
                  ? "bg-accent text-accent-foreground"
                  : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
              }`}
            >
              {l.label}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}
