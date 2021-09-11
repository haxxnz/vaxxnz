import React from "react";
import { BookingDateLocations } from "./calendar/booking/BookingDataTypes";

export const DateLocationsPairsContext = React.createContext({
  setDateLocationsPairs: (_a: BookingDateLocations[]): void => {},
  dateLocationsPairs: [] as BookingDateLocations[],
});
