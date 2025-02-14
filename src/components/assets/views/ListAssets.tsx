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
  FileIcon,
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
import { cn } from "@/lib/utils";
import { thumbnailTypes } from "./thumbnailTypes";

interface ListAssetsProps {
  assets: Asset[];
  handleAction: (action: AssetAction, fileId: string) => void;
  handleClickedAsset: (asset: Asset) => void;
  mini?: boolean;
  border?: boolean;
}

const ListAssets = ({
  assets,
  handleAction,
  handleClickedAsset,
  mini = false,
  border = true,
}: ListAssetsProps) => {
  const sortedAssets = [...assets].sort((a, b) => {
    if (a.assetType === "folder" && b.assetType !== "folder") return -1;
    if (a.assetType !== "folder" && b.assetType === "folder") return 1;
    return a.name.localeCompare(b.name);
  });

  return (
    <div className={cn(border && "border rounded-md")}>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Asset</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Size</TableHead>
            {!mini && <TableHead>Created</TableHead>}
            <TableHead>URL</TableHead>
            <TableHead className="w-[50px]"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sortedAssets.length === 0 && (
            <TableRow>
              <TableCell colSpan={5} className="text-center">
                No assets found
              </TableCell>
            </TableRow>
          )}
          {sortedAssets.length > 0 &&
            sortedAssets.map((asset) => (
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
                    ) : thumbnailTypes.includes(asset.assetType) ? (
                      <img
                        src={asset.thumbnail}
                        alt={asset.name}
                        className="h-10 w-10 rounded object-cover bg-muted"
                      />
                    ) : (
                      <div className="h-10 w-10 rounded bg-muted flex items-center justify-center">
                        <FileIcon className="h-6 w-6 text-muted-foreground" />
                      </div>
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
                {!mini && (
                  <TableCell className="text-muted-foreground">
                    {new Date(asset.uploadedAt).toLocaleDateString()}
                  </TableCell>
                )}
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
