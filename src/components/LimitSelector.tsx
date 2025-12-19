type LimitSelectorProps = {
  limit: number;
  onLimitChange: (value: number) => void;
};

const LimitSelector = ({
  limit,
  onLimitChange,
}: LimitSelectorProps) => {
  return (
    <select
      value={limit}
      onChange={(e) => onLimitChange(Number(e.target.value))}
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
      <option value={5}>5</option>
      <option value={10}>10</option>
      <option value={20}>20</option>
      <option value={50}>50</option>
      <option value={100}>100</option>
    </select>
  );
};

export default LimitSelector;
