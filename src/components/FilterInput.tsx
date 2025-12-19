type FilterInputProps = {
  filter: string;
  onFilterChange: (value: string) => void;
};

const FilterInput = ({ filter, onFilterChange }: FilterInputProps) => {
  return (
    <div className="w-full">
      <input
        type="text"
        placeholder="Filter by name or symbol..."
        value={filter}
        onChange={(e) => onFilterChange(e.target.value)}
        className="
          w-full
          px-4
          py-2
          rounded-lg
          bg-gray-800
          text-white
          placeholder-gray-400
          focus:outline-none
          focus:ring-2
          focus:ring-blue-500
        "
      />
    </div>
  );
};

export default FilterInput;
