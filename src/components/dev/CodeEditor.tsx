
import React from "react";
import { FileCode, AlertCircle, Sparkles, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { FileData } from "./types";

interface CodeEditorProps {
  editingFile: FileData | null;
  fileContent: string;
  setFileContent: (content: string) => void;
  handleDebugCurrentCode: () => void;
  handleOptimizeCode: () => void;
  saveFileChanges: () => void;
}

export const CodeEditor: React.FC<CodeEditorProps> = ({
  editingFile,
  fileContent,
  setFileContent,
  handleDebugCurrentCode,
  handleOptimizeCode,
  saveFileChanges,
}) => {
  if (!editingFile) return null;

  return (
    <div className="border rounded-md">
      <div className="flex items-center justify-between bg-muted p-2 border-b">
        <div className="flex items-center">
          <FileCode size={14} className="mr-2" />
          <span className="text-sm font-medium truncate">{editingFile.name}</span>
        </div>
        <div className="flex items-center gap-1">
          <Button 
            variant="ghost" 
            size="sm" 
            className="h-6 w-6 p-0"
            onClick={handleDebugCurrentCode}
            title="Debug this file"
          >
            <AlertCircle size={12} />
          </Button>
          <Button 
            variant="ghost" 
            size="sm" 
            className="h-6 w-6 p-0"
            onClick={handleOptimizeCode}
            title="Optimize this file"
          >
            <Sparkles size={12} />
          </Button>
          <Button 
            variant="ghost" 
            size="sm" 
            className="h-6 w-6 p-0"
            onClick={saveFileChanges}
            title="Save changes"
          >
            <Save size={12} />
          </Button>
        </div>
      </div>
      <Textarea
        value={fileContent}
        onChange={(e) => setFileContent(e.target.value)}
        className="min-h-[200px] font-mono text-sm border-0 rounded-t-none"
      />
    </div>
  );
};
