import type { Asset, AssetAction } from "@/types/asset";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
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
import { Separator } from "@/components/ui/separator";
import { thumbnailTypes } from "./thumbnailTypes";

interface GridAssetsProps {
  assets: Asset[];
  handleAction: (action: AssetAction, fileId: string) => void;
  handleClickedAsset: (asset: Asset) => void;
}

export default function GridAssets({
  assets,
  handleAction,
  handleClickedAsset,
}: GridAssetsProps) {
  const folders = assets.filter((asset) => asset.assetType === "folder");
  const files = assets.filter((asset) => asset.assetType !== "folder");
  console.log(files);

  return (
    <div className="space-y-8">
      {folders.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <h2 className="text-lg font-semibold">Folders</h2>
            <Separator className="flex-1" />
            <span className="text-muted-foreground text-sm">
              {folders.length} folder{folders.length !== 1 ? "s" : ""}
            </span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {folders.map((folder) => (
              <Card
                key={folder.id}
                className="cursor-pointer group h-32 hover:border-accent transition-colors"
                onClick={() => handleClickedAsset(folder)}
              >
                <CardContent className="p-4 h-full flex flex-col justify-between">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded bg-muted flex items-center justify-center shrink-0">
                      <FolderIcon className="h-6 w-6 text-muted-foreground" />
                    </div>
                    <span className="font-medium truncate">{folder.name}</span>
                  </div>
                  <div className="text-sm text-muted-foreground">3 items</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {files.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <h2 className="text-lg font-semibold">Files</h2>
            <Separator className="flex-1" />
            <span className="text-muted-foreground text-sm">
              {files.length} file{files.length !== 1 ? "s" : ""}
            </span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {files.map((file) => (
              <Card
                key={file.id}
                className="cursor-pointer group hover:border-accent transition-colors overflow-hidden"
                onClick={() => handleClickedAsset(file)}
              >
                <div className="aspect-video w-full relative">
                  {thumbnailTypes.includes(file.assetType) ? (
                    <img
                      src={file.thumbnail}
                      alt={file.name}
                      className="absolute inset-0 h-full w-full object-cover"
                    />
                  ) : (
                    <div className="absolute inset-0 h-full w-full bg-gray-300 flex items-center justify-center">
                      <FileIcon className="h-20 w-20 text-muted-foreground" />
                    </div>
                  )}
                  <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="secondary"
                          size="icon"
                          className="h-8 w-8 bg-background/80 backdrop-blur-sm"
                        >
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Actions</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-40">
                        <DropdownMenuItem
                          onClick={(e) => {
                            e.stopPropagation();
                            handleAction("share", file.id);
                          }}
                        >
                          <Share2 className="mr-2 h-4 w-4" />
                          Share
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={(e) => {
                            e.stopPropagation();
                            handleAction("download", file.id);
                          }}
                        >
                          <Download className="mr-2 h-4 w-4" />
                          Download
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          onClick={(e) => {
                            e.stopPropagation();
                            handleAction("delete", file.id);
                          }}
                          className="text-red-600 focus:text-red-600"
                        >
                          <Trash2 className="mr-2 h-4 w-4" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
                <CardContent className="p-4">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 mb-4">
                      <FileIcon className="h-4 w-4 text-muted-foreground shrink-0" />
                      <span className="font-medium truncate">{file.name}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <span>{file.size}</span>
                      <span>
                        {new Date(file.uploadedAt).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
