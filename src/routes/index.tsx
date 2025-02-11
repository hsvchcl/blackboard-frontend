import { createBrowserRouter } from "react-router-dom";
import { Dashboard } from "@layout/Dashboard";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Dashboard />,
  },
]);
