import { Coords } from "../location-picker/LocationPicker";
import { getDistanceKm } from "../utils/distance";
import { Instruction } from "../today-locations/healthpoint/HealthpointData";
import { crowdsourcedLocations } from "./CrowdsourcedLocations";
import { Radius } from "../utils/locationTypes";
import { sortByAsc } from "../utils/array";
import { filterLocations } from "../utils/location";

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

export const getCrowdsourcedLocations = (
  coords: Coords,
  radiusKm: Radius
): CrowdsourcedLocation[] =>
  filterCrowdsourcedLocations(crowdsourcedLocations, coords, radiusKm);

function filterCrowdsourcedLocations(
  allLocations: CrowdsourcedLocation[],
  coords: Coords,
  radiusKm: Radius
) {
  return allLocations;
}
