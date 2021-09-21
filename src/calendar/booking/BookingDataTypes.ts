import { CrowdsourcedLocation } from "../../crowdsourced/CrowdsourcedData";
import { Coords } from "../../utils/distance";

export interface OpenHour {
  days: string[];
  localStart: string;
  localEnd: string;
}

export interface LocationRaw {
  displayAddress: string;
  distanceInMeters: number;
  extId: string;
  regionExternalId: string;
  startDate: string;
  endDate: string;
  location: Coords;
  name: string;
  timezone: string;
  openHours: OpenHour[];
  mapUrl: string;
  tags: never[];
  type: string;
  availableDate: string;
  locationPool: string;
  exhausted: boolean;
  excludeFromSearch: boolean;
  vaccineData: string;
}
export interface Location extends LocationRaw {
  lat: number;
  lng: number;
  isBooking: true; // having isBooking in two places might confuse us one day
}

export interface SlotWithAvailability {
  localStartTime: string;
  durationSeconds: number;
}

export interface AvailabilityDates {
  [key: string]: SlotWithAvailability[] | undefined;
}

export interface AvailabilityData {
  availabilityDates: AvailabilityDates;
  lastUpdatedAt: string;
}

export interface BookingLocationSlotsPair {
  isBooking: true;
  location: Location;
  slots: SlotWithAvailability[] | undefined;
}

export interface BookingDateLocations {
  dateStr: string;
  locationSlotsPairs: (BookingLocationSlotsPair | CrowdsourcedLocation)[];
}
