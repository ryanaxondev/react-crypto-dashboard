import { useEffect, useState } from 'react';
import type { Coin } from '../types/coin';
import { fetchCoins } from '../services/cryptoApi';
import CoinCard from '../components/CoinCard';
import LimitSelector from '../components/LimitSelector';
import FilterInput from '../components/FilterInput';

const Home = () => {
  const [coins, setCoins] = useState<Coin[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [limit, setLimit] = useState<number>(10);
  const [filter, setFilter] = useState<string>('');

  useEffect(() => {
    const loadCoins = async () => {
      setLoading(true);
      try {
        const data = await fetchCoins(limit);
        setCoins(data);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError('Something went wrong');
        }
      } finally {
        setLoading(false);
      }
    };

    loadCoins();
  }, [limit]);

  const filteredCoins = coins.filter(
    (coin) =>
      coin.name.toLowerCase().includes(filter.toLowerCase()) ||
      coin.symbol.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">🚀 Crypto Dash</h1>

      {/* Top Controls */}
      <div className="flex flex-col gap-4 mb-6 sm:flex-row sm:items-center">
        <FilterInput filter={filter} onFilterChange={setFilter} />
        <LimitSelector limit={limit} onLimitChange={setLimit} />
      </div>

      {loading && (
        <p className="text-center text-gray-400">Loading...</p>
      )}

      {error && (
        <p className="text-center text-red-500">❌ {error}</p>
      )}

      {!loading && !error && (
        <>
          {filteredCoins.length > 0 ? (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {filteredCoins.map((coin) => (
                <CoinCard key={coin.id} coin={coin} />
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-400">
              No coins match your filter.
            </p>
          )}
        </>
      )}
    </div>
  );
};

export default Home;
