export default function PostSkeleton() {
  return (
    <div className="animate-pulse bg-white dark:bg-gray-800 p-4 rounded-xl shadow">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 bg-gray-300 rounded-full"></div>
        <div className="h-4 bg-gray-300 rounded w-24"></div>
      </div>
      <div className="w-full h-64 bg-gray-300 rounded-lg"></div>
      <div className="mt-3 h-4 bg-gray-300 rounded w-3/4"></div>
    </div>
  );
}
