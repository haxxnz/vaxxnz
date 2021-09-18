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

export const getCrowdsourcedLocations = (): CrowdsourcedLocation[] =>
  filterCrowdsourcedLocations(crowdsourcedLocations);

function filterCrowdsourcedLocations(allLocations: CrowdsourcedLocation[]) {
  return allLocations;
}
