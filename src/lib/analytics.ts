const KEY = import.meta.env.VITE_POSTHOG_KEY as string | undefined;
const HOST = (import.meta.env.VITE_POSTHOG_HOST as string | undefined) ?? "https://eu.i.posthog.com";

let initialized = false;
let initStarted = false;

type PosthogModule = typeof import("posthog-js");
type PosthogClient = PosthogModule["default"];

let posthogClient: PosthogClient | null = null;

async function loadPosthog() {
  if (posthogClient) return posthogClient;
  const module = await import("posthog-js");
  posthogClient = module.default;
  return posthogClient;
}

export function initAnalytics() {
  if (initialized || initStarted || !KEY || typeof window === "undefined") return;

  initStarted = true;

  const start = async () => {
    const posthog = await loadPosthog();
    posthog.init(KEY, {
      api_host: HOST,
      capture_pageview: true,
      capture_pageleave: true,
      person_profiles: "identified_only",
      autocapture: false,
    });
    initialized = true;
  };

  if ("requestIdleCallback" in window) {
    window.requestIdleCallback(() => {
      void start();
    });
    return;
  }

  window.setTimeout(() => {
    void start();
  }, 1);
}

export function track(event: string, properties?: Record<string, unknown>) {
  if (!initialized || !posthogClient) return;
  posthogClient.capture(event, properties);
}

export function identify(distinctId: string, properties?: Record<string, unknown>) {
  if (!initialized || !posthogClient) return;
  posthogClient.identify(distinctId, properties);
}
