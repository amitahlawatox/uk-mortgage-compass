import { describe, expect, it } from "vitest";
import { trackIntentClick, trackPageView } from "@/lib/analytics";

describe("analytics privacy", () => {
  it("sends only the page path and fixed interaction labels after consent", () => {
    Object.defineProperty(window, "localStorage", {
      configurable: true,
      value: { getItem: (key: string) => key === "velocity-cookie-consent" ? "all" : null },
    });

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
    });
    expect(JSON.stringify(events)).not.toContain("250000");
    expect(JSON.stringify(events)).not.toContain("rate=4.5");
  });
});
