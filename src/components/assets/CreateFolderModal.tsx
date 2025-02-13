import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FolderIcon } from "lucide-react";
import { useCreateFolder } from "@/hooks/useCreateFolder";

const createFolderSchema = z.object({
  name: z
    .string()
    .min(1, "Folder name is required")
    .max(50, "Folder name must be less than 50 characters")
    .refine((name) => !name.includes("/"), "Folder name cannot contain '/'"),
});

type CreateFolderForm = z.infer<typeof createFolderSchema>;

interface CreateFolderModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CreateFolderModal({ isOpen, onClose }: CreateFolderModalProps) {
  const { createFolderMutation } = useCreateFolder();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<CreateFolderForm>({
    resolver: zodResolver(createFolderSchema),
    defaultValues: {
      name: "",
    },
  });

  const onSubmitForm = async (data: CreateFolderForm) => {
    try {
      await createFolderMutation.mutateAsync(data.name);
      reset();
      onClose();
    } catch {
      // Error handling is done in the mutation
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <FolderIcon className="h-5 w-5" />
            Create new folder
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmitForm)} className="space-y-4">
          <div className="space-y-2">
            <Input
              placeholder="Enter folder name"
              {...register("name")}
              autoComplete="off"
            />
            {errors.name && (
              <p className="text-sm text-destructive">{errors.name.message}</p>
            )}
          </div>
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              disabled={createFolderMutation.isPending}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={createFolderMutation.isPending}>
              {createFolderMutation.isPending ? "Creating..." : "Create"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
