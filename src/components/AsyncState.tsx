type AsyncStateProps<T> = {
  loading: boolean;
  error: string | null;
  data: T | null | undefined;
  loader: React.ReactNode;
  emptyFallback?: React.ReactNode;
  children: (data: T) => React.ReactNode;
};

const AsyncState = <T,>({
  loading,
  error,
  data,
  loader,
  emptyFallback,
  children,
}: AsyncStateProps<T>) => {
  if (loading) return <>{loader}</>;

  if (error) {
    return (
      <p className="text-center text-red-500">
        ❌ {error}
      </p>
    );
  }

  if (
    !data ||
    (Array.isArray(data) && data.length === 0)
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
