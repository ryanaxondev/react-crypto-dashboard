import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import ErrorBoundary from '../components/ErrorBoundary';

type CoinDetails = {
  id: string;
  name: string;
  symbol: string;

  image?: {
    large?: string;
  };

  description?: {
    en?: string;
  };

  market_cap_rank?: number;

  market_data?: {
    current_price?: { usd?: number };
    market_cap?: { usd?: number };
    high_24h?: { usd?: number };
    low_24h?: { usd?: number };
    price_change_24h?: number;
    price_change_percentage_24h?: number;
    circulating_supply?: number;
    total_supply?: number | null;
    max_supply?: number | null;
    ath?: { usd?: number };
    ath_date?: { usd?: string };
    atl?: { usd?: number };
    atl_date?: { usd?: string };
  };

  links?: {
    homepage?: string[];
    blockchain_site?: string[];
  };

  categories?: string[];
  last_updated?: string;
};

const Coin = () => {
  const { id } = useParams<{ id: string }>();

  const [coin, setCoin] = useState<CoinDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCoin = async () => {
      try {
        const res = await fetch(
          `https://api.coingecko.com/api/v3/coins/${id}`
        );

        if (!res.ok) {
          throw new Error('Failed to fetch coin data');
        }

        const data: CoinDetails = await res.json();
        setCoin(data);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : 'Something went wrong'
        );
      } finally {
        setLoading(false);
      }
    };

    fetchCoin();
  }, [id]);

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <Link
        to="/"
        className="text-sm text-blue-400 hover:underline"
      >
        ← Back to Home
      </Link>

      <h1 className="mt-4 text-3xl font-bold">
        {coin
          ? `${coin.name} (${coin.symbol.toUpperCase()})`
          : 'Coin Details'}
      </h1>

      {loading && (
        <p className="mt-6 text-gray-400">Loading...</p>
      )}

      {error && (
        <p className="mt-6 text-red-400">❌ {error}</p>
      )}

      {!loading && !error && coin && (
        <ErrorBoundary>
          <div className="mt-8 space-y-6">
            {coin.image?.large && (
              <img
                src={coin.image.large}
                alt={coin.name}
                className="w-24 h-24"
              />
            )}

            <p className="text-gray-300">
              {coin.description?.en
                ?.split('. ')[0]
                ?.concat('.') ?? 'No description available.'}
            </p>

            {coin.market_data && (
              <div className="grid sm:grid-cols-2 gap-4 text-sm">
                <p>Rank: #{coin.market_cap_rank ?? 'N/A'}</p>

                <p>
                  Price: $
                  {coin.market_data.current_price?.usd?.toLocaleString() ??
                    'N/A'}
                </p>

                <p>
                  Market Cap: $
                  {coin.market_data.market_cap?.usd?.toLocaleString() ??
                    'N/A'}
                </p>

                <p>
                  24h High: $
                  {coin.market_data.high_24h?.usd?.toLocaleString() ??
                    'N/A'}
                </p>

                <p>
                  24h Low: $
                  {coin.market_data.low_24h?.usd?.toLocaleString() ??
                    'N/A'}
                </p>

                <p>
                  24h Change:{' '}
                  {coin.market_data.price_change_24h !== undefined
                    ? `$${coin.market_data.price_change_24h.toFixed(2)}`
                    : 'N/A'}{' '}
                  (
                  {coin.market_data.price_change_percentage_24h !==
                  undefined
                    ? `${coin.market_data.price_change_percentage_24h.toFixed(
                        2
                      )}%`
                    : 'N/A'}
                  )
                </p>

                <p>
                  Circulating Supply:{' '}
                  {coin.market_data.circulating_supply?.toLocaleString() ??
                    'N/A'}
                </p>

                <p>
                  Total Supply:{' '}
                  {coin.market_data.total_supply?.toLocaleString() ??
                    'N/A'}
                </p>

                <p>
                  Max Supply:{' '}
                  {coin.market_data.max_supply?.toLocaleString() ??
                    'N/A'}
                </p>

                <p>
                  ATH: $
                  {coin.market_data.ath?.usd?.toLocaleString() ??
                    'N/A'}{' '}
                  (
                  {coin.market_data.ath_date?.usd
                    ? new Date(
                        coin.market_data.ath_date.usd
                      ).toLocaleDateString()
                    : 'N/A'}
                  )
                </p>

                <p>
                  ATL: $
                  {coin.market_data.atl?.usd?.toLocaleString() ??
                    'N/A'}{' '}
                  (
                  {coin.market_data.atl_date?.usd
                    ? new Date(
                        coin.market_data.atl_date.usd
                      ).toLocaleDateString()
                    : 'N/A'}
                  )
                </p>

                <p>
                  Last Updated:{' '}
                  {coin.last_updated
                    ? new Date(coin.last_updated).toLocaleString()
                    : 'N/A'}
                </p>
              </div>
            )}

            <div className="space-y-2">
              {coin.links?.homepage?.[0] && (
                <a
                  href={coin.links.homepage[0]}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-blue-400 hover:underline"
                >
                  🌐 Official Website
                </a>
              )}

              {coin.links?.blockchain_site?.[0] && (
                <a
                  href={coin.links.blockchain_site[0]}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-blue-400 hover:underline"
                >
                  🧩 Blockchain Explorer
                </a>
              )}

              {coin.categories?.length ? (
                <p className="text-xs text-gray-400">
                  Categories: {coin.categories.join(', ')}
                </p>
              ) : null}
            </div>
          </div>
        </ErrorBoundary>
      )}

      {!loading && !error && !coin && (
        <p className="mt-6 text-gray-400">No data found.</p>
      )}
    </div>
  );
};

export default Coin;
