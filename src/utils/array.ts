export function sortByAsc<T = unknown>(
  notes: T[],
  comparator: (note: T) => string | number
) {
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
