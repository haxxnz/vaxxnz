import React from "react";
import { DateLocationsPair } from "./booking/BookingDataTypes";

export const DateLocationsPairsContext = React.createContext({
  setDateLocationsPairs: (_a: DateLocationsPair[]): void => {},
  dateLocationsPairs: [] as DateLocationsPair[],
});
