import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { LayoutGrid, GraduationCap, Bolt, LogOut } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";

export const AppLayout = () => {
  const { pathname } = useLocation();
  const { signOut } = useAuth();
  const navigate = useNavigate();

  const handleClickSignOut = () => {
    signOut();
    navigate("/");
    toast('Logout Successful', {
      action: {
        label: 'Ok',
        onClick: () => console.log('Ok')
      },
    })
  };

  return (
    <main className="flex h-screen">
      <div className="border-r py-8 px-6">
        <TooltipProvider>
          <div className="h-full flex flex-col justify-between">
            <div className="flex flex-col gap-6">
              <Link
                to="/"
                className="group flex h-9 w-9 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:h-10 md:w-10 md:text-base"
              >
                <GraduationCap className="h-6 w-6 transition-all group-hover:scale-110" />
                <span className="sr-only">Acme Inc</span>
              </Link>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Link
                    to="/"
                    className={`flex h-9 w-9 items-center justify-center rounded-lg  text-accent-foreground transition-colors hover:text-foreground ${
                      pathname === "/" && "bg-accent"
                    } md:h-10 md:w-10`}
                  >
                    <LayoutGrid size={24} />
                  </Link>
                </TooltipTrigger>
                <TooltipContent side="right">Home</TooltipContent>
              </Tooltip>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Link
                    to="/config"
                    className={`flex h-9 w-9 items-center justify-center rounded-lg text-accent-foreground transition-colors hover:text-foreground ${
                      pathname === "/config" && "bg-accent"
                    } md:h-10 md:w-10`}
                  >
                    <Bolt size={24} />
                  </Link>
                </TooltipTrigger>
                <TooltipContent side="right">Settings</TooltipContent>
              </Tooltip>
            </div>

            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  onClick={handleClickSignOut}
                  className="flex justify-center items-center text-accent-foreground transition-colors hover:text-foreground"
                >
                  <LogOut size={24} />
                </button>
              </TooltipTrigger>
              <TooltipContent side="right">Logout</TooltipContent>
            </Tooltip>
          </div>
        </TooltipProvider>
      </div>
      <Outlet />
    </main>
  );
};
