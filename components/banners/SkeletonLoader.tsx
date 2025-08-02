export default function SkeletonBanner() {
    return (
      <div className="animate-pulse p-4 border rounded-lg bg-gray-100">
        <div className="h-40 bg-gray-300 rounded mb-4" />
        <div className="h-4 bg-gray-300 rounded w-3/4 mb-2" />
        <div className="h-4 bg-gray-300 rounded w-1/2" />
      </div>
    );
  }
  