import { Link, useParams } from 'react-router-dom';

import { useCoin } from '@/hooks/useCoin';

import AsyncState from '@/components/AsyncState';
import ErrorBoundary from '@/components/ErrorBoundary';
import CoinDetailsSkeleton from '@/components/skeletons/CoinDetailsSkeleton';

import CoinHeader from '@/components/coin/CoinHeader';
import CoinStats from '@/components/coin/CoinStats';
import CoinChartSection from '@/components/coin/CoinChartSection';
import CoinLinks from '@/components/coin/CoinLinks';

const Coin = () => {
  const { id } = useParams<{ id: string }>();
  const { data: coin, loading, error } = useCoin(id);

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <Link
        to="/"
        className="text-sm text-blue-400 hover:underline"
      >
        ← Back to Home
      </Link>

      <AsyncState
        loading={loading}
        error={error}
        data={coin}
        loader={<CoinDetailsSkeleton />}
        emptyFallback={
          <p className="mt-6 text-gray-400">
            No data found.
          </p>
        }
      >
        {(coin) => (
          <ErrorBoundary>
            <div className="mt-8 space-y-8">
              <CoinHeader coin={coin} />
              <CoinStats coin={coin} />
              <CoinChartSection coinId={coin.id} />
              <CoinLinks coin={coin} />
            </div>
          </ErrorBoundary>
        )}
      </AsyncState>
    </div>
  );
};

export default Coin;
