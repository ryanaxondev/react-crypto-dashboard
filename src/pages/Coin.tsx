import { Link, useParams } from 'react-router-dom';
import ErrorBoundary from '../components/ErrorBoundary';
import { useCoin } from '../hooks/useCoin';
import CoinDetailsSkeleton from '../components/skeletons/CoinDetailsSkeleton';
import AsyncState from '../components/AsyncState';

const Coin = () => {
  const { id } = useParams<{ id: string }>();
  const { coin, loading, error } = useCoin(id);

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <Link
        to="/"
        className="text-sm text-blue-400 hover:underline"
      >
        ← Back to Home
      </Link>

      <h1 className="mt-4 text-3xl font-bold">
        {coin ? `${coin.name} (${coin.symbol})` : 'Coin Details'}
      </h1>

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
            <div className="mt-8 space-y-6">
              {coin.image && (
                <img
                  src={coin.image}
                  alt={coin.name}
                  className="w-24 h-24"
                />
              )}

              <p className="text-gray-300">{coin.description}</p>

              <div className="grid sm:grid-cols-2 gap-4 text-sm">
                <p>Rank: {coin.rank ?? 'N/A'}</p>

                <p>
                  Price: $
                  {coin.price?.toLocaleString() ?? 'N/A'}
                </p>

                <p>
                  Market Cap: $
                  {coin.marketCap?.toLocaleString() ?? 'N/A'}
                </p>

                <p>
                  24h High: $
                  {coin.high24h?.toLocaleString() ?? 'N/A'}
                </p>

                <p>
                  24h Low: $
                  {coin.low24h?.toLocaleString() ?? 'N/A'}
                </p>

                <p>
                  24h Change:{' '}
                  {coin.priceChange24h !== null
                    ? `$${coin.priceChange24h.toFixed(2)}`
                    : 'N/A'}{' '}
                  (
                  {coin.priceChangePercent24h !== null
                    ? `${coin.priceChangePercent24h.toFixed(2)}%`
                    : 'N/A'}
                  )
                </p>

                <p>
                  Circulating Supply:{' '}
                  {coin.circulatingSupply?.toLocaleString() ?? 'N/A'}
                </p>

                <p>
                  Total Supply:{' '}
                  {coin.totalSupply?.toLocaleString() ?? 'N/A'}
                </p>

                <p>
                  Max Supply:{' '}
                  {coin.maxSupply?.toLocaleString() ?? 'N/A'}
                </p>

                <p>
                  ATH: $
                  {coin.ath?.toLocaleString() ?? 'N/A'} (
                  {coin.athDate
                    ? new Date(coin.athDate).toLocaleDateString()
                    : 'N/A'}
                  )
                </p>

                <p>
                  ATL: $
                  {coin.atl?.toLocaleString() ?? 'N/A'} (
                  {coin.atlDate
                    ? new Date(coin.atlDate).toLocaleDateString()
                    : 'N/A'}
                  )
                </p>

                <p>
                  Last Updated:{' '}
                  {coin.lastUpdated
                    ? new Date(coin.lastUpdated).toLocaleString()
                    : 'N/A'}
                </p>
              </div>

              <div className="space-y-2">
                {coin.website && (
                  <a
                    href={coin.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block text-blue-400 hover:underline"
                  >
                    🌐 Official Website
                  </a>
                )}

                {coin.explorer && (
                  <a
                    href={coin.explorer}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block text-blue-400 hover:underline"
                  >
                    🧩 Blockchain Explorer
                  </a>
                )}

                {coin.categories.length > 0 && (
                  <p className="text-xs text-gray-400">
                    Categories: {coin.categories.join(', ')}
                  </p>
                )}
              </div>
            </div>
          </ErrorBoundary>
        )}
      </AsyncState>
    </div>
  );
};

export default Coin;
