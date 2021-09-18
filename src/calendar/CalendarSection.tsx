import React, { FunctionComponent } from "react";
import { Coords } from "../location-picker/LocationPicker";
import { BookingCalendar, LoadingBookingCalendar } from "./Calendar";
import { useBookingData } from "./booking/BookingData";
import { CalendarError } from "./CalendarError";

interface CalendarSectionProps {
  coords: Coords;
  setLastUpdateTime: (time: Date | null) => void;
}

/** Loads booking data, display the calendar or load errors. */
export const CalendarSection: FunctionComponent<CalendarSectionProps> = ({
  coords,
  setLastUpdateTime,
}) => {
  const data = useBookingData(coords, setLastUpdateTime);
  return (
    <>
      {"ok" in data ? (
        <BookingCalendar data={data.ok} />
      ) : "loading" in data ? (
        <LoadingBookingCalendar />
      ) : (
        <CalendarError errorMessage={data.error.message} />
      )}
    </>
  );
};
