import { getDistanceKm } from "./distance";
import { formatDistanceKm } from "./locale";

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

describe("formatDistanceKm", () => {
    it("should return 1 km", () => {
        const km = 1;
        const language = "en-NZ";
        const want = "1 km";

        const got = formatDistanceKm(km, language);

        expect(got).toBe(want);
    });

    it("should return 50 km", () => {
        const km = 50;
        const language = "en-NZ";
        const want = "50 km";

        const got = formatDistanceKm(km, language);

        expect(got).toBe(want);
    });

    it("should return 500 m", () => {
        const km = 0.5;
        const language = "en-NZ";
        const want = "500 m";

        const got = formatDistanceKm(km, language);

        expect(got).toBe(want);
    });

    it("should return 0 m", () => {
        const km = 0;
        const language = "en-NZ";
        const want = "0 m";

        const got = formatDistanceKm(km, language);

        expect(got).toBe(want);
    });

    it("should return 0.002 m", () => {
        const km = 0.000002;
        const language = "en-NZ";
        const want = "0.002 m";

        const got = formatDistanceKm(km, language);

        expect(got).toBe(want);
    });

    it("should return 10公里", () => {
        const km = 10;
        const language = "zh-CN";
        const want = "10公里";

        const got = formatDistanceKm(km, language);

        expect(got).toBe(want);
    });

    it("should return 500米", () => {
        const km = 0.5;
        const language = "zh-CN";
        const want = "500米";

        const got = formatDistanceKm(km, language);

        expect(got).toBe(want);
    });
});
