import { useEffect, useState } from 'react';
import { fetchCoinById } from '../services/cryptoApi';
import type { CoinUIModel } from '../types/coin-details';

export const useCoin = (id?: string) => {
  const [coin, setCoin] = useState<CoinUIModel | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;

    const fetchCoin = async () => {
      try {
        setLoading(true);
        const data = await fetchCoinById(id);
        setCoin(data);
        setError(null);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : 'Something went wrong'
        );
        setCoin(null);
      } finally {
        setLoading(false);
      }
    };

    fetchCoin();
  }, [id]);

  return {
    coin,
    loading,
    error,
  };
};
