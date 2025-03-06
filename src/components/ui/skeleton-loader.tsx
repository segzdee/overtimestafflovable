
import { Skeleton } from "@/components/ui/skeleton";

interface SkeletonLoaderProps {
  variant?: "card" | "table" | "form" | "profile" | "dashboard";
  count?: number;
}

export function SkeletonLoader({ variant = "card", count = 1 }: SkeletonLoaderProps) {
  const renderCardSkeleton = () => (
    <div className="space-y-2">
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-[80%]" />
      <div className="pt-2">
        <Skeleton className="h-8 w-[40%]" />
      </div>
    </div>
  );

  const renderTableRowSkeleton = () => (
    <div className="flex items-center space-x-4 py-3">
      <Skeleton className="h-12 w-12 rounded-full" />
      <div className="space-y-2 flex-1">
        <Skeleton className="h-4 w-[60%]" />
        <Skeleton className="h-4 w-[80%]" />
      </div>
      <Skeleton className="h-8 w-[15%]" />
    </div>
  );

  const renderFormSkeleton = () => (
    <div className="space-y-4">
      <div className="space-y-2">
        <Skeleton className="h-4 w-[40%]" />
        <Skeleton className="h-10 w-full" />
      </div>
      <div className="space-y-2">
        <Skeleton className="h-4 w-[40%]" />
        <Skeleton className="h-10 w-full" />
      </div>
      <div className="space-y-2">
        <Skeleton className="h-4 w-[40%]" />
        <Skeleton className="h-10 w-full" />
      </div>
      <Skeleton className="h-10 w-full" />
    </div>
  );

  const renderProfileSkeleton = () => (
    <div className="flex flex-col items-center space-y-4">
      <Skeleton className="h-24 w-24 rounded-full" />
      <Skeleton className="h-6 w-[40%]" />
      <Skeleton className="h-4 w-[30%]" />
      <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
        <Skeleton className="h-12 w-full" />
        <Skeleton className="h-12 w-full" />
      </div>
    </div>
  );

  const renderDashboardSkeleton = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[1, 2, 3].map((i) => (
          <Skeleton key={i} className="h-32 w-full rounded-lg" />
        ))}
      </div>
      <Skeleton className="h-64 w-full rounded-lg" />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Skeleton className="h-48 w-full rounded-lg" />
        <Skeleton className="h-48 w-full rounded-lg" />
      </div>
    </div>
  );

  const renderSkeleton = () => {
    switch (variant) {
      case "card":
        return renderCardSkeleton();
      case "table":
        return renderTableRowSkeleton();
      case "form":
        return renderFormSkeleton();
      case "profile":
        return renderProfileSkeleton();
      case "dashboard":
        return renderDashboardSkeleton();
      default:
        return renderCardSkeleton();
    }
  };

  return (
    <div className="animate-pulse w-full">
      {Array.from({ length: count }).map((_, index) => (
        <div key={index} className="mb-4">
          {renderSkeleton()}
        </div>
      ))}
    </div>
  );
}
