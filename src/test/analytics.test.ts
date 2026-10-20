import { describe, expect, it } from "vitest";
import { trackIntentClick, trackPageView } from "@/lib/analytics";

describe("analytics privacy", () => {
  it("sends only the page path and fixed interaction labels after consent", () => {
    Object.defineProperty(window, "localStorage", {
      configurable: true,
      value: { getItem: (key: string) => key === "velocity-cookie-consent" ? "all" : null },
    });
    window.history.replaceState({}, "", "/calculators/repayment?principal=250000#rate=4.5");

    trackPageView("/calculators/repayment?principal=250000#rate=4.5");
    trackIntentClick("repayment_wizard", "calculators/repayment", "See my payment");

    const events = (window as Window & { dataLayer?: unknown[][] }).dataLayer ?? [];
    const pageView = events.find((entry) => entry[1] === "page_view");
    const click = events.find((entry) => entry[1] === "intent_calculate_click");

    expect(pageView?.[2]).toEqual({
      page_path: "/calculators/repayment",
      page_location: `${window.location.origin}/calculators/repayment`,
    });
    expect(click?.[2]).toEqual({
      label: "repayment_wizard",
      url: "calculators/repayment",
      title: "See my payment",
      page_location: `${window.location.origin}/calculators/repayment`,
    });
    expect(JSON.stringify(events)).not.toContain("250000");
    expect(JSON.stringify(events)).not.toContain("rate=4.5");

    window.history.replaceState({}, "", "/calculators/overpayment?deposit=50000");
    trackIntentClick("footer_calculators", "/calculators/repayment", "Mortgage Repayment");
    const latestEvent = events.at(-1);
    expect(latestEvent?.[2]).toMatchObject({
      page_location: `${window.location.origin}/calculators/overpayment`,
    });
    expect(JSON.stringify(latestEvent)).not.toContain("50000");
  });
});
