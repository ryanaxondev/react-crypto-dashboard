import { useSearchParams } from 'react-router-dom';
import { useCallback } from 'react';

type Options<T> = {
  key: string;
  defaultValue: T;
  allowed?: readonly T[];
  serialize?: (value: T) => string;
  parse?: (raw: string) => T;
};

export function useSyncedSearchParam<T>(
  options: Options<T>
): [T, (next: T) => void] {
  const {
    key,
    defaultValue,
    allowed,
    serialize = defaultSerialize,
    parse = (raw) => defaultParse(raw, defaultValue),
  } = options;

  const [params, setParams] = useSearchParams();

  const raw = params.get(key);

  let value = defaultValue;

  if (raw !== null) {
    const parsed = parse(raw);

    if (!allowed || allowed.includes(parsed)) {
      value = parsed;
    }
  }

  const setValue = useCallback(
    (next: T) => {
      const nextParams = new URLSearchParams(params);

      if (Object.is(next, defaultValue)) {
        nextParams.delete(key);
      } else {
        nextParams.set(key, serialize(next));
      }

      setParams(nextParams, { replace: true });
    },
    [params, key, defaultValue, serialize, setParams]
  );

  return [value, setValue];
}

/* -------------------------------------------------- */
/* Defaults                                           */
/* -------------------------------------------------- */

function defaultSerialize<T>(value: T): string {
  return String(value);
}

function defaultParse<T>(raw: string, fallback: T): T {
  if (typeof fallback === 'number') {
    return Number(raw) as T;
  }

  if (typeof fallback === 'boolean') {
    return (raw === 'true') as T;
  }

  return raw as T;
}
