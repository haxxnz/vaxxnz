/**
 * Returns a new array with elements sorted in ascending order.
 * A custom transformation function can be supplied to be used to
 * generate the value to be compared - useful for example, when we
 * have an array of co-ordinates that we want to sort by the absolute
 * difference in distance from a given point.
 *
 * @export
 * @template T
 * @param {T[]} notes
 * @param {(note: T) => T} [comparator=(x) => x]
 * @return {T[]} Sorted array.
 */
export function sortByAsc<T = unknown>(
  notes: T[],
  comparator: (note: T) => T = (x) => x
): T[] {
  return [...notes].sort((a: T, b: T) => {
    if (comparator(a) < comparator(b)) {
      return -1;
    }
    if (comparator(a) > comparator(b)) {
      return 1;
    }
    return 0;
  });
}
