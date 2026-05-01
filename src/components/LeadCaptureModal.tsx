import { useEffect, useRef, useState } from "react";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";
import { track } from "@/lib/analytics";
import { Sparkles, X } from "lucide-react";
import { toast } from "sonner";

const STORAGE_KEY = "velocity_lead_state_v1";
const DELAY_MS = 30_000;
const CONSENT_VERSION = "2026-05-01";

const schema = z.object({
  name: z.string().trim().min(1, "Name required").max(120),
  email: z.string().trim().email("Enter a valid email").max(255),
  privacyConsent: z.literal(true, {
    errorMap: () => ({ message: "Please confirm the privacy notice to continue." }),
  }),
  marketingConsent: z.boolean().default(false),
});

type LeadStored = { submitted?: boolean; dismissedAt?: number };

function readState(): LeadStored {
  if (typeof window === "undefined") return {};
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "{}");
  } catch {
    return {};
  }
}

function writeState(s: LeadStored) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(s));
}

interface Props {
  calculator: string;
  context: Record<string, unknown>;
}

export const LeadCaptureModal = ({ calculator, context }: Props) => {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [privacyConsent, setPrivacyConsent] = useState(false);
  const [marketingConsent, setMarketingConsent] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const contextRef = useRef(context);
  contextRef.current = context;

  useEffect(() => {
    // Lead capture modal disabled until ~300k MAU. Remove early return to re-enable.
    return;
    // eslint-disable-next-line no-unreachable
    const state = readState();
    if (state.submitted) return;
    if (state.dismissedAt && Date.now() - state.dismissedAt < 7 * 24 * 60 * 60 * 1000) return;
    const t = window.setTimeout(() => {
      setOpen(true);
      track("lead_modal_shown", { calculator });
    }, DELAY_MS);
    return () => window.clearTimeout(t);
  }, [calculator]);

  const close = () => {
    setOpen(false);
    writeState({ ...readState(), dismissedAt: Date.now() });
    track("lead_modal_dismissed", { calculator });
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const parsed = schema.safeParse({ name, email, privacyConsent, marketingConsent });
    if (!parsed.success) {
      setError(parsed.error.issues[0]?.message ?? "Invalid input");
      return;
    }

    setSubmitting(true);
    const { error: dbError } = await supabase.from("leads").insert([{
      name: parsed.data.name,
      email: parsed.data.email,
      calculator,
      context: contextRef.current as never,
      privacy_consent: parsed.data.privacyConsent,
      marketing_consent: parsed.data.marketingConsent,
      consent_version: CONSENT_VERSION,
      consented_at: new Date().toISOString(),
      source: typeof window !== "undefined" ? window.location.pathname : null,
      user_agent: typeof navigator !== "undefined" ? navigator.userAgent : null,
    }]);
    setSubmitting(false);

    if (dbError) {
      setError("Couldn't save right now. Please try again.");
      track("lead_submit_failed", { calculator, message: dbError.message });
      return;
    }

    writeState({ submitted: true });
    track("lead_submitted", { calculator, marketing_consent: parsed.data.marketingConsent });
    setOpen(false);
    toast.success("Thanks - we'll be in touch.", {
      description: "We have saved your request and will email the information you asked for.",
    });
  };

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-background/70 p-4 backdrop-blur-sm animate-in fade-in sm:items-center"
      role="dialog"
      aria-modal="true"
      aria-labelledby="lead-title"
    >
      <div className="relative w-full max-w-md rounded-2xl p-6 shadow-glow-cyan glass-card animate-in slide-in-from-bottom-4">
        <button
          onClick={close}
          aria-label="Dismiss"
          className="absolute right-3 top-3 rounded-full p-2 text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
        >
          <X className="size-4" />
        </button>
        <div className="mb-2 flex items-center gap-2">
          <Sparkles className="size-4 text-accent" />
          <p className="text-[11px] font-bold uppercase tracking-widest text-accent">
            Tailored to your numbers
          </p>
        </div>
        <h2 id="lead-title" className="mb-2 text-2xl font-bold tracking-tight">
          Get the full breakdown by email
        </h2>
        <p className="mb-5 text-sm text-muted-foreground">
          We will email the results you requested. Optional marketing updates are separate and only
          sent if you opt in below.
        </p>
        <form onSubmit={submit} className="space-y-3" noValidate>
          <div>
            <label htmlFor="lead-name" className="sr-only">Name</label>
            <input
              id="lead-name"
              type="text"
              autoComplete="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your name"
              maxLength={120}
              required
              className="w-full rounded-xl border border-border bg-secondary px-4 py-3 text-sm transition-colors focus:border-accent focus:outline-none"
            />
          </div>
          <div>
            <label htmlFor="lead-email" className="sr-only">Email</label>
            <input
              id="lead-email"
              type="email"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              maxLength={255}
              required
              className="w-full rounded-xl border border-border bg-secondary px-4 py-3 text-sm transition-colors focus:border-accent focus:outline-none"
            />
          </div>
          <label className="flex items-start gap-3 rounded-xl border border-border bg-secondary/40 px-3 py-3 text-xs leading-relaxed">
            <input
              type="checkbox"
              checked={privacyConsent}
              onChange={(e) => setPrivacyConsent(e.target.checked)}
              className="mt-0.5"
              required
            />
            <span>
              I agree that RepayWise may use my name and email to send the specific information I
              requested, as described in the{" "}
              <a href="/privacy-policy" className="underline hover:text-foreground">
                Privacy Policy
              </a>.
            </span>
          </label>
          <label className="flex items-start gap-3 rounded-xl border border-border bg-secondary/20 px-3 py-3 text-xs leading-relaxed">
            <input
              type="checkbox"
              checked={marketingConsent}
              onChange={(e) => setMarketingConsent(e.target.checked)}
              className="mt-0.5"
            />
            <span>
              Optional: send me occasional mortgage updates and product news by email. I understand
              I can unsubscribe at any time.
            </span>
          </label>
          {error && (
            <p className="text-xs text-destructive" role="alert">{error}</p>
          )}
          <button
            type="submit"
            disabled={submitting}
            className="w-full rounded-xl bg-primary px-4 py-3 text-sm font-semibold text-primary-foreground shadow-glow-cyan transition-opacity hover:opacity-90 disabled:opacity-50"
          >
            {submitting ? "Sending..." : "Email me my results"}
          </button>
          <p className="pt-1 text-center text-[10px] text-muted-foreground">
            We never sell your data. Service emails use the required privacy consent above; marketing
            emails require the optional tick box.
          </p>
        </form>
      </div>
    </div>
  );
};
