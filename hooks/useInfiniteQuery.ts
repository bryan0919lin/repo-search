import { useCallback, useEffect, useState } from "react";

type TUseQueryParam<T, P> = {
  queryKey: string;
  queryFn: (pageParam?: P) => Promise<T>;
  getNextPageParam: (lastPage?: T, allPages?: T[]) => P | void;
};

/**
 * This hook is to controll infinite scroll request.
 * 
 * @param props.queryKey only when key changed will send api request
 * @param props.queryFn the implementation of api request
 * @param props.getNextPageParam get next page api request payload by 
 *   this callback. If return undefined or null, it means no next page.
 * @returns 
 */
export function useInfiniteQuery<TData, TParam>({ queryKey, queryFn, getNextPageParam }: TUseQueryParam<TData, TParam>) {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<TData[]>();
  const [error, setError] = useState<Error>();

  const handleQuery = useCallback((pageParam?: TParam) => {
    setIsLoading(true);
    queryFn(pageParam)
      .then((d) => {
        setData((prev) => !prev ? [d] : [...prev, d]); 
        setError(undefined);
      })
      .catch((e) => {
        setError(e);
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
    error,
  };
}
