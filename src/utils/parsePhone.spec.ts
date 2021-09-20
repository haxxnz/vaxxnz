import { parsePhoneNumber } from "./parsePhone";

describe("Normal number", () => {
  it("should return a string of the normal phone number", () => {
    const want = "(07) 873 7079";

    const got = parsePhoneNumber(
      "{ telephone: '(07) 873 7079  /  A/H (07) 873 8399' }"
    );

    expect(got).toBe(want);
  });

  it("should return a string of the 0800 number", () => {
    const want = "0800 ORANGA";

    const got = parsePhoneNumber("{ telephone: '0800 ORANGA (672 642)' }");

    expect(got).toBe(want);
  });

  it("should return a null", () => {
    const want = null;

    const got = parsePhoneNumber("test string no actual phone number");

    expect(got).toBe(want);
  });
});
