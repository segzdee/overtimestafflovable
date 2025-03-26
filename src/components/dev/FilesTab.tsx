
import React from "react";
import { RefreshCw, FileCode } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Checkbox } from "@/components/ui/checkbox";
import { CodeEditor } from "./CodeEditor";
import { FileData } from "./types";

interface FilesTabProps {
  availableFiles: { name: string; path: string }[];
  fetchAvailableFiles: () => void;
  fetchFileContent: (path: string) => void;
  editingFile: FileData | null;
  fileContent: string;
  setFileContent: (content: string) => void;
  handleDebugCurrentCode: () => void;
  handleOptimizeCode: () => void;
  saveFileChanges: () => void;
  autoApply: boolean;
  setAutoApply: (value: boolean) => void;
}

export const FilesTab: React.FC<FilesTabProps> = ({
  availableFiles,
  fetchAvailableFiles,
  fetchFileContent,
  editingFile,
  fileContent,
  setFileContent,
  handleDebugCurrentCode,
  handleOptimizeCode,
  saveFileChanges,
  autoApply,
  setAutoApply,
}) => {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h5 className="text-sm font-medium">Project Files</h5>
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={fetchAvailableFiles}
          className="h-7 w-7 p-0"
        >
          <RefreshCw size={12} />
        </Button>
      </div>
      
      <ScrollArea className="h-[200px] border rounded-md p-2">
        {availableFiles.length === 0 ? (
          <div className="text-sm text-muted-foreground p-2">
            No files available. Click refresh to load project files.
          </div>
        ) : (
          <div className="space-y-1">
            {availableFiles.map((file) => (
              <div 
                key={file.path}
                className="flex items-center p-1 hover:bg-accent rounded cursor-pointer text-sm"
                onClick={() => fetchFileContent(file.path)}
              >
                <FileCode size={14} className="mr-2 flex-shrink-0" />
                <span className="truncate">{file.name}</span>
              </div>
            ))}
          </div>
        )}
      </ScrollArea>
      
      <CodeEditor 
        editingFile={editingFile}
        fileContent={fileContent}
        setFileContent={setFileContent}
        handleDebugCurrentCode={handleDebugCurrentCode}
        handleOptimizeCode={handleOptimizeCode}
        saveFileChanges={saveFileChanges}
      />
      
      <div className="flex items-center gap-2">
        <Checkbox 
          id="auto-apply" 
          checked={autoApply} 
          onCheckedChange={(checked) => setAutoApply(checked === true)}
        />
        <label htmlFor="auto-apply" className="text-sm">
          Auto-apply AI suggestions
        </label>
      </div>
    </div>
  );
};
