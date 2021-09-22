import { useEffect, useLayoutEffect, useRef } from "react";
import { useLocation } from "react-router-dom";

// let savedScrolls: Record<string, ScrollPos> = {};
/* 
export function saveScrollAndGo(path: string) {
  const prevPath = window.location.pathname.toString();
  if (
    prevPath === "/" ||
    prevPath === "/locations" ||
    prevPath === "/bookings"
  ) {
    savedScrolls[prevPath] = scrollPos;
  }

  const newScrollPos = savedScrolls[path] ?? [0, 0];
  window.scrollTo(newScrollPos[0], newScrollPos[1]);
}
 */
type ScrollPos = [number, number];
let savedScroll: ScrollPos | null = null;

const homePaths = new Set(["/", "/locations", "/bookings"]);

export const useSaveScroll = () => {
  const pathname = useLocation().pathname;
  const previousPathname = usePrevious(pathname);

  useLayoutEffect(() => {
    const scrollPos: ScrollPos = [window.scrollX, window.scrollY];
    const wasHome = previousPathname && homePaths.has(previousPathname);
    const isHome = homePaths.has(pathname);
    console.log("scroll", scrollPos);
    console.log("was home", wasHome, previousPathname);
    console.log("is home", isHome, pathname);

    if (wasHome && !isHome) {
      // left the home page
      savedScroll = scrollPos;
      window.scrollTo(0, 0);
    } else if (isHome && !wasHome && savedScroll) {
      // we've gone back home
      window.scrollTo(savedScroll[0], savedScroll[1]);
    }
  }, [pathname, previousPathname]);
};

function usePrevious<T>(value: T) {
  // The ref object is a generic container whose current property is mutable ...
  // ... and can hold any value, similar to an instance property on a class
  const ref = useRef<T>();
  // Store current value in ref
  useEffect(() => {
    ref.current = value;
  }, [value]); // Only re-run if value changes
  // Return previous value (happens before update in useEffect above)
  return ref.current;
}
