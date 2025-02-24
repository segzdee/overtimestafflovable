
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { UploadCloud, X } from "lucide-react";
import { useState } from "react";

interface FileInputProps {
  accept?: string;
  maxSize?: number; // in MB
  onFileSelect: (file: File) => void;
  label: string;
}

export function FileInput({ accept, maxSize = 5, onFileSelect, label }: FileInputProps) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [error, setError] = useState<string>("");

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Check file size (convert maxSize from MB to bytes)
    if (file.size > maxSize * 1024 * 1024) {
      setError(`File size must be less than ${maxSize}MB`);
      return;
    }

    setError("");
    setSelectedFile(file);
    onFileSelect(file);
  };

  const clearFile = () => {
    setSelectedFile(null);
    setError("");
  };

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700">{label}</label>
      <div className="relative">
        {selectedFile ? (
          <div className="flex items-center gap-2 p-2 border rounded-md">
            <span className="flex-1 truncate">{selectedFile.name}</span>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={clearFile}
              className="shrink-0"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        ) : (
          <div className="border-2 border-dashed rounded-md p-4">
            <div className="flex flex-col items-center gap-2">
              <UploadCloud className="h-8 w-8 text-gray-400" />
              <div className="text-sm text-gray-600">
                <label className="relative cursor-pointer rounded-md font-medium text-primary hover:text-primary/90 focus-within:outline-none focus-within:ring-2 focus-within:ring-primary">
                  <span>Upload a file</span>
                  <Input
                    type="file"
                    className="sr-only"
                    accept={accept}
                    onChange={handleFileChange}
                  />
                </label>
                <p className="pl-1">or drag and drop</p>
              </div>
              <p className="text-xs text-gray-500">
                {accept ? `${accept.split(",").join(", ")} up to ${maxSize}MB` : `Max ${maxSize}MB`}
              </p>
            </div>
          </div>
        )}
        {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
      </div>
    </div>
  );
}
