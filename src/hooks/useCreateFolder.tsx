import { useMutation, useQueryClient } from "@tanstack/react-query";
import { httpClient } from "@/lib/http-client";
import { useAuth } from "./auth/AuthContext";
import { useAssetLocation } from "./useAssetLocation";
import { toast } from "@/hooks/use-toast";

interface CreateFolderPayload {
  name: string;
  containerName: string;
  userId: string;
}

interface CreateFolderResponse {
  id: string;
  name: string;
  createdAt: string;
  message: string;
}

export function useCreateFolder() {
  const queryClient = useQueryClient();
  const { user } = useAuth();
  const { containerName } = useAssetLocation();

  const createFolderMutation = useMutation({
    mutationKey: ["createFolder"],
    mutationFn: (name: string) => {
      if (!user) {
        throw new Error("User is required");
      }

      const payload: CreateFolderPayload = {
        name,
        containerName,
        userId: user.id,
      };

      return httpClient<CreateFolderResponse>("/assets/folder", {
        method: "POST",
        body: payload,
        protected: true,
      });
    },
    onSuccess: async (data) => {
      await queryClient.invalidateQueries({
        queryKey: ["assets", containerName],
      });

      toast({
        title: "Success",
        description: `Folder ${data.name} created successfully!`,
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
