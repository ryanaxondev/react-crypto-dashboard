import type { ChartRange } from '../../types/coin-chart';

const ranges: ChartRange[] = [7, 30, 365];

type Props = {
  value: ChartRange;
  disabled?: boolean;
  onChange: (r: ChartRange) => void;
};

const CoinChartRange = ({
  value,
  disabled,
  onChange,
}: Props) => {
  return (
    <div className="flex gap-2 mb-3">
      {ranges.map((r) => (
        <button
          key={r}
          disabled={disabled}
          onClick={() => onChange(r)}
          className={`px-3 py-1 rounded text-sm transition ${
            value === r
              ? 'bg-blue-500 text-white'
              : 'bg-gray-700 text-gray-300'
          } ${
            disabled
              ? 'opacity-50 cursor-not-allowed'
              : 'hover:bg-gray-600'
          }`}
        >
          {r === 365 ? '1Y' : `${r}D`}
        </button>
      ))}
    </div>
  );
};

export default CoinChartRange;
