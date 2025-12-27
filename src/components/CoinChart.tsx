import { Line } from 'react-chartjs-2';
import '../lib/chart';

import { useCoinChart } from '../hooks/useCoinChart';
import AsyncState from './AsyncState';
import CoinChartSkeleton from './skeletons/CoinChartSkeleton';

type CoinChartProps = {
  coinId: string;
  days?: number;
};

const CoinChart = ({
  coinId,
  days = 7,
}: CoinChartProps) => {
  const { data, loading, error } =
    useCoinChart(coinId, days);

  return (
    <AsyncState
      data={data}
      loading={loading}
      error={error}
      loader={<CoinChartSkeleton />}
      isEmpty={(d) => d.points.length === 0}
    >
      {(chart) => (
        <Line
          data={{
            datasets: [
              {
                label: 'Price (USD)',
                data: chart.points.map(
                  (p) => ({
                    x: p.timestamp,
                    y: p.price,
                  })
                ),
                borderColor: '#3b82f6',
                backgroundColor:
                  'rgba(59,130,246,0.15)',
                tension: 0.3,
                pointRadius: 0,
                fill: true,
              },
            ],
          }}
          options={{
            responsive: true,
            maintainAspectRatio: false,
            scales: {
              x: {
                type: 'time',
                grid: {
                  display: false,
                },
              },
              y: {
                grid: {
                  color: 'rgba(255,255,255,0.05)',
                },
              },
            },
          }}
        />
      )}
    </AsyncState>
  );
};

export default CoinChart;
