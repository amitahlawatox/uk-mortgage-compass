import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import routes from "./App.tsx";
import "./index.css";

const router = createBrowserRouter(routes, {
  basename: import.meta.env.BASE_URL,
});

createRoot(document.getElementById("root")!).render(
  <RouterProvider router={router} />,
);

export default {
  routes,
};
