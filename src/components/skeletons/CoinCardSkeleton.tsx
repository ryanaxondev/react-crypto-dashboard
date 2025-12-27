const CoinCardSkeleton = () => {
  return (
    <div className="bg-gray-800 rounded-xl p-4 flex flex-col gap-3 animate-pulse">
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-full bg-gray-700" />
        <div className="space-y-2">
          <div className="h-4 w-24 bg-gray-700 rounded" />
          <div className="h-3 w-12 bg-gray-700 rounded" />
        </div>
      </div>

      <div className="h-4 w-32 bg-gray-700 rounded" />
      <div className="h-4 w-28 bg-gray-700 rounded" />
      <div className="h-3 w-40 bg-gray-700 rounded" />
    </div>
  );
};

export default CoinCardSkeleton;
