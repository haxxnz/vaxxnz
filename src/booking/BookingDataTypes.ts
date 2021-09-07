import { Coords } from "../location-picker/LocationPicker";

export interface OpenHour {
  days: string[];
  localStart: string;
  localEnd: string;
}

export interface Location {
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

export interface SlotWithAvailability {
  localStartTime: string;
  durationSeconds: number;
}

export interface AvailabilityDates {
  [key: string]: SlotWithAvailability[] | undefined;
}

export interface LocationsData {
  availabilityDates: AvailabilityDates;
  lastUpdatedAt: string;
}

export interface LocationSlotsPair {
  location: Location;
  slots: SlotWithAvailability[] | undefined;
}

export interface DateLocationsPair {
  dateStr: string;
  locationSlotsPairs: LocationSlotsPair[];
}
