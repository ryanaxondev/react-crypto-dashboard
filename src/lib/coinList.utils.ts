import type { Coin } from '../types/coin';

type SortOption =
  | 'market_cap_desc'
  | 'price_desc'
  | 'price_asc'
  | 'change_desc'
  | 'change_asc';

const safeNumber = (value: number | null | undefined) =>
  value ?? -Infinity;

export const filterAndSortCoins = (
  coins: Coin[],
  filter: string,
  sortBy: SortOption
): Coin[] => {
  const normalizedFilter = filter.toLowerCase();

  return coins
    .filter(
      (coin) =>
        coin.name.toLowerCase().includes(normalizedFilter) ||
        coin.symbol.toLowerCase().includes(normalizedFilter)
    )
    .slice()
    .sort((a, b) => {
      switch (sortBy) {
        case 'market_cap_desc':
          return (
            safeNumber(b.market_cap) -
            safeNumber(a.market_cap)
          );

        case 'price_desc':
          return (
            safeNumber(b.current_price) -
            safeNumber(a.current_price)
          );

        case 'price_asc':
          return (
            safeNumber(a.current_price) -
            safeNumber(b.current_price)
          );

        case 'change_desc':
          return (
            safeNumber(
              b.price_change_percentage_24h
            ) -
            safeNumber(
              a.price_change_percentage_24h
            )
          );

        case 'change_asc':
          return (
            safeNumber(
              a.price_change_percentage_24h
            ) -
            safeNumber(
              b.price_change_percentage_24h
            )
          );

        default:
          return 0;
      }
    });
};
