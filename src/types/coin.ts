export interface Coin {
  id: string;
  name: string;
  symbol: string;
  image: string;

  current_price: number | null;
  market_cap: number | null;
  price_change_percentage_24h: number | null;
}
