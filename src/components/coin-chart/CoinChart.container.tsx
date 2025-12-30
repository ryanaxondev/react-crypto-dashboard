import type { ChartRange } from '../../types/coin-chart';

import { useCoinChart } from '../../hooks/useCoinChart';
import { useChartRangeParam } from '../../hooks/useChartRangeParam';

import CoinChartRange from './CoinChartRange';
import CoinChartView from './CoinChartView';
import CoinChartSkeleton from '../skeletons/CoinChartSkeleton';

type Props = {
  coinId: string;
};

const CoinChartContainer = ({ coinId }: Props) => {
  const { range, setRange } = useChartRangeParam();

  const { data, loading, error } = useCoinChart(
    coinId,
    range as ChartRange
  );

  return (
    <div className="w-full">
      <CoinChartRange
        value={range as ChartRange}
        disabled={loading}
        onChange={setRange}
      />

      {!data && loading && <CoinChartSkeleton />}

      {data && (
        <CoinChartView
          data={data}
          loading={loading}
        />
      )}

      {error && (
        <p className="mt-2 text-sm text-red-400">
          {error}
        </p>
      )}
    </div>
  );
};

export default CoinChartContainer;
