import { useSyncedSearchParams } from './useSyncedSearchParam';

import { HOME_PRESETS } from '@/pages/home/homePresets';
import type { SortOption } from '@/types/home';

/* ---------------------------------------------
 * Types
 * ------------------------------------------- */

export type HomeSnapshot = {
  view: string | null;
  limit: number;
  sort: SortOption;
  filter: string;
};

type HomeSearchState = HomeSnapshot;

/* ---------------------------------------------
 * Hook
 * ------------------------------------------- */

export function useHomeSearchParams() {
  const { values, set, setMany } =
    useSyncedSearchParams<HomeSearchState>(
      {
        view: { defaultValue: null },

        limit: {
          defaultValue: 10,
          allowed: [10, 20, 50, 100],
        },

        sort: {
          defaultValue: 'market_cap_desc',
          allowed: [
            'market_cap_desc',
            'price_desc',
            'price_asc',
            'change_desc',
            'change_asc',
          ],
        },

        filter: { defaultValue: '' },
      },
      {
        persistKey: 'persisted:home',
        persistedKeys: ['view', 'limit', 'sort'],
      }
    );

  /* -----------------------------------------
   * Preset application (declarative)
   * --------------------------------------- */

  const applyPreset = (key: string) => {
    const preset = HOME_PRESETS.find(
      (p) => p.key === key
    );

    if (!preset) return;

    setMany({
      view: preset.key,
      limit: preset.limit,
      sort: preset.sort,
    });
  };

  /* -----------------------------------------
   * Snapshot helpers (Saved Views)
   * --------------------------------------- */

  const getSnapshot = (): HomeSnapshot => ({
    view: values.view,
    limit: values.limit,
    sort: values.sort,
    filter: values.filter,
  });

  const applySnapshot = (snapshot: HomeSnapshot) => {
    setMany(snapshot);
  };

  /* -----------------------------------------
   * Public API (consumer-friendly)
   * --------------------------------------- */

  return {
    /* values */
    view: values.view,
    limit: values.limit,
    sortBy: values.sort,
    filter: values.filter,

    /* setters */
    setView: (view: string | null) =>
      set('view', view),

    setLimit: (limit: number) =>
      set('limit', limit),

    setSortBy: (sort: SortOption) =>
      set('sort', sort),

    setFilter: (filter: string) =>
      set('filter', filter),

    /* presets */
    applyPreset,

    /* saved views */
    getSnapshot,
    applySnapshot,
  };
}
