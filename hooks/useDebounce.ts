import { useEffect, useState } from "react";

/**
 * This hook is to defer the value when input changes very quickly.
 * For better perfomance, just return last changed value after specified delay.
 * 
 * @param delay the unit is millisecond
 * @returns 
 */
export function useDebounce<T>(value: T, delay = 1000) {
  const [debouncedValue, setDebouncedValue] = useState<T>();

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);
  return debouncedValue;
}
