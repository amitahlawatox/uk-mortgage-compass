import { fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it, vi } from "vitest";
import type { ReactNode } from "react";
import RemortgagePage from "@/pages/calculators/RemortgagePage";

vi.mock("@/components/calculators/CalculatorShell", () => ({
  CalculatorShell: ({ children }: { children: ReactNode }) => <main>{children}</main>,
}));
vi.mock("@/components/SEO", () => ({ SEO: () => null }));
vi.mock("@/components/seo/BreadcrumbJsonLd", () => ({ BreadcrumbJsonLd: () => null }));
vi.mock("@/components/calculators/RelatedCalculators", () => ({ RelatedCalculators: () => null }));

const inputFor = (label: string): HTMLInputElement => {
  const input = screen.getByText(label).parentElement?.querySelector<HTMLInputElement>('input[type="text"]');
  if (!input) throw new Error(`No text input for ${label}`);
  return input;
};

describe("remortgage calculator input editing", () => {
  it("stays mounted while both term fields are cleared and replaced", () => {
    render(<MemoryRouter><RemortgagePage /></MemoryRouter>);

    const currentTerm = inputFor("Remaining term (years)");
    fireEvent.focus(currentTerm);
    fireEvent.change(currentTerm, { target: { value: "" } });
    expect(screen.getByRole("heading", { name: /position after 2 years/i })).toBeInTheDocument();
    fireEvent.change(currentTerm, { target: { value: "25" } });
    fireEvent.blur(currentTerm);
    expect(currentTerm).toHaveValue("25");

    const newTerm = inputFor("New term (years)");
    fireEvent.focus(newTerm);
    fireEvent.change(newTerm, { target: { value: "" } });
    expect(screen.getByRole("heading", { name: /position after 2 years/i })).toBeInTheDocument();
    fireEvent.change(newTerm, { target: { value: "1.5" } });
    fireEvent.blur(newTerm);
    expect(newTerm).toHaveValue("2");
    expect(screen.getByRole("heading", { name: /position after 2 years/i })).toBeInTheDocument();
  });

  it("keeps the last valid rate while a negative draft is being edited", () => {
    render(<MemoryRouter><RemortgagePage /></MemoryRouter>);

    const rate = inputFor("Assumed new rate");
    fireEvent.focus(rate);
    fireEvent.change(rate, { target: { value: "-1" } });
    expect(screen.getByRole("heading", { name: /position after 2 years/i })).toBeInTheDocument();
    fireEvent.change(rate, { target: { value: "4.75" } });
    fireEvent.blur(rate);
    expect(rate).toHaveValue("4.75");
  });
});
