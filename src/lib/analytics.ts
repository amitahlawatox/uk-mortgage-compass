// RepayWise analytics.ts — privacy-first no-op stubs
// All tracking has been disabled. No user data is collected or transmitted.
// These stubs exist so existing imports compile without errors.

export const ANALYTICS_CONSENT_EVENT = "analytics-consent";

/** No-op stubs — all analytics disabled for privacy compliance */
export function syncAnalyticsConsent(_granted: boolean): void {}
export function trackPageView(_path?: string): void {}
export function trackEvent(_name: string, _params?: Record<string, unknown>): void {}
export function trackIntentClick(_label: string, _url?: string): void {}
export function trackCalculatorUse(_type: string, _params?: Record<string, unknown>): void {}
export function trackShare(_method: string, _page?: string): void {}
export function trackLenderView(_lenderSlug: string): void {}
export function trackCityView(_citySlug: string): void {}
export function initAnalytics(): void {}
