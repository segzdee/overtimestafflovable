
import React from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { RefreshCw } from "lucide-react";

interface ConsoleTabProps {
  consoleOutput: string;
  clearConsole: () => void;
}

export const ConsoleTab: React.FC<ConsoleTabProps> = ({ consoleOutput, clearConsole }) => {
  return (
    <div className="relative">
      <ScrollArea className="h-[150px] w-full rounded-md border p-2 bg-muted/40">
        <pre className="text-xs font-mono whitespace-pre-wrap">
          {consoleOutput || "Console output will appear here..."}
        </pre>
      </ScrollArea>
      <Button 
        size="sm" 
        variant="ghost" 
        className="absolute top-2 right-2 h-6 w-6 p-0" 
        onClick={clearConsole}
      >
        <RefreshCw size={12} />
      </Button>
    </div>
  );
};
