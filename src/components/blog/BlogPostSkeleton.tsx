
import { Skeleton } from "@/components/ui/skeleton";

const BlogPostSkeleton = () => {
  return (
    <div>
      {/* Hero Skeleton */}
      <div className="relative h-48 md:h-64 w-full bg-gray-100">
        <Skeleton className="h-full w-full" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="container mx-auto px-4 md:px-6 text-center">
            <div className="flex flex-wrap items-center justify-center gap-3 mb-4">
              <Skeleton className="h-5 w-24 rounded-full" />
              <Skeleton className="h-5 w-20 rounded-full" />
              <Skeleton className="h-5 w-16 rounded-full" />
            </div>
            <Skeleton className="h-10 md:h-12 w-3/4 md:w-2/3 mx-auto mb-6" />
            <div className="flex items-center justify-center">
              <Skeleton className="w-8 h-8 md:w-10 md:h-10 rounded-full" />
              <Skeleton className="ml-2 h-4 w-24" />
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-6 py-4 md:py-6">
        {/* Breadcrumbs Skeleton */}
        <div className="flex items-center space-x-2 mb-6">
          <Skeleton className="h-4 w-16" />
          <Skeleton className="h-4 w-4" />
          <Skeleton className="h-4 w-20" />
        </div>

        {/* Article Content Skeleton */}
        <article className="max-w-3xl mx-auto">
          <div className="bg-white p-4 md:p-6 rounded-lg shadow-sm">
            <div className="space-y-4">
              <Skeleton className="h-6 w-full" />
              <Skeleton className="h-6 w-5/6" />
              <Skeleton className="h-6 w-4/6" />
              
              <div className="py-2">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full mt-2" />
                <Skeleton className="h-4 w-full mt-2" />
                <Skeleton className="h-4 w-11/12 mt-2" />
                <Skeleton className="h-4 w-4/5 mt-2" />
              </div>
              
              <Skeleton className="h-5 w-1/2" />
              
              <div className="py-2">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full mt-2" />
                <Skeleton className="h-4 w-full mt-2" />
                <Skeleton className="h-4 w-3/4 mt-2" />
              </div>
              
              <Skeleton className="h-40 w-full" />
              
              <div className="py-2">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full mt-2" />
                <Skeleton className="h-4 w-full mt-2" />
                <Skeleton className="h-4 w-5/6 mt-2" />
              </div>
            </div>
          </div>
          
          <div className="mt-6 flex justify-between items-center">
            <Skeleton className="h-8 w-24" />
            <Skeleton className="h-8 w-24" />
          </div>
        </article>
      </div>
    </div>
  );
};

export default BlogPostSkeleton;
