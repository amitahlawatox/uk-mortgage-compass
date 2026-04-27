import { Suspense, lazy, useEffect } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { ANALYTICS_CONSENT_EVENT, syncAnalyticsConsent, trackPageView } from "@/lib/analytics";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { FCABanner } from "@/components/FCABanner";
import { ThemeProvider } from "@/components/ThemeProvider";
const Index = lazy(() => import("./pages/Index.tsx"));
const NotFound = lazy(() => import("./pages/NotFound.tsx"));
const StampDutyPage = lazy(() => import("./pages/calculators/StampDutyPage"));
const RepaymentPage = lazy(() => import("./pages/calculators/RepaymentPage"));
const OverpaymentPage = lazy(() => import("./pages/calculators/OverpaymentPage"));
const AffordabilityPage = lazy(() => import("./pages/calculators/AffordabilityPage"));
const MaxBorrowingPage = lazy(() => import("./pages/calculators/MaxBorrowingPage"));
const EquityPage = lazy(() => import("./pages/calculators/EquityPage"));
const BuyToLetPage = lazy(() => import("./pages/calculators/BuyToLetPage"));
const RegionalPage = lazy(() => import("./pages/regional/RegionalPage"));

const queryClient = new QueryClient();
const RouteFallback = () => <div className="min-h-screen bg-background" aria-hidden="true" />;

const AnalyticsRouteTracker = () => {
  const location = useLocation();

  useEffect(() => {
    const timer = window.setTimeout(() => {
      trackPageView(`${location.pathname}${location.search}${location.hash}`);
    }, 0);

    return () => {
      window.clearTimeout(timer);
    };
  }, [location.hash, location.pathname, location.search]);

  return null;
};

const App = () => {
  useEffect(() => {
    syncAnalyticsConsent();

    const handleConsentChange = () => {
      syncAnalyticsConsent();
    };

    window.addEventListener(ANALYTICS_CONSENT_EVENT, handleConsentChange as EventListener);

    return () => {
      window.removeEventListener(ANALYTICS_CONSENT_EVENT, handleConsentChange as EventListener);
    };
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <HelmetProvider>
        <ThemeProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <AnalyticsRouteTracker />
              <Suspense fallback={<RouteFallback />}>
                <Routes>
                  <Route path="/" element={<Index />} />
                  <Route path="/calculators/stamp-duty" element={<StampDutyPage />} />
                  <Route path="/calculators/repayment" element={<RepaymentPage />} />
                  <Route path="/calculators/overpayment" element={<OverpaymentPage />} />
                  <Route path="/calculators/affordability" element={<AffordabilityPage />} />
                  <Route path="/calculators/max-borrowing" element={<MaxBorrowingPage />} />
                  <Route path="/calculators/equity" element={<EquityPage />} />
                  <Route path="/calculators/buy-to-let" element={<BuyToLetPage />} />
                  <Route path="/uk/:slug" element={<RegionalPage />} />
                  {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </Suspense>
              {/* FCA Regulatory Banner — required on all pages per FCA MCOB rules */}
              <FCABanner />
            </BrowserRouter>
          </TooltipProvider>
        </ThemeProvider>
      </HelmetProvider>
    </QueryClientProvider>
  );
};

export default App;
