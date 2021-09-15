import { memoizeOnce } from "./memoize";

describe("memoizeOnce", () => {
  it("should not recalculate after initial run", () => {
    // Store a number in an object so we can pass by reference.
    var x = { Value: 2 };

    const fn = () => x.Value * x.Value * x.Value;
    const memoized = memoizeOnce(fn);
    // Similar to memoizeOnce, but without cache.
    const closureWithoutCache = () => {
      return fn();
    };

    // Expect both uncached and memoized function calls to return same value.
    expect(memoized()).toBe(closureWithoutCache());

    // Change number, annd expect return value of memoized/cached to be unchanged.
    x.Value = 10;
    expect(memoized()).not.toBe(closureWithoutCache());
  });
});
