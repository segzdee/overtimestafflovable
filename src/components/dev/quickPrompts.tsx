
import { AlertCircle, Code, Layers, TestTube, Zap, Layout } from "lucide-react";
import React from "react";

export interface QuickPrompt {
  name: string;
  icon: React.ReactNode;
  prompt: string;
}

// Quick prompts data
export const quickPrompts: QuickPrompt[] = [
  { name: "Debug Code", icon: <AlertCircle size={14} />, prompt: "Debug this code and identify potential issues:" },
  { name: "Generate UI", icon: <Layers size={14} />, prompt: "Generate a component for:" },
  { name: "Refactor", icon: <Code size={14} />, prompt: "Refactor this code to improve:" },
  { name: "Write Tests", icon: <TestTube size={14} />, prompt: "Write tests for this component:" },
  { name: "API Endpoint", icon: <Zap size={14} />, prompt: "Create an API endpoint for:" },
  { name: "Page Layout", icon: <Layout size={14} />, prompt: "Design a page layout for:" },
];
