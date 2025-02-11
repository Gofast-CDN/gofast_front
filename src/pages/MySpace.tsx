import { useOutletContext } from "react-router-dom";
import type { SpaceContextType } from "@/layouts/SpaceLayout";
import ListAssets from "@/components/assets/views/ListAssets";
import GridAssets from "@/components/assets/views/GridAssets";

export default function MySpace() {
  const { viewMode, currentAssets, setSelectedAsset, handleAction } =
    useOutletContext<SpaceContextType>();

  if (viewMode === "list") {
    return (
      <ListAssets
        assets={currentAssets}
        handleAction={handleAction}
        setSelectedAsset={setSelectedAsset}
      />
    );
  }

  return (
    <GridAssets
      assets={currentAssets}
      handleAction={handleAction}
      setSelectedAsset={setSelectedAsset}
    />
  );
}
