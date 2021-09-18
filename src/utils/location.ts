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

function getGetDistanceInKm<T>(
  myPoint: { type: "Point"; coordinates: LatLng },
  getLatLng: (location: T) => LatLng
) {
  return (l: T) =>
    distance(myPoint, point(getLatLng(l)), {
      units: "kilometers",
    });
}

export function filterLocations<T>(
  locations: T[],
  coords: Coords,
  radiusKm: Radius,
  getLatLng: (location: T) => LatLng
) {
  const myPoint = point([coords.lat, coords.lng]);
  const getDistanceKm = getGetDistanceInKm(myPoint, getLatLng);
  if (radiusKm === "auto") {
    return sortByAsc(locations, (l) => getDistanceKm(l)).slice(0, 10);
  } else {
    return sortByAsc(
      locations.filter((l) => getDistanceKm(l) < radiusKm),
      (l) => getDistanceKm(l)
    );
  }
}
