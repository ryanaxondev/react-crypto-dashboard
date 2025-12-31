import { useSyncedSearchParams } from './useSyncedSearchParam';

/* ---------------------------------------------
 * Types
 * ------------------------------------------- */

export type SortOption =
  | 'market_cap_desc'
  | 'price_desc'
  | 'price_asc'
  | 'change_desc'
  | 'change_asc';

export type HomeSearchParams = {
  limit: number;
  sort: SortOption;
  filter: string;
};

/* ---------------------------------------------
 * Constants (stable identity)
 * ------------------------------------------- */

const LIMIT_OPTIONS = [10, 20, 50, 100] as const;

const SORT_OPTIONS: readonly SortOption[] = [
  'market_cap_desc',
  'price_desc',
  'price_asc',
  'change_desc',
  'change_asc',
] as const;

/* ---------------------------------------------
 * Hook
 * ------------------------------------------- */

export function useHomeSearchParams() {
  const { values, set, setMany, reset } =
    useSyncedSearchParams<HomeSearchParams>({
      limit: {
        defaultValue: 10,
        allowed: LIMIT_OPTIONS,
      },
      sort: {
        defaultValue: 'market_cap_desc',
        allowed: SORT_OPTIONS,
      },
      filter: {
        defaultValue: '',
      },
    });

  return {
    /* values */
    limit: values.limit,
    sortBy: values.sort,
    filter: values.filter,

    /* setters */
    setLimit: (limit: number) =>
      set('limit', limit),

    setSortBy: (sort: SortOption) =>
      set('sort', sort),

    setFilter: (filter: string) =>
      set('filter', filter),

    /* advanced */
    setMany,
    reset,
  };
}
