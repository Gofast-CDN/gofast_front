import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { Asset } from "@/types/asset";
import { useNavigate, useOutletContext, useParams } from "react-router-dom";
import { SpaceContextType } from "@/layouts/SpaceLayout";
import { StoragePieChart } from "@/components/charts/StoragePieChart";
import AssetsRecentFolder from "@/components/home/AssetsRecentFolder";
import AssetsRecentFiles from "@/components/home/AssetsRecentFiles";

export default function Home() {
  const { userId } = useParams();
  const [search, setSearch] = useState("");

  const { setSelectedAsset, handleAction } =
    useOutletContext<SpaceContextType>();

  const navigate = useNavigate();

  const handleClickedAsset = (asset: Asset) => {
    if (asset.assetType === "folder") {
      void navigate(`/${userId}/my-space/${asset.id}`);
      return;
    }
    setSelectedAsset(asset);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <Input
          placeholder="Search assets..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-1/3"
        />
      </div>

      <div className="grid grid-cols-3 gap-6">
        <div className="col-span-2 space-y-6">
          <AssetsRecentFolder handleClickedAsset={handleClickedAsset} />

          <AssetsRecentFiles
            handleClickedAsset={handleClickedAsset}
            handleAction={handleAction}
          />
        </div>

        <Card className="h-fit">
          <CardHeader>
            <CardTitle>Storage Usage</CardTitle>
          </CardHeader>
          <CardContent>
            <StoragePieChart />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
