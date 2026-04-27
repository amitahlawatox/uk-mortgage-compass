import { useEffect, useState } from "react";
import { ANALYTICS_CONSENT_EVENT } from "@/lib/analytics";

const KEY = "velocity-cookie-consent";

export const CookieConsent = () => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem(KEY)) setShow(true);
  }, []);

  const set = (value: "all" | "essential") => {
    localStorage.setItem(KEY, value);
    window.dispatchEvent(new CustomEvent(ANALYTICS_CONSENT_EVENT, { detail: value }));
    setShow(false);
  };

  if (!show) return null;

  return (
    <div className="fixed bottom-4 inset-x-4 z-50 sm:left-auto sm:right-4 sm:max-w-md animate-fade-up">
      <div className="glass-card rounded-2xl p-5 shadow-soft">
        <h3 className="font-semibold text-sm mb-2">Your privacy</h3>
        <p className="text-xs text-muted-foreground leading-relaxed mb-4">
          We use essential cookies to run this site and optional analytics cookies (via Google Analytics and PostHog) to
          improve our calculators. Read our cookie notice. UK GDPR applies.
        </p>
        <div className="flex gap-2">
          <button
            onClick={() => set("essential")}
            className="flex-1 px-3 py-2 text-xs font-semibold rounded-lg border border-border hover:bg-muted transition"
          >
            Essential only
          </button>
          <button
            onClick={() => set("all")}
            className="flex-1 px-3 py-2 text-xs font-semibold rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition"
          >
            Accept analytics
          </button>
        </div>
      </div>
    </div>
  );
};
