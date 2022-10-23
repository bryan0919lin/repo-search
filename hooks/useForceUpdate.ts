import { useCallback, useState } from "react";

export function useForceUpdate() {
  const [count, setCount] = useState(0);

  return useCallback(() => {
    setCount((prev: number) => prev + 1);
  }, [count]);
}
