export function memoizeOnce<T = unknown>(fn: () => T) {
  let cache: T;
  return function () {
    if (cache) {
      return cache;
    }
    const result = fn();
    cache = result;
    return result;
  };
}
