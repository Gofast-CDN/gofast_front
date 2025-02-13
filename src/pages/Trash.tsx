import { useState } from "react";
import { Input } from "@/components/ui/input";
import type { Asset } from "@/types/asset";
import ListTrashAssets from "@/components/assets/views/ListTrashAssets";
import { toast } from "@/hooks/use-toast";

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

export default function Trash() {
  const [search, setSearch] = useState("");
  const handleAction = (action: string) => {
    switch (action) {
      case "restore":
        toast({
          title: "Asset restored",
          description: "The asset has been restored successfully.",
          variant: "default",
        });
        break;
      case "delete":
        toast({
          title: "Asset deleted",
          description: "The asset has been deleted successfully.",
          variant: "destructive",
        });
        break;
    }
  };

  const filteredAssets = mockFiles.filter((asset) => {
    return (
      asset.name.toLowerCase().includes(search.toLowerCase()) ||
      asset.assetType.toLowerCase().includes(search.toLowerCase())
    );
  });

  return (
    <div className="space-y-6">
      <Input
        placeholder="Search assets..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-1/3"
      />
      <ListTrashAssets
        assets={filteredAssets}
        handleAction={handleAction}
        border={true}
      />
    </div>
  );
}
