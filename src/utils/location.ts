import distance from "@turf/distance";
import { Coords } from "../location-picker/LocationPicker";
import { sortByAsc } from "./array";
import { Radius } from "./locationTypes";

type LatLng = [number, number];

function point(latlng: LatLng) {
  const geometry = {
    type: "Point" as "Point",
    coordinates: latlng,
  };
  return geometry;
}

export function filterLocations<T>(
  locations: T[],
  coords: Coords,
  radiusKm: Radius,
  getLatLng: (location: T) => LatLng
) {
  const myPoint = point([coords.lat, coords.lng]);
  if (radiusKm === "auto") {
    const sortedLocations = sortByAsc(locations, (l) => {
      const distanceInKm = distance(myPoint, point(getLatLng(l)), {
        units: "kilometers",
      });
      return distanceInKm;
    });
    return sortedLocations.slice(0, 10);
  } else {
    return locations.filter((l) => {
      const distanceInKm = distance(myPoint, point(getLatLng(l)), {
        units: "kilometers",
      });
      return distanceInKm < radiusKm;
    });
  }
}
