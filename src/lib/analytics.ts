// RepayWise analytics.ts — privacy-first no-op stubs
// All tracking disabled. No user data collected or transmitted.

export const ANALYTICS_CONSENT_EVENT = "analytics-consent";

export function syncAnalyticsConsent(_granted: boolean): void {}
export function trackPageView(_path?: string): void {}
export function trackEvent(_name: string, _params?: Record<string, unknown>): void {}
export function trackIntentClick(_label: string, _url?: string): void {}
export function trackCalculatorUse(_type: string, _params?: Record<string, unknown>): void {}
export function trackShare(_method: string, _page?: string): void {}
export function trackLenderView(_lenderSlug: string): void {}
export function trackCityView(_citySlug: string): void {}
export function initAnalytics(): void {}

// CalculatorShell imports this directly
export function track(_event: string, _params?: Record<string, unknown>): void {}
