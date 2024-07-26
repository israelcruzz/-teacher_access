import { Home } from "@/pages/app/home";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { AppLayout } from "./layout";

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
    ],
  },
]);

export function AppRoutes() {
  return <RouterProvider router={router} />;
}
