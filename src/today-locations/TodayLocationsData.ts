import { Coords } from "../location-picker/LocationPicker";
import { getDistanceKm } from "../utils/distance";
import {
  CrowdsourcedLocation,
  getCrowdsourcedLocations,
} from "../crowdsourced/CrowdsourcedData";
import {
  useHealthpointLocations,
  HealthpointLocation,
} from "./healthpoint/HealthpointData";

export type TodayLocation = CrowdsourcedLocation | HealthpointLocation;

export const useTodayLocationsData = (coords: Coords, radiusKm: number) => {
  const currentDay = new Date().getDay();
  const locations = useHealthpointLocations(coords, radiusKm);
  const crowdSourced = getCrowdsourcedLocations(coords, radiusKm).filter(
    ({ openingHours }) =>
      openingHours.find(
        (opennningHoursItem) => opennningHoursItem.day === currentDay
      )?.isOpen
  );
  if ("ok" in locations) {
    const combined = [...crowdSourced, ...locations.ok];
    combined.sort(
      (
        { lat: locationALat, lng: locationALng },
        { lat: locationBLat, lng: locationBLng }
      ) => {
        const distanceKmLocationA = getDistanceKm(coords, {
          lat: locationALat,
          lng: locationALng,
        });
        const distanceKmLocationB = getDistanceKm(coords, {
          lat: locationBLat,
          lng: locationBLng,
        });
        return distanceKmLocationA - distanceKmLocationB;
      }
    );
    return { ok: combined };
  } else {
    return locations;
  }
};
