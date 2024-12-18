export default function Loading() {
  return (
    <div
      data-testid="loading"
      className="min-h-screen bg-gray-900 flex items-center justify-center"
    >
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-600"></div>
    </div>
  );
}
