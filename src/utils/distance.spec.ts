import { getDistanceKm } from "./distance";

describe("getDistanceKm", () => {
  it("should return 0 km", () => {
    const p1 = { lat: -36.84900032829424, lng: 174.76287010276474 };
    const p2 = p1;
    const want = 0;

    const got = getDistanceKm(p1, p2);

    expect(got).toBe(want);
  });

  it("should return 11.46 km", () => {
    const p1 = { lat: -36.84900032829424, lng: 174.76287010276474 };
    const p2 = { lat: -36.91674640713207, lng: 174.8408110747326 };
    const want = 11.46;

    const got = getDistanceKm(p1, p2);

    expect(got).toBeCloseTo(want);
  });
});
