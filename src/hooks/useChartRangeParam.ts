import { useSearchParams } from 'react-router-dom';
import type { ChartRange } from '../types/coin-chart';

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
  const [params, setParams] = useSearchParams();

  const raw = params.get('range');
  const parsed = Number(raw) as ChartRange;

  const range = ALLOWED_RANGES.includes(parsed)
    ? parsed
    : DEFAULT_RANGE;

  const setRange = (next: ChartRange) => {
    const nextParams = new URLSearchParams(params);

    if (next === DEFAULT_RANGE) {
      nextParams.delete('range');
    } else {
      nextParams.set('range', String(next));
    }

    setParams(nextParams, { replace: true });
  };

  return [range, setRange];
}
