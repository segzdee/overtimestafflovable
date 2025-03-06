
import { Skeleton } from "@/components/ui/skeleton";

export function LoginFormSkeleton() {
  return (
    <div className="space-y-4 animate-pulse">
      <div className="space-y-2">
        <Skeleton className="h-4 w-16" />
        <Skeleton className="h-10 w-full" />
      </div>
      
      <div className="space-y-2">
        <Skeleton className="h-4 w-20" />
        <Skeleton className="h-10 w-full" />
      </div>
      
      <div className="flex justify-end">
        <Skeleton className="h-4 w-32" />
      </div>
      
      <Skeleton className="h-10 w-full" />
      
      <div className="flex justify-center">
        <Skeleton className="h-4 w-48" />
      </div>
    </div>
  );
}
