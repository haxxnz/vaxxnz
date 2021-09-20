import { parsePhoneNumber } from "./parsePhone";

const allPhones = [
  "(03) 218 3079",
  "(03) 218 3189 ext 1",
  "(03) 326 6154",
  "(03) 3489723",
  "(03) 352 6152",
  "(03) 441 0590 or 0508 255 3749",
  "(03) 688 9156",
  "(03) 981 8181 or 0800 4 MALES",
  "(03)3326338",
  "(04) 389 8394",
  "(06) 323 9696 (for both in hours and after hours)",
  "(07) 872 0300",
  "(07) 873 7079  /  A/H (07) 873 8399",
  "(07) 878 3680",
  "(09)  438 7835",
  "(09) 237 0280",
  "(09) 263 6622 or (09) 263 6291",
  "(09) 266 9455",
  "(09) 378 6827 [24hour number]",
  "(09) 534 7176",
  "(09) 570 9827 or 0800 030 902",
  "(09) 620 8599",
  "(09) 636 3629 or 0800 030 902",
  "(09) 638 8718",
  "+64272731514",
  "027 577 4174",
  "03 214 0006",
  "03 595 2933",
  "03 777 1056",
  "0800 175 175",
  "0800 272 4842",
  "0800 28 29 26",
  "0800 4248 7474 (08004AHURIRI)",
  "0800 48 35 64 26",
  "0800 484 006",
  "0800 573 0091",
  "0800 628 228, Option 9, Option 1",
  "0800 ORANGA (672 642)",
  "0800388434",
  "09 435-4586",
  "After Hours: (04) 293 6002",
];

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
    const want = "test string no actual phone number";

    const got = parsePhoneNumber("test string no actual phone number");

    expect(got).toBe(want);
  });

  it("allPhones", () => {
    for (let i = 0; i < allPhones.length; i++) {
      const phone = allPhones[i];
      const got = parsePhoneNumber(phone);
      expect(got).not.toContain(" or ");
      expect(got).not.toContain(" OR ");
      expect(got).not.toContain("after hours");
      expect(got).not.toContain("number");
      expect(got).not.toContain("Option");
    }
  });
});
