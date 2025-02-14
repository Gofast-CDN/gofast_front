import { useLocation, useParams } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";

interface AssetLocation {
  containerId: string;
  isMySpace: boolean;
  currentFolderId: string;
}

export function useAssetLocation(): AssetLocation {
  const location = useLocation();
  const { user } = useAuth();
  const { userId } = useParams<{ userId: string }>();

  if (!userId || !user) {
    throw new Error("User context is required");
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
    containerId:
      isMySpace && currentFolderId ? currentFolderId : user.rootContainerID,
    isMySpace,
    currentFolderId,
  };
}
