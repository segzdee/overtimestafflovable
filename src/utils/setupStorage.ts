
import { supabase } from "@/integrations/supabase/client";

// Create a storage bucket for avatars if it doesn't exist
export const setupStorage = async () => {
  try {
    // Check if the avatars bucket exists
    const { data: existingBuckets, error: listError } = await supabase.storage.listBuckets();
    
    if (listError) {
      console.error('Error listing buckets:', listError);
      return;
    }
    
    const avatarBucketExists = existingBuckets.some(bucket => bucket.name === 'avatars');
    
    if (!avatarBucketExists) {
      // Create the avatars bucket
      const { error: createError } = await supabase.storage
        .createBucket('avatars', {
          public: true, // Allow public access to files
          fileSizeLimit: 5 * 1024 * 1024, // 5MB size limit
        });
      
      if (createError) {
        console.error('Error creating avatars bucket:', createError);
        return;
      }
      
      console.log('Avatars bucket created successfully');
    }
  } catch (error) {
    console.error('Error setting up storage:', error);
  }
};
