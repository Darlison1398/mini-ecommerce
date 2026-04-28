export const ProductSkeleton = () => {
  return (
    <div className="animate-pulse bg-white dark:bg-gray-800 rounded-2xl p-4 shadow">
      <div className="h-40 bg-gray-300 dark:bg-gray-700 rounded mb-4"></div>

      <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-3/4 mb-2"></div>
      <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-1/2 mb-4"></div>

      <div className="h-6 bg-gray-300 dark:bg-gray-700 rounded w-1/3 mb-4"></div>

      <div className="h-10 bg-gray-300 dark:bg-gray-700 rounded"></div>
    </div>
  );
};