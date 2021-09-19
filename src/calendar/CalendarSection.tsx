import React, { FunctionComponent } from "react";
import { BookingCalendar, LoadingBookingCalendar } from "./Calendar";
import { BookingDataResult } from "./booking/BookingData";
import { CalendarError } from "./CalendarError";

interface CalendarSectionProps {
  setLastUpdateTime: (time: Date | null) => void;
  data: BookingDataResult;
}

/** Loads booking data, display the calendar or load errors. */
export const CalendarSection: FunctionComponent<CalendarSectionProps> = ({
  setLastUpdateTime,
  data,
}) => {
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
