import { useEffect, useState } from 'react';
import { fetchCoins } from '../services/cryptoApi';
import type { Coin } from '../types/coin';

const Home = () => {
  const [coins, setCoins] = useState<Coin[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchCoins()
      .then((data) => {
        setCoins(data);
        setLoading(false);
      })
      .catch((err: Error) => {
        setError(err.message);
        setLoading(false);
      });
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
