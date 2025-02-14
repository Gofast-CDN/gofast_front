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

export function useAssetsRecentFolder() {
  const { containerId } = useAssetLocation();

  return useQuery({
    queryKey: ["assets", "recent", containerId],
    queryFn: async () => {
      const response = await httpClient<APIAsset[]>("/assets/folder/recent", {
        method: "GET",
        protected: true,
      });

      const folders: Asset[] = response
        .filter((folder) => folder.depth !== 0)
        .map((folder) => ({
          id: folder.id,
          name: folder.name,
          size: folder.nbChildren
            ? `${folder.nbChildren} item${folder.nbChildren > 1 ? "s" : ""}`
            : "Empty",
          owner: folder.ownerId,
          uploadedAt: folder.created_at,
          url: folder.url,
          assetType: "folder",
          parentId: folder.parentId,
        }));

      return folders;
    },
  });
}
