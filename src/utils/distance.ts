import distance from "@turf/distance";
import { point } from "@turf/helpers";
import { Coords } from "../location-picker/LocationPicker";

export function getDistanceKm(coords1: Coords, coords2: Coords) {
  const from = point([coords1.lat, coords1.lng]);
  const to = point([coords2.lat, coords2.lng]);
  const d = distance(from, to, { units: "kilometers" });
  return d;
}

export function formatDistanceKm(distanceKm: number) {
  return Math.round(distanceKm * 10) / 10;
}
