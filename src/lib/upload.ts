import { config } from "./config";
import { getCookie } from "./utils/cookies";

// Types for upload service
interface UploadOptions {
  endpoint?: string;
  headers?: Record<string, string>;
  onProgress?: (progress: number) => void;
  timeout?: number;
}

interface UploadResponse {
  message: string;
}

export class UploadError extends Error {
  constructor(
    message: string,
    public code: string,
    public status?: number
  ) {
    super(message);
    this.name = "UploadError";
  }
}

class UploadService {
  private readonly defaultOptions: Required<UploadOptions> = {
    endpoint: `${config.BASE_URL}/assets`,
    timeout: 30000, // 30 seconds
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${getCookie("token")}`,
    },
    onProgress: () => {},
  };

  private uploadWithProgress(
    formData: FormData,
    options: Required<UploadOptions>
  ): Promise<Response> {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();

      xhr.upload.addEventListener("progress", (event) => {
        if (event.lengthComputable && options.onProgress !== undefined) {
          const progress = (event.loaded / event.total) * 100;
          options.onProgress(progress);
        }
      });

      xhr.addEventListener("load", () => {
        resolve(
          new Response(xhr.response, {
            status: xhr.status,
            statusText: xhr.statusText,
          })
        );
      });

      xhr.addEventListener("error", () => {
        reject(new UploadError("Network error", "NETWORK_ERROR"));
      });

      xhr.addEventListener("timeout", () => {
        reject(new UploadError("Upload timeout", "TIMEOUT_ERROR"));
      });

      xhr.open("POST", options.endpoint);
      xhr.timeout = options.timeout;

      Object.entries(options.headers).forEach(([key, value]) => {
        xhr.setRequestHeader(key, value);
      });

      xhr.send(formData);
    });
  }

  async uploadFile(
    file: File,
    containerName: string,
    userId: string,
    options?: Partial<UploadOptions>
  ): Promise<UploadResponse> {
    const opts: Required<UploadOptions> = {
      ...this.defaultOptions,
      ...options,
    };

    const formData = new FormData();

    // Validate file
    if (!file) {
      throw new UploadError("No file provided", "FILE_REQUIRED");
    }

    // Add file and metadata to FormData
    formData.append("file", file);
    formData.append("containerName", containerName);
    formData.append("blobName", file.name);
    formData.append("id", userId);

    try {
      const response = await this.uploadWithProgress(formData, opts);

      if (!response.ok) {
        throw new UploadError(
          "Upload failed",
          "UPLOAD_FAILED",
          response.status
        );
      }
      const responseData = await response.json();
      return {
        message: responseData.message,
      } as UploadResponse;
    } catch (error) {
      if (error instanceof UploadError) {
        throw error;
      }
      throw new UploadError("Upload failed", "UPLOAD_ERROR", 500);
    }
  }
}

export const uploadService = new UploadService();
