
import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/auth/AuthProvider";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle, Loader2, Upload } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

export default function Profile() {
  const { user, updateProfile } = useAuth();
  const [name, setName] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("");
  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (user) {
      setName(user.name || "");
      setAvatarUrl(user.avatar_url || "");
    }
  }, [user]);

  const handleAvatarUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    try {
      setUploading(true);
      setError(null);

      if (!event.target.files || event.target.files.length === 0) {
        throw new Error("You must select an image to upload.");
      }

      const file = event.target.files[0];
      const fileExt = file.name.split('.').pop();
      const filePath = `${user?.id}/avatar.${fileExt}`;

      // Upload file to Supabase Storage
      const { error: uploadError } = await supabase.storage
        .from('avatars')
        .upload(filePath, file, { upsert: true });

      if (uploadError) {
        throw uploadError;
      }

      // Get public URL
      const { data } = supabase.storage.from('avatars').getPublicUrl(filePath);
      setAvatarUrl(data.publicUrl);

    } catch (error: any) {
      setError(error.message);
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);
    setLoading(true);
    
    try {
      await updateProfile({
        name,
        avatar_url: avatarUrl
      });
      setSuccess(true);
    } catch (err: any) {
      setError(err.message || "Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return (
      <div className="container max-w-2xl py-6">
        <Card>
          <CardHeader>
            <CardTitle>Profile</CardTitle>
            <CardDescription>You must be logged in to view this page.</CardDescription>
          </CardHeader>
        </Card>
      </div>
    );
  }

  return (
    <div className="container max-w-2xl py-6">
      <Card>
        <CardHeader>
          <CardTitle>Your Profile</CardTitle>
          <CardDescription>Update your profile information</CardDescription>
        </CardHeader>
        
        <CardContent>
          {error && (
            <Alert variant="destructive" className="mb-4">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          
          {success && (
            <Alert className="mb-4 bg-green-50 border-green-200">
              <AlertDescription className="text-green-700">
                Your profile has been updated successfully
              </AlertDescription>
            </Alert>
          )}
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="flex flex-col items-center space-y-4">
              <Avatar className="h-24 w-24">
                <AvatarImage src={avatarUrl} />
                <AvatarFallback>{name ? name.charAt(0).toUpperCase() : "U"}</AvatarFallback>
              </Avatar>
              
              <div className="flex items-center space-x-2">
                <Label htmlFor="avatar" className="cursor-pointer bg-primary/10 hover:bg-primary/20 text-primary px-3 py-2 rounded flex items-center transition">
                  <Upload className="h-4 w-4 mr-2" />
                  {uploading ? "Uploading..." : "Upload Avatar"}
                </Label>
                <Input 
                  id="avatar" 
                  type="file" 
                  accept="image/*"
                  className="hidden"
                  onChange={handleAvatarUpload}
                  disabled={uploading}
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" value={user.email} disabled />
              <p className="text-sm text-muted-foreground">You cannot change your email address</p>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input 
                id="name" 
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                disabled={loading}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="role">Role</Label>
              <Input id="role" value={user.role} disabled />
              <p className="text-sm text-muted-foreground">You cannot change your role</p>
            </div>
            
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Saving Changes
                </>
              ) : (
                "Save Changes"
              )}
            </Button>
          </form>
        </CardContent>
        
        <CardFooter className="flex justify-between">
          <p className="text-sm text-muted-foreground">Last updated: {new Date().toLocaleDateString()}</p>
        </CardFooter>
      </Card>
    </div>
  );
}
