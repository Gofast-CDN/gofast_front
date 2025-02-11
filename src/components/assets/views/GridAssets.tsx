import type { Asset, AssetAction } from "@/types/asset";
import { Button } from "@/components/ui/button";
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

interface GridAssetsProps {
  assets: Asset[];
  handleAction: (action: AssetAction, fileId: string) => void;
  setSelectedAsset: (asset: Asset) => void;
}

export default function GridAssets({
  assets,
  handleAction,
  setSelectedAsset,
}: GridAssetsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-6 gap-4">
      {assets.map((asset) => (
        <div
          key={asset.id}
          className="cursor-pointer group relative rounded-lg border p-4 hover:border-accent transition-colors"
          onClick={() => setSelectedAsset(asset)}
        >
          <div className="aspect-square mb-4">
            <img
              src={asset.thumbnail}
              alt={asset.name}
              className="h-full w-full rounded-md object-cover"
            />
          </div>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <FileIcon className="h-4 w-4 text-muted-foreground shrink-0" />
              <span className="font-medium truncate">{asset.name}</span>
            </div>
            <div className="flex items-center justify-between text-sm text-muted-foreground">
              <span>{asset.size}</span>
              <span>{new Date(asset.uploadedAt).toLocaleDateString()}</span>
            </div>
          </div>
          <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <MoreHorizontal className="h-4 w-4" />
                  <span className="sr-only">Actions</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-40">
                <DropdownMenuItem
                  onClick={() => handleAction("share", asset.id)}
                >
                  <Share2 className="mr-2 h-4 w-4" />
                  Share
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => handleAction("download", asset.id)}
                >
                  <Download className="mr-2 h-4 w-4" />
                  Download
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={() => handleAction("delete", asset.id)}
                  className="text-red-600 focus:text-red-600"
                >
                  <Trash2 className="mr-2 h-4 w-4" />
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      ))}
    </div>
  );
}
