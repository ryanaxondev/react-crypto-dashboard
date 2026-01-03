import { useChartSearchParams } from '@/hooks/useChartSearchParams';
import { useCoinChart } from '@/hooks/useCoinChart';
import { useSavedViews } from '@/hooks/useSavedViews';

import { SavedViewsPanel } from '@/components/saved-views/SavedViewsPanel';
import CoinChartRange from './CoinChartRange';
import CoinChartView from './CoinChartView';
import CoinChartSkeleton from '@/components/skeletons/CoinChartSkeleton';

import type { ChartRange } from '@/types/coin-chart';

type Props = {
  coinId: string;
};

type ChartViewSnapshot = {
  range: ChartRange;
};

const CoinChartContainer = ({ coinId }: Props) => {
  const { range, setRange } = useChartSearchParams();

  const { data, loading, error } =
    useCoinChart(coinId, range);

  const {
    views,
    saveView,
    applyView,
    deleteView,
  } = useSavedViews<ChartViewSnapshot>('chart');

  const currentSnapshot: ChartViewSnapshot = {
    range,
  };

  return (
    <div className="w-full space-y-4">
      <SavedViewsPanel
        views={views}
        onSave={(name) =>
          saveView(name, currentSnapshot)
        }
        onApply={(slug) => {
          const snapshot = applyView(slug);
          if (!snapshot) return;
          setRange(snapshot.range);
        }}
        onDelete={deleteView}
      />

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
