import type { ChartRange } from '@/types/coin-chart';

export type ChartPreset = {
  label: string;
  range: ChartRange;
};

export const CHART_PRESETS: readonly ChartPreset[] = [
  { label: '7D', range: 7 },
  { label: '30D', range: 30 },
  { label: '1Y', range: 365 },
] as const;
