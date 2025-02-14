import { useAssetsRecentFiles } from "@/hooks/assets/useAssetsRecentFiles";
import ListAssets from "../assets/views/ListAssets";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Asset, AssetAction } from "@/types/asset";

interface AssetsRecentFilesProps {
  handleClickedAsset: (asset: Asset) => void;
  handleAction: (action: AssetAction, fileId: string) => void;
}

export default function AssetsRecentFiles({
  handleClickedAsset,
  handleAction,
}: AssetsRecentFilesProps) {
  const { data: files, isLoading, error } = useAssetsRecentFiles();

  if (isLoading) {
    return <div>loading...</div>;
  }
  if (error) {
    return <div>error</div>;
  }
  if (!files) {
    return <div>No files found</div>;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Files</CardTitle>
      </CardHeader>
      <CardContent>
        <ListAssets
          assets={files}
          handleAction={handleAction}
          handleClickedAsset={handleClickedAsset}
          mini={true}
          border={false}
        />
      </CardContent>
    </Card>
  );
}
