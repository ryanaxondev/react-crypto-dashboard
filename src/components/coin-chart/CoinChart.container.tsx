import { useChartSearchParams } from '../../hooks/useChartSearchParams';
import { useCoinChart } from '../../hooks/useCoinChart';

import CoinChartRange from './CoinChartRange';
import CoinChartView from './CoinChartView';
import CoinChartSkeleton from '../skeletons/CoinChartSkeleton';

type Props = {
  coinId: string;
};

const CoinChartContainer = ({ coinId }: Props) => {
  const { range, setRange } =
    useChartSearchParams();

  const { data, loading, error } =
    useCoinChart(coinId, range);

  return (
    <div className="w-full">
      <CoinChartRange
        value={range}
        disabled={loading}
        onChange={setRange}
      />

      {!data && loading && (
        <CoinChartSkeleton />
      )}

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
