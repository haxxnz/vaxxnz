import React, { FunctionComponent } from "react";
import { BookingCalendar, LoadingBookingCalendar } from "./Calendar";
import { BookingDataResult } from "./booking/BookingData";
import { CalendarError } from "./CalendarError";
import { useCoords } from "../utils/useCoords";
import { Footer } from "../Footer";

export interface CalendarSectionProps {
  bookingData: BookingDataResult;
}
const NZbbox = [166.509144322, -46.641235447, 178.517093541, -34.4506617165];

/** Loads booking data, display the calendar or load errors. */
export const CalendarSection: FunctionComponent<CalendarSectionProps> = ({
  bookingData: data,
}) => {
  const coords = useCoords();
  if (
    !(
      coords.lat > NZbbox[1] &&
      coords.lat < NZbbox[3] &&
      coords.lng > NZbbox[0] &&
      coords.lng < NZbbox[2]
    )
  ) {
    return (
      <CalendarError
        errorMessage={"Uh oh... this page is only visible in New Zealand"}
      />
    );
  }
  return (
    <>
      {"ok" in data ? (
        <>
          <BookingCalendar data={data.ok} />
          <Footer />
        </>
      ) : "loading" in data ? (
        <>
          <LoadingBookingCalendar />
        </>
      ) : (
        <>
          <CalendarError errorMessage={data.error.message} />
          <Footer />
        </>
      )}
    </>
  );
};
