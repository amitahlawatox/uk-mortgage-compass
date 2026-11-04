import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter, Route, Routes, useLocation, useNavigate } from "react-router-dom";
import { describe, expect, it, vi } from "vitest";
import RepaymentPage from "@/pages/calculators/RepaymentPage";
import OverpaymentPage from "@/pages/calculators/OverpaymentPage";
import MaxBorrowingPage from "@/pages/calculators/MaxBorrowingPage";

vi.mock("@/components/calculators/CalculatorShell", () => ({
  CalculatorShell: ({ title }: { title: string }) => (
    <div data-testid="calculator-page">{title}</div>
  ),
}));

const RouteControls = ({ base }: { base: string }) => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <>
      <output data-testid="path">{location.pathname}</output>
      <button onClick={() => navigate(`${base}/nationwide`)}>Valid lender</button>
      <button onClick={() => navigate(`${base}/unknown-lender`)}>Invalid lender</button>
    </>
  );
};

describe.each([
  ["repayment", RepaymentPage],
  ["overpayment", OverpaymentPage],
  ["max-borrowing", MaxBorrowingPage],
])("%s calculator route", (type, Page) => {
  it("keeps rendering when navigation moves through valid and invalid lender slugs", async () => {
    const base = `/calculators/${type}`;

    render(
      <MemoryRouter initialEntries={[base]}>
        <RouteControls base={base} />
        <Routes>
          <Route path={`${base}/:slug?`} element={<Page />} />
        </Routes>
      </MemoryRouter>,
    );

    fireEvent.click(screen.getByRole("button", { name: "Valid lender" }));
    await waitFor(() => expect(screen.getByTestId("path")).toHaveTextContent(`${base}/nationwide`));
    expect(screen.getByTestId("calculator-page")).toHaveTextContent("Nationwide");

    fireEvent.click(screen.getByRole("button", { name: "Invalid lender" }));
    await waitFor(() => expect(screen.getByTestId("path")).toHaveTextContent(base));
    expect(screen.getByTestId("calculator-page")).toBeInTheDocument();
  });
});
