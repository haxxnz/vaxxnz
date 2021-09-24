import { CrowdsourcedLocation } from "../crowdsourced/CrowdsourcedData";
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
