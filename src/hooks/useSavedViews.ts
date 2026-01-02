import { useCallback, useEffect, useMemo, useState } from 'react';

/* ---------------------------------------------
 * Types
 * ------------------------------------------- */

export type SavedView<T> = {
  slug: string;
  name: string;
  snapshot: T;
};

type SavedViewMap<T> = Record<string, SavedView<T>>;

type Domain = 'home' | 'chart';

/* ---------------------------------------------
 * Storage helpers (private)
 * ------------------------------------------- */

function getStorageKey(domain: Domain) {
  return `saved:${domain}`;
}

function readStorage<T>(domain: Domain): SavedViewMap<T> {
  try {
    const raw = localStorage.getItem(
      getStorageKey(domain)
    );
    if (!raw) return {};
    return JSON.parse(raw) as SavedViewMap<T>;
  } catch {
    return {};
  }
}

function writeStorage<T>(
  domain: Domain,
  data: SavedViewMap<T>
) {
  localStorage.setItem(
    getStorageKey(domain),
    JSON.stringify(data)
  );
}

/* ---------------------------------------------
 * Slug helpers (private)
 * ------------------------------------------- */

function slugify(input: string): string {
  return input
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
}

function resolveCollision(
  baseSlug: string,
  existing: Record<string, unknown>
): string {
  if (!existing[baseSlug]) return baseSlug;

  let index = 2;
  while (existing[`${baseSlug}-${index}`]) {
    index++;
  }

  return `${baseSlug}-${index}`;
}

/* ---------------------------------------------
 * Hook
 * ------------------------------------------- */

export function useSavedViews<T>(domain: Domain) {
  const [map, setMap] = useState<
    SavedViewMap<T>
  >({});

  /* -----------------------------------------
   * Initial load
   * --------------------------------------- */

  useEffect(() => {
    setMap(readStorage<T>(domain));
  }, [domain]);

  /* -----------------------------------------
   * Derived
   * --------------------------------------- */

  const views = useMemo(
    () => Object.values(map),
    [map]
  );

  /* -----------------------------------------
   * Actions
   * --------------------------------------- */

  const saveView = useCallback(
    (name: string, snapshot: T) => {
      const baseSlug = slugify(name);
      if (!baseSlug) return;

      setMap((prev) => {
        const slug = resolveCollision(
          baseSlug,
          prev
        );

        const next: SavedViewMap<T> = {
          ...prev,
          [slug]: {
            slug,
            name,
            snapshot,
          },
        };

        writeStorage(domain, next);
        return next;
      });
    },
    [domain]
  );

  const deleteView = useCallback(
    (slug: string) => {
      setMap((prev) => {
        if (!prev[slug]) return prev;

        const next = { ...prev };
        delete next[slug];

        writeStorage(domain, next);
        return next;
      });
    },
    [domain]
  );

  const applyView = useCallback(
    (slug: string): T | null => {
      return map[slug]?.snapshot ?? null;
    },
    [map]
  );

  /* -----------------------------------------
   * Public API
   * --------------------------------------- */

  return {
    views,
    saveView,
    deleteView,
    applyView,
  };
}
