import getSuburb, { reverseGeocode, extractSuburb } from "./reverseGeocode";

/**
 * A simple function to returned mocked responses when fetch is called. This supports
 * multiple different responses by passing in an array of wanted responses.
 *
 * @param {number} status
 * @param {{ [key: string]: any }[]} data
 * @return {*}
 */
const mockFetch = (status: number, data: { [key: string]: any }[]) => {
  // Simple iterator/generator to loop through available data responses.
  let counter = () => {
    // Handle when we always want to respond with the same response in sequential fetch
    // calls.
    if (data.length === 1) {
      return () => 0;
    }

    let count = 0;
    return () => {
      return count++;
    };
  };

  let pos = counter();

  return (global.fetch = jest.fn().mockImplementation(() =>
    Promise.resolve({
      status: status,
      json: () => data[pos()],
    })
  ));
};

describe("reverseGeocode", () => {
  it('should return "123 Fake Street, Auckland" - happy path', async () => {
    await mockFetch(200, [
      {
        success: true,
        completions: [{ a: "123 Fake Street, Auckland", pxid: "fakeid" }],
      },
    ]);

    let data = await reverseGeocode(0, 0);

    expect(data.a).toBe("123 Fake Street, Auckland");
    expect(data.pxid).toBe("fakeid");
  });

  it("should return error when success is false", async () => {
    await mockFetch(500, [
      {
        success: false,
      },
    ]);

    await expect(reverseGeocode(0, 0)).rejects.toThrow();
  });

  it("should return error when completions is empty", async () => {
    await mockFetch(200, [
      {
        success: true,
        completions: [],
      },
    ]);

    await expect(reverseGeocode(0, 0)).rejects.toThrow();
  });
});

describe("extractSuburb", () => {
  it('should return "Fake Suburb" - happy path', async () => {
    await mockFetch(200, [
      {
        success: true,
        suburb: "Fake Suburb",
        city: "Fake City",
      },
    ]);

    let data = await extractSuburb({
      a: "fakeaddr",
      pxid: "fakepxid",
    });

    expect(data).toBe("Fake Suburb");
  });

  it('should return "Fake City" - happy path when no suburb', async () => {
    await mockFetch(200, [
      {
        success: true,
        city: "Fake City",
      },
    ]);

    let data = await extractSuburb({
      a: "fakeaddr",
      pxid: "fakepxid",
    });

    expect(data).toBe("Fake City");
  });

  it("should return error when city and suburb fields are empty", async () => {
    await mockFetch(200, [
      {
        success: true,
      },
    ]);

    await expect(
      extractSuburb({ a: "fakeaddr", pxid: "fakepxid" })
    ).rejects.toThrow();
  });

  it("should return error when success is false", async () => {
    await mockFetch(500, [
      {
        success: false,
      },
    ]);

    await expect(
      extractSuburb({ a: "fakeaddr", pxid: "fakepxid" })
    ).rejects.toThrow();
  });
});

describe("getSuburb", () => {
  it('should return "Fake Suburb" - happy path', async () => {
    await mockFetch(200, [
      {
        success: true,
        completions: [
          { a: "123 Fake Street, Fake Suburb, Fake City", pxid: "fakeid" },
        ],
      },
      {
        success: true,
        suburb: "Fake Suburb",
        city: "Fake City",
      },
    ]);

    let data = await getSuburb(0, 0);

    expect(data).toBe("Fake Suburb");
  });

  it('should return "Fake City" - happy path', async () => {
    await mockFetch(200, [
      {
        success: true,
        completions: [{ a: "123 Fake Street, Fake City", pxid: "fakeid" }],
      },
      {
        success: true,
        city: "Fake City",
      },
    ]);

    let data = await getSuburb(0, 0);

    expect(data).toBe("Fake City");
  });

  it("should throw error when reverse geocode endpoint fails", async () => {
    await mockFetch(200, [
      {
        success: false,
        completions: [{ a: "123 Fake Street, Fake City", pxid: "fakeid" }],
      },
    ]);

    await expect(getSuburb(0, 0)).rejects.toThrow();
  });

  it("should throw error when address metadata endpoint fails", async () => {
    await mockFetch(200, [
      {
        success: true,
        completions: [{ a: "123 Fake Street, Fake City", pxid: "fakeid" }],
      },
      {
        success: false,
      },
    ]);

    await expect(getSuburb(0, 0)).rejects.toThrow();
  });

  it("should throw error when no city or suburb is given", async () => {
    await mockFetch(200, [
      {
        success: true,
        completions: [{ a: "123 Fake Street, Fake City", pxid: "fakeid" }],
      },
      {
        success: true,
      },
    ]);

    await expect(getSuburb(0, 0)).rejects.toThrow();
  });
});
