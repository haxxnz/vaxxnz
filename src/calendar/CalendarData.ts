import { addDays, format } from "date-fns";
import {
  CrowdsourcedLocation,
  useCrowdsourcedLocations,
} from "../crowdsourced/CrowdsourcedData";
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
  const crowdSourced = useCrowdsourcedLocations(coords, radiusKm);
  const bookingData = useBookingData(coords, radiusKm, setLastUpdateTime);
  if ("ok" in bookingData) {
    const months: CalendarData = bookingData.ok;

    const MAX_DAYS = 60;
    const today = new Date();
    for (const location of crowdSourced) {
      for (let i = 0; i < MAX_DAYS; i++) {
        // add crowd sourced locations to each calendar day they're open
        const date = addDays(today, i);
        const isOpen = !!location.openingHours[date.getDay()]?.isOpen;
        if (!isOpen) {
          continue;
        }

        const dateStr = format(date, "yyyy-MM-dd");
        const monthStr = date.toLocaleString("en-NZ", {
          month: "long",
          year: "numeric",
        });
        const month: CalendarMonth = months.get(monthStr) ?? new Map();

        const day: CalendarDateLocations = month.get(dateStr) ?? [];

        day.push(location);
        month.set(dateStr, day);
        months.set(monthStr, month);
      }
    }

    return {
      ok: new Map(
        Array.from(months).sort((a, b) => String(a[0]).localeCompare(b[0]))
      ),
    };
  } else {
    return bookingData;
  }
};
