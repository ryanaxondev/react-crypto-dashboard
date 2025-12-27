import { useEffect, useState } from 'react';
import { fetchCoinChart } from '../services/cryptoApi';
import { mapCoinChart } from '../services/chartMapper';
import type { CoinChartData } from '../types/coin-chart';

export function useCoinChart(
  coinId?: string,
  days = 7
) {
  const [data, setData] =
    useState<CoinChartData | null>(null);
  const [loading, setLoading] =
    useState<boolean>(false);
  const [error, setError] =
    useState<string | null>(null);

  useEffect(() => {
    if (!coinId) return;

    const controller = new AbortController();

    setError(null);
    setLoading(true);

    fetchCoinChart(
      coinId,
      days,
      controller.signal
    )
      .then((raw) => {
        setData(mapCoinChart(raw));
      })
      .catch((err: unknown) => {
        if (
          err instanceof DOMException &&
          err.name === 'AbortError'
        ) {
          return;
        }

        setError(
          err instanceof Error
            ? err.message
            : 'Failed to load chart data'
        );
      })
      .finally(() => {
        setLoading(false);
      });

    return () => controller.abort();
  }, [coinId, days]);

  return { data, loading, error };
}
