import { useLocation, useParams } from "react-router-dom";

interface AssetLocation {
  containerName: string;
  isMySpace: boolean;
  currentFolderId: string;
}

export function useAssetLocation(): AssetLocation {
  const location = useLocation();
  const { userId } = useParams<{ userId: string }>();

  if (!userId) {
    throw new Error("userId is required");
  }

  const isMySpace = location.pathname.includes("my-space");
  const pathSegments = location.pathname.split("/");
  const mySpaceIndex = pathSegments.findIndex(
    (segment) => segment === "my-space"
  );
  const currentFolderId =
    mySpaceIndex !== -1 && pathSegments[mySpaceIndex + 1]
      ? pathSegments[mySpaceIndex + 1]
      : "";

  return {
    containerName:
      isMySpace && currentFolderId ? currentFolderId : `${userId}-root`,
    isMySpace,
    currentFolderId,
  };
}
