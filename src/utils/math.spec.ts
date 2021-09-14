import { sum } from "./math";

describe("sum", () => {
  it("should sum to 15 - happy path", () => {
    expect(sum([1, 2, 3, 4, 5])).toBe(15);
  });

  it("should sum to 0 - empty array", () => {
    expect(sum([])).toBe(0);
  });
});
