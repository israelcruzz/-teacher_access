import { Login } from "@/pages/auth/login";
import { Register } from "@/pages/auth/register";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
    
  },
  {
    path: "/register",
    element: <Register />
  },
]);

export function AuthRoutes() {
  return <RouterProvider router={router} />;
}