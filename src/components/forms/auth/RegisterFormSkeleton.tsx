
import { Skeleton } from "@/components/ui/skeleton";

export function RegisterFormSkeleton() {
  return (
    <div className="space-y-6 animate-pulse">
      {/* Role selector */}
      <div className="space-y-2">
        <Skeleton className="h-5 w-32" />
        <div className="grid grid-cols-3 gap-2">
          <Skeleton className="h-12 w-full" />
          <Skeleton className="h-12 w-full" />
          <Skeleton className="h-12 w-full" />
        </div>
      </div>
      
      {/* Category selection */}
      <div className="space-y-2">
        <Skeleton className="h-5 w-40" />
        <Skeleton className="h-10 w-full" />
      </div>
      
      {/* User data fields */}
      <div className="space-y-4">
        <div className="space-y-2">
          <Skeleton className="h-5 w-16" />
          <Skeleton className="h-10 w-full" />
        </div>
        <div className="space-y-2">
          <Skeleton className="h-5 w-14" />
          <Skeleton className="h-10 w-full" />
        </div>
      </div>
      
      {/* Password fields */}
      <div className="space-y-4">
        <div className="space-y-2">
          <Skeleton className="h-5 w-20" />
          <Skeleton className="h-10 w-full" />
        </div>
        <div className="space-y-2">
          <Skeleton className="h-5 w-36" />
          <Skeleton className="h-10 w-full" />
        </div>
      </div>
      
      {/* Terms checkbox */}
      <div className="flex items-start space-x-2">
        <Skeleton className="h-5 w-5 mt-0.5" />
        <Skeleton className="h-5 w-full" />
      </div>
      
      {/* Submit button and footer */}
      <Skeleton className="h-10 w-full" />
      <div className="flex justify-center">
        <Skeleton className="h-5 w-56" />
      </div>
    </div>
  );
}
