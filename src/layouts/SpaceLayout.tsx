import { Asset } from "@/types/asset";
import { useState } from "react";
import { ContextMenu, ContextMenuTrigger } from "@/components/ui/context-menu";
import { Outlet } from "react-router-dom";
import AssetsContextMenuAction from "@/components/assets/AssetsContextMenuAction";
import { CreateFolderModal } from "@/components/assets/CreateFolderModal";
import AssetDetailsDialog from "@/components/assets/AssetDetailsDialog";

export interface SpaceContextType {
  setSelectedAsset: (asset: Asset | null) => void;
  handleAction: (action: string, fileId: string) => void;
}

const SpaceLayout = () => {
  const [selectedAsset, setSelectedAsset] = useState<Asset | null>(null);
  const [isCreateFolderModalOpen, setIsCreateFolderModalOpen] = useState(false);

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
          <Outlet
            context={{
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
      />
    </ContextMenu>
  );
};

export default SpaceLayout;
