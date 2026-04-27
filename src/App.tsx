import { useEffect } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { Analytics, type BeforeSendEvent } from "@vercel/analytics/react";
import { initAnalytics } from "@/lib/analytics";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { FCABanner } from "@/components/FCABanner";
import { ThemeProvider } from "@/components/ThemeProvider";
import Index from "./pages/Index.tsx";
import NotFound from "./pages/NotFound.tsx";
import StampDutyPage from "./pages/calculators/StampDutyPage";
import RepaymentPage from "./pages/calculators/RepaymentPage";
import OverpaymentPage from "./pages/calculators/OverpaymentPage";
import AffordabilityPage from "./pages/calculators/AffordabilityPage";
import MaxBorrowingPage from "./pages/calculators/MaxBorrowingPage";
import EquityPage from "./pages/calculators/EquityPage";
import BuyToLetPage from "./pages/calculators/BuyToLetPage";
import RegionalPage from "./pages/regional/RegionalPage";

const queryClient = new QueryClient();
const PRODUCTION_HOSTS = new Set(["repaywise.co.uk", "www.repaywise.co.uk"]);

function filterAnalyticsEvent(event: BeforeSendEvent) {
  try {
    const url = new URL(event.url);

    if (!PRODUCTION_HOSTS.has(url.hostname)) {
      return null;
    }

    if (url.hostname === "www.repaywise.co.uk") {
      url.hostname = "repaywise.co.uk";
      return { ...event, url: url.toString() };
    }
  } catch {
    return event;
  }

  return event;
}

const App = () => {
  useEffect(() => { initAnalytics(); }, []);
  return (
    <QueryClientProvider client={queryClient}>
      <HelmetProvider>
        <ThemeProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
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
            {/* FCA Regulatory Banner — required on all pages per FCA MCOB rules */}
            <FCABanner />
          </BrowserRouter>
          <Analytics beforeSend={filterAnalyticsEvent} />
        </TooltipProvider>
        </ThemeProvider>
      </HelmetProvider>
    </QueryClientProvider>
  );
};

export default App;
