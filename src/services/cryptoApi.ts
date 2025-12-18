import type { Coin } from '../types/coin';

const BASE_URL = import.meta.env.VITE_COINS_API_URL;

export const fetchCoins = async (): Promise<Coin[]> => {
  const res = await fetch(
    `${BASE_URL}&order=market_cap_desc&per_page=10&page=1&sparkline=false`
  );

  if (!res.ok) {
    throw new Error('Failed to fetch crypto data');
  }

  return res.json();
};
