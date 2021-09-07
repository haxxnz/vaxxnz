import React, { FunctionComponent, useState } from "react";
import { Coords } from "../location-picker/LocationPicker";
import { BookingCalendar } from "./BookingCalendar";
import { useBookingData } from "./BookingData";
import { DateLocationsPair } from "./BookingDataTypes";
import BookingsModal from "./BookingsModal";

interface BookingSectionProps {
  coords: Coords;
  radiusKm: number;
  setLastUpdateTime: (time: Date | null) => void;
}

/** Loads booking data, display the calendar or load errors. */
export const BookingSection: FunctionComponent<BookingSectionProps> = ({
  coords,
  radiusKm,
}) => {
  const [activeDate, setActiveDate] = React.useState<DateLocationsPair | null>(
    null
  );

  const data = useBookingData(coords, radiusKm, setLastUpdateTime);

  return (
    <>
      <BookingsModal
        activeDate={activeDate}
        setActiveDate={setActiveDate}
        coords={coords}
      />

      {"ok" in data ? (
        <BookingCalendar data={data.ok} />
      ) : "loading" in data ? (
        <BookingCalendar data={null} />
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
