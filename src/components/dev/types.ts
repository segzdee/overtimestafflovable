
export interface AiSuggestion {
  id: string;
  type: 'fix' | 'enhancement' | 'refactor';
  description: string;
  codeChange: {
    original: string;
    suggested: string;
  };
  applied: boolean;
}

export interface FileData {
  name: string;
  path: string;
  content: string;
}
