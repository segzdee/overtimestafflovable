
import * as React from "react";
import { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Upload, X, File } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { useToast } from "@/hooks/use-toast";

export interface FileUploadProps extends React.HTMLAttributes<HTMLDivElement> {
  onUploadComplete?: (path: string) => void;
  onUploadError?: (error: Error) => void;
  maxSize?: number; // in bytes
  acceptedFileTypes?: string[];
  bucketName?: string;
  className?: string;
}

export function FileUpload({
  onUploadComplete,
  onUploadError,
  maxSize = 5 * 1024 * 1024, // 5MB default
  acceptedFileTypes = [],
  bucketName = "files",
  className,
  ...props
}: FileUploadProps) {
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const { toast } = useToast();

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (!file) return;

    setUploading(true);
    setProgress(0);
    setUploadedFile(file);

    try {
      // Create a unique file path
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = `${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from(bucketName)
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: false,
          onUploadProgress: (progress) => {
            const percent = (progress.loaded / progress.total) * 100;
            setProgress(percent);
          },
        });

      if (uploadError) throw uploadError;

      const { data } = supabase.storage
        .from(bucketName)
        .getPublicUrl(filePath);

      toast({
        title: "Success",
        description: "File uploaded successfully",
      });

      onUploadComplete?.(data.publicUrl);
    } catch (error) {
      console.error('Upload error:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to upload file",
      });
      onUploadError?.(error as Error);
    } finally {
      setUploading(false);
    }
  }, [bucketName, onUploadComplete, onUploadError, toast]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    maxSize,
    accept: acceptedFileTypes.length 
      ? Object.fromEntries(acceptedFileTypes.map(type => [type, []]))
      : undefined,
    multiple: false,
  });

  const removeFile = () => {
    setUploadedFile(null);
    setProgress(0);
  };

  return (
    <div className={cn("w-full", className)} {...props}>
      <div
        {...getRootProps()}
        className={cn(
          "border-2 border-dashed rounded-lg p-6 transition-colors",
          isDragActive ? "border-primary bg-primary/5" : "border-muted-foreground/25",
          uploading && "pointer-events-none opacity-60"
        )}
      >
        <input {...getInputProps()} />
        
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          {uploadedFile ? (
            <div className="flex items-center space-x-4">
              <File className="h-8 w-8 text-muted-foreground" />
              <div className="space-y-1 text-left">
                <p className="text-sm font-medium">{uploadedFile.name}</p>
                <p className="text-xs text-muted-foreground">
                  {(uploadedFile.size / 1024).toFixed(2)}KB
                </p>
              </div>
              {!uploading && (
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={(e) => {
                    e.stopPropagation();
                    removeFile();
                  }}
                >
                  <X className="h-4 w-4" />
                </Button>
              )}
            </div>
          ) : (
            <>
              <Upload className="h-8 w-8 text-muted-foreground" />
              <div className="space-y-2">
                <p className="text-sm font-medium">
                  Drag & drop your file here, or click to select
                </p>
                <p className="text-xs text-muted-foreground">
                  Maximum file size: {(maxSize / 1024 / 1024).toFixed(1)}MB
                  {acceptedFileTypes.length > 0 && (
                    <>
                      <br />
                      Accepted types: {acceptedFileTypes.join(", ")}
                    </>
                  )}
                </p>
              </div>
            </>
          )}
        </div>
      </div>

      {uploading && (
        <div className="mt-4 space-y-2">
          <Progress value={progress} className="h-1" />
          <p className="text-xs text-muted-foreground text-center">
            Uploading... {Math.round(progress)}%
          </p>
        </div>
      )}
    </div>
  );
}
