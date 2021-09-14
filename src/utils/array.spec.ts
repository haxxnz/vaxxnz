import { sortByAsc } from "./array";

describe("sortByAsc", () => {
  it("should sort array of numbers ascending", () => {
    const arr = [9, 3, 1, 5, 2, 8, 0];
    const want = [0, 1, 2, 3, 5, 8, 9];
    const got = sortByAsc(arr);

    expect(got).toEqual(want);
    expect(arr).not.toEqual(want);
  });

  it("should sort array of numbers ascending with provided comparator", () => {
    const arr = [9, 3, 1, 5, 2, 8, 0];
    const want = [0, 1, 2, 3, 5, 8, 9];
    const got = sortByAsc(arr, (x) => x);

    expect(got).toEqual(want);
    expect(arr).not.toEqual(want);
  });

  it("should sort array of strings ascending", () => {
    const arr = ["g", "e", "a", "z", "p", "b", "y"];
    const want = ["a", "b", "e", "g", "p", "y", "z"];
    const got = sortByAsc(arr);

    expect(got).toEqual(want);
    expect(arr).not.toEqual(want);
  });

  it("should sort array of numbers with negatives", () => {
    const arr = [9, -3, 1, 5, -2, 8, 0, -9, 3, -1, -5, 2, -8];
    const want = [-9, -8, -5, -3, -2, -1, 0, 1, 2, 3, 5, 8, 9];
    const got = sortByAsc(arr);

    expect(got).toEqual(want);
    expect(arr).not.toEqual(want);
  });

  it("should sort array of numbers with exponential transformer", () => {
    const arr = [9, -3, 1, 5, -2, 8, 0, -9, 3, -1, -5, 2, -8];
    const want = [0, 1, -1, -2, 2, -3, 3, 5, -5, 8, -8, 9, -9];
    const got = sortByAsc(arr, (x) => x * x);

    expect(got).toEqual(want);
    expect(arr).not.toEqual(want);
  });

  it("should return empty array", () => {
    const arr: number[] = [];
    const want: number[] = [];
    const got = sortByAsc(arr);

    expect(got).toEqual(want);
  });
});
