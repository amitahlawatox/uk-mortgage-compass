import { ThemeProvider as NextThemesProvider } from "next-themes";
import { useEffect, type ReactNode } from "react";

const STORAGE_KEY = "theme";

const DeviceDefaultTheme = () => {
  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) return; // user already has a preference
      const isMobile = window.matchMedia("(max-width: 767px)").matches;
      const desired = isMobile ? "dark" : "light";
      localStorage.setItem(STORAGE_KEY, desired);
      const root = document.documentElement;
      root.classList.remove("light", "dark");
      root.classList.add(desired);
      root.style.colorScheme = desired;
    } catch {
      // ignore
    }
  }, []);
  return null;
};

export const ThemeProvider = ({ children }: { children: ReactNode }) => (
  <NextThemesProvider
    attribute="class"
    defaultTheme="light"
    enableSystem={false}
    disableTransitionOnChange
    storageKey={STORAGE_KEY}
  >
    <DeviceDefaultTheme />
    {children}
  </NextThemesProvider>
);
