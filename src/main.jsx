import { RouterProvider } from "react-router/dom";
import ReactDOM from "react-dom/client";
import "./index.css";
import router from "./routes/routes";

const root = document.getElementById("root");

ReactDOM.createRoot(root).render(<RouterProvider router={router} />);
