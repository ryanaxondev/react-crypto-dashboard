import type { CoinApiResponse, CoinDetails } from '@/types/coin-details';

export const mapCoinApiToUI = (
  coin: CoinApiResponse
): CoinDetails => {
  const market = coin.market_data;

  return {
    id: coin.id,
    name: coin.name,
    symbol: coin.symbol.toUpperCase(),
    image: coin.image?.large ?? null,
    description:
      coin.description?.en?.split('. ')[0]?.concat('.') ??
      'No description available.',
    rank: coin.market_cap_rank ?? null,

    price: market?.current_price?.usd ?? null,
    marketCap: market?.market_cap?.usd ?? null,
    high24h: market?.high_24h?.usd ?? null,
    low24h: market?.low_24h?.usd ?? null,
    priceChange24h: market?.price_change_24h ?? null,
    priceChangePercent24h:
      market?.price_change_percentage_24h ?? null,

    circulatingSupply: market?.circulating_supply ?? null,
    totalSupply: market?.total_supply ?? null,
    maxSupply: market?.max_supply ?? null,

    ath: market?.ath?.usd ?? null,
    athDate: market?.ath_date?.usd ?? null,
    atl: market?.atl?.usd ?? null,
    atlDate: market?.atl_date?.usd ?? null,

    website: coin.links?.homepage?.[0] ?? null,
    explorer: coin.links?.blockchain_site?.[0] ?? null,
    categories: coin.categories ?? [],

    lastUpdated: coin.last_updated ?? null,
  };
};
