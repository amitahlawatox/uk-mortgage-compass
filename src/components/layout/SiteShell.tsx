import { Header } from "./Header";
import { Footer } from "./Footer";
import { CookieConsent } from "@/components/CookieConsent";
import { ReactNode } from "react";

export const SiteShell = ({ children }: { children: ReactNode }) => (
  <div className="min-h-dvh flex flex-col bg-background">
    <Header />
    <main className="flex-1">{children}</main>
    <Footer />
    <CookieConsent />
  </div>
);
