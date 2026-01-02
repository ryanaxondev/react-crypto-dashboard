import { useEffect, useReducer } from 'react';

import { fetchCoinById } from '@/services/cryptoApi';

import type { CoinDetails } from '@/types/coin-details';

type State = {
  data: CoinDetails | null;
  loading: boolean;
  error: string | null;
};

type Action =
  | { type: 'START' }
  | { type: 'SUCCESS'; payload: CoinDetails }
  | { type: 'ERROR'; payload: string };

const initialState: State = {
  data: null,
  loading: false,
  error: null,
};

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'START':
      return { data: null, loading: true, error: null };

    case 'SUCCESS':
      return { data: action.payload, loading: false, error: null };

    case 'ERROR':
      return { data: null, loading: false, error: action.payload };

    default:
      return state;
  }
}

export function useCoin(id?: string) {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    if (!id) return;

    const controller = new AbortController();
    dispatch({ type: 'START' });

    fetchCoinById(id, controller.signal)
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
              : 'Failed to load coin',
        });
      });

    return () => controller.abort();
  }, [id]);

  return state;
}
