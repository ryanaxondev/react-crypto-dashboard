import type { ReactNode } from 'react';

export type AsyncStateProps<T> = {
  loading: boolean;

  error?: string | ReactNode | null;

  data: T | null | undefined;

  loader: ReactNode;

  emptyFallback?: ReactNode;

  isEmpty?: (data: T) => boolean;

  children: (data: T) => ReactNode;
};

const AsyncState = <T,>({
  loading,
  error,
  data,
  loader,
  emptyFallback,
  isEmpty,
  children,
}: AsyncStateProps<T>) => {
  if (loading) {
    return <>{loader}</>;
  }

  if (error) {
    return (
      <>
        {typeof error === 'string' ? (
          <p className="text-center text-red-500">
            ❌ {error}
          </p>
        ) : (
          error
        )}
      </>
    );
  }

  if (!data) {
    return (
      <>
        {emptyFallback ?? (
          <p className="text-center text-gray-400">
            No data available.
          </p>
        )}
      </>
    );
  }

  if (isEmpty?.(data)) {
    return (
      <>
        {emptyFallback ?? (
          <p className="text-center text-gray-400">
            No data available.
          </p>
        )}
      </>
    );
  }

  if (
    Array.isArray(data) &&
    data.length === 0
  ) {
    return (
      <>
        {emptyFallback ?? (
          <p className="text-center text-gray-400">
            No data available.
          </p>
        )}
      </>
    );
  }

  return <>{children(data)}</>;
};

export default AsyncState;
