import { useState } from "react";
import { X, ShieldAlert } from "lucide-react";

const SESSION_KEY = "repaywise_fca_dismissed";

export const FCABanner = () => {
  const [dismissed, setDismissed] = useState(() => {
    try { return sessionStorage.getItem(SESSION_KEY) === "true"; } catch { return false; }
  });
  const dismiss = () => {
    try { sessionStorage.setItem(SESSION_KEY, "true"); } catch {}
    setDismissed(true);
  };
  if (dismissed) return null;
  return (
    <div
      role="complementary"
      aria-label="FCA regulatory warning"
      className="fca-banner fixed bottom-0 left-0 right-0 z-50 bg-amber-50 border-t-2 border-amber-400 shadow-lg print:hidden"
    >
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-start gap-3 sm:items-center">
        <ShieldAlert className="h-5 w-5 text-amber-600 flex-shrink-0 mt-0.5 sm:mt-0" aria-hidden="true" />
        <p className="text-xs sm:text-sm text-amber-900 flex-1 leading-snug">
          <strong className="font-semibold">Important: </strong>
          Your home may be repossessed if you do not keep up repayments on your mortgage.
          RepayWise provides free calculators and educational content only — this is{" "}
          <strong className="font-semibold">not financial advice</strong>. Always consult a
          qualified, FCA-authorised mortgage adviser before making any financial decisions.{" "}
          <a
            href="https://register.fca.org.uk/"
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-amber-700 focus:outline-none focus:ring-1 focus:ring-amber-500"
          >
            Check the FCA Register.
          </a>
        </p>
        <button
          onClick={dismiss}
          aria-label="Dismiss regulatory warning"
          className="flex-shrink-0 p-1 rounded hover:bg-amber-100 focus:outline-none focus:ring-2 focus:ring-amber-500 transition-colors"
        >
          <X className="h-4 w-4 text-amber-700" aria-hidden="true" />
        </button>
      </div>
    </div>
  );
};

export default FCABanner;
