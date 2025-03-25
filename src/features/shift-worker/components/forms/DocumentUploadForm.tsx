
import React, { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { CheckCircle, XCircle, Upload, FileText, AlertCircle } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/components/ui/use-toast";

interface DocumentUploadFormProps {
  onSuccess?: () => void;
}

type DocumentType = "id" | "resume" | "certification" | "background_check" | "other";

interface Document {
  id: string;
  name: string;
  type: DocumentType;
  file: File;
  status: "uploading" | "success" | "error" | "idle";
  progress: number;
  errorMessage?: string;
}

export function DocumentUploadForm({ onSuccess }: DocumentUploadFormProps) {
  const { toast } = useToast();
  const [documents, setDocuments] = useState<Document[]>([]);
  const [selectedType, setSelectedType]  = useState<DocumentType>("other");
  
  const onDrop = useCallback((acceptedFiles: File[]) => {
    const newDocuments = acceptedFiles.map(file => ({
      id: Math.random().toString(36).substring(7),
      name: file.name,
      type: selectedType,
      file,
      status: "idle" as const,
      progress: 0
    }));
    
    setDocuments(prev => [...prev, ...newDocuments]);
  }, [selectedType]);
  
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
      'image/jpeg': ['.jpg', '.jpeg'],
      'image/png': ['.png']
    },
    maxSize: 5 * 1024 * 1024 // 5MB
  });
  
  const documentTypes: { value: DocumentType; label: string }[] = [
    { value: "id", label: "ID / Passport" },
    { value: "resume", label: "Resume / CV" },
    { value: "certification", label: "Professional Certification" },
    { value: "background_check", label: "Background Check" },
    { value: "other", label: "Other Document" }
  ];
  
  const uploadDocument = async (documentId: string) => {
    setDocuments(prev => 
      prev.map(doc => 
        doc.id === documentId 
          ? { ...doc, status: "uploading" }
          : doc
      )
    );
    
    try {
      // Simulate upload progress
      for (let progress = 0; progress <= 100; progress += 10) {
        await new Promise(resolve => setTimeout(resolve, 200));
        setDocuments(prev =>
          prev.map(doc =>
            doc.id === documentId
              ? { ...doc, progress }
              : doc
          )
        );
      }
      
      // Simulate successful upload
      setDocuments(prev =>
        prev.map(doc =>
          doc.id === documentId
            ? { ...doc, status: "success", progress: 100 }
            : doc
        )
      );
      
      toast({
        title: "Document uploaded",
        description: "Your document has been successfully uploaded."
      });
    } catch (error) {
      setDocuments(prev =>
        prev.map(doc =>
          doc.id === documentId
            ? { 
                ...doc, 
                status: "error",
                errorMessage: error instanceof Error ? error.message : "Failed to upload document"
              }
            : doc
        )
      );
      
      toast({
        variant: "destructive",
        title: "Upload failed",
        description: error instanceof Error ? error.message : "An error occurred while uploading your document"
      });
    }
  };
  
  const removeDocument = (documentId: string) => {
    setDocuments(prev => prev.filter(doc => doc.id !== documentId));
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Document Upload</CardTitle>
        <CardDescription>
          Upload your required documents. Accepted formats: PDF, JPG, PNG (max 5MB)
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2">
            {documentTypes.map(type => (
              <Button
                key={type.value}
                variant={selectedType === type.value ? "default" : "outline"}
                onClick={() => setSelectedType(type.value)}
                className="w-full"
              >
                {type.label}
              </Button>
            ))}
          </div>
          
          <div
            {...getRootProps()}
            className={`
              border-2 border-dashed rounded-lg p-8 text-center cursor-pointer
              transition-colors duration-200
              ${isDragActive ? "border-primary bg-primary/5" : "border-border"}
            `}
          >
            <input {...getInputProps()} />
            <Upload className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
            {isDragActive ? (
              <p>Drop your files here</p>
            ) : (
              <div className="space-y-2">
                <p className="text-sm font-medium">
                  Drag and drop your files here, or click to select files
                </p>
                <p className="text-sm text-muted-foreground">
                  PDF, JPG or PNG, up to 5MB
                </p>
              </div>
            )}
          </div>
        </div>
        
        {documents.length > 0 && (
          <div className="space-y-4">
            <Separator />
            <h3 className="font-medium">Uploaded Documents</h3>
            
            <div className="space-y-4">
              {documents.map((doc) => (
                <div key={doc.id} className="flex items-center space-x-4">
                  <FileText className="h-8 w-8 flex-shrink-0 text-muted-foreground" />
                  
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium">{doc.name}</p>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeDocument(doc.id)}
                      >
                        <XCircle className="h-4 w-4" />
                      </Button>
                    </div>
                    
                    {doc.status === "idle" && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => uploadDocument(doc.id)}
                        className="w-full"
                      >
                        Start Upload
                      </Button>
                    )}
                    
                    {doc.status === "uploading" && (
                      <Progress value={doc.progress} className="h-2" />
                    )}
                    
                    {doc.status === "success" && (
                      <div className="flex items-center space-x-2 text-sm text-green-600">
                        <CheckCircle className="h-4 w-4" />
                        <span>Upload complete</span>
                      </div>
                    )}
                    
                    {doc.status === "error" && (
                      <div className="flex items-center space-x-2 text-sm text-red-600">
                        <AlertCircle className="h-4 w-4" />
                        <span>{doc.errorMessage || "Upload failed"}</span>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        
        <Alert>
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Document Verification</AlertTitle>
          <AlertDescription>
            Documents will be reviewed within 24-48 hours. You'll be notified once they're approved.
          </AlertDescription>
        </Alert>
      </CardContent>
    </Card>
  );
}
