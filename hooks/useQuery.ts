import { useEffect, useState } from "react";

type TUseQueryParam<T> = {
  queryKey: string;
  queryFn: () => Promise<T>;
};

export function useQuery<TData>({ queryKey, queryFn }: TUseQueryParam<TData>) {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<TData>();

  useEffect(() => {
    setIsLoading(true);
    setData(undefined);
    queryFn()
      .then((d) => {
        setData(d);
      })
      .catch((e) => {
        console.log(e);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [queryKey]);

  return {
    isLoading,
    data,
  };
}
