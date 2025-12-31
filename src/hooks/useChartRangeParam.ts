import type { ChartRange } from '../types/coin-chart';
import { useSyncedSearchParams } from './useSyncedSearchParam';

const DEFAULT_RANGE: ChartRange = 7;

const ALLOWED_RANGES: readonly ChartRange[] = [
  7,
  30,
  365,
];

export function useChartRangeParam(): [
  ChartRange,
  (next: ChartRange) => void
] {
  const { values, set } =
    useSyncedSearchParams<{
      range: ChartRange;
    }>({
      range: {
        defaultValue: DEFAULT_RANGE,
        allowed: ALLOWED_RANGES,
      },
    });

  return [
    values.range,
    (next: ChartRange) => set('range', next),
  ];
}
