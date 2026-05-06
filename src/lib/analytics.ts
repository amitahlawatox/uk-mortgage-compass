// RepayWise Analytics — privacy-first stub
// GA and PostHog have been removed. No user data is collected or transmitted.
// This file is kept as a no-op stub so existing imports don't break.

export const ANALYTICS_CONSENT_EVENT = "analytics-consent";

/** No-op: previously synced GA consent. Now does nothing. */
export function syncAnalyticsConsent(_granted: boolean): void {
  // Data collection disabled — no external calls
}

/** No-op: previously tracked page views. Now does nothing. */
export function trackPageView(_path?: string): void {
  // Data collection disabled — no external calls
}

/** No-op: previously tracked events. Now does nothing. */
export function trackEvent(_name: string, _params?: Record<string, unknown>): void {
  // Data collection disabled — no external calls
}
