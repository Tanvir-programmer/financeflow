import { createBrowserRouter } from "react-router";
import layout from "../layouts/layout";
import Dashboard from "../dashboard/Dashboard";
import Insights from "../insights/Insights";
import Transactions from "../Transactions/Transactions";
const router = createBrowserRouter([
  {
    path: "/",
    Component: layout,

    children: [
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
    ],
  },
]);
export default router;
