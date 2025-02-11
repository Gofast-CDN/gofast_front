import { useOutletContext } from "react-router-dom";
import type { SpaceContextType } from "@/layouts/SpaceLayout";
import ListAssets from "@/components/assets/views/ListAssets";
import GridAssets from "@/components/assets/views/GridAssets";
import { useNavigate } from "react-router-dom";
import { Asset } from "@/types/asset";

export default function MySpace() {
  const navigate = useNavigate();
  const { viewMode, currentAssets, setSelectedAsset, handleAction } =
    useOutletContext<SpaceContextType>();

  const handleClickedAsset = (asset: Asset) => {
    if (asset.assetType === "folder") {
      void navigate(`/dashboard/my-space/${asset.id}`);
      return;
    }
    setSelectedAsset(asset);
  };

  if (viewMode === "list") {
    return (
      <ListAssets
        assets={currentAssets}
        handleAction={handleAction}
        handleClickedAsset={handleClickedAsset}
      />
    );
  }

  return (
    <GridAssets
      assets={currentAssets}
      handleAction={handleAction}
      handleClickedAsset={handleClickedAsset}
    />
  );
}
