import { Line } from 'react-chartjs-2';

import { useMemo } from 'react';
import type {
  ChartData,
  ChartOptions,
  ScriptableContext,
  TooltipItem,
} from 'chart.js';

import type { CoinChartData } from '@/types/coin-chart';
import { getGradient } from './coinChart.utils';

type Props = {
  data: CoinChartData;
  loading?: boolean;
};

const CoinChartView = ({
  data,
  loading,
}: Props) => {
  const chartData = useMemo<
    ChartData<'line', { x: number; y: number }[]>
  >(() => {
    if (data.points.length < 2) {
      return { datasets: [] };
    }

    const prices = data.points;
    const isUp =
      prices.at(-1)!.price >= prices[0]!.price;

    return {
      datasets: [
        {
          data: prices.map((p) => ({
            x: p.timestamp,
            y: p.price,
          })),
          borderColor: isUp
            ? '#22c55e'
            : '#ef4444',
          fill: true,
          backgroundColor: (
            ctx: ScriptableContext<'line'>
          ) => {
            const area =
              ctx.chart.chartArea;
            if (!area) return undefined;

            return getGradient(
              ctx.chart.ctx,
              area,
              isUp
            );
          },
          tension: 0.3,
          pointRadius: 0,
        },
      ],
    };
  }, [data]);

  const options: ChartOptions<'line'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        callbacks: {
          label: (ctx: TooltipItem<'line'>) =>
            ctx.parsed.y == null
              ? ''
              : `$${ctx.parsed.y.toLocaleString()}`,
          title: (items) =>
            items[0]?.parsed.x
              ? new Date(
                  items[0].parsed.x
                ).toLocaleDateString()
              : '',
        },
      },
    },
    scales: {
      x: {
        type: 'time',
        grid: { display: false },
      },
      y: {
        ticks: {
          callback: (v) =>
            `$${Number(v).toLocaleString()}`,
        },
        grid: {
          color: 'rgba(255,255,255,0.05)',
        },
      },
    },
  };

  return (
    <div className="relative h-64 w-full">
      <Line data={chartData} options={options} />

      {loading && (
        <div className="absolute inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center">
          <span className="text-sm text-white/80">
            Updating…
          </span>
        </div>
      )}
    </div>
  );
};

export default CoinChartView;
