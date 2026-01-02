import type { CoinChartData, CoinChartPoint } from '@/types/coin-chart';

/**
 * Runtime type guard for CoinGecko market_chart response
 */
function hasPricesArray(
  raw: unknown
): raw is { prices: unknown[] } {
  return (
    typeof raw === 'object' &&
    raw !== null &&
    'prices' in raw &&
    Array.isArray(
      (raw as Record<string, unknown>).prices
    )
  );
}

/**
 * Maps raw CoinGecko market_chart response
 * into a stable, UI-safe CoinChartData model.
 */
export function mapCoinChart(
  raw: unknown
): CoinChartData {
  if (!hasPricesArray(raw)) {
    return { points: [] };
  }

  const points: CoinChartPoint[] = raw.prices
    .filter(
      (
        entry
      ): entry is [number, number] =>
        Array.isArray(entry) &&
        entry.length >= 2 &&
        typeof entry[0] === 'number' &&
        typeof entry[1] === 'number'
    )
    .map((entry) => ({
      timestamp: entry[0],
      price: entry[1],
    }));

  return { points };
}
