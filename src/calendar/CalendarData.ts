import { CrowdsourcedLocation } from "../crowdsourced/CrowdsourcedData";
import { Coords } from "../location-picker/LocationPicker";
import { useBookingData } from "./booking/BookingData";
import { BookingLocationSlotsPair } from "./booking/BookingDataTypes";

export type DateString = string;
export type MonthString = string;
export interface CrowdsourcedDateLocation {
  dateStr: DateString;
  location: CrowdsourcedLocation;
}

export type CalendarLocation = CrowdsourcedLocation | BookingLocationSlotsPair;

export type CalendarDateLocations = CalendarLocation[];

export interface CalendarDate {
  dateStr: DateString;
  locations: CalendarDateLocations;
}

export type CalendarMonth = Map<DateString, CalendarDateLocations>;

export type CalendarData = Map<MonthString, CalendarMonth>;

export const useCalendarLocations = (
  coords: Coords,
  radiusKm: number,
  setLastUpdateTime: (time: Date | null) => void
) => {
  const bookingData = useBookingData(coords, radiusKm, setLastUpdateTime);
  if ("ok" in bookingData) {
    const months: CalendarData = bookingData.ok;
    return {
      ok: new Map(
        Array.from(months).sort((a, b) => String(b[0]).localeCompare(a[0]))
      ),
    };
  } else {
    return bookingData;
  }
};
