interface PathInfo {
  containerId: string;
  containerName: string;
}

export interface Asset {
  id: string;
  name: string;
  size: string;
  owner: string;
  uploadedAt: string;
  url?: string;
  thumbnail?: string;
  assetType: string;
  parentId?: string;
  path?: string;
  depth?: number;
  pathInfo?: PathInfo[];
}

export type AssetAction = "share" | "download" | "delete";
export type TrashAssetAction = "restore" | "delete";
