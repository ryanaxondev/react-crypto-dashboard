import type { ChartRange } from '@/types/coin-chart';

import { useSyncedSearchParams } from './useSyncedSearchParam';

const DEFAULT_RANGE: ChartRange = 7;

const RANGE_OPTIONS: readonly ChartRange[] = [
  7,
  30,
  365,
] as const;

export function useChartSearchParams() {
  const { values, set } =
    useSyncedSearchParams<{ range: ChartRange }>(
      {
        range: {
          defaultValue: DEFAULT_RANGE,
          allowed: RANGE_OPTIONS,
        },
      },
      {
        persistKey: 'persisted:chart',
        persistedKeys: ['range'],
      }
    );

  return {
    range: values.range,
    setRange: (range: ChartRange) =>
      set('range', range),
  };
}
