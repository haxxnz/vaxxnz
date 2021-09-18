import { useSearchParams } from "./url";

export function useRadiusKm() {
  const { radius } = useSearchParams();
  const radiusKm = radius
    ? radius === "auto"
      ? "auto"
      : parseInt(radius, 10)
    : 10;
  return radiusKm;
}
