import { Suspense, useEffect, useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Outlet, useLocation } from "react-router-dom";
import type { RouteRecord } from "vite-react-ssg";
import { ANALYTICS_CONSENT_EVENT, syncAnalyticsConsent, trackPageView } from "@/lib/analytics";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { FCABanner } from "@/components/FCABanner";
import { ThemeProvider } from "@/components/ThemeProvider";
import { cities } from "@/lib/uk/cities";
import { lenders } from "@/lib/uk/lenders";

const RouteFallback = () => <div className="min-h-screen bg-background" aria-hidden="true" />;

const page = <T extends { default: React.ComponentType }>(importer: () => Promise<T>) =>
  async () => {
    const module = await importer();
    return { Component: module.default };
  };

const AnalyticsRouteTracker = () => {
  const location = useLocation();

  useEffect(() => {
    if (typeof window === "undefined") return undefined;

    const timer = window.setTimeout(() => {
      trackPageView(`${location.pathname}${location.search}${location.hash}`);
    }, 0);

    return () => {
      window.clearTimeout(timer);
    };
  }, [location.hash, location.pathname, location.search]);

  return null;
};

const AppLayout = () => {
  const [queryClient] = useState(() => new QueryClient());

  useEffect(() => {
    if (typeof window === "undefined") return undefined;

    syncAnalyticsConsent();

    const handleConsentChange = () => {
      syncAnalyticsConsent();
      trackPageView();
    };

    window.addEventListener(ANALYTICS_CONSENT_EVENT, handleConsentChange as EventListener);

    return () => {
      window.removeEventListener(ANALYTICS_CONSENT_EVENT, handleConsentChange as EventListener);
    };
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <AnalyticsRouteTracker />
          <Suspense fallback={<RouteFallback />}>
            <Outlet />
          </Suspense>
          {/* FCA regulatory warning rendered in the initial HTML */}
          <FCABanner />
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export const routes: RouteRecord[] = [
  {
    path: "/",
    element: <AppLayout />,
    entry: "src/App.tsx",
    children: [
      {
        index: true,
        lazy: page(() => import("./pages/Index.tsx")),
      },
      {
        path: "calculators/stamp-duty",
        lazy: page(() => import("./pages/calculators/StampDutyPage")),
      },
      {
        path: "calculators/repayment",
        lazy: page(() => import("./pages/calculators/RepaymentPage")),
      },
      {
        path: "calculators/repayment/:slug",
        lazy: page(() => import("./pages/calculators/RepaymentPage")),
        getStaticPaths: () => lenders.map((lender) => `calculators/repayment/${lender.slug}`),
      },
      {
        path: "calculators/overpayment",
        lazy: page(() => import("./pages/calculators/OverpaymentPage")),
      },
      {
        path: "calculators/overpayment/:slug",
        lazy: page(() => import("./pages/calculators/OverpaymentPage")),
        getStaticPaths: () => lenders.map((lender) => `calculators/overpayment/${lender.slug}`),
      },
      {
        path: "calculators/affordability",
        lazy: page(() => import("./pages/calculators/AffordabilityPage")),
      },
      {
        path: "calculators/max-borrowing",
        lazy: page(() => import("./pages/calculators/MaxBorrowingPage")),
      },
      {
        path: "calculators/max-borrowing/:slug",
        lazy: page(() => import("./pages/calculators/MaxBorrowingPage")),
        getStaticPaths: () => lenders.map((lender) => `calculators/max-borrowing/${lender.slug}`),
      },
      {
        path: "calculators/equity",
        lazy: page(() => import("./pages/calculators/EquityPage")),
      },
      {
        path: "calculators/buy-to-let",
        lazy: page(() => import("./pages/calculators/BuyToLetPage")),
      },
      {
        path: "calculators/compare",
        lazy: page(() => import("./pages/calculators/ComparePage")),
      },
      {
        path: "guides",
        lazy: page(() => import("./pages/GuidesPage")),
      },
      {
        path: "guides/lenders/:slug",
        lazy: page(() => import("./pages/guides/LenderGuidePage")),
        getStaticPaths: () => lenders.map((lender) => `guides/lenders/${lender.slug}`),
      },
      {
        path: "privacy-policy",
        lazy: page(() => import("./pages/legal/PrivacyPolicy")),
      },
      {
        path: "cookie-policy",
        lazy: page(() => import("./pages/legal/CookiePolicy")),
      },
      {
        path: "terms-of-service",
        lazy: page(() => import("./pages/legal/TermsOfService")),
      },
      {
        path: "uk/:slug",
        lazy: page(() => import("./pages/regional/RegionalPage")),
        getStaticPaths: () => cities.map((city) => `uk/${city.slug}`),
      },
      {
        path: "*",
        lazy: page(() => import("./pages/NotFound.tsx")),
      },
    ],
  },
];

export default routes;
