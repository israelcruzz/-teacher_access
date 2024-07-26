import { Home } from "@/pages/app/home";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { AppLayout } from "./layout";
import { Config } from "@/pages/app/config";

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/config",
        element: <Config />,
      },
    ],
  },
]);

export function AppRoutes() {
  return <RouterProvider router={router} />;
}
