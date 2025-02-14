import { useQuery } from "@tanstack/react-query";
import { httpClient } from "@/lib/http-client";
import { Asset } from "@/types/asset";
import { useAssetLocation } from "./useAssetLocation";

interface APIAsset {
  id: string;
  created_at: string;
  updated_at: string;
  name: string;
  type: "file" | "folder";
  ownerId: string;
  size: number;
  url: string;
  path: string;
  parentId?: string;
  childs?: APIAsset[];
  nbChildren?: number;
  depth: number;
}

export function useAssetsRecentFiles() {
  const { containerId } = useAssetLocation();

  return useQuery({
    queryKey: ["assets", "recent-files", containerId],
    queryFn: async () => {
      const response = await httpClient<APIAsset[]>("/assets/recent", {
        method: "GET",
        protected: true,
      });

      const files: Asset[] = response
        .filter((asset) => asset.type === "file")
        .map((file) => ({
          id: file.id,
          name: file.name,
          size: `${Math.round(file.size / 1024)} KB`,
          owner: file.ownerId,
          uploadedAt: file.created_at,
          url: file.url,
          assetType: file.type,
          parentId: file.parentId,
        }));

      return files;
    },
  });
}
