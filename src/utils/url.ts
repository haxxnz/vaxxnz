import { useEffect, useState } from "react";
import { useRouter } from "next/router";

export function getSearch() {
    const router = useRouter();
    return "?" + new URLSearchParams(router.query as any).toString();
}

export function useSearchParams() {
    const { query } = useRouter();
    const [searchParams, setSearchParams] = useState(query);
    useEffect(() => {
        function onHistoryUpdate() {
            setSearchParams(query);
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
