import distance from "@turf/distance";
import { point } from "@turf/helpers";
import { Coords } from "../location-picker/LocationPicker";

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

/**
 * Formats a given distance in kilometers to meters, if the distance is
 * less than 1000 meters.
 *
 * @export
 * @param {number} km
 * @param {string} language
 * @return {string}
 */
export function formatDistanceKm(km: number, language: string): string {
  if (km < 1) {
    const meters = km * 1000;
    return new Intl.NumberFormat(language, {
      style: "unit",
      unit: "meter",
      notation: "compact",
    }).format(meters);
  } else {
    return new Intl.NumberFormat(language, {
      style: "unit",
      unit: "kilometer",
      notation: "compact",
    }).format(km);
  }
}
