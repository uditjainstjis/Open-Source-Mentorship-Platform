import React from "react";

/**
 * Skeleton component for loading states
 * Provides a shimmer effect to indicate content is loading
 */
export function Skeleton({ className = "", ...props }) {
  return (
    <div
      className={`animate-pulse rounded-md bg-gray-200 ${className}`}
      {...props}
    />
  );
}

/**
 * MentorCardSkeleton - Loading state for MentorCard component
 * Displays a skeleton version of the mentor card while data is being fetched
 */
export function MentorCardSkeleton() {
  return (
    <div className="p-3 border border-gray-200 rounded-xl bg-white w-72 shadow-sm flex flex-col">
      {/* Image Skeleton */}
      <Skeleton className="w-full h-56 mb-3 rounded-lg" />

      {/* Name Skeleton */}
      <Skeleton className="h-6 w-3/4 mb-2" />

      {/* Role and Company Skeleton */}
      <div className="space-y-2 mb-3">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-4/5" />
      </div>

      {/* Skills Section Skeleton */}
      <div className="mb-3">
        <Skeleton className="h-3 w-20 mb-2" />
        <div className="flex gap-1">
          <Skeleton className="h-5 w-16 rounded-full" />
          <Skeleton className="h-5 w-20 rounded-full" />
          <Skeleton className="h-5 w-14 rounded-full" />
        </div>
      </div>

      {/* Footer Section Skeleton */}
      <div className="flex justify-between items-center mt-auto pt-3 border-t border-gray-100">
        <div className="flex gap-3">
          <Skeleton className="h-5 w-5 rounded-full" />
          <Skeleton className="h-5 w-5 rounded-full" />
          <Skeleton className="h-5 w-5 rounded-full" />
        </div>
        <Skeleton className="h-4 w-24" />
      </div>
    </div>
  );
}
