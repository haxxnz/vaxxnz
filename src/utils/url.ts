import { useEffect, useState } from "react";

export function getSearch() {
  return new URL(window.location.toString()).search;
}

export function useSearchParams() {
  function getSearchParams() {
    const searchParams = new URL(window.location.toString()).searchParams;
    const lat = searchParams.get("lat");
    const lng = searchParams.get("lng");
    const placeName = searchParams.get("placeName");
    const radius = searchParams.get("radius");
    const locale = searchParams.get("locale");
    return { lat, lng, placeName, radius, locale };
  }
  const [searchParams, setSearchParams] = useState(getSearchParams());
  useEffect(() => {
    function onHistoryUpdate() {
      setSearchParams(getSearchParams());
    }
    window.addEventListener("popstate", onHistoryUpdate);
    window.addEventListener("pushstate", onHistoryUpdate);
    return () => {
      window.removeEventListener("popstate", onHistoryUpdate);
      window.removeEventListener("pushstate", onHistoryUpdate);
    };
  }, []);
  return searchParams;
}

export function eventedPushState(url: string) {
  // pushState does NOT fire onpopstate by itself
  window.history.pushState({}, "", url);
  window.dispatchEvent(new CustomEvent("pushstate", {}));
}
