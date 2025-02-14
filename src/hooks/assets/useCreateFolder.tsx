import { useMutation, useQueryClient } from "@tanstack/react-query";
import { httpClient } from "@/lib/http-client";
import { useAssetLocation } from "./useAssetLocation";
import { toast } from "@/hooks/use-toast";

interface CreateFolderPayload {
  containerName: string;
  containerId: string;
}

interface CreateFolderResponse {
  id: string;
  containerName: string;
  createdAt: string;
  message: string;
}

export function useCreateFolder() {
  const queryClient = useQueryClient();
  const { containerId } = useAssetLocation();

  const createFolderMutation = useMutation({
    mutationKey: ["createFolder"],
    mutationFn: (containerName: string) => {
      const payload: CreateFolderPayload = {
        containerName,
        containerId,
      };

      return httpClient<CreateFolderResponse>("/assets/folder", {
        method: "POST",
        body: payload,
        protected: true,
      });
    },
    onSuccess: async (data) => {
      // Invalidate specific folder query
      await queryClient.invalidateQueries({
        queryKey: ["assets", containerId],
      });

      // Invalidate all recent folders queries by using partial key match
      await queryClient.invalidateQueries({
        predicate: (query) =>
          query.queryKey[0] === "assets" && query.queryKey[1] === "recent",
      });

      toast({
        title: "Success",
        description: `Folder ${data.containerName} created successfully!`,
      });
    },
    onError: (error: Error) => {
      toast({
        variant: "destructive",
        title: "Failed to create folder",
        description: error.message,
      });
    },
  });

  return { createFolderMutation };
}
