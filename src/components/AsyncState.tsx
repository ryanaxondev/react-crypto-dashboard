import type { ReactNode } from 'react';

export type AsyncStateProps<T> = {
  data?: T | null;
  loading: boolean;
  error?: string | ReactNode | null;
  isEmpty?: (data: T) => boolean;
  loader?: ReactNode;
  emptyFallback?: ReactNode;
  children: (data: T) => ReactNode;
};

const AsyncState = <T,>({
  data,
  loading,
  error,
  isEmpty,
  loader,
  emptyFallback,
  children,
}: AsyncStateProps<T>) => {
  if (loading) {
    return <>{loader ?? null}</>;
  }

  if (error) {
    return (
      <div className="text-center text-red-500">
        {error}
      </div>
    );
  }

  if (
    !data ||
    (isEmpty ? isEmpty(data) : false) ||
    (Array.isArray(data) &&
      data.length === 0)
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
