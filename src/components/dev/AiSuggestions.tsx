
import React from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { AiSuggestion, FileData } from "./types";

interface AiSuggestionsProps {
  suggestions: AiSuggestion[];
  editingFile: FileData | null;
  applySuggestion: (suggestion: AiSuggestion) => void;
}

export const AiSuggestions: React.FC<AiSuggestionsProps> = ({ 
  suggestions, 
  editingFile, 
  applySuggestion 
}) => {
  if (suggestions.length === 0) return null;

  return (
    <div className="border rounded-md p-2 bg-muted/30">
      <h5 className="text-sm font-medium mb-2">AI Suggestions</h5>
      <ScrollArea className="max-h-[200px]">
        <div className="space-y-2">
          {suggestions.map((suggestion) => (
            <Card key={suggestion.id} className="p-2 relative">
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <Badge variant={
                      suggestion.type === 'fix' ? 'destructive' : 
                      suggestion.type === 'enhancement' ? 'default' : 'outline'
                    }>
                      {suggestion.type}
                    </Badge>
                    {suggestion.applied && (
                      <Badge variant="outline" className="bg-green-50">Applied</Badge>
                    )}
                  </div>
                  <p className="text-sm">{suggestion.description}</p>
                </div>
                {!suggestion.applied && editingFile && (
                  <Button 
                    size="sm" 
                    variant="outline"
                    className="h-7"
                    onClick={() => applySuggestion(suggestion)}
                  >
                    Apply
                  </Button>
                )}
              </div>
            </Card>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
};
