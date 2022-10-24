import { renderHook } from "@testing-library/react";
import { useDebounce } from "../useDebounce";

const setup = (text: string, delay?: number) =>
  renderHook(() => useDebounce(text, delay));

describe("useDebounce", () => {
  it("should get debounced text after default delay", () => {
    const text = "bryan";
    const { result } = setup(text);
    expect(result.current).toBeUndefined();

    setTimeout(() => {
      expect(result.current).toBeUndefined();
    }, 500);

    setTimeout(() => {
      expect(result.current).toBe(text);
    }, 1000);
  });

  it("should get debounced text after specified delay", () => {
    const text = "bryan";
    const delay = 500;
    const { result } = setup(text, delay);
    expect(result.current).toBeUndefined();

    setTimeout(() => {
      expect(result.current).toBeUndefined();
    }, delay);
  });
});
