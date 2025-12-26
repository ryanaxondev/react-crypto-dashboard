import type { Coin } from '../types/coin';
import type { CoinApiResponse, CoinUIModel } from '../types/coin-details';
import { mapCoinApiToUI } from './coinMapper';

const BASE_URL = import.meta.env.VITE_COINS_API_URL;

export const fetchCoins = async (
  limit: number
): Promise<Coin[]> => {
  const res = await fetch(
    `${BASE_URL}&order=market_cap_desc&per_page=${limit}&page=1&sparkline=false`
  );

  if (!res.ok) {
    throw new Error('Failed to fetch crypto data');
  }

  return res.json();
};

export const fetchCoinById = async (
  id: string
): Promise<CoinUIModel> => {
  const res = await fetch(
    `https://api.coingecko.com/api/v3/coins/${id}`
  );

  if (!res.ok) {
    throw new Error('Failed to fetch coin data');
  }

  const data: CoinApiResponse = await res.json();
  return mapCoinApiToUI(data);
};
