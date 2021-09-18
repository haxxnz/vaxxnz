import distance from "@turf/distance";
import { point } from "@turf/helpers";
import { Coords } from "../location-picker/LocationPicker";
import { sortByAsc } from "./array";
import { Radius } from "./locationTypes";

type LatLng = [number, number];

// also sorts for you
export function filterLocations<T>(
  locations: T[],
  coords: Coords,
  radiusKm: Radius,
  getLatLng: (location: T) => LatLng
) {
  const myPoint = point([coords.lat, coords.lng]);

  const sortedLocations = sortByAsc(locations, (l) => {
    const distanceInKm = distance(myPoint, point(getLatLng(l)), {
      units: "kilometers",
    });
    return distanceInKm;
  });
  let filteredLocations: T[] = [];
  if (radiusKm === "auto") {
    filteredLocations = sortedLocations.slice(0, 10);
  } else {
    filteredLocations = sortedLocations.filter((l) => {
      const distanceInKm = distance(myPoint, point(getLatLng(l)), {
        units: "kilometers",
      });
      return distanceInKm < radiusKm;
    });
  }
  return filteredLocations;
}
