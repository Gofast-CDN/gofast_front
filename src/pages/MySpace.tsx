import { useOutletContext, useParams } from "react-router-dom";
import type { SpaceContextType } from "@/layouts/SpaceLayout";
import ListAssets from "@/components/assets/views/ListAssets";
import GridAssets from "@/components/assets/views/GridAssets";
import { useNavigate } from "react-router-dom";
import { Asset } from "@/types/asset";
import { useAssetsQuery } from "@/hooks/assets/useAssetsQuery";
import { Skeleton } from "@/components/ui/skeleton";
import SpaceHeader from "@/components/sections/SectionHeader";
import { useEffect, useState } from "react";

export default function MySpace() {
  const navigate = useNavigate();
  const { userId } = useParams();
  const { setSelectedAsset, handleAction } =
    useOutletContext<SpaceContextType>();
  const { data, isLoading, error } = useAssetsQuery();
  const [viewMode, setViewMode] = useState<"list" | "grid">(() => {
    const savedMode = localStorage.getItem("gofast_view_mode_preference");
    return savedMode === "list" || savedMode === "grid" ? savedMode : "list";
  });

  useEffect(() => {
    localStorage.setItem("gofast_view_mode_preference", viewMode);
  }, [viewMode]);

  const handleClickedAsset = (asset: Asset) => {
    if (asset.assetType === "folder") {
      void navigate(`/${userId}/my-space/${asset.id}`);
      return;
    }
    setSelectedAsset(asset);
  };

  if (isLoading) return <Skeleton className="h-16 w-full" />;
  if (error) return <div>Error loading assets</div>;
  if (!data) return <div>No assets found</div>;

  const Content = viewMode === "list" ? ListAssets : GridAssets;

  return (
    <div className="space-y-6">
      <SpaceHeader
        userId={userId!}
        pathInfo={data.rootFolder?.pathInfo}
        viewMode={viewMode}
        setViewMode={setViewMode}
      />
      <Content
        assets={data.assets}
        handleAction={handleAction}
        handleClickedAsset={handleClickedAsset}
      />
    </div>
  );
}
