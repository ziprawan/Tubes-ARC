'use client';

export default function DisasterCardSkeleton() {
  return (
    <div className="relative overflow-hidden rounded-lg shadow-sm border border-gray-200 bg-white animate-pulse">
      <div className="p-6">
        {/* Header Skeleton */}
        <div className="flex items-start space-x-4 mb-4">
          <div className="flex-shrink-0 p-3 rounded-lg bg-gray-200 w-12 h-12"></div>
          <div className="flex-1 min-w-0">
            <div className="h-4 bg-gray-300 rounded w-24 mb-2"></div>
            <div className="h-3 bg-gray-200 rounded w-16"></div>
          </div>
        </div>

        {/* Location Skeleton */}
        <div className="mb-4">
          <div className="h-5 bg-gray-300 rounded w-3/4 mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-32"></div>
        </div>

        {/* Footer Skeleton */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-200">
          <div className="h-3 bg-gray-200 rounded w-24"></div>
          <div className="h-3 bg-gray-200 rounded w-16"></div>
        </div>
      </div>
    </div>
  );
}
