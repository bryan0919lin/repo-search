import { useCallback, useEffect, useState } from "react";

type TUseQueryParam<T, P> = {
  queryKey: string;
  queryFn: (pageParam?: P) => Promise<T>;
  getNextPageParam: (lastPage?: T, allPages?: T[]) => P | void;
};

export function useInfiniteQuery<TData, TParam>({ queryKey, queryFn, getNextPageParam }: TUseQueryParam<TData, TParam>) {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<TData[]>();

  const handleQuery = useCallback((pageParam?: TParam) => {
    setIsLoading(true);
    queryFn(pageParam)
      .then((d) => {
        setData((prev) => !prev ? [d] : [...prev, d]); 
      })
      .catch((e) => {
        console.log(e);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [queryFn, setData, setIsLoading]);

  const fetchNext = useCallback(() => {
    if (isLoading) return;

    const nextPageParam = getNextPageParam(data?.slice(-1)[0], data);
    if (!!nextPageParam) {
      handleQuery(nextPageParam);
    }
  }, [handleQuery, getNextPageParam]);

  useEffect(() => {
    setData(undefined);
    handleQuery();
  }, [queryKey]);

  return {
    isLoading,
    data,
    hasNext: !!getNextPageParam(data?.slice(-1)[0], data),
    fetchNext,
  };
}
