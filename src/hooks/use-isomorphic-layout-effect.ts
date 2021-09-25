import { useEffect, useLayoutEffect } from "react";

// useLayoutEffect can't execute on server.
export const useIsomorphicLayoutEffect =
    typeof window === "undefined" ? useEffect : useLayoutEffect;
