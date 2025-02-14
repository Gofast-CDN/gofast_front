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
}

const mapAPIAssetToAsset = (apiAsset: APIAsset): Asset => ({
  id: apiAsset.id,
  name: apiAsset.name,
  size: `${(apiAsset.size / 1024).toFixed(1)} KB`,
  owner: apiAsset.ownerId,
  uploadedAt: apiAsset.created_at,
  url: apiAsset.url,
  thumbnail: apiAsset.type === "file" ? apiAsset.url : undefined,
  assetType:
    apiAsset.type === "folder"
      ? "folder"
      : (apiAsset.name.split(".").pop() ?? "unknown"),
  parentId: apiAsset.parentId,
});

export function useAssetsQuery() {
  const { currentFolderId, containerName } = useAssetLocation();

  return useQuery({
    queryKey: ["assets", containerName],
    queryFn: async () => {
      const endpoint = currentFolderId
        ? `/assets/${currentFolderId}`
        : "/assets";
      const response = await httpClient<APIAsset>(endpoint, {
        method: "GET",
        protected: true,
      });

      // Map root folder
      const rootFolder = mapAPIAssetToAsset(response);

      // Map children only
      const assets: Asset[] = response.childs
        ? response.childs.map((child) => mapAPIAssetToAsset(child))
        : [];

      return {
        rootFolder,
        assets,
        totalCount: assets.length,
      };
    },
  });
}
