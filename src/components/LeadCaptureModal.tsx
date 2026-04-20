import { useEffect, useRef, useState } from "react";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";
import { track } from "@/lib/analytics";
import { Sparkles, X } from "lucide-react";
import { toast } from "sonner";

const STORAGE_KEY = "velocity_lead_state_v1";
const DELAY_MS = 30_000;

const schema = z.object({
  name: z.string().trim().min(1, "Name required").max(120),
  email: z.string().trim().email("Enter a valid email").max(255),
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
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const contextRef = useRef(context);
  contextRef.current = context;

  useEffect(() => {
    const state = readState();
    if (state.submitted) return;
    // 7-day cooldown after dismiss
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
    const parsed = schema.safeParse({ name, email });
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
    track("lead_submitted", { calculator });
    setOpen(false);
    toast.success("Thanks — we'll be in touch.", {
      description: "Your tailored insights will land in your inbox soon.",
    });
  };

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4 bg-background/70 backdrop-blur-sm animate-in fade-in"
      role="dialog"
      aria-modal="true"
      aria-labelledby="lead-title"
    >
      <div className="relative w-full max-w-md glass-card rounded-2xl p-6 shadow-glow-cyan animate-in slide-in-from-bottom-4">
        <button
          onClick={close}
          aria-label="Dismiss"
          className="absolute top-3 right-3 p-2 rounded-full text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
        >
          <X className="size-4" />
        </button>
        <div className="flex items-center gap-2 mb-2">
          <Sparkles className="size-4 text-accent" />
          <p className="text-[11px] font-bold uppercase tracking-widest text-accent">
            Tailored to your numbers
          </p>
        </div>
        <h2 id="lead-title" className="text-2xl font-bold tracking-tight mb-2">
          Get the full breakdown by email
        </h2>
        <p className="text-sm text-muted-foreground mb-5">
          We'll send your scenario plus matching UK rates from FCA-regulated brokers. No spam, unsubscribe anytime.
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
              className="w-full px-4 py-3 rounded-xl bg-secondary border border-border text-sm focus:outline-none focus:border-accent transition-colors"
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
              className="w-full px-4 py-3 rounded-xl bg-secondary border border-border text-sm focus:outline-none focus:border-accent transition-colors"
            />
          </div>
          {error && (
            <p className="text-xs text-destructive" role="alert">{error}</p>
          )}
          <button
            type="submit"
            disabled={submitting}
            className="w-full px-4 py-3 rounded-xl bg-primary text-primary-foreground text-sm font-semibold shadow-glow-cyan hover:opacity-90 transition-opacity disabled:opacity-50"
          >
            {submitting ? "Sending…" : "Email me my results"}
          </button>
          <p className="text-[10px] text-muted-foreground text-center pt-1">
            By submitting you agree to our privacy policy. We never sell your data.
          </p>
        </form>
      </div>
    </div>
  );
};
