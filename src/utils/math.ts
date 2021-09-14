/**
 * Returns the sum of an array of numbers.
 *
 * @export
 * @param {number[]} array
 * @return {number}
 */
export function sum(array: number[]): number {
  return array.reduce((a, b) => a + b, 0);
}
