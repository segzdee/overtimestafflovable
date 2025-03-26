
import React from "react";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";

interface CodeContextTabProps {
  codeSnippet: string;
  setCodeSnippet: (value: string) => void;
  fileContext: string;
  setFileContext: (value: string) => void;
}

export const CodeContextTab: React.FC<CodeContextTabProps> = ({
  codeSnippet,
  setCodeSnippet,
  fileContext,
  setFileContext
}) => {
  return (
    <div className="space-y-3">
      <Textarea
        placeholder="Paste code snippet for better context..."
        value={codeSnippet}
        onChange={(e) => setCodeSnippet(e.target.value)}
        className="min-h-[100px] text-sm font-mono"
      />
      <Input
        placeholder="File path for context (optional)"
        value={fileContext}
        onChange={(e) => setFileContext(e.target.value)}
        className="text-sm"
      />
    </div>
  );
};
