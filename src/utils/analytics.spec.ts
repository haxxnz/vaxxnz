import { enqueueAnalyticsEvent } from "./analytics";

let mockDataLayer: any[] = [];

describe("enqueueAnalyticsEvent", () => {
  let windowSpy: jest.SpyInstance<Window & typeof globalThis, []>;
  let pushSpy: any;
  beforeEach(() => {
    windowSpy = jest.spyOn(window, "window", "get");
    pushSpy = jest.spyOn(mockDataLayer, "push");
    pushSpy.mockImplementation(() => ({
      push: () => {},
    }));
  });

  afterEach(() => {
    windowSpy.mockRestore();
    pushSpy.mockRestore();
    mockDataLayer = [];
  });

  it("should not push for localhost dev", () => {
    windowSpy.mockImplementation(
      () =>
        ({
          location: {
            hostname: "localhost",
          },
          dataLayer: mockDataLayer,
        } as any)
    );

    enqueueAnalyticsEvent("fake event", { fakemeta: "fakedata" });
    expect(window.dataLayer.push).not.toBeCalled();
  });

  it("should not push for 127.0.0.1 dev", () => {
    windowSpy.mockImplementation(
      () =>
        ({
          location: {
            hostname: "127.0.0.1",
          },
          dataLayer: mockDataLayer,
        } as any)
    );

    enqueueAnalyticsEvent("fake event", { fakemeta: "fakedata" });
    expect(window.dataLayer.push).not.toBeCalled();
  });

  it("should push to dataLayer for prod", () => {
    windowSpy.mockImplementation(
      () =>
        ({
          location: {
            hostname: "vaxx.nz",
          },
          dataLayer: mockDataLayer,
        } as any)
    );

    enqueueAnalyticsEvent("fake event");
    expect(window.dataLayer.push).toBeCalled();
  });
});
