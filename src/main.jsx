import { RouterProvider } from "react-router/dom";
import ReactDOM from "react-dom/client";
import "./index.css";
import router from "./routes/routes";
import { FinanceProvider } from "./context/FinanceContext";

const root = document.getElementById("root");

ReactDOM.createRoot(root).render(
  <FinanceProvider>
    <RouterProvider router={router} />
  </FinanceProvider>,
);
