import distance from "@turf/distance";
import { point } from "@turf/helpers";

export function getDistanceKm(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
) {
  const from = point([lat1, lon1]);
  const to = point([lat2, lon2]);
  const d = distance(from, to, { units: "kilometers" });
  return d;
}
