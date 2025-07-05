// app/loading.jsx
export default function Loading() {
  return (
    <div className="flex items-center justify-center min-h-screen ">
      <div className="flex flex-col items-center space-y-4">
        <div className="w-10 h-10 border-4 border-dashed rounded-full animate-spin border-purple-500"></div>
        <p className="text-sm text-gray-600 dark:text-gray-300">Loading, please wait...</p>
      </div>
    </div>
  );
}
