import type { Coin } from '@/types/coin';
import type { CoinApiResponse, CoinDetails } from '@/types/coin-details';

import { mapCoinApiToUI } from './coinMapper';

const BASE_URL = import.meta.env.VITE_COINS_API_URL;

/* ------------------------------------------------------------------ */
/* Coins list                                                         */
/* ------------------------------------------------------------------ */

export const fetchCoins = async (
  limit: number,
  signal?: AbortSignal
): Promise<Coin[]> => {
  const res = await fetch(
    `${BASE_URL}&order=market_cap_desc&per_page=${limit}&page=1&sparkline=false`,
    { signal }
  );

  if (!res.ok) {
    throw new Error('Failed to fetch crypto data');
  }

  return res.json();
};

/* ------------------------------------------------------------------ */
/* Coin details                                                       */
/* ------------------------------------------------------------------ */

export const fetchCoinById = async (
  id: string,
  signal?: AbortSignal
): Promise<CoinDetails> => {
  const res = await fetch(
    `https://api.coingecko.com/api/v3/coins/${id}`,
    { signal }
  );

  if (!res.ok) {
    throw new Error('Failed to fetch coin data');
  }

  const data: CoinApiResponse = await res.json();
  return mapCoinApiToUI(data);
};

/* ------------------------------------------------------------------ */
/* Coin chart                                                         */
/* ------------------------------------------------------------------ */

export const fetchCoinChart = async (
  coinId: string,
  days: number,
  signal?: AbortSignal
) => {
  const res = await fetch(
    `https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=usd&days=${days}`,
    { signal }
  );

  if (!res.ok) {
    throw new Error('Failed to fetch chart data');
  }

  return res.json();
};
