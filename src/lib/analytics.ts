// RepayWise privacy-first analytics. No third-party analytics network calls
// occur before a visitor deliberately accepts optional analytics cookies.
export const ANALYTICS_CONSENT_EVENT = "analytics-consent";
const CONSENT_KEY = "velocity-cookie-consent";
const GA4_ID = "G-Y8KJP7Q3MD";
const AHREFS_KEY = "TS3mAoZXVtzsliPGFrj9Tg";

type GtagFn = (...args: unknown[]) => void;
type AnalyticsWindow = Window & { dataLayer?: unknown[][]; gtag?: GtagFn };
let initialized = false;

function analyticsAllowed(): boolean {
  try {
    return typeof window !== "undefined" &&
      window.localStorage.getItem(CONSENT_KEY) === "all";
  } catch {
    return false;
  }
}

function loadAnalytics(): void {
  if (initialized || !analyticsAllowed()) return;
  initialized = true;

  const w = window as AnalyticsWindow;
  w.dataLayer = w.dataLayer ?? [];
  w.gtag = (...args: unknown[]) => { w.dataLayer?.push(args); };
  // Disable the default page_view, as React Router tracks each visit explicitly.
  w.gtag("js", new Date());
  w.gtag("config", GA4_ID, {
    send_page_view: false,
    anonymize_ip: true,
    page_location: `${window.location.origin}${window.location.pathname}`,
  });

  const ga = document.createElement("script");
  ga.async = true;
  ga.src = `https://www.googletagmanager.com/gtag/js?id=${GA4_ID}`;
  document.head.appendChild(ga);

  const ahrefs = document.createElement("script");
  ahrefs.async = true;
  ahrefs.src = "https://analytics.ahrefs.com/analytics.js";
  ahrefs.dataset.key = AHREFS_KEY;
  document.head.appendChild(ahrefs);
}

export function syncAnalyticsConsent(_granted?: boolean): void {
  // Local storage is the source of truth; the event merely triggers resync.
  if (analyticsAllowed()) loadAnalytics();
}

function safeGtag(event: string, params?: Record<string, unknown>): void {
  if (!analyticsAllowed()) return;
  loadAnalytics();
  (window as AnalyticsWindow).gtag?.("event", event, params ?? {});
}

export function trackPageView(path?: string): void {
  const pathname = (path ?? (typeof window !== "undefined" ? window.location.pathname : "")).split(/[?#]/, 1)[0];
  safeGtag("page_view", {
    page_path: pathname,
    page_location: typeof window !== "undefined" ? `${window.location.origin}${pathname}` : "",
  });
}

export function trackEvent(name: string, params?: Record<string, unknown>): void {
  safeGtag(name, params);
}

export function track(event: string, params?: Record<string, unknown>): void {
  safeGtag(event, params);
}

export function trackIntentClick(label: string, url?: string, title?: string): void {
  safeGtag("intent_calculate_click", { label, url: url ?? "", title: title ?? "" });
}

export function trackCalculatorUse(type: string, params?: Record<string, unknown>): void {
  safeGtag("calculator_viewed", { calculator_type: type, ...params });
}

export function trackShare(method: string, page?: string): void {
  safeGtag("share", { method, content_type: "calculator", item_id: page ?? "" });
}

export function trackLenderView(lenderSlug: string): void {
  safeGtag("lender_page_view", { lender: lenderSlug });
}

export function trackCityView(citySlug: string): void {
  safeGtag("city_page_view", { city: citySlug });
}

export function initAnalytics(): void {
  syncAnalyticsConsent();
}
