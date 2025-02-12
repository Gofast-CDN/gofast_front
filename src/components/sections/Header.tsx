import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import { useLocation, useParams } from "react-router-dom";
import { getNavItems } from "@/components/nav/AppSidebar";

export function Header() {
  const location = useLocation();
  const { userId } = useParams();
  const items = getNavItems(userId ?? "");

  const getCurrentPageTitle = (): string => {
    const currentPath = location.pathname.endsWith("/")
      ? location.pathname.slice(0, -1)
      : location.pathname;

    const currentItem = items
      .filter(
        (item) =>
          currentPath === item.url || currentPath.startsWith(`${item.url}/`)
      )
      .sort((a, b) => b.url.length - a.url.length)[0];

    // Special case: don't return Home for nested paths
    if (currentItem?.url === `/${userId}` && currentPath !== `/${userId}`) {
      return "Not found";
    }

    return currentItem?.title || "Not found";
  };

  return (
    <header
      className={cn(
        "sticky top-0 right-0 z-40 flex h-16 shrink-0 items-center gap-2 border-b px-4 bg-background",
        "transition-[margin] duration-200 ease-linear"
      )}
    >
      <SidebarTrigger className="-ml-1" />
      <Separator orientation="vertical" className="mr-2 h-4" />
      <div className="flex items-center justify-between w-full">
        <h1 className="text-lg">{getCurrentPageTitle()}</h1>
      </div>
    </header>
  );
}
