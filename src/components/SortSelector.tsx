type SortOption =
  | 'market_cap_desc'
  | 'price_desc'
  | 'price_asc'
  | 'change_desc'
  | 'change_asc';

type SortSelectorProps = {
  sortBy: SortOption;
  onSortChange: (value: SortOption) => void;
};

const SortSelector = ({
  sortBy,
  onSortChange,
}: SortSelectorProps) => {
  return (
    <div className="flex items-center gap-2">
      <label
        htmlFor="sort"
        className="text-xs text-gray-400 whitespace-nowrap"
      >
        Sort by
      </label>

      <select
        id="sort"
        value={sortBy}
        onChange={(e) =>
          onSortChange(e.target.value as SortOption)
        }
        className="
          px-4
          py-2
          rounded-lg
          bg-gray-900
          text-white
          focus:outline-none
          focus:ring-2
          focus:ring-blue-500
        "
      >
        <option value="market_cap_desc">
          Market Cap (High → Low)
        </option>
        <option value="price_desc">
          Price (High → Low)
        </option>
        <option value="price_asc">
          Price (Low → High)
        </option>
        <option value="change_desc">
          24h Change (High → Low)
        </option>
        <option value="change_asc">
          24h Change (Low → High)
        </option>
      </select>
    </div>
  );
};

export default SortSelector;
