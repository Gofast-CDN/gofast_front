import { useMutation, useQueryClient } from "@tanstack/react-query";
import { uploadService, UploadError } from "@/lib/upload";
import { useToast } from "@/hooks/use-toast";
import { useAssetLocation } from "./useAssetLocation";

interface UseFileUploadOptions {
  onSuccess?: () => void;
  onError?: (error: Error) => void;
}

export function useFileUpload(options: UseFileUploadOptions = {}) {
  const { containerId } = useAssetLocation();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const uploadMutation = useMutation({
    mutationFn: async (file: File) => {
      return await uploadService.uploadFile(file, containerId, {
        onProgress: (progress) => {
          console.log(`Upload progress: ${progress}%`);
        },
      });
    },
    onSuccess: async (data) => {
      toast({
        title: "Success",
        description: data.message,
      });

      // Invalidate specific folder query
      await queryClient.invalidateQueries({
        queryKey: ["assets", containerId],
      });

      // Invalidate only recent files query
      await queryClient.invalidateQueries({
        queryKey: ["assets", "recent-files"],
      });

      options.onSuccess?.();
    },
    onError: (error: Error) => {
      const message =
        error instanceof UploadError
          ? error.message
          : "An unexpected error occurred";

      toast({
        title: "Upload Error",
        description: message,
        variant: "destructive",
      });

      options.onError?.(error);
    },
  });

  return {
    upload: async (file: File | string) => {
      if (typeof file === "string") {
        toast({
          title: "URL Upload",
          description: "URL upload not implemented yet",
        });
        return;
      }
      await uploadMutation.mutateAsync(file);
    },
    isUploading: uploadMutation.isPending,
  };
}
