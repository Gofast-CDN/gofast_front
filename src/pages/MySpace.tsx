import { Asset } from "@/types/asset";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Grid, LayoutList } from "lucide-react";
import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import ListAssets from "@/components/assets/views/ListAssets";
import GridAssets from "@/components/assets/views/GridAssets";

const assets: Asset[] = [
  {
    id: "1",
    name: "react-patterns.pdf",
    type: "application/pdf",
    size: "2.4 MB",
    owner: "John Doe",
    uploadedAt: "2024-02-10T14:30:00Z",
    url: "https://storage.gofast.dev/files/react-patterns.pdf",
    thumbnail: "https://placehold.co/40x40",
  },
  {
    id: "2",
    name: "architecture.png",
    type: "image/png",
    size: "856 KB",
    owner: "John Doe",
    uploadedAt: "2024-02-09T10:15:00Z",
    url: "https://storage.gofast.dev/files/architecture.png",
    thumbnail: "https://placehold.co/40x40",
  },
  {
    id: "3",
    name: "api-doc.md",
    type: "text/markdown",
    size: "12 KB",
    owner: "John Doe",
    uploadedAt: "2024-02-08T09:20:00Z",
    url: "https://storage.gofast.dev/files/api-doc.md",
    thumbnail: "https://placehold.co/40x40",
  },
];

export default function MySpace() {
  const [searchTerm, setSearchTerm] = useState("");
  const [viewMode, setViewMode] = useState<"list" | "grid">("list");

  const handleAction = (action: string, fileId: string) => {
    switch (action) {
      case "share":
        console.log("Share functionality to be implemented");
        break;
      case "download":
        console.log("Download functionality to be implemented");
        break;
      case "delete":
        console.log("Delete functionality to be implemented", fileId);
        break;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">My assets</h1>
        <div className="flex items-center gap-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="gap-2">
                {viewMode === "grid" ? (
                  <Grid className="h-4 w-4" />
                ) : (
                  <LayoutList className="h-4 w-4" />
                )}
                <span>{viewMode === "grid" ? "Grid view" : "List view"}</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-40">
              <DropdownMenuItem onClick={() => setViewMode("list")}>
                <LayoutList className="mr-2 h-4 w-4" />
                List view
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setViewMode("grid")}>
                <Grid className="mr-2 h-4 w-4" />
                Grid view
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <div className="flex items-center space-x-2">
        <div className="relative flex-1">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search assets..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-8"
          />
        </div>
      </div>

      {viewMode === "list" ? (
        <ListAssets assets={assets} handleAction={handleAction} />
      ) : (
        <GridAssets assets={assets} handleAction={handleAction} />
      )}
    </div>
  );
}
