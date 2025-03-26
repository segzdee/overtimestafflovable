
import React from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { QuickPrompt } from "./quickPrompts";

interface PromptTabProps {
  prompt: string;
  setPrompt: (value: string) => void;
  quickPrompts: QuickPrompt[];
}

export const PromptTab: React.FC<PromptTabProps> = ({ 
  prompt, 
  setPrompt,
  quickPrompts 
}) => {
  return (
    <div className="space-y-3">
      <Textarea
        placeholder="Ask Thropic about code, debugging, UI generation..."
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        className="min-h-[100px] text-sm"
      />
      
      <div className="flex flex-wrap gap-2">
        {quickPrompts.map((item) => (
          <Button 
            key={item.name}
            size="sm" 
            variant="outline"
            className="flex items-center gap-1"
            onClick={() => setPrompt(prompt ? `${prompt}\n\n${item.prompt}` : item.prompt)}
          >
            {item.icon}
            {item.name}
          </Button>
        ))}
      </div>
    </div>
  );
};
