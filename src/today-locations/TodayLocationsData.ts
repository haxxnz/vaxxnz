import {
  CrowdsourcedLocation,
  getCrowdsourcedLocations,
} from "../crowdsourced/CrowdsourcedData";
import {
  useHealthpointLocations,
  HealthpointLocation,
} from "./healthpoint/HealthpointData";
import { useRadiusKm } from "../utils/useRadiusKm";
import { filterLocations } from "../utils/location";
import { useCoords } from "../utils/useCoords";

export type TodayLocation = CrowdsourcedLocation | HealthpointLocation;

export const useTodayLocationsData = () => {
  const radiusKm = useRadiusKm();
  const coords = useCoords();
  const currentDay = new Date().getDay();
  const locations = useHealthpointLocations();
  const crowdSourced = getCrowdsourcedLocations().filter(
    ({ openingHours }) =>
      openingHours.find(
        (opennningHoursItem) => opennningHoursItem.day === currentDay
      )?.isOpen
  );
  if ("ok" in locations) {
    const combined = [...crowdSourced, ...locations.ok];
    const sortedCombined = filterLocations(combined, coords, radiusKm, (l) => [
      l.lat,
      l.lng,
    ]);
    return { ok: sortedCombined };
  } else {
    return locations;
  }
};
