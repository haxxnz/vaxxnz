import React from "react";
import { DateLocationsPair } from "./types";

export const DateLocationsPairsContext = React.createContext({
  setDateLocationsPairs: (_a: DateLocationsPair[]): void => {},
  dateLocationsPairs: [] as DateLocationsPair[],
});
