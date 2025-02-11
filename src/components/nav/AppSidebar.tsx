import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubItem,
  SidebarMenuSubButton,
  SidebarHeader,
} from "@/components/ui/sidebar";
import {
  ChevronRight,
  FolderTree,
  LayoutDashboard,
  Settings,
  Trash2,
  Upload,
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { cn } from "@/lib/utils";
import { NavUser } from "./NavUser";
import { Button } from "../ui/button";
import { useState } from "react";
import { UploadFileModal } from "../assets/UploadFileModal";
import { useFileUpload } from "@/hooks/useFileUpload";

interface MenuItem {
  title: string;
  url: string;
  icon: React.ElementType;
  submenu?: {
    title: string;
    url: string;
    description: string;
  }[];
}

// Export the items array
export const items: MenuItem[] = [
  {
    title: "Home",
    url: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "My space",
    url: "/dashboard/my-space",
    icon: FolderTree,
  },
  {
    title: "Trash",
    url: "/dashboard/trash",
    icon: Trash2,
  },
  {
    title: "Settings",
    url: "/dashboard/settings",
    icon: Settings,
  },
];

export function AppSidebar() {
  const location = useLocation();
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);

  const { upload, isUploading } = useFileUpload({
    onSuccess: () => {
      setIsUploadModalOpen(false);
    },
  });

  const isLinkActive = (itemUrl: string) => {
    const currentPath = location.pathname.endsWith("/")
      ? location.pathname.slice(0, -1)
      : location.pathname;
    return currentPath === itemUrl;
  };

  return (
    <>
      <Sidebar collapsible="icon">
        <SidebarHeader className="h-16 border-b border-sidebar-border">
          <NavUser />
        </SidebarHeader>
        <div className="p-4">
          <Button
            onClick={() => setIsUploadModalOpen(true)}
            className="w-full gap-2 font-medium"
            size="lg"
          >
            <Upload className="h-4 w-4" />
            <span>Upload new file</span>
          </Button>
        </div>
        <SidebarContent>
          <SidebarGroup>
            <SidebarMenu>
              {items.map((item) => {
                const isActive = isLinkActive(item.url);

                if (item.submenu) {
                  return (
                    <Collapsible
                      key={item.title}
                      asChild
                      defaultOpen={true}
                      className="group/collapsible"
                    >
                      <SidebarMenuItem>
                        <CollapsibleTrigger asChild>
                          <SidebarMenuButton
                            tooltip={item.title}
                            className={cn(
                              isActive &&
                                "bg-accent text-accent-foreground font-semibold"
                            )}
                          >
                            <item.icon className="h-4 w-4" />
                            <span>{item.title}</span>
                            <ChevronRight className="ml-auto h-4 w-4 transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                          </SidebarMenuButton>
                        </CollapsibleTrigger>
                        <CollapsibleContent>
                          <SidebarMenuSub>
                            {item.submenu.map((subItem) => (
                              <SidebarMenuSubItem key={subItem.title}>
                                <SidebarMenuSubButton
                                  asChild
                                  isActive={isLinkActive(subItem.url)}
                                >
                                  <Link
                                    to={subItem.url}
                                    className={cn(
                                      isLinkActive(subItem.url) &&
                                        "font-semibold"
                                    )}
                                  >
                                    {subItem.title}
                                  </Link>
                                </SidebarMenuSubButton>
                              </SidebarMenuSubItem>
                            ))}
                          </SidebarMenuSub>
                        </CollapsibleContent>
                      </SidebarMenuItem>
                    </Collapsible>
                  );
                }

                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      asChild
                      tooltip={item.title}
                      className={cn(
                        isActive &&
                          "bg-accent text-accent-foreground font-semibold"
                      )}
                    >
                      <Link to={item.url} className="flex items-center gap-2">
                        <item.icon className="h-4 w-4" />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
      <UploadFileModal
        isOpen={isUploadModalOpen}
        onClose={() => setIsUploadModalOpen(false)}
        onSubmit={upload}
        isUploading={isUploading}
      />
    </>
  );
}
