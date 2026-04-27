const CONSENT_KEY = "velocity-cookie-consent";
export const ANALYTICS_CONSENT_EVENT = "repaywise:cookie-consent-changed";

const POSTHOG_KEY = import.meta.env.VITE_POSTHOG_KEY as string | undefined;
const POSTHOG_HOST = (import.meta.env.VITE_POSTHOG_HOST as string | undefined) ?? "https://eu.i.posthog.com";
const GA_MEASUREMENT_ID = (import.meta.env.VITE_GA_MEASUREMENT_ID as string | undefined) ?? "G-VDQ6LCCGMC";

type PosthogModule = typeof import("posthog-js");
type PosthogClient = PosthogModule["default"];
type ConsentValue = "all" | "essential" | null;

declare global {
  interface Window {
    dataLayer: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

let initialized = false;
let initStarted = false;
let gtagInitialized = false;
let posthogInitialized = false;
let posthogClient: PosthogClient | null = null;

async function loadPosthog() {
  if (posthogClient) return posthogClient;
  const module = await import("posthog-js");
  posthogClient = module.default;
  return posthogClient;
}

function getGtagDisableKey() {
  return `ga-disable-${GA_MEASUREMENT_ID}`;
}

function setGtagDisabled(disabled: boolean) {
  if (!GA_MEASUREMENT_ID || typeof window === "undefined") return;
  (window as Window & Record<string, unknown>)[getGtagDisableKey()] = disabled;
}

function ensureGtagScript() {
  if (!GA_MEASUREMENT_ID || typeof document === "undefined") return;
  if (document.querySelector(`script[data-google-tag-id="${GA_MEASUREMENT_ID}"]`)) return;

  const script = document.createElement("script");
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
  script.dataset.googleTagId = GA_MEASUREMENT_ID;
  document.head.appendChild(script);
}

function initGtag() {
  if (!GA_MEASUREMENT_ID || typeof window === "undefined") return;
  if (!window.dataLayer) window.dataLayer = [];
  if (!window.gtag) {
    window.gtag = function gtag(...args: unknown[]) {
      window.dataLayer.push(args);
    };
  }

  ensureGtagScript();
  setGtagDisabled(false);
  window.gtag("js", new Date());
  window.gtag("config", GA_MEASUREMENT_ID, {
    anonymize_ip: true,
    send_page_view: false,
  });
  gtagInitialized = true;
}

export function getAnalyticsConsent(): ConsentValue {
  if (typeof window === "undefined") return null;
  const value = window.localStorage.getItem(CONSENT_KEY);
  return value === "all" || value === "essential" ? value : null;
}

function hasAnalyticsConsent() {
  return getAnalyticsConsent() === "all";
}

export function initAnalytics() {
  if (typeof window === "undefined" || !hasAnalyticsConsent()) return;
  if (initialized || initStarted) return;

  initStarted = true;
  initGtag();
  initialized = gtagInitialized;

  if (!POSTHOG_KEY) {
    initStarted = false;
    return;
  }

  void loadPosthog()
    .then((posthog) => {
      posthog.init(POSTHOG_KEY, {
        api_host: POSTHOG_HOST,
        capture_pageview: false,
        capture_pageleave: true,
        person_profiles: "identified_only",
        autocapture: false,
      });
      posthogInitialized = true;
      initialized = true;
    })
    .finally(() => {
      initStarted = false;
    });
}

export function syncAnalyticsConsent() {
  if (typeof window === "undefined") return;
  if (hasAnalyticsConsent()) {
    initAnalytics();
    return;
  }

  setGtagDisabled(true);
}

export function trackPageView(path = "") {
  if (typeof window === "undefined" || !hasAnalyticsConsent()) return;
  initAnalytics();

  const pagePath = path || `${window.location.pathname}${window.location.search}${window.location.hash}`;
  const pageLocation = new URL(pagePath, window.location.origin).toString();
  const pageTitle = document.title;

  if (window.gtag) {
    window.gtag("event", "page_view", {
      page_location: pageLocation,
      page_path: pagePath,
      page_title: pageTitle,
    });
  }

  if (posthogInitialized && posthogClient) {
    posthogClient.capture("$pageview", {
      $current_url: pageLocation,
      page_title: pageTitle,
    });
  }
}

export function track(event: string, properties?: Record<string, unknown>) {
  if (typeof window === "undefined" || !hasAnalyticsConsent()) return;
  initAnalytics();

  if (posthogInitialized && posthogClient) {
    posthogClient.capture(event, properties);
  }

  if (window.gtag) {
    window.gtag("event", event, properties ?? {});
  }
}

export function identify(distinctId: string, properties?: Record<string, unknown>) {
  if (typeof window === "undefined" || !hasAnalyticsConsent()) return;
  initAnalytics();
  if (!posthogInitialized || !posthogClient) return;
  posthogClient.identify(distinctId, properties);
}
