import ProtectedRoute from "@/routing/ProtectedRoute";
import { Outlet } from "react-router-dom";
import { SidebarProvider } from "@/components/ui/sidebar";
import { useSidebarState } from "@/hooks/useSidebaState";
import { Header } from "@/components/sections/Header";
import { AppSidebar } from "@/components/nav/AppSidebar";
import { cn } from "@/lib/utils";

const DashboardLayout = () => {
  const [defaultOpen] = useSidebarState();

  return (
    <ProtectedRoute>
      <SidebarProvider defaultOpen={defaultOpen}>
        <div className="flex h-screen w-full overflow-hidden">
          <div className="h-full shrink-0">
            <AppSidebar />
          </div>
          <div
            className={cn(
              "flex flex-col flex-1 transition-all duration-300 ease-in-out",
              defaultOpen === true
                ? "w-[calc(100%-16rem)]"
                : "w-[calc(100%-3rem)]"
            )}
          >
            <Header />
            <main className="flex-1 overflow-y-auto p-4">
              <Outlet />
            </main>
          </div>
        </div>
      </SidebarProvider>
    </ProtectedRoute>
  );
};

export default DashboardLayout;
