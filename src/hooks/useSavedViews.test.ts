import { describe, it, expect } from 'vitest';
import {
  slugify,
  resolveCollision,
  isValidExportV1,
} from './useSavedViews';

/* ---------------------------------------------
 * slugify
 * -------------------------------------------*/

describe('slugify', () => {
  it('converts name to url-safe slug', () => {
    expect(slugify('My View')).toBe('my-view');
  });

  it('removes extra spaces and symbols', () => {
    expect(slugify('  Hello!!! World  ')).toBe(
      'hello-world'
    );
  });

  it('returns empty string for invalid input', () => {
    expect(slugify('###')).toBe('');
  });
});

/* ---------------------------------------------
 * resolveCollision
 * -------------------------------------------*/

describe('resolveCollision', () => {
  it('returns base slug if no collision exists', () => {
    const map = {};
    const result = resolveCollision('bitcoin', map);
    expect(result).toBe('bitcoin');
  });

  it('adds -2 if base slug already exists', () => {
    const map = {
      bitcoin: {
        slug: 'bitcoin',
        name: 'Bitcoin',
        snapshot: null,
      },
    };

    const result = resolveCollision('bitcoin', map);
    expect(result).toBe('bitcoin-2');
  });

  it('increments suffix until free slug is found', () => {
    const map = {
      bitcoin: {
        slug: 'bitcoin',
        name: 'Bitcoin',
        snapshot: null,
      },
      'bitcoin-2': {
        slug: 'bitcoin-2',
        name: 'Bitcoin 2',
        snapshot: null,
      },
      'bitcoin-3': {
        slug: 'bitcoin-3',
        name: 'Bitcoin 3',
        snapshot: null,
      },
    };

    const result = resolveCollision('bitcoin', map);
    expect(result).toBe('bitcoin-4');
  });
});

/* ---------------------------------------------
 * isValidExportV1
 * -------------------------------------------*/

describe('isValidExportV1', () => {
  it('accepts a valid export v1 payload', () => {
    const data = {
      version: 1,
      domain: 'home',
      views: [],
    };

    expect(isValidExportV1(data)).toBe(true);
  });

  it('rejects non-object input', () => {
    expect(isValidExportV1(null)).toBe(false);
    expect(isValidExportV1('string')).toBe(false);
    expect(isValidExportV1(123)).toBe(false);
  });

  it('rejects wrong version', () => {
    const data = {
      version: 2,
      domain: 'home',
      views: [],
    };

    expect(isValidExportV1(data)).toBe(false);
  });

  it('rejects missing views array', () => {
    const data = {
      version: 1,
      domain: 'home',
    };

    expect(isValidExportV1(data)).toBe(false);
  });

  it('rejects non-string domain', () => {
    const data = {
      version: 1,
      domain: 123,
      views: [],
    };

    expect(isValidExportV1(data)).toBe(false);
  });
});
