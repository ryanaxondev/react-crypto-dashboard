import { useMemo } from 'react';

import { useCoins } from '../hooks/useCoins';
import { useHomeSearchParams } from '../hooks/useHomeSearchParams';
import { useDebouncedValue } from '../hooks/useDebouncedValue';

import type { Coin } from '../types/coin';

import CoinCard from '../components/CoinCard';
import LimitSelector from '../components/LimitSelector';
import FilterInput from '../components/FilterInput';
import SortSelector from '../components/SortSelector';
import ErrorBoundary from '../components/ErrorBoundary';
import AsyncState from '../components/AsyncState';
import CoinCardSkeletonGrid from '../components/skeletons/CoinCardSkeletonGrid';

import { filterAndSortCoins } from '../lib/coinList.utils';

function Home() {
  /* ---------------- URL-synced state ---------------- */

  const {
    limit,
    setLimit,
    sortBy,
    setSortBy,
    filter,
    setFilter,
  } = useHomeSearchParams();

  /* ---------------- Data fetching ---------------- */

  const {
    data: coins = [],
    loading,
    error,
  } = useCoins(limit);

  /* ---------------- Derived data ---------------- */

  const debouncedFilter =
    useDebouncedValue(filter, 300);

  const visibleCoins = useMemo(
    () =>
      filterAndSortCoins(
        coins,
        debouncedFilter,
        sortBy
      ),
    [coins, debouncedFilter, sortBy]
  );

  /* ---------------- Render ---------------- */

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">
        🚀 Crypto Dashboard
      </h1>

      <div className="mb-8 rounded-xl bg-gray-800 p-4 shadow flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex-1">
          <FilterInput
            filter={filter}
            onFilterChange={setFilter}
          />
        </div>

        <div className="flex gap-3 mt-2 sm:mt-0">
          <LimitSelector
            limit={limit}
            onLimitChange={setLimit}
          />
          <SortSelector
            sortBy={sortBy}
            onSortChange={setSortBy}
          />
        </div>
      </div>

      <AsyncState
        loading={loading}
        error={error}
        data={visibleCoins}
        loader={<CoinCardSkeletonGrid count={limit} />}
        emptyFallback={
          <p className="text-center text-gray-400">
            No coins match your filter.
          </p>
        }
      >
        {(coins: Coin[]) => (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {coins.map((coin) => (
              <ErrorBoundary key={coin.id}>
                <CoinCard coin={coin} />
              </ErrorBoundary>
            ))}
          </div>
        )}
      </AsyncState>
    </div>
  );
}

export default Home;
