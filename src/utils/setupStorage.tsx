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
      // Retry mechanism for bucket creation
      for (let attempt = 0; attempt < 3; attempt++) {
        const { error: createError } = await supabase.storage.createBucket('avatars', {
          public: true, // Allow public access to files
        });

        if (!createError) {
          console.log('Avatars bucket created successfully');
          break;
        }

        console.error(`Error creating avatars bucket (attempt ${attempt + 1}):`, createError);

        if (attempt === 2) {
          console.error('Failed to create avatars bucket after 3 attempts');
          return;
        }

        await new Promise(resolve => setTimeout(resolve, 2000)); // Wait 2 seconds before retrying
      }
    }
  } catch (error) {
    console.error('Error setting up storage:', error);
  }
};