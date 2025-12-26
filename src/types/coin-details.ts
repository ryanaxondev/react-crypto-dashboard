// Raw response from CoinGecko (defensive)
export type CoinApiResponse = {
  id: string;
  name: string;
  symbol: string;

  image?: {
    large?: string;
  };

  description?: {
    en?: string;
  };

  market_cap_rank?: number;

  market_data?: {
    current_price?: { usd?: number };
    market_cap?: { usd?: number };
    high_24h?: { usd?: number };
    low_24h?: { usd?: number };
    price_change_24h?: number;
    price_change_percentage_24h?: number;
    circulating_supply?: number;
    total_supply?: number | null;
    max_supply?: number | null;
    ath?: { usd?: number };
    ath_date?: { usd?: string };
    atl?: { usd?: number };
    atl_date?: { usd?: string };
  };

  links?: {
    homepage?: string[];
    blockchain_site?: string[];
  };

  categories?: string[];
  last_updated?: string;
};

// Clean model for UI (optimistic)
export type CoinUIModel = {
  id: string;
  name: string;
  symbol: string;
  image: string | null;
  description: string;
  rank: number | null;

  price: number | null;
  marketCap: number | null;
  high24h: number | null;
  low24h: number | null;
  priceChange24h: number | null;
  priceChangePercent24h: number | null;

  circulatingSupply: number | null;
  totalSupply: number | null;
  maxSupply: number | null;

  ath: number | null;
  athDate: string | null;
  atl: number | null;
  atlDate: string | null;

  website: string | null;
  explorer: string | null;
  categories: string[];

  lastUpdated: string | null;
};
