import { useEffect, useReducer } from 'react';
import { fetchCoins } from '../services/cryptoApi';
import type { Coin } from '../types/coin';

type State = {
  data: Coin[];
  loading: boolean;
  error: string | null;
};

type Action =
  | { type: 'START' }
  | { type: 'SUCCESS'; payload: Coin[] }
  | { type: 'ERROR'; payload: string };

const initialState: State = {
  data: [],
  loading: false,
  error: null,
};

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'START':
      return { ...state, loading: true, error: null };

    case 'SUCCESS':
      return { data: action.payload, loading: false, error: null };

    case 'ERROR':
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
}

export function useCoins(limit: number) {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const controller = new AbortController();
    dispatch({ type: 'START' });

    fetchCoins(limit, controller.signal)
      .then((data) =>
        dispatch({ type: 'SUCCESS', payload: data })
      )
      .catch((err) => {
        if (err.name === 'AbortError') return;

        dispatch({
          type: 'ERROR',
          payload:
            err instanceof Error
              ? err.message
              : 'Failed to load coins',
        });
      });

    return () => controller.abort();
  }, [limit]);

  return state;
}
