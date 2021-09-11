import React, { useState, useEffect } from "react";

export const useSeen = (ref: React.RefObject<HTMLElement>, within: string) => {
  const [isIntersecting, setIntersecting] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIntersecting(true);
        }
      },
      {
        rootMargin: `0px 0px ${within} 0px`,
      }
    );
    if (ref.current) {
      observer.observe(ref.current);
    }
    const current = ref.current;
    return () => {
      if (current) {
        observer.unobserve(current);
      }
    };
  }, [ref, within]);
  return isIntersecting;
};
