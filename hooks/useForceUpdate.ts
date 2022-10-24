import { useCallback, useState } from "react";

/**
 * Sometimes we need to force a component rendering,
 * and this component is aimed to this goal.
 * 
 * @returns force update callback
 */
export function useForceUpdate() {
  const [count, setCount] = useState(0);

  return useCallback(() => {
    setCount((prev: number) => prev + 1);
  }, [count]);
}
