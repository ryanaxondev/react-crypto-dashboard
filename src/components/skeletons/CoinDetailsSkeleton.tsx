const CoinDetailsSkeleton = () => {
  return (
    <div className="mt-8 space-y-6 animate-pulse">
      <div className="w-24 h-24 rounded-full bg-gray-700" />

      <div className="space-y-2">
        <div className="h-4 w-full bg-gray-700 rounded" />
        <div className="h-4 w-5/6 bg-gray-700 rounded" />
        <div className="h-4 w-4/6 bg-gray-700 rounded" />
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        {Array.from({ length: 10 }).map((_, i) => (
          <div
            key={i}
            className="h-4 w-40 bg-gray-700 rounded"
          />
        ))}
      </div>
    </div>
  );
};

export default CoinDetailsSkeleton;
