import { useEffect, useReducer } from 'react';
import { fetchCoinChart } from '../services/cryptoApi';
import { mapCoinChart } from '../services/chartMapper';
import type { CoinChartData } from '../types/coin-chart';

type State = {
  data: CoinChartData | null;
  loading: boolean;
  error: string | null;
};

type Action =
  | { type: 'START' }
  | { type: 'SUCCESS'; payload: CoinChartData }
  | { type: 'ERROR'; payload: string };

const initialState: State = {
  data: null,
  loading: false,
  error: null,
};

function reducer(
  state: State,
  action: Action
): State {
  switch (action.type) {
    case 'START':
      return {
        ...state,
        loading: true,
        error: null,
      };

    case 'SUCCESS':
      return {
        data: action.payload,
        loading: false,
        error: null,
      };

    case 'ERROR':
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
}

export function useCoinChart(
  coinId?: string,
  days = 7
) {
  const [state, dispatch] = useReducer(
    reducer,
    initialState
  );

  useEffect(() => {
    if (!coinId) return;

    const controller = new AbortController();

    dispatch({ type: 'START' });

    fetchCoinChart(
      coinId,
      days,
      controller.signal
    )
      .then((raw) =>
        dispatch({
          type: 'SUCCESS',
          payload: mapCoinChart(raw),
        })
      )
      .catch((err: unknown) => {
        if (
          err instanceof DOMException &&
          err.name === 'AbortError'
        ) {
          return;
        }

        dispatch({
          type: 'ERROR',
          payload:
            err instanceof Error
              ? err.message
              : 'Failed to load chart data',
        });
      });

    return () => controller.abort();
  }, [coinId, days]);

  return state;
}
