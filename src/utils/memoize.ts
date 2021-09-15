/**
 * Caches the output of a function call so subsequent calls don't
 * need to be re-computed.
 *
 * @export
 * @template T
 * @param {() => T} fn
 * @return {*}
 */
export function memoizeOnce<T = unknown>(fn: () => T): any {
  let cache: T;
  return function () {
    if (cache) {
      return cache;
    }

    cache = fn();
    return cache;
  };
}
