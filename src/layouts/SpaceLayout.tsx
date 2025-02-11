import { Asset } from "@/types/asset";
import { Button } from "@/components/ui/button";
import { ChevronRight, Grid, LayoutList } from "lucide-react";
import { useEffect, useState } from "react";
import { ContextMenu, ContextMenuTrigger } from "@/components/ui/context-menu";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Link, Outlet, useParams } from "react-router-dom";
import AssetsContextMenuAction from "@/components/assets/AssetsContextMenuAction";
import { CreateFolderModal } from "@/components/assets/CreateFolderModal";
import AssetDetailsDialog from "@/components/assets/AssetDetailsDialog";
import { cn } from "@/lib/utils";

const VIEW_MODE_KEY = "gofast_view_mode_preference";

const assets: Asset[] = [
  // Root level folders
  {
    id: "1",
    name: "Documents",
    size: "9 KB",
    owner: "John Doe",
    uploadedAt: "2024-02-10T14:30:00Z",
    assetType: "folder",
  },
  {
    id: "2",
    name: "Images",
    size: "13 MB",
    owner: "John Doe",
    uploadedAt: "2024-02-10T14:30:00Z",
    assetType: "folder",
  },
  // Root level files
  {
    id: "3",
    name: "react-patterns.pdf",
    size: "2.4 MB",
    owner: "John Doe",
    uploadedAt: "2024-02-10T14:30:00Z",
    url: "https://storage.gofast.dev/files/react-patterns.pdf",
    thumbnail: "https://placehold.co/40x40",
    assetType: "application/pdf",
  },
  // Files in Documents folder (parentId: "1")
  {
    id: "4",
    name: "project-specs.pdf",
    size: "1.2 MB",
    owner: "John Doe",
    uploadedAt: "2024-02-09T10:15:00Z",
    url: "https://storage.gofast.dev/files/project-specs.pdf",
    thumbnail: "https://placehold.co/40x40",
    assetType: "application/pdf",
    parentId: "1",
  },
  {
    id: "5",
    name: "meeting-notes.md",
    size: "12 KB",
    owner: "John Doe",
    uploadedAt: "2024-02-08T09:20:00Z",
    url: "https://storage.gofast.dev/files/meeting-notes.md",
    thumbnail: "https://placehold.co/40x40",
    assetType: "text/markdown",
    parentId: "1",
  },
  // Files in Images folder (parentId: "2")
  {
    id: "6",
    name: "architecture.png",
    size: "856 KB",
    owner: "John Doe",
    uploadedAt: "2024-02-09T10:15:00Z",
    url: "https://storage.gofast.dev/files/architecture.png",
    thumbnail: "https://placehold.co/40x40",
    assetType: "image/png",
    parentId: "2",
  },
  {
    id: "7",
    name: "dashboard-mockup.png",
    size: "1.2 MB",
    owner: "John Doe",
    uploadedAt: "2024-02-08T09:20:00Z",
    url: "https://storage.gofast.dev/files/dashboard-mockup.png",
    thumbnail: "https://placehold.co/40x40",
    assetType: "image/png",
    parentId: "2",
  },
];

export interface SpaceContextType {
  viewMode: "list" | "grid";
  currentAssets: Asset[];
  setSelectedAsset: (asset: Asset | null) => void;
  handleAction: (action: string, fileId: string) => void;
}

const SpaceLayout = () => {
  const { id: folderId } = useParams();
  const [selectedAsset, setSelectedAsset] = useState<Asset | null>(null);
  const [isCreateFolderModalOpen, setIsCreateFolderModalOpen] = useState(false);
  const [viewMode, setViewMode] = useState<"list" | "grid">(() => {
    const savedMode = localStorage.getItem(VIEW_MODE_KEY);
    return savedMode === "list" || savedMode === "grid" ? savedMode : "list";
  });

  // Filter assets based on current folder
  const currentAssets = assets.filter((asset) => {
    if (!folderId) {
      return !asset.parentId;
    }
    return asset.parentId === folderId;
  });

  const handleAction = (action: string, fileId: string) => {
    switch (action) {
      case "share":
        console.log("Share functionality to be implemented");
        break;
      case "download":
        console.log("Download functionality to be implemented");
        break;
      case "delete":
        console.log("Delete functionality to be implemented", fileId);
        break;
    }
  };

  useEffect(() => {
    localStorage.setItem(VIEW_MODE_KEY, viewMode);
  }, [viewMode]);

  return (
    <ContextMenu>
      <ContextMenuTrigger className="flex flex-1">
        <div className="space-y-6 w-full min-h-[calc(100vh-6rem)]">
          <SpaceHeader
            viewMode={viewMode}
            setViewMode={setViewMode}
            folderId={folderId}
          />

          <Outlet
            context={{
              viewMode,
              currentAssets,
              setSelectedAsset,
              handleAction,
            }}
          />
        </div>
      </ContextMenuTrigger>

      <AssetsContextMenuAction
        setIsCreateFolderModalOpen={setIsCreateFolderModalOpen}
      />
      <AssetDetailsDialog
        selectedAsset={selectedAsset}
        onClose={() => setSelectedAsset(null)}
      />
      <CreateFolderModal
        isOpen={isCreateFolderModalOpen}
        onClose={() => setIsCreateFolderModalOpen(false)}
        onSubmit={async (name) => {
          console.log("Creating folder:", name);
          await new Promise((resolve) => setTimeout(resolve, 1000));
        }}
      />
    </ContextMenu>
  );
};

function SpaceHeader({
  viewMode,
  setViewMode,
  folderId,
}: {
  viewMode: "list" | "grid";
  setViewMode: (mode: "list" | "grid") => void;
  folderId?: string;
}) {
  const currentFolder = assets.find((a) => a.id === folderId);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-2xl">
          <Link
            to="/dashboard/my-space"
            className={cn(
              "hover:text-foreground transition-colors",
              !folderId ? "font-bold pointer-events-none" : "font-normal"
            )}
          >
            Home
          </Link>
          {folderId && (
            <>
              <ChevronRight className="h-6 w-6 text-muted-foreground" />
              <span className="font-bold text-foreground">
                {currentFolder?.name || folderId}
              </span>
            </>
          )}
        </div>

        <div className="flex items-center gap-4">
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
        </div>
      </div>
    </div>
  );
}

export default SpaceLayout;
