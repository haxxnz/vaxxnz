type ScrollPos = [number, number];
let savedScrolls: Record<string, ScrollPos> = {};
export function saveScrollAndGo(path: string) {
  const scrollPos: ScrollPos = [window.scrollX, window.scrollY];
  const prevPath = window.location.pathname.toString();
  savedScrolls[prevPath] = scrollPos;
  const newScrollPos = savedScrolls[path] ?? [0, 0];
  window.scrollTo(newScrollPos[0], newScrollPos[1]);
}
