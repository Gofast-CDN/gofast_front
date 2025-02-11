import {
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
} from "@/components/ui/context-menu";
import { FolderPlus, FileUp, FolderUp } from "lucide-react";

interface AssetsContextMenuActionProps {
  setIsCreateFolderModalOpen: (isOpen: boolean) => void;
}

export default function AssetsContextMenuAction({
  setIsCreateFolderModalOpen,
}: AssetsContextMenuActionProps) {
  return (
    <ContextMenuContent className="w-56">
      <ContextMenuItem onClick={() => setIsCreateFolderModalOpen(true)}>
        <FolderPlus className="mr-2 h-4 w-4" />
        New folder
      </ContextMenuItem>
      <ContextMenuSeparator />
      <ContextMenuItem onClick={() => console.log("Upload files")}>
        <FileUp className="mr-2 h-4 w-4" />
        Upload files
      </ContextMenuItem>
      <ContextMenuItem onClick={() => console.log("Upload folder")}>
        <FolderUp className="mr-2 h-4 w-4" />
        Upload folder
      </ContextMenuItem>
    </ContextMenuContent>
  );
}
