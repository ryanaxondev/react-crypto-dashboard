import { useEffect, useState } from 'react';
import type { Coin } from '../types/coin';
import { fetchCoins } from '../services/cryptoApi';
import CoinCard from '../components/CoinCard';
import LimitSelector from '../components/LimitSelector';
import FilterInput from '../components/FilterInput';
import SortSelector from '../components/SortSelector';

type SortOption =
  | 'market_cap_desc'
  | 'price_desc'
  | 'price_asc'
  | 'change_desc'
  | 'change_asc';

const Home = () => {
  const [coins, setCoins] = useState<Coin[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const [limit, setLimit] = useState<number>(10);
  const [filter, setFilter] = useState<string>('');
  const [sortBy, setSortBy] =
    useState<SortOption>('market_cap_desc');

  useEffect(() => {
    const loadCoins = async () => {
      setLoading(true);
      try {
        const data = await fetchCoins(limit);
        setCoins(data);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError('Something went wrong');
        }
      } finally {
        setLoading(false);
      }
    };

    loadCoins();
  }, [limit]);

  const filteredCoins = coins
    .filter(
      (coin) =>
        coin.name
          .toLowerCase()
          .includes(filter.toLowerCase()) ||
        coin.symbol
          .toLowerCase()
          .includes(filter.toLowerCase())
    )
    .slice()
    .sort((a, b) => {
      switch (sortBy) {
        case 'market_cap_desc':
          return b.market_cap - a.market_cap;
        case 'price_desc':
          return b.current_price - a.current_price;
        case 'price_asc':
          return a.current_price - b.current_price;
        case 'change_desc':
          return (
            b.price_change_percentage_24h -
            a.price_change_percentage_24h
          );
        case 'change_asc':
          return (
            a.price_change_percentage_24h -
            b.price_change_percentage_24h
          );
        default:
          return 0;
      }
    });

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">
        🚀 Crypto Dash
      </h1>

      {/* Top Controls */}
      <div
        className="
          mb-8
          rounded-xl
          bg-gray-800
          p-4
          shadow
          flex
          flex-col
          gap-4
          sm:flex-row
          sm:items-center
          sm:justify-between
        "
      >
        {/* Left controls */}
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <LimitSelector
            limit={limit}
            onLimitChange={setLimit}
          />

          <SortSelector
            sortBy={sortBy}
            onSortChange={setSortBy}
          />
        </div>

        {/* Right control */}
        <FilterInput
          filter={filter}
          onFilterChange={setFilter}
        />
      </div>

      {loading && (
        <p className="text-center text-gray-400">
          Loading...
        </p>
      )}

      {error && (
        <p className="text-center text-red-500">
          ❌ {error}
        </p>
      )}

      {!loading && !error && (
        <>
          {filteredCoins.length > 0 ? (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {filteredCoins.map((coin) => (
                <CoinCard key={coin.id} coin={coin} />
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-400">
              No coins match your filter.
            </p>
          )}
        </>
      )}
    </div>
  );
};

export default Home;
