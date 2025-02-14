import { FolderIcon } from "lucide-react";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { useAssetsRecentFolder } from "@/hooks/assets/useAssetsRecentFolder";
import { Asset } from "@/types/asset";
import { Skeleton } from "../ui/skeleton";
import { useNavigate, useParams } from "react-router-dom";

interface AssetsRecentFolderProps {
  handleClickedAsset: (asset: Asset) => void;
}

function RecentFolderContent({ handleClickedAsset }: AssetsRecentFolderProps) {
  const { data: folders, isLoading, error } = useAssetsRecentFolder();

  if (isLoading) {
    return (
      <>
        <Skeleton className="h-16 w-full" />
        <Skeleton className="h-16 w-full" />
        <Skeleton className="h-16 w-full" />
      </>
    );
  }

  if (error) {
    return <div>Error loading recent folders</div>;
  }

  if (!folders) {
    return <div>No recent folders found</div>;
  }

  return (
    <>
      {folders.length > 0 &&
        folders.map((folder) => (
          <Card
            key={folder.id}
            className="cursor-pointer hover:bg-accent transition-colors p-4"
            onClick={() => handleClickedAsset(folder)}
          >
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded bg-muted flex items-center justify-center">
                <FolderIcon className="h-6 w-6 text-muted-foreground" />
              </div>
              <div className="space-y-1">
                <h3 className="font-medium text-sm">{folder.name}</h3>
                <p className="text-xs text-muted-foreground">{folder.size}</p>
              </div>
            </div>
          </Card>
        ))}
    </>
  );
}

function AssetsRecentFolder({ handleClickedAsset }: AssetsRecentFolderProps) {
  const navigate = useNavigate();
  const user = useParams();

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Recent Folders</CardTitle>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => navigate(`/${user.userId}/my-space`)}
        >
          View all
        </Button>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-3 gap-4">
          <RecentFolderContent handleClickedAsset={handleClickedAsset} />
        </div>
      </CardContent>
    </Card>
  );
}

export default AssetsRecentFolder;
