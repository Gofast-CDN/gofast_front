import { useState } from "react";
import { uploadService, UploadError } from "@/lib/upload";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "./auth/AuthContext";
import { useAssetLocation } from "./useAssetLocation";

interface UseFileUploadOptions {
  onSuccess?: (url: string) => void;
  onError?: (error: Error) => void;
}

export function useFileUpload(options: UseFileUploadOptions = {}) {
  const [isUploading, setIsUploading] = useState(false);
  const { user } = useAuth();
  const { containerName } = useAssetLocation();
  const { toast } = useToast();

  if (!user) {
    throw new Error("User is required");
  }

  const upload = async (file: File | string) => {
    if (typeof file === "string") {
      toast({
        title: "URL Upload",
        description: "URL upload not implemented yet",
      });
      return;
    }

    setIsUploading(true);
    try {
      const result = await uploadService.uploadFile(
        file,
        containerName,
        user.id,
        {
          onProgress: (progress) => {
            console.log(`Upload progress: ${progress}%`);
          },
        }
      );

      toast({
        title: "Success",
        description: result.message,
      });
    } catch (error) {
      const message =
        error instanceof UploadError
          ? error.message
          : "An unexpected error occurred";

      toast({
        title: "Upload Error",
        description: message,
        variant: "destructive",
      });

      options.onError?.(error as Error);
      throw error;
    } finally {
      setIsUploading(false);
    }
  };

  return {
    upload,
    isUploading,
  };
}
