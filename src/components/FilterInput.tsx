type FilterInputProps = {
  filter: string;
  onFilterChange: (value: string) => void;
};

const FilterInput = ({
  filter,
  onFilterChange,
}: FilterInputProps) => {
  return (
    <input
      type="text"
      placeholder="Filter by name or symbol..."
      value={filter}
      onChange={(e) => onFilterChange(e.target.value)}
      className="
        w-full
        sm:w-64
        px-4
        py-2
        rounded-lg
        bg-gray-900
        text-white
        placeholder-gray-500
        focus:outline-none
        focus:ring-2
        focus:ring-blue-500
      "
    />
  );
};

export default FilterInput;
