import posthog from "posthog-js";

const KEY = import.meta.env.VITE_POSTHOG_KEY as string | undefined;
const HOST = (import.meta.env.VITE_POSTHOG_HOST as string | undefined) ?? "https://eu.i.posthog.com";

let initialized = false;

export function initAnalytics() {
  if (initialized || !KEY || typeof window === "undefined") return;
  posthog.init(KEY, {
    api_host: HOST,
    capture_pageview: true,
    capture_pageleave: true,
    person_profiles: "identified_only",
    autocapture: false,
  });
  initialized = true;
}

export function track(event: string, properties?: Record<string, unknown>) {
  if (!initialized) return;
  posthog.capture(event, properties);
}

export function identify(distinctId: string, properties?: Record<string, unknown>) {
  if (!initialized) return;
  posthog.identify(distinctId, properties);
}
