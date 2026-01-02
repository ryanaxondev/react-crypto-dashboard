import type { SortOption } from '@/types/home';

export type HomePreset = {
  key: string;
  label: string;
  limit: number;
  sort: SortOption;
};

export const HOME_PRESETS: readonly HomePreset[] = [
  {
    key: 'top-gainers',
    label: '🔥 Top Gainers',
    limit: 20,
    sort: 'change_desc',
  },
  {
    key: 'trending',
    label: '📈 Trending',
    limit: 50,
    sort: 'market_cap_desc',
  },
  {
    key: 'stable',
    label: '🛡 Stable',
    limit: 20,
    sort: 'price_asc',
  },
] as const;
