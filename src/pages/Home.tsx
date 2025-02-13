import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import ListAssets from "@/components/assets/views/ListAssets";
import type { Asset } from "@/types/asset";
import { FolderIcon } from "lucide-react";
import { useNavigate, useOutletContext, useParams } from "react-router-dom";
import { SpaceContextType } from "@/layouts/SpaceLayout";
import { StoragePieChart } from "@/components/charts/StoragePieChart";

const mockFolders: Asset[] = [
  {
    id: "1",
    name: "Documents",
    size: "9 KB",
    owner: "John Doe",
    uploadedAt: "2024-02-10T14:30:00Z",
    assetType: "folder",
  },
  {
    id: "2",
    name: "Images",
    size: "15 MB",
    owner: "John Doe",
    uploadedAt: "2024-02-09T14:30:00Z",
    assetType: "folder",
  },
  {
    id: "3",
    name: "Projects",
    size: "24 MB",
    owner: "John Doe",
    uploadedAt: "2024-02-08T14:30:00Z",
    assetType: "folder",
  },
];

const mockFiles: Asset[] = [
  {
    id: "4",
    name: "Project Report.pdf",
    size: "2.5 MB",
    owner: "John Doe",
    uploadedAt: "2024-02-15T10:00:00Z",
    url: "https://example.com/report.pdf",
    thumbnail: "https://placehold.co/40x40",
    assetType: "application/pdf",
  },
  {
    id: "5",
    name: "Architecture Diagram.png",
    size: "1.8 MB",
    owner: "John Doe",
    uploadedAt: "2024-02-14T15:30:00Z",
    url: "https://example.com/architecture.png",
    thumbnail: "https://placehold.co/40x40",
    assetType: "image/png",
  },
  {
    id: "6",
    name: "Meeting Notes.docx",
    size: "500 KB",
    owner: "Jane Smith",
    uploadedAt: "2024-02-13T09:15:00Z",
    url: "https://example.com/notes.docx",
    thumbnail: "https://placehold.co/40x40",
    assetType: "application/msword",
  },
  {
    id: "7",
    name: "Presentation.pptx",
    size: "4.2 MB",
    owner: "John Doe",
    uploadedAt: "2024-02-12T16:45:00Z",
    url: "https://example.com/presentation.pptx",
    thumbnail: "https://placehold.co/40x40",
    assetType: "application/vnd.ms-powerpoint",
  },
  {
    id: "8",
    name: "Budget 2024.xlsx",
    size: "1.1 MB",
    owner: "Jane Smith",
    uploadedAt: "2024-02-11T11:20:00Z",
    url: "https://example.com/budget.xlsx",
    thumbnail: "https://placehold.co/40x40",
    assetType: "application/vnd.ms-excel",
  },
  {
    id: "9",
    name: "Product Demo.mp4",
    size: "28.5 MB",
    owner: "John Doe",
    uploadedAt: "2024-02-10T14:00:00Z",
    url: "https://example.com/demo.mp4",
    thumbnail: "https://placehold.co/40x40",
    assetType: "video/mp4",
  },
];

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
        <div className="space-x-2">
          <Button variant="default">New Folder</Button>
          <Button variant="default">Upload</Button>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-6">
        <div className="col-span-2 space-y-6">
          {/* Recent Folders Grid */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Recent Folders</CardTitle>
              <Button variant="ghost" size="sm">
                View all
              </Button>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-3 gap-4">
                {mockFolders.map((folder) => (
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
                        <p className="text-xs text-muted-foreground">
                          {folder.size}
                        </p>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Recent Files List */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Files</CardTitle>
            </CardHeader>
            <CardContent>
              <ListAssets
                assets={mockFiles}
                handleAction={handleAction}
                handleClickedAsset={handleClickedAsset}
                mini={true}
                border={false}
              />
            </CardContent>
          </Card>
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
