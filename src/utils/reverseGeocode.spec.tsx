import { reverseGeocode } from "./reverseGeocode";

const mockFetch = (status: number, data: { [key: string]: any }) => {
  return (global.fetch = jest.fn().mockImplementation(() =>
    Promise.resolve({
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
