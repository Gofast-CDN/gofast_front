import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Upload, File, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

const MAX_FILE_SIZE = 50 * 1024 * 1024; // 50MB
const ACCEPTED_FILE_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "application/pdf",
  "text/plain",
  "text/markdown",
];

interface UploadFileModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (file: File) => Promise<string | void>;
  isUploading?: boolean;
}

export function UploadFileModal({
  isOpen,
  onClose,
  onSubmit,
}: UploadFileModalProps) {
  const { toast } = useToast();
  const [isDragging, setIsDragging] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateFile = (file: File): boolean => {
    if (file.size > MAX_FILE_SIZE) {
      toast({
        title: "Error",
        description: `File size should be less than ${MAX_FILE_SIZE / 1024 / 1024}MB`,
        variant: "destructive",
      });
      return false;
    }

    if (!ACCEPTED_FILE_TYPES.includes(file.type)) {
      toast({
        title: "Error",
        description: "File type not supported",
        variant: "destructive",
      });
      return false;
    }

    return true;
  };

  const handleFileSelect = (file: File) => {
    if (validateFile(file)) {
      setSelectedFile(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedFile) return;

    setIsSubmitting(true);
    try {
      await onSubmit(selectedFile);
      setSelectedFile(null);
      onClose();
      toast({
        title: "Success",
        description: `File ${selectedFile.name} uploaded successfully`,
      });
    } catch {
      toast({
        title: "Error",
        description: "Failed to upload file",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[480px]">
        <DialogHeader>
          <DialogTitle>Upload file</DialogTitle>
          <DialogDescription>Add a file from your device</DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div
            className={cn(
              "flex flex-col items-center gap-4 p-6 border-2 border-dashed rounded-lg transition-colors",
              isDragging && "border-primary bg-primary/5",
              "hover:border-primary hover:bg-primary/5"
            )}
            onDragOver={(e) => {
              e.preventDefault();
              setIsDragging(true);
            }}
            onDragLeave={() => setIsDragging(false)}
            onDrop={(e) => {
              e.preventDefault();
              setIsDragging(false);
              const file = e.dataTransfer.files[0];
              if (file) handleFileSelect(file);
            }}
          >
            <Upload className="h-8 w-8 text-muted-foreground" />
            <Input
              id="file"
              type="file"
              className="hidden"
              accept={ACCEPTED_FILE_TYPES.join(",")}
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) handleFileSelect(file);
              }}
            />
            <Label
              htmlFor="file"
              className="cursor-pointer text-sm text-center text-muted-foreground hover:text-foreground"
            >
              Drag & drop a file here or click to browse
              <p className="mt-1 text-xs">
                Supported files: JPG, PNG, PDF, TXT, MD (max{" "}
                {MAX_FILE_SIZE / 1024 / 1024}MB)
              </p>
            </Label>
            {selectedFile && (
              <div className="w-full flex items-center gap-2 p-2 border rounded-md">
                <File className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm truncate flex-1">
                  {selectedFile.name}
                </span>
                <span className="text-xs text-muted-foreground">
                  {(selectedFile.size / 1024).toFixed(1)} KB
                </span>
              </div>
            )}
          </div>

          <div className="flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting || !selectedFile}>
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Uploading...
                </>
              ) : (
                "Upload"
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
