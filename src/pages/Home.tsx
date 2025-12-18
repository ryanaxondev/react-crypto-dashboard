import { useEffect, useState } from 'react';
import type { Coin } from '../types/coin';
import { fetchCoins } from '../services/cryptoApi';

const Home = () => {
  const [coins, setCoins] = useState<Coin[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadCoins = async () => {
      try {
        const data: Coin[] = await fetchCoins();
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
  }, []);

  if (loading) {
    return <p className="text-center">Loading...</p>;
  }

  if (error) {
    return <p className="text-red-500 text-center">{error}</p>;
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">🚀 Crypto Dash</h1>

      <ul className="space-y-4">
        {coins.map((coin) => (
          <li
            key={coin.id}
            className="flex items-center justify-between bg-gray-800 p-4 rounded-xl"
          >
            <div className="flex items-center gap-3">
              <img src={coin.image} alt={coin.name} className="w-8 h-8" />
              <span>{coin.name}</span>
            </div>

            <span>${coin.current_price.toLocaleString()}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;
