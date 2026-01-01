import type { ChartRange } from '../../types/coin-chart';
import { CHART_PRESETS } from './chartPresets';

type Props = {
  value: ChartRange;
  onChange: (range: ChartRange) => void;
  disabled?: boolean;
};

const CoinChartRange = ({
  value,
  onChange,
  disabled,
}: Props) => {
  return (
    <div className="flex gap-2 mb-3">
      {CHART_PRESETS.map(
        ({ label, range }) => {
          const isActive = range === value;

          return (
            <button
              key={range}
              disabled={disabled}
              onClick={() => onChange(range)}
              className={`px-3 py-1 rounded text-sm transition ${
                isActive
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-700 text-gray-300'
              } ${
                disabled
                  ? 'opacity-50 cursor-not-allowed'
                  : 'hover:bg-gray-600'
              }`}
            >
              {label}
            </button>
          );
        }
      )}
    </div>
  );
};

export default CoinChartRange;
