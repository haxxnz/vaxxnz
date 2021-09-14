import { reverseGeocode, extractSuburb } from "./reverseGeocode";

const mockFetch = (status: number, data: { [key: string]: any }) => {
  return (global.fetch = jest.fn().mockImplementation(() =>
    Promise.resolve({
      status: status,
      json: () => data,
    })
  ));
};

describe("reverseGeocode", () => {
  it('should return "123 Fake Street, Auckland" - happy path', async () => {
    await mockFetch(200, {
      success: true,
      completions: [{ a: "123 Fake Street, Auckland", pxid: "fakeid" }],
    });

    let data = await reverseGeocode(0, 0);

    expect(data.a).toBe("123 Fake Street, Auckland");
    expect(data.pxid).toBe("fakeid");
  });

  it("should return error when success is false", async () => {
    await mockFetch(500, {
      success: false,
    });

    await expect(reverseGeocode(0, 0)).rejects.toThrow();
  });

  it("should return error when completions is empty", async () => {
    await mockFetch(200, {
      success: true,
      completions: [],
    });

    await expect(reverseGeocode(0, 0)).rejects.toThrow();
  });
});

describe("extractSuburb", () => {
  it('should return "Fake Suburb" - happy path', async () => {
    await mockFetchUserData(200, {
      success: true,
      suburb: "Fake Suburb",
      city: "Fake City",
    });

    let data = await extractSuburb({
      a: "fakeaddr",
      pxid: "fakepxid",
    });

    expect(data).toBe("Fake Suburb");
  });

  it('should return "Fake City" - happy path when no suburb', async () => {
    await mockFetchUserData(200, {
      success: true,
      city: "Fake City",
    });

    let data = await extractSuburb({
      a: "fakeaddr",
      pxid: "fakepxid",
    });

    expect(data).toBe("Fake City");
  });

  it("should return error when city and suburb fields are empty", async () => {
    await mockFetchUserData(200, {
      success: true,
    });

    await expect(
      extractSuburb({ a: "fakeaddr", pxid: "fakepxid" })
    ).rejects.toThrow();
  });

  it("should return error when success is false", async () => {
    await mockFetchUserData(500, {
      success: false,
    });

    await expect(
      extractSuburb({ a: "fakeaddr", pxid: "fakepxid" })
    ).rejects.toThrow();
  });
});
