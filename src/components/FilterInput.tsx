type FilterInputProps = {
  filter: string;
  onFilterChange: (value: string) => void;
};

const FilterInput = ({ filter, onFilterChange }: FilterInputProps) => {
  return (
    <input
      type="text"
      value={filter}
      onChange={(e) => onFilterChange(e.target.value)}
      placeholder="Filter by name or symbol..."
      className="
        w-full
        px-4
        py-2
        rounded-lg
        bg-gray-700
        text-white
        focus:outline-none
        focus:ring-2
        focus:ring-blue-500
      "
    />
  );
};

export default FilterInput;
