import { useCallback, useEffect, useMemo, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';

/* ---------------------------------------------
 * Types
 * ------------------------------------------- */

export type ParamConfig<T> = {
  defaultValue: T;
  allowed?: readonly T[];
  serialize?: (value: T) => string;
  deserialize?: (value: string) => T;
};

type ConfigMap<T> = {
  [K in keyof T]: ParamConfig<T[K]>;
};

type PersistOptions<T> = {
  persistKey?: string;
  persistedKeys?: readonly (keyof T)[];
};

/* ---------------------------------------------
 * Helpers
 * ------------------------------------------- */

function defaultSerialize<T>(value: T): string {
  return String(value);
}

function defaultDeserialize<T>(
  value: string,
  fallback: T
): T {
  if (typeof fallback === 'number') {
    const parsed = Number(value);
    return (isNaN(parsed)
      ? fallback
      : (parsed as T));
  }

  return value as unknown as T;
}

/* ---------------------------------------------
 * Hook
 * ------------------------------------------- */

export function useSyncedSearchParams<
  T extends Record<string, unknown>
>(
  config: ConfigMap<T>,
  options: PersistOptions<T> = {}
) {
  const [params, setParams] = useSearchParams();

  const {
    persistKey,
    persistedKeys,
  } = options;

  const hasHydratedRef = useRef(false);

  /* -----------------------------------------
   * First-mount hydration (URL > localStorage)
   * --------------------------------------- */

  useEffect(() => {
    if (!persistKey || hasHydratedRef.current) return;

    hasHydratedRef.current = true;

    // URL already has params → authoritative
    const hasAnyParam = Object.keys(config).some(
      (key) => params.has(key)
    );

    if (hasAnyParam) return;

    const raw = localStorage.getItem(persistKey);
    if (!raw) return;

    try {
      const snapshot = JSON.parse(raw) as Partial<T>;
      const nextParams = new URLSearchParams(params);

      (persistedKeys ?? []).forEach((key) => {
        const value = snapshot[key];
        if (value === undefined) return;

        const { serialize } = config[key];
        const encoded =
          serialize?.(value) ??
          defaultSerialize(value);

        nextParams.set(
          key as string,
          encoded
        );
      });

      setParams(nextParams, { replace: true });
    } catch {
      // corrupted snapshot → ignore silently
    }
  }, [
    persistKey,
    persistedKeys,
    params,
    setParams,
    config,
  ]);

  /* -----------------------------------------
   * Read & normalize current values
   * --------------------------------------- */

  const values = useMemo(() => {
    const result = {} as T;

    (Object.keys(config) as Array<
      keyof T
    >).forEach((key) => {
      const {
        defaultValue,
        allowed,
        deserialize,
      } = config[key];

      const raw = params.get(
        key as string
      );

      if (raw == null) {
        result[key] = defaultValue;
        return;
      }

      const parsed =
        deserialize?.(raw) ??
        defaultDeserialize(raw, defaultValue);

      if (
        allowed &&
        !allowed.includes(parsed)
      ) {
        result[key] = defaultValue;
        return;
      }

      result[key] = parsed;
    });

    return result;
  }, [params, config]);

  /* -----------------------------------------
   * Persistence mirror (URL → localStorage)
   * --------------------------------------- */

  useEffect(() => {
    if (!persistKey || !persistedKeys) return;

    const snapshot: Partial<T> = {};

    persistedKeys.forEach((key) => {
      snapshot[key] = values[key];
    });

    try {
      localStorage.setItem(
        persistKey,
        JSON.stringify(snapshot)
      );
    } catch {
      // ignore quota / serialization issues
    }
  }, [values, persistKey, persistedKeys]);

  /* -----------------------------------------
   * Internal setter
   * --------------------------------------- */

  const apply = useCallback(
    (next: Partial<T>) => {
      const nextParams =
        new URLSearchParams(params);

      (Object.keys(next) as Array<
        keyof T
      >).forEach((key) => {
        const value = next[key];
        const {
          defaultValue,
          serialize,
        } = config[key];

        if (
          value === undefined ||
          value === defaultValue
        ) {
          nextParams.delete(key as string);
        } else {
          const encoded =
            serialize?.(value) ??
            defaultSerialize(value);

          nextParams.set(
            key as string,
            encoded
          );
        }
      });

      setParams(nextParams, {
        replace: true,
      });
    },
    [params, setParams, config]
  );

  /* -----------------------------------------
   * Public API (unchanged)
   * --------------------------------------- */

  const set = useCallback(
    <K extends keyof T>(
      key: K,
      value: T[K]
    ) => {
      const next: Partial<T> = {};
      next[key] = value;
      apply(next);
    },
    [apply]
  );

  const setMany = useCallback(
    (partial: Partial<T>) => {
      apply(partial);
    },
    [apply]
  );

  const reset = useCallback(() => {
    const cleared =
      new URLSearchParams(params);

    (Object.keys(config) as Array<
      keyof T
    >).forEach((key) => {
      cleared.delete(key as string);
    });

    setParams(cleared, {
      replace: true,
    });
  }, [params, setParams, config]);

  return {
    values,
    set,
    setMany,
    reset,
  };
}
