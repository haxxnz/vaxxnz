/**
 * Caches the output of a function call so subsequent calls don't
 * need to be re-computed.
 *
 * @export
 * @template T
 * @param {() => T} fn
 * @return {*}
 */
export function memoizeOnce<T = unknown>(fn: () => T) {
  let cache: T;
  return function () {
    if (cache) {
      return cache;
    }

    cache = fn();
    return cache;
  };
}

/**
 * Caches the output of a function call so subsequent calls don't
 * need to be re-computed. Based on first argument. Requires first argument.
 *
 * @export
 * @template T
 * @template A
 * @param {(a: A) => T} fn
 * @return {*}
 */
export function memoize0<T = unknown, A = unknown>(fn: (a: A) => T) {
  const cache: Record<string, T> = {};
  return (a: A) => {
    const key = a + "";
    if (cache[key]) {
      return cache[key];
    }

    cache[key] = fn(a);
    return cache[key];
  };
}
