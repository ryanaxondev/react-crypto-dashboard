import { Line } from 'react-chartjs-2';
import '../lib/chart';

import { useReducer, useMemo } from 'react';
import type {
  ChartData,
  ChartOptions,
  ScriptableContext,
  TooltipItem,
} from 'chart.js';

import type { ChartRange } from '../types/coin-chart';
import { useCoinChart } from '../hooks/useCoinChart';
import AsyncState from './AsyncState';
import CoinChartSkeleton from './skeletons/CoinChartSkeleton';

/* ------------------------------------------------------------------ */
/* Reducer                                                            */
/* ------------------------------------------------------------------ */

type State = {
  range: ChartRange;
};

type Action =
  | { type: 'SET_RANGE'; payload: ChartRange };

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'SET_RANGE':
      return { range: action.payload };
    default:
      return state;
  }
}

/* ------------------------------------------------------------------ */
/* Helpers                                                             */
/* ------------------------------------------------------------------ */

function getGradient(
  ctx: CanvasRenderingContext2D,
  area: { top: number; bottom: number },
  up: boolean
): CanvasGradient {
  const gradient = ctx.createLinearGradient(
    0,
    area.top,
    0,
    area.bottom
  );

  gradient.addColorStop(
    0,
    up
      ? 'rgba(34,197,94,0.4)'
      : 'rgba(239,68,68,0.4)'
  );
  gradient.addColorStop(1, 'rgba(0,0,0,0)');

  return gradient;
}

/* ------------------------------------------------------------------ */
/* Component                                                           */
/* ------------------------------------------------------------------ */

type CoinChartProps = {
  coinId: string;
};

const CoinChart = ({ coinId }: CoinChartProps) => {
  const [state, dispatch] = useReducer(reducer, {
    range: 7,
  });

  const { data, loading, error } = useCoinChart(
    coinId,
    state.range
  );

  const ranges: ChartRange[] = [7, 30, 365];

  const chartData = useMemo<
    ChartData<'line', { x: number; y: number }[]>
  >(() => {
    if (!data || data.points.length < 2) {
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
            const chart = ctx.chart;
            const area = chart.chartArea;

            if (!area) return undefined;

            return getGradient(
              chart.ctx,
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
          label: (ctx: TooltipItem<'line'>) => {
            const value = ctx.parsed.y;
            if (value === null) return '';
            return `$${value.toLocaleString()}`;
          },

          title: (items: TooltipItem<'line'>[]) => {
            const x = items[0]?.parsed.x;
            if (x === null || x === undefined) return '';
            return new Date(x).toLocaleDateString();
          },
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
    <div className="w-full">
      {/* Range Selector */}
      <div className="flex gap-2 mb-3">
        {ranges.map((r) => (
          <button
            key={r}
            onClick={() =>
              dispatch({
                type: 'SET_RANGE',
                payload: r,
              })
            }
            className={`px-3 py-1 rounded text-sm ${
              state.range === r
                ? 'bg-blue-500 text-white'
                : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
            }`}
          >
            {r === 365 ? '1Y' : `${r}D`}
          </button>
        ))}
      </div>

      <AsyncState
        data={data}
        loading={loading}
        error={error}
        loader={<CoinChartSkeleton />}
        isEmpty={(d) => d.points.length === 0}
      >
        {() => (
          <div className="h-64 w-full">
            <Line
              data={chartData}
              options={options}
            />
          </div>
        )}
      </AsyncState>
    </div>
  );
};

export default CoinChart;
