import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { Toaster } from "sonner";
import Router from "./router.tsx";
import { AuthProvider } from "./context/auth-provider.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AuthProvider>
      <Router />
      <Toaster />
    </AuthProvider>
  </React.StrictMode>
);
