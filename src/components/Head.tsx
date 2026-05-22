// Local shim so pages don't depend on `vite-react-ssg` at runtime in SPA mode.
// Behaves like a Head/Helmet — children (title, meta, link, script tags) are
// hoisted into <head> via react-helmet-async.
import { Helmet } from "react-helmet-async";
import type { ReactNode } from "react";

export const Head = ({ children }: { children: ReactNode }) => (
  <Helmet>{children}</Helmet>
);

export default Head;
