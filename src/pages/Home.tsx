import { useEffect, useState } from 'react';
import type { Coin } from '../types/coin';
import { fetchCoins } from '../services/cryptoApi';
import CoinCard from '../components/CoinCard';
import LimitSelector from '../components/LimitSelector';

const Home = () => {
  const [coins, setCoins] = useState<Coin[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [limit, setLimit] = useState<number>(10);

  useEffect(() => {
  const loadCoins = async () => {
    setLoading(true);
    setError(null);

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

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">🚀 Crypto Dash</h1>

      <LimitSelector limit={limit} onLimitChange={setLimit} />

      {loading && (
        <p className="text-center text-gray-400">Loading...</p>
      )}

      {error && (
        <p className="text-center text-red-500">❌ {error}</p>
      )}

      {!loading && !error && (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {coins.map((coin) => (
            <CoinCard key={coin.id} coin={coin} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;
