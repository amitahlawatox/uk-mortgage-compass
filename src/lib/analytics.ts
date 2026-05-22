// RepayWise analytics.ts — GA4 event tracking via G-Y8KJP7Q3MD

export const ANALYTICS_CONSENT_EVENT = "analytics-consent";

declare function gtag(...args: unknown[]): void;

function safeGtag(event: string, params?: Record<string, unknown>): void {
  try {
    if (typeof window !== "undefined" && typeof (window as unknown as Record<string, unknown>).gtag === "function") {
      (window as unknown as Record<string, unknown & { gtag: typeof gtag }>).gtag("event", event, params ?? {});
    }
  } catch {
    // SSR or gtag not loaded yet — silent fail
  }
}

export function syncAnalyticsConsent(_granted: boolean): void {}

export function trackPageView(path?: string): void {
  safeGtag("page_view", { page_path: path ?? (typeof window !== "undefined" ? window.location.pathname : "") });
}

export function trackEvent(name: string, params?: Record<string, unknown>): void {
  safeGtag(name, params);
}

export function track(event: string, params?: Record<string, unknown>): void {
  safeGtag(event, params);
}

export function trackIntentClick(label: string, url?: string): void {
  safeGtag("intent_calculate_click", { label, url: url ?? "" });
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

export function initAnalytics(): void {}
