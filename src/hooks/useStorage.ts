
import { useState } from 'react';
import { storage } from '../lib/supabase';

export function useStorage(bucket: string) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const uploadFile = async (file: File, path: string = '') => {
    setUploading(true);
    setError(null);
    
    try {
      // Generate a unique path if none provided
      const filePath = path || `${Date.now()}-${file.name}`;
      
      // Upload the file
      const { data, error: uploadError } = await storage.upload(bucket, filePath, file);
      
      if (uploadError) {
        throw new Error(uploadError.message);
      }
      
      // Return the public URL
      const publicUrl = storage.getPublicUrl(bucket, filePath);
      return { path: filePath, url: publicUrl };
    } catch (err: any) {
      console.error('Error uploading file:', err);
      setError(err);
      return null;
    } finally {
      setUploading(false);
    }
  };

  const downloadFile = async (path: string) => {
    setError(null);
    
    try {
      const { data, error: downloadError } = await storage.download(bucket, path);
      
      if (downloadError) {
        throw new Error(downloadError.message);
      }
      
      return data;
    } catch (err: any) {
      console.error('Error downloading file:', err);
      setError(err);
      return null;
    }
  };

  const getFileUrl = (path: string) => {
    return storage.getPublicUrl(bucket, path);
  };

  const listFiles = async (path: string = '') => {
    setError(null);
    
    try {
      const { data, error: listError } = await storage.list(bucket, path);
      
      if (listError) {
        throw new Error(listError.message);
      }
      
      return data;
    } catch (err: any) {
      console.error('Error listing files:', err);
      setError(err);
      return null;
    }
  };

  const deleteFile = async (path: string) => {
    setError(null);
    
    try {
      const { error: deleteError } = await storage.delete(bucket, [path]);
      
      if (deleteError) {
        throw new Error(deleteError.message);
      }
      
      return true;
    } catch (err: any) {
      console.error('Error deleting file:', err);
      setError(err);
      return false;
    }
  };

  return {
    uploadFile,
    downloadFile,
    getFileUrl,
    listFiles,
    deleteFile,
    uploading,
    error
  };
}
