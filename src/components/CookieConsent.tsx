import { useEffect, useState } from "react";
import { ANALYTICS_CONSENT_EVENT } from "@/lib/analytics";

const KEY = "velocity-cookie-consent";

export const CookieConsent = () => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    try {
      if (!localStorage.getItem(KEY)) setShow(true);
    } catch {
      setShow(true);
    }
  }, []);

  const set = (value: "all" | "essential") => {
    let previous: string | null = null;
    try {
      previous = localStorage.getItem(KEY);
      localStorage.setItem(KEY, value);
    } catch {
      // Storage unavailable: optional trackers remain disabled.
    }
    window.dispatchEvent(new CustomEvent(ANALYTICS_CONSENT_EVENT, { detail: value }));
    setShow(false);
    // An already loaded analytics library cannot be fully unloaded. A refresh
    // after revoking consent ensures it is not loaded on subsequent visits.
    if (previous === "all" && value === "essential") window.location.reload();
  };

  if (!show) {
    return (
      <button
        type="button"
        onClick={() => setShow(true)}
        className="fixed bottom-3 right-3 z-40 rounded-lg border border-border bg-background/90 px-3 py-2 text-xs text-muted-foreground shadow-sm hover:text-foreground"
        aria-label="Open cookie settings"
      >
        Cookie settings
      </button>
    );
  }

  return (
    <div className="fixed bottom-32 inset-x-4 z-[60] sm:left-auto sm:right-4 sm:max-w-md sm:bottom-24 md:bottom-4 animate-fade-up">
      <div className="glass-card rounded-2xl p-5 shadow-soft" role="dialog" aria-label="Cookie choices">
        <h3 className="font-semibold text-sm mb-2">Your privacy</h3>
        <p className="text-xs text-muted-foreground leading-relaxed mb-4">
          Your mortgage calculations stay on your device. Optional Google
          Analytics and Ahrefs analytics load only if you accept them.
          You can change your choice at any time.
        </p>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => set("essential")}
            className="flex-1 px-3 py-2 text-xs font-semibold rounded-lg border border-border hover:bg-muted transition"
          >
            Essential only
          </button>
          <button
            type="button"
            onClick={() => set("all")}
            className="flex-1 px-3 py-2 text-xs font-semibold rounded-lg bg-primary text-primary-foreground hover:ring-2 ring-accent"
          >
            Accept analytics
          </button>
        </div>
      </div>
    </div>
  );
};
