import {
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { ChevronRight, Grid, Home, LayoutList } from "lucide-react";
import React from "react";
import { useNavigate } from "react-router-dom";

interface PathInfo {
  containerId: string;
  containerName: string;
}

interface SpaceHeaderProps {
  userId: string;
  pathInfo?: PathInfo[];
  viewMode: "list" | "grid";
  setViewMode: (mode: "list" | "grid") => void;
}

export default function SpaceHeader({
  userId,
  pathInfo,
  viewMode,
  setViewMode,
}: SpaceHeaderProps) {
  const navigate = useNavigate();
  const rootFolder = pathInfo?.[0];

  // Show only root and last 2 items if path is too long
  const shouldTruncate = pathInfo && pathInfo.length > 3;
  const visibleItems = shouldTruncate
    ? [
        pathInfo[0],
        pathInfo[pathInfo.length - 2],
        pathInfo[pathInfo.length - 1],
      ]
    : pathInfo;

  return (
    <div className="flex items-center justify-between">
      <Breadcrumb>
        <BreadcrumbList>
          {rootFolder && (
            <BreadcrumbItem>
              <BreadcrumbLink
                onClick={() => navigate(`/${userId}/my-space`)}
                className="flex items-center gap-2 hover:text-foreground transition-colors cursor-pointer text-2xl"
              >
                <Home className="h-5 w-5" />
                {rootFolder.containerName}
              </BreadcrumbLink>
            </BreadcrumbItem>
          )}

          {visibleItems?.slice(1).map((pathItem, index, array) => (
            <React.Fragment key={pathItem.containerId}>
              {shouldTruncate && index === 0 && (
                <BreadcrumbItem>
                  <BreadcrumbSeparator>
                    <ChevronRight className="h-6 w-6" />
                  </BreadcrumbSeparator>
                  <BreadcrumbEllipsis className="mx-1" />
                </BreadcrumbItem>
              )}
              <BreadcrumbItem>
                <BreadcrumbSeparator>
                  <ChevronRight className="h-6 w-6" />
                </BreadcrumbSeparator>
                <BreadcrumbLink
                  onClick={() =>
                    navigate(`/${userId}/my-space/${pathItem.containerId}`)
                  }
                  className={cn(
                    "hover:text-foreground transition-colors cursor-pointer text-2xl",
                    index === array.length - 1
                      ? "text-foreground font-medium pointer-events-none"
                      : "text-muted-foreground"
                  )}
                >
                  {pathItem.containerName}
                </BreadcrumbLink>
              </BreadcrumbItem>
            </React.Fragment>
          ))}
        </BreadcrumbList>
      </Breadcrumb>

      <ViewModeSwitch viewMode={viewMode} setViewMode={setViewMode} />
    </div>
  );
}
interface ViewModeSwitchProps {
  viewMode: "list" | "grid";
  setViewMode: (mode: "list" | "grid") => void;
}

function ViewModeSwitch({ viewMode, setViewMode }: ViewModeSwitchProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2">
          {viewMode === "grid" ? (
            <Grid className="h-4 w-4" />
          ) : (
            <LayoutList className="h-4 w-4" />
          )}
          <span>{viewMode === "grid" ? "Grid view" : "List view"}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-40">
        <DropdownMenuItem onClick={() => setViewMode("list")}>
          <LayoutList className="mr-2 h-4 w-4" />
          List view
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setViewMode("grid")}>
          <Grid className="mr-2 h-4 w-4" />
          Grid view
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
