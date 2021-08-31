export interface Coords {
  lng: number;
  lat: number;
}

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
  [key: string]: SlotWithAvailability[];
}
