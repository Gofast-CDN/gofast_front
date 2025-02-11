import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Download,
  FolderIcon,
  MoreHorizontal,
  Share2,
  Trash2,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DropdownMenuSeparator } from "@radix-ui/react-dropdown-menu";
import type { Asset, AssetAction } from "@/types/asset";
import { useNavigate } from "react-router-dom";

interface ListAssetsProps {
  assets: Asset[];
  handleAction: (action: AssetAction, fileId: string) => void;
  setSelectedAsset: (asset: Asset) => void;
}

const ListAssets = ({
  assets,
  handleAction,
  setSelectedAsset,
}: ListAssetsProps) => {
  const navigate = useNavigate();
  const sortedAssets = [...assets].sort((a, b) => {
    if (a.assetType === "folder" && b.assetType !== "folder") return -1;
    if (a.assetType !== "folder" && b.assetType === "folder") return 1;
    return a.name.localeCompare(b.name);
  });

  const handleClickedAsset = (asset: Asset) => {
    if (asset.assetType === "folder") {
      void navigate(`/dashboard/my-space/${asset.id}`);
    }
    setSelectedAsset(asset);
  };

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Asset</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Size</TableHead>
            <TableHead>Created</TableHead>
            <TableHead>URL</TableHead>
            <TableHead className="w-[50px]"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sortedAssets.map((asset) => (
            <TableRow
              key={asset.id}
              className="cursor-pointer"
              onClick={() => handleClickedAsset(asset)}
            >
              <TableCell>
                <div className="flex items-center gap-4">
                  {asset.assetType === "folder" ? (
                    <div className="h-10 w-10 rounded bg-muted flex items-center justify-center">
                      <FolderIcon className="h-6 w-6 text-muted-foreground" />
                    </div>
                  ) : (
                    <img
                      src={asset.thumbnail}
                      alt={asset.name}
                      className="h-10 w-10 rounded object-cover bg-muted"
                    />
                  )}
                  <span className="font-medium">{asset.name}</span>
                </div>
              </TableCell>
              <TableCell className="text-muted-foreground">
                {asset.assetType}
              </TableCell>
              <TableCell className="text-muted-foreground">
                {asset.size}
              </TableCell>
              <TableCell className="text-muted-foreground">
                {new Date(asset.uploadedAt).toLocaleDateString()}
              </TableCell>
              <TableCell className="max-w-[200px]">
                {asset.assetType === "folder" ? (
                  "-"
                ) : (
                  <a
                    href={asset.url}
                    className="text-blue-600 hover:underline truncate block"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {asset.url}
                  </a>
                )}
              </TableCell>
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="hover:bg-muted"
                    >
                      <MoreHorizontal className="h-4 w-4" />
                      <span className="sr-only">Actions</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-40">
                    <DropdownMenuItem
                      onClick={(e) => {
                        e.stopPropagation();
                        handleAction("share", asset.id);
                      }}
                    >
                      <Share2 className="mr-2 h-4 w-4" />
                      Share
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={(e) => {
                        e.stopPropagation();
                        handleAction("download", asset.id);
                      }}
                    >
                      <Download className="mr-2 h-4 w-4" />
                      Download
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      onClick={(e) => {
                        e.stopPropagation();
                        handleAction("delete", asset.id);
                      }}
                      className="text-red-600 focus:text-red-600"
                    >
                      <Trash2 className="mr-2 h-4 w-4" />
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default ListAssets;
