import { useAuth } from "./hooks/useAuth";
import { AppRoutes } from "./routes/app-routes/app-routes";
import { AuthRoutes } from "./routes/auth-routes/auth-routes";

function Router() {
  const { user } = useAuth();

  return <main>{user ? <AppRoutes /> : <AuthRoutes />}</main>;
}

export default Router;
