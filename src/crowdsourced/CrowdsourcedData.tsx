import { Coords } from "../location-picker/LocationPicker";
import { getDistanceKm } from "../utils/distance";
import { Instruction } from "../today-locations/healthpoint/HealthpointData";
import { crowdsourcedLocations } from "./CrowdsourcedLocations";

// 0 = sunday, 1 = monday ... same as new Date().getDay();
type Day = 0 | 1 | 2 | 3 | 4 | 5 | 6;
type OpeningHours =
  | {
      day: Day;
      isOpen: true;
      hours: string;
    }
  | {
      day: Day;
      isOpen: false;
    };

export interface CrowdsourcedLocation {
  isCrowdSourced: true;
  lat: number;
  lng: number;
  name: string;
  branch?: string;
  address: string;
  telephone?: string;
  openingHours: OpeningHours[];
  instructions: Instruction[];
  website?: string;
  bookingWebsite?: string;
  additionalInformation?: string;
}

export const useCrowdsourcedLocations = (
  coords: Coords,
  radiusKm: number
): CrowdsourcedLocation[] =>
  filterCrowdsourcedLocations(crowdsourcedLocations, coords, radiusKm);

function filterCrowdsourcedLocations(
  allLocations: CrowdsourcedLocation[],
  coords: Coords,
  radiusKm: number
) {
  const currentDay = new Date().getDay();
  const matchedFilter = allLocations.filter(
    ({ lat: locationLat, lng: locationLng, openingHours }) => {
      const openingHoursToday = openingHours.find(
        (oh) => oh.day === currentDay
      );

      const distanceInKm =
        locationLat &&
        locationLng &&
        getDistanceKm(coords, { lat: locationLat, lng: locationLng });

      return distanceInKm < radiusKm && openingHoursToday?.isOpen;
    }
  );
  return matchedFilter;
}
