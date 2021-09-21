import distance from "@turf/distance";
import { point } from "@turf/helpers";

export interface Coords {
  lng: number;
  lat: number;
}

/**
 * Calculates the distance (in kilometers) between two co-ordinates.
 *
 * @export
 * @param {Coords} coords1
 * @param {Coords} coords2
 * @return {number} Distance in kilometers.
 */
export function getDistanceKm(coords1: Coords, coords2: Coords): number {
  const from = point([coords1.lat, coords1.lng]);
  const to = point([coords2.lat, coords2.lng]);
  const d = distance(from, to, { units: "kilometers" });
  return d;
}
