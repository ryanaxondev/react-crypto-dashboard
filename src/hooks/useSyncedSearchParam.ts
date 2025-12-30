import { useSearchParams } from 'react-router-dom';

type Options<T> = {
  key: string;
  defaultValue: T;
  allowed?: readonly T[];
};

export function useSyncedSearchParam<T>(
  options: Options<T>
): [T, (next: T) => void] {
  const { key, defaultValue, allowed } = options;

  const [params, setParams] = useSearchParams();

  const raw = params.get(key);

  let value = defaultValue;

  if (raw !== null) {
    const parsed = parseValue(raw, defaultValue);

    if (!allowed || allowed.includes(parsed)) {
      value = parsed;
    }
  }

  const setValue = (next: T) => {
    const nextParams = new URLSearchParams(params);

    if (next === defaultValue) {
      nextParams.delete(key);
    } else {
      nextParams.set(key, String(next));
    }

    setParams(nextParams, { replace: true });
  };

  return [value, setValue];
}

/* -------------------------------------------------- */
/* Helpers                                            */
/* -------------------------------------------------- */

function parseValue<T>(raw: string, fallback: T): T {
  if (typeof fallback === 'number') {
    return Number(raw) as T;
  }

  if (typeof fallback === 'boolean') {
    return (raw === 'true') as T;
  }

  return raw as T;
}
