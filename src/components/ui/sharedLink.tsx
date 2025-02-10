import { Button } from "@/components/ui/button";
import { Copy } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import { useToast } from "@/hooks/use-toast";

const SharedLink = ({ url }: { url: string }) => {
  const { toast } = useToast();
  const handleCopyUrl = async () => {
    if (!url) return;
    try {
      await navigator.clipboard.writeText(url);
      toast({
        title: "URL copied to clipboard",
        description: "The asset URL has been copied to your clipboard",
        variant: "default",
      });
    } catch {
      toast({
        title: "Failed to copy URL",
        description: `Please try copying the URL manually`,
        variant: "destructive",
      });
    }
  };
  return (
    <div className="flex items-center gap-2">
      <code className="flex-1 rounded bg-muted px-3 py-2 font-mono text-sm truncate">
        {url}
      </code>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="outline" size="icon" onClick={handleCopyUrl}>
              <Copy className="h-4 w-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Copy URL</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
};

export default SharedLink;
