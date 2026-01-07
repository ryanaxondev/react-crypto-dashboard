import { useCallback, useEffect, useMemo, useState } from 'react';

/* ---------------------------------------------
 * Types
 * -------------------------------------------*/

export type SavedView<T> = {
  slug: string;
  name: string;
  snapshot: T;
};

export type SavedViewsMap<T> = Record<string, SavedView<T>>;

export type ExportedSavedViewsV1<T> = {
  version: 1;
  domain: string;
  views: Array<{
    slug: string;
    name: string;
    snapshot: T;
  }>;
};

/* ---------------------------------------------
 * Storage helpers
 * -------------------------------------------*/

function storageKey(domain: string) {
  return `saved-views:${domain}`;
}

function readStorage<T>(domain: string): SavedViewsMap<T> {
  try {
    const raw = localStorage.getItem(storageKey(domain));
    if (!raw) return {};
    return JSON.parse(raw);
  } catch {
    return {};
  }
}

function writeStorage<T>(
  domain: string,
  map: SavedViewsMap<T>
) {
  try {
    localStorage.setItem(
      storageKey(domain),
      JSON.stringify(map)
    );
  } catch {
    // fail-soft
  }
}

/* ---------------------------------------------
 * Meta (Default View)
 * -------------------------------------------*/

type SavedViewsMetaV1 = {
  version: 1;
  defaultViewSlug?: string;
};

function metaStorageKey(domain: string) {
  return `saved-views-meta:${domain}`;
}

function readMeta(domain: string): SavedViewsMetaV1 {
  try {
    const raw = localStorage.getItem(metaStorageKey(domain));
    if (!raw) return { version: 1 };

    const data = JSON.parse(raw);

    if (
      typeof data !== 'object' ||
      data === null ||
      data.version !== 1
    ) {
      return { version: 1 };
    }

    return {
      version: 1,
      defaultViewSlug:
        typeof data.defaultViewSlug === 'string'
          ? data.defaultViewSlug
          : undefined,
    };
  } catch {
    return { version: 1 };
  }
}

function writeMeta(
  domain: string,
  meta: SavedViewsMetaV1
) {
  try {
    localStorage.setItem(
      metaStorageKey(domain),
      JSON.stringify(meta)
    );
  } catch {
    // fail-soft
  }
}

/* ---------------------------------------------
 * Utils
 * -------------------------------------------*/

export function slugify(input: string): string {
  return input
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export function resolveCollision<T>(
  base: string,
  map: SavedViewsMap<T>
): string {
  if (!map[base]) return base;

  let i = 2;
  while (map[`${base}-${i}`]) {
    i++;
  }
  return `${base}-${i}`;
}

/* ---------------------------------------------
 * Export guard (Step 9.2)
 * -------------------------------------------*/

export function isValidExportV1<T>(
  input: unknown
): input is ExportedSavedViewsV1<T> {
  if (
    typeof input !== 'object' ||
    input === null
  ) {
    return false;
  }

  const data = input as {
    version?: unknown;
    domain?: unknown;
    views?: unknown;
  };

  return (
    data.version === 1 &&
    typeof data.domain === 'string' &&
    Array.isArray(data.views)
  );
}

/* ---------------------------------------------
 * Hook
 * -------------------------------------------*/

export function useSavedViews<T>(
  domain: string,
  applySnapshot: (snapshot: T) => void
) {
  const [map, setMap] = useState<SavedViewsMap<T>>(
    () => readStorage<T>(domain)
  );

  const [, setMeta] = useState<SavedViewsMetaV1>(
    () => readMeta(domain)
  );

  useEffect(() => {
    setMap(readStorage<T>(domain));
  }, [domain]);

  useEffect(() => {
    setMeta(readMeta(domain));
  }, [domain]);

  const views = useMemo(
    () => Object.values(map),
    [map]
  );

  /* -------------------------------------------
   * Save
   * -----------------------------------------*/

  const saveView = useCallback(
    (name: string, snapshot: T) => {
      const trimmed = name.trim();
      if (!trimmed) return;

      setMap((prev) => {
        const baseSlug = slugify(trimmed);
        if (!baseSlug) return prev;

        const slug = resolveCollision(
          baseSlug,
          prev
        );

        const next = {
          ...prev,
          [slug]: {
            slug,
            name: trimmed,
            snapshot: structuredClone(snapshot),
          },
        };

        writeStorage(domain, next);
        return next;
      });
    },
    [domain]
  );

  /* -------------------------------------------
   * Delete
   * -----------------------------------------*/

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

    /* -------------------------------------------
   * Meta: Default View
   * -----------------------------------------*/

  const setDefaultView = useCallback(
    (slug: string | null) => {
      setMeta(() => {
        const next: SavedViewsMetaV1 = {
          version: 1,
          defaultViewSlug:
            slug && map[slug] ? slug : undefined,
        };

        writeMeta(domain, next);
        return next;
      });
    },
    [domain, map]
  );

  /* -------------------------------------------
   * Apply
   * -----------------------------------------*/

  const applyView = useCallback(
    (slug: string) => {
      const view = map[slug];
      if (!view) return;

      applySnapshot(
        structuredClone(view.snapshot)
      );
    },
    [map, applySnapshot]
  );

  /* -------------------------------------------
   * Export (v1)
   * -----------------------------------------*/

  const exportViews = useCallback(() => {
    const payload: ExportedSavedViewsV1<T> = {
      version: 1,
      domain,
      views: Object.values(map).map(
        ({ slug, name, snapshot }) => ({
          slug,
          name,
          snapshot,
        })
      ),
    };

    return structuredClone(payload);
  }, [map, domain]);

/* -------------------------------------------
 * Import (Step 9.2)
 * -----------------------------------------*/

const importViews = useCallback(
  (data: unknown) => {
    if (!isValidExportV1<T>(data)) return;
    if (data.domain !== domain) return;

    setMap((prev) => {
      const next = { ...prev };

      for (const view of data.views) {
        if (
          !view ||
          typeof view.name !== 'string' ||
          !view.name.trim()
        ) {
          continue;
        }

        const baseSlug = slugify(view.name);
        if (!baseSlug) continue;

        const slug = resolveCollision(
          baseSlug,
          next
        );

        next[slug] = {
          slug,
          name: view.name.trim(),
          snapshot: structuredClone(
            view.snapshot
          ),
        };
      }

      writeStorage(domain, next);
      return next;
    });
  },
  [domain]
);

  /* -------------------------------------------
   * Public API (Frozen)
   * -----------------------------------------*/

  return {
    views,
    saveView,
    deleteView,
    applyView,
    exportViews,
    importViews,
    setDefaultView,
  };
}
