export type AnalyticsMetaData = {
  event: string;
  [key: string]: unknown;
};

declare global {
  interface Window {
    dataLayer: AnalyticsMetaData[];
  }
}

export function enqueueAnalyticsEvent(
  event: string,
  metaData?: { [metaDataField: string]: unknown }
) {
  if (
    window.location.hostname === "localhost" ||
    window.location.hostname === "127.0.0.1"
  ) {
    // don't send analytics event when running in dev server
    console.log("Enqued event to GA ", { event, ...metaData });
    return;
  }

  window.dataLayer.push({
    event,
    ...metaData,
  });
}
