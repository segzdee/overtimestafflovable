
import { Skeleton } from "@/components/ui/skeleton";

export function DashboardSkeleton() {
  return (
    <div className="w-full h-screen bg-gray-100 animate-pulse">
      {/* Header */}
      <div className="bg-white shadow-sm p-4 flex items-center justify-between">
        <div className="flex items-center">
          <Skeleton className="h-10 w-10 rounded-full" />
          <Skeleton className="h-6 w-32 ml-4" />
        </div>
        <div className="flex items-center space-x-4">
          <Skeleton className="h-8 w-8 rounded-full" />
          <Skeleton className="h-8 w-8 rounded-full" />
          <Skeleton className="h-8 w-24" />
        </div>
      </div>

      {/* Main content layout */}
      <div className="flex h-[calc(100vh-64px)]">
        {/* Sidebar */}
        <div className="hidden md:block w-64 bg-white shadow-sm">
          <div className="p-4 space-y-6">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="flex items-center space-x-3">
                <Skeleton className="h-5 w-5" />
                <Skeleton className="h-5 w-24" />
              </div>
            ))}
          </div>
        </div>

        {/* Main content */}
        <div className="flex-1 p-6 overflow-auto">
          {/* Stats cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white p-4 rounded-lg shadow-sm">
                <Skeleton className="h-5 w-24 mb-2" />
                <Skeleton className="h-8 w-16" />
              </div>
            ))}
          </div>

          {/* Charts section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <Skeleton className="h-5 w-32 mb-4" />
              <Skeleton className="h-48 w-full" />
            </div>
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <Skeleton className="h-5 w-32 mb-4" />
              <Skeleton className="h-48 w-full" />
            </div>
          </div>

          {/* Table section */}
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <Skeleton className="h-6 w-48 mb-4" />
            <div className="space-y-3">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="flex items-center space-x-4">
                  <Skeleton className="h-10 w-10 rounded-full" />
                  <div className="space-y-2 flex-1">
                    <Skeleton className="h-4 w-[60%]" />
                    <Skeleton className="h-4 w-[40%]" />
                  </div>
                  <Skeleton className="h-8 w-[15%]" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
