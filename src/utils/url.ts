import { useEffect, useState } from "react";
import { DEFAULT_LOCATION } from "./consts";

export function useSearchParams() {
  function getSearchParams() {
    const searchParams = new URL(window.location.toString()).searchParams;
    const lat = searchParams.get("lat");
    const lng = searchParams.get("lng");
    const placeName = searchParams.get("placeName");
    return { lat, lng, placeName };
  }
  const [searchParams, setSearchParams] = useState(getSearchParams());
  useEffect(() => {
    function onHistoryUpdate() {
      const { lat, lng, placeName } = getSearchParams();
      if (lat === null || lng === null || placeName === null) {
        setSearchParams({
          lat: DEFAULT_LOCATION.lat.toString(),
          lng: DEFAULT_LOCATION.lng.toString(),
          placeName: DEFAULT_LOCATION.placeName,
        });
      }
      setSearchParams(getSearchParams());
    }
    window.addEventListener("popstate", onHistoryUpdate);
    return () => {
      window.removeEventListener("popstate", onHistoryUpdate);
    };
  }, []);
  return searchParams;
}
