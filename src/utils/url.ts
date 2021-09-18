import { useEffect, useState } from "react";

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
      setSearchParams(getSearchParams());
    }
    window.addEventListener("popstate", onHistoryUpdate);
    return () => {
      window.removeEventListener("popstate", onHistoryUpdate);
    };
  }, []);
  useEffect(() => {
    function onPushState() {
      setSearchParams(getSearchParams());
    }
    window.addEventListener("pushstate", onPushState);
    return () => {
      window.removeEventListener("pushstate", onPushState);
    };
  }, []);
  return searchParams;
}

export function eventedPushState(url: string) {
  // pushState does NOT fire onpopstate by itself
  window.history.pushState({}, "", url);
  window.dispatchEvent(new CustomEvent("pushstate", {}));
}
