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
}
export type AssetAction = "share" | "download" | "delete";
export type TrashAssetAction = "restore" | "delete";
