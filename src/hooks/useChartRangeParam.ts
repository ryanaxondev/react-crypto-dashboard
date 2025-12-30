import type { ChartRange } from '../types/coin-chart';
import { useSyncedSearchParam } from './useSyncedSearchParam';

const DEFAULT_RANGE: ChartRange = 7;

const ALLOWED_RANGES: readonly ChartRange[] = [
  7,
  30,
  365,
];

export function useChartRangeParam() {
  return useSyncedSearchParam<ChartRange>({
    key: 'range',
    defaultValue: DEFAULT_RANGE,
    allowed: ALLOWED_RANGES,
  });
}
