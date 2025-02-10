export interface Asset {
  id: string;
  name: string;
  type: string;
  size: string;
  owner: string;
  uploadedAt: string;
  url: string;
  thumbnail: string;
}

export type AssetAction = "share" | "download" | "delete";
