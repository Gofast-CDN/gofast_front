import { Asset } from "@/types/asset";
import { Button } from "@/components/ui/button";
import { Grid, LayoutList } from "lucide-react";
import { useEffect, useState } from "react";
import { ContextMenu, ContextMenuTrigger } from "@/components/ui/context-menu";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import ListAssets from "@/components/assets/views/ListAssets";
import GridAssets from "@/components/assets/views/GridAssets";
import AssetDetailsDialog from "@/components/assets/AssetDetailsDialog";
import AssetsContextMenuAction from "@/components/assets/AssetsContextMenuAction";
import { CreateFolderModal } from "@/components/assets/CreateFolderModal";

const assets: Asset[] = [
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
  {
    id: "4",
    name: "architecture.png",
    size: "856 KB",
    owner: "John Doe",
    uploadedAt: "2024-02-09T10:15:00Z",
    url: "https://storage.gofast.dev/files/architecture.png",
    thumbnail: "https://placehold.co/40x40",
    assetType: "image/png",
  },
  {
    id: "5",
    name: "api-doc.md",
    size: "12 KB",
    owner: "John Doe",
    uploadedAt: "2024-02-08T09:20:00Z",
    url: "https://storage.gofast.dev/files/api-doc.md",
    thumbnail: "https://placehold.co/40x40",
    assetType: "image/png",
  },
];

const VIEW_MODE_KEY = "gofast_view_mode_preference";

export default function MySpace() {
  const [selectedAsset, setSelectedAsset] = useState<Asset | null>(null);
  const [isCreateFolderModalOpen, setIsCreateFolderModalOpen] = useState(false);

  // const [searchTerm, setSearchTerm] = useState("");
  const [viewMode, setViewMode] = useState<"list" | "grid">(() => {
    const savedMode = localStorage.getItem(VIEW_MODE_KEY);
    return savedMode === "list" || savedMode === "grid" ? savedMode : "list";
  });

  useEffect(() => {
    localStorage.setItem(VIEW_MODE_KEY, viewMode);
  }, [viewMode]);

  const handleCreateFolder = async (name: string) => {
    // Here you would normally make an API call to create the folder
    console.log("Creating folder:", name);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
  };

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

  return (
    <ContextMenu>
      <ContextMenuTrigger className="flex flex-1">
        <div className="space-y-6 w-full min-h-[calc(100vh-6rem)]">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold">
              Showing 4 folders and 349 files
            </h1>
            <div className="flex items-center gap-4">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm" className="gap-2">
                    {viewMode === "grid" ? (
                      <Grid className="h-4 w-4" />
                    ) : (
                      <LayoutList className="h-4 w-4" />
                    )}
                    <span>
                      {viewMode === "grid" ? "Grid view" : "List view"}
                    </span>
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

          {/* <div className="flex items-center space-x-2">
          <div className="relative flex-1">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search assets..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-8"
            />
          </div>
        </div> */}

          {viewMode === "list" ? (
            <ListAssets
              assets={assets}
              handleAction={handleAction}
              setSelectedAsset={setSelectedAsset}
            />
          ) : (
            <GridAssets
              assets={assets}
              handleAction={handleAction}
              setSelectedAsset={setSelectedAsset}
            />
          )}
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
        onSubmit={handleCreateFolder}
      />
    </ContextMenu>
  );
}
