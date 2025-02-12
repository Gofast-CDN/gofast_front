import type { Asset } from "@/types/asset";
import { Button } from "@/components/ui/button";
import { Download, Share2, Info } from "lucide-react";
import { Dialog, DialogContent, DialogTitle } from "../ui/dialog";
import { cn } from "@/lib/utils";
import SharedLink from "../ui/sharedLink";

interface AssetDetailsDialogProps {
  selectedAsset: Asset | null;
  onClose: () => void;
}

export default function AssetDetailsDialog({
  selectedAsset,
  onClose,
}: AssetDetailsDialogProps) {
  if (!selectedAsset) return null;

  return (
    <Dialog open={selectedAsset !== null} onOpenChange={onClose}>
      <DialogContent className="max-w-5xl max-h-[90vh] p-0">
        <div className="flex flex-col h-full">
          <div className="relative group">
            <img
              src={selectedAsset?.thumbnail}
              alt={selectedAsset?.name}
              className="w-full object-cover max-h-[60vh] rounded-t-lg"
            />
            <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
              <DialogTitle className="text-secondary bg-primary/50 px-4 py-2 rounded-lg">
                {selectedAsset?.name}
              </DialogTitle>
              <Button size="sm" variant="secondary">
                <Download className="h-4 w-4 mr-2" />
                Download
              </Button>
            </div>
          </div>

          <div className="p-6 overflow-y-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Info className="h-4 w-4" />
                  <h4 className="font-medium">File Information</h4>
                </div>
                <dl className="grid grid-cols-2 gap-2 text-sm">
                  <MetaItem label="Type" value={selectedAsset.assetType} />
                  <MetaItem label="Size" value={selectedAsset.size} />
                  <MetaItem label="Owner" value={selectedAsset.owner} />
                  <MetaItem
                    label="Uploaded"
                    value={
                      selectedAsset?.uploadedAt
                        ? new Date(
                            selectedAsset.uploadedAt
                          ).toLocaleDateString()
                        : ""
                    }
                  />
                </dl>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Share2 className="h-4 w-4" />
                  <h4 className="font-medium">Share URL</h4>
                </div>
                <SharedLink url={selectedAsset.url || ""} />
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

function MetaItem({
  label,
  value,
  className,
}: {
  label: string;
  value: string;
  className?: string;
}) {
  return (
    <div className={cn("space-y-1", className)}>
      <dt className="text-muted-foreground">{label}</dt>
      <dd className="font-medium">{value}</dd>
    </div>
  );
}
