import { useReducer } from 'react';

import type { ChartRange } from '../../types/coin-chart';
import { useCoinChart } from '../../hooks/useCoinChart';

import CoinChartRange from './CoinChartRange';
import CoinChartView from './CoinChartView';
import CoinChartSkeleton from '../skeletons/CoinChartSkeleton';

type State = {
  range: ChartRange;
};

type Action = {
  type: 'SET_RANGE';
  payload: ChartRange;
};

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'SET_RANGE':
      return { range: action.payload };
    default:
      return state;
  }
}

type Props = {
  coinId: string;
};

const CoinChartContainer = ({ coinId }: Props) => {
  const [state, dispatch] = useReducer(reducer, {
    range: 7,
  });

  const { data, loading, error } = useCoinChart(
    coinId,
    state.range
  );

  return (
    <div className="w-full">
      <CoinChartRange
        value={state.range}
        disabled={loading}
        onChange={(r) =>
          dispatch({
            type: 'SET_RANGE',
            payload: r,
          })
        }
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
