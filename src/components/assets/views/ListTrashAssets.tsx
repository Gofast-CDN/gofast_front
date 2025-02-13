import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  ArchiveRestore,
  FolderIcon,
  MoreHorizontal,
  Trash2,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import type { Asset, TrashAssetAction } from "@/types/asset";
import { cn } from "@/lib/utils";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { useState } from "react";

interface ListTrashAssetsProps {
  assets: Asset[];
  handleAction: (action: TrashAssetAction, fileId: string) => void;
  mini?: boolean;
  border?: boolean;
}

const ListTrashAssets = ({
  assets,
  handleAction,
  border = false,
}: ListTrashAssetsProps) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const sortedAssets = [...assets].sort((a, b) => {
    if (a.assetType === "folder" && b.assetType !== "folder") return -1;
    if (a.assetType !== "folder" && b.assetType === "folder") return 1;
    return a.name.localeCompare(b.name);
  });

  const totalPages = Math.ceil(sortedAssets.length / itemsPerPage);

  const paginatedAssets = sortedAssets.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className={cn(border && "border rounded-md")}>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Asset</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Size</TableHead>
            <TableHead className="w-[50px]"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {paginatedAssets.map((asset) => (
            <TableRow key={asset.id}>
              <TableCell>
                <div className="flex items-center gap-4">
                  {asset.assetType === "folder" ? (
                    <div className="h-10 w-10 rounded bg-muted flex items-center justify-center">
                      <FolderIcon className="h-6 w-6 text-muted-foreground" />
                    </div>
                  ) : (
                    <img
                      src={asset.thumbnail}
                      alt={asset.name}
                      className="h-10 w-10 rounded object-cover bg-muted"
                    />
                  )}
                  <span className="font-medium">{asset.name}</span>
                </div>
              </TableCell>
              <TableCell className="text-muted-foreground">
                {asset.assetType}
              </TableCell>
              <TableCell className="text-muted-foreground">
                {asset.size}
              </TableCell>
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="hover:bg-muted"
                    >
                      <MoreHorizontal className="h-4 w-4" />
                      <span className="sr-only">Actions</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-40">
                    <DropdownMenuItem
                      onClick={(e) => {
                        e.stopPropagation();
                        handleAction("restore", asset.id);
                      }}
                    >
                      <ArchiveRestore className="mr-2 h-4 w-4" />
                      Restore
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={(e) => {
                        e.stopPropagation();
                        handleAction("delete", asset.id);
                      }}
                      className="text-red-500"
                    >
                      <Trash2 className="mr-2 h-4 w-4" />
                      Delete definitively
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {assets.length > itemsPerPage && (
        <div className="flex m-4 ml-auto w-fit space-x-4">
          <Pagination>
            <PaginationContent className="space-x-4">
              <PaginationItem>
                <Button
                  variant="outline"
                  disabled={currentPage === 1}
                  onClick={() =>
                    setCurrentPage((prev) => Math.max(prev - 1, 1))
                  }
                >
                  <PaginationPrevious />
                </Button>
              </PaginationItem>
              <PaginationItem>
                <span className="text-sm text-muted-foreground">
                  Page {currentPage} of {totalPages}
                </span>
              </PaginationItem>
              <PaginationItem>
                <Button
                  variant="outline"
                  disabled={currentPage === totalPages}
                  onClick={() =>
                    setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                  }
                >
                  <PaginationNext />
                </Button>
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      )}
    </div>
  );
};

export default ListTrashAssets;
