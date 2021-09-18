import React, { FunctionComponent } from "react";
import { Coords } from "../location-picker/LocationPicker";
import { BookingCalendar, LoadingBookingCalendar } from "./Calendar";
import { useBookingData } from "./booking/BookingData";

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
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginTop: "1rem",
          }}
        >
          {/* <Spinner color="black" /> */}
          <div style={{ marginLeft: "1rem", fontSize: "1.5rem" }}>
            {data.error.message}
          </div>
        </div>
      )}
    </>
  );
};
