import { useOutletContext, useParams } from "react-router-dom";
import type { SpaceContextType } from "@/layouts/SpaceLayout";
import ListAssets from "@/components/assets/views/ListAssets";
import GridAssets from "@/components/assets/views/GridAssets";
import { useNavigate } from "react-router-dom";
import { Asset } from "@/types/asset";
import { useAssetsQuery } from "@/hooks/assets/useAssetsQuery";
import { Skeleton } from "@/components/ui/skeleton";

export default function MySpace() {
  const navigate = useNavigate();
  const { userId } = useParams();
  const { viewMode, setSelectedAsset, handleAction } =
    useOutletContext<SpaceContextType>();

  const { data, isLoading, error } = useAssetsQuery();

  const handleClickedAsset = (asset: Asset) => {
    if (asset.assetType === "folder") {
      void navigate(`/${userId}/my-space/${asset.id}`);
      return;
    }
    setSelectedAsset(asset);
  };

  if (isLoading) {
    return (
      <>
        <Skeleton className="h-16 w-full" />
      </>
    );
  }

  if (error) {
    return <div>Error loading assets</div>;
  }

  if (!data) {
    return <div>No assets found</div>;
  }

  if (viewMode === "list") {
    return (
      <ListAssets
        assets={data.assets}
        handleAction={handleAction}
        handleClickedAsset={handleClickedAsset}
      />
    );
  }

  return (
    <GridAssets
      assets={data.assets}
      handleAction={handleAction}
      handleClickedAsset={handleClickedAsset}
    />
  );
}
