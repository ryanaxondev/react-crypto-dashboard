import CoinCardSkeleton from './CoinCardSkeleton';

type Props = {
  count?: number;
};

const CoinCardSkeletonGrid = ({
  count = 10,
}: Props) => {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: count }).map(
        (_, i) => (
          <CoinCardSkeleton key={i} />
        )
      )}
    </div>
  );
};

export default CoinCardSkeletonGrid;
