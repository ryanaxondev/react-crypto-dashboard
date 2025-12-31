import { useSyncedSearchParam } from './useSyncedSearchParam';

export type SortOption =
  | 'market_cap_desc'
  | 'price_desc'
  | 'price_asc'
  | 'change_desc'
  | 'change_asc';

/* -------------------------------------------------- */
/* Constants                                          */
/* -------------------------------------------------- */

const DEFAULT_LIMIT = 10;
const LIMIT_OPTIONS = [10, 20, 50, 100] as const;

const DEFAULT_SORT: SortOption =
  'market_cap_desc';

const SORT_OPTIONS: readonly SortOption[] =
  [
    'market_cap_desc',
    'price_desc',
    'price_asc',
    'change_desc',
    'change_asc',
  ];

/* -------------------------------------------------- */
/* Hook                                               */
/* -------------------------------------------------- */

export function useHomeSearchParams() {
  const [limit, setLimit] =
    useSyncedSearchParam<number>({
      key: 'limit',
      defaultValue: DEFAULT_LIMIT,
      allowed: LIMIT_OPTIONS,
    });

  const [sortBy, setSortBy] =
    useSyncedSearchParam<SortOption>({
      key: 'sort',
      defaultValue: DEFAULT_SORT,
      allowed: SORT_OPTIONS,
    });

  const [filter, setFilter] =
    useSyncedSearchParam<string>({
      key: 'filter',
      defaultValue: '',
    });

  return {
    limit,
    setLimit,
    sortBy,
    setSortBy,
    filter,
    setFilter,
  };
}
