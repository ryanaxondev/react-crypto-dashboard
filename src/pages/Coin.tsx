import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

interface CoinData {
  id: string;
  name: string;
  symbol: string;
  image: {
    large: string;
  };
  market_data: {
    current_price: {
      usd: number;
    };
  };
}

const Coin = () => {
  const { id } = useParams<{ id: string }>();

  const [coin, setCoin] = useState<CoinData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;

    const fetchCoin = async () => {
      try {
        const res = await fetch(
          `https://api.coingecko.com/api/v3/coins/${id}`
        );

        if (!res.ok) {
          throw new Error('Failed to fetch coin data');
        }

        const data = await res.json();
        setCoin(data);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchCoin();
  }, [id]);

  if (loading) {
    return <p className="text-center text-gray-400">Loading...</p>;
  }

  if (error) {
    return (
      <p className="text-center text-red-500">
        {error}
      </p>
    );
  }

  if (!coin) return null;

  return (
    <div className="flex flex-col items-center gap-4">
      <img src={coin.image.large} alt={coin.name} className="w-24 h-24" />
      <h1 className="text-2xl font-bold">
        {coin.name} ({coin.symbol.toUpperCase()})
      </h1>
      <p className="text-lg">
        Price: ${coin.market_data.current_price.usd.toLocaleString()}
      </p>
    </div>
  );
};

export default Coin;
