import { createBrowserRouter, Navigate } from "react-router";
import layout from "../layouts/layout";
import Dashboard from "../dashboard/Dashboard";
import Insights from "../insights/Insights";
import Transactions from "../Transactions/Transactions";

const router = createBrowserRouter([
  {
    path: "/",
    Component: layout,
    children: [
      { index: true, element: <Navigate to="/dashboard" replace /> },
      {
        path: "/dashboard",
        Component: Dashboard,
      },
      {
        path: "/insights",
        Component: Insights,
      },
      {
        path: "/transactions",
        Component: Transactions,
      },
      {
        path: "*",
        element: <Navigate to="/dashboard" replace />,
      },
    ],
  },
]);

export default router;
