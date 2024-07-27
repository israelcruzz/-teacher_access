import { Invite } from "@/pages/auth/invite";
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
  {
    path: "/invite/:teacherId",
    element: <Invite />
  },
]);

export function AuthRoutes() {
  return <RouterProvider router={router} />;
}