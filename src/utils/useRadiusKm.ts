import { useSearchParams } from "./url";

export function useRadiusKm() {
  const { radius } = useSearchParams();
  const radiusKm = radius
    ? radius === "10closest"
      ? "10closest"
      : parseInt(radius, 10)
    : 10;
  return radiusKm;
}
