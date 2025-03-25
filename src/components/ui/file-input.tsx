
import { useState, ChangeEvent } from "react";
import { Upload, X, File, Check } from "lucide-react";
import { Button } from "./button";

interface FileInputProps {
  accept?: string;
  maxSize?: number; // in MB
  label: string;
  onFileSelect: (file: File) => void;
  description?: string;
}

export function FileInput({ 
  accept = "*", 
  maxSize = 5, 
  label, 
  onFileSelect,
  description
}: FileInputProps) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [isUploaded, setIsUploaded] = useState(false);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    setError(null);
    
    // Check file size
    if (file.size > maxSize * 1024 * 1024) {
      setError(`File is too large. Maximum size is ${maxSize}MB.`);
      return;
    }
    
    setSelectedFile(file);
    onFileSelect(file);
    simulateUpload();
  };

  const simulateUpload = () => {
    setIsUploading(true);
    setIsUploaded(false);
    
    // Simulate upload process
    setTimeout(() => {
      setIsUploading(false);
      setIsUploaded(true);
    }, 1000);
  };

  const clearSelection = () => {
    setSelectedFile(null);
    setError(null);
    setIsUploaded(false);
  };

  return (
    <div className="space-y-2">
      <div className="text-sm font-medium text-gray-700">{label}</div>
      
      {description && (
        <p className="text-sm text-gray-500 mb-2">{description}</p>
      )}
      
      {!selectedFile ? (
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-4">
          <div className="flex flex-col items-center justify-center py-3">
            <Upload className="h-8 w-8 text-gray-400 mb-2" />
            <p className="text-sm text-gray-500 mb-1">
              Drag and drop your file, or <span className="text-blue-500">browse</span>
            </p>
            <p className="text-xs text-gray-400">
              {accept === "*" ? "Any file type" : accept.split(",").join(", ")} up to {maxSize}MB
            </p>
            
            <input
              type="file"
              accept={accept}
              onChange={handleFileChange}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            />
          </div>
        </div>
      ) : (
        <div className="border rounded-lg p-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <File className="h-5 w-5 text-blue-500" />
              <div className="text-sm">
                <p className="font-medium truncate max-w-[200px]">{selectedFile.name}</p>
                <p className="text-xs text-gray-500">
                  {(selectedFile.size / 1024).toFixed(2)} KB
                </p>
              </div>
            </div>
            
            <div className="flex items-center">
              {isUploading ? (
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-500"></div>
              ) : isUploaded ? (
                <Check className="h-4 w-4 text-green-500" />
              ) : null}
              
              <button
                onClick={clearSelection}
                className="ml-2 p-1 rounded-full hover:bg-gray-100"
              >
                <X className="h-4 w-4 text-gray-500" />
              </button>
            </div>
          </div>
        </div>
      )}
      
      {error && (
        <p className="text-sm text-red-500 mt-1">{error}</p>
      )}
    </div>
  );
}
