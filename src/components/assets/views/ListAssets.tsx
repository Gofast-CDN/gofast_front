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
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>File</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Size</TableHead>
            <TableHead>Uploaded</TableHead>
            <TableHead>URL</TableHead>
            <TableHead className="w-[50px]"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {assets.map((asset) => (
            <TableRow
              key={asset.id}
              className="cursor-pointer"
              onClick={() => setSelectedAsset(asset)}
            >
              <TableCell>
                <div className="flex items-center gap-4">
                  <img
                    src={asset.thumbnail}
                    alt={asset.name}
                    className="h-10 w-10 rounded object-cover bg-muted"
                  />
                  <div className="flex items-center gap-2">
                    <FileIcon className="h-4 w-4 text-muted-foreground shrink-0" />
                    <span className="font-medium">{asset.name}</span>
                  </div>
                </div>
              </TableCell>
              <TableCell className="text-muted-foreground">
                {asset.type}
              </TableCell>
              <TableCell className="text-muted-foreground">
                {asset.size}
              </TableCell>
              <TableCell className="text-muted-foreground">
                {new Date(asset.uploadedAt).toLocaleDateString()}
              </TableCell>
              <TableCell className="max-w-[200px]">
                <a
                  href={asset.url}
                  className="text-blue-600 hover:underline truncate block"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {asset.url}
                </a>
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
