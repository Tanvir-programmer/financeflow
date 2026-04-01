import { createBrowserRouter } from "react-router";
import layout from "../layouts/layout";

const router = createBrowserRouter([
  {
    path: "/",
    Component: layout,
    children: [
      {
        path: "navbar",
        element: <h1>Hello Sir</h1>,
      },
    ],
  },
]);
export default router;
