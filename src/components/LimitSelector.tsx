interface LimitSelectorProps {
  limit: number;
  onLimitChange: (value: number) => void;
}

const LimitSelector = ({ limit, onLimitChange }: LimitSelectorProps) => {
  return (
    <div className="flex items-center justify-end gap-2 mb-6">
      <label htmlFor="limit" className="font-medium text-sm">
        Show:
      </label>

      <select
        id="limit"
        value={limit}
        onChange={(e) => onLimitChange(Number(e.target.value))}
        className="bg-gray-800 text-white rounded-md px-3 py-1 focus:outline-none"
      >
        <option value={5}>5</option>
        <option value={10}>10</option>
        <option value={20}>20</option>
        <option value={50}>50</option>
        <option value={100}>100</option>
      </select>
    </div>
  );
};

export default LimitSelector;
