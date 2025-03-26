
import React from "react";
import { FileCode } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ScrollArea } from "@/components/ui/scroll-area";

interface AiResponseProps {
  response: string;
}

export const AiResponse: React.FC<AiResponseProps> = ({ response }) => {
  if (!response) return null;

  return (
    <Collapsible className="mt-3 border rounded-md bg-muted/30">
      <CollapsibleTrigger asChild>
        <Button variant="ghost" size="sm" className="flex items-center justify-between w-full">
          <span className="text-xs font-medium">Response</span>
          <FileCode size={12} />
        </Button>
      </CollapsibleTrigger>
      <CollapsibleContent>
        <ScrollArea className="p-3 max-h-[300px]">
          <div className="whitespace-pre-wrap text-sm">{response}</div>
        </ScrollArea>
      </CollapsibleContent>
    </Collapsible>
  );
};
