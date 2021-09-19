import { createContext } from "react";
import {
  Location,
  AvailabilityData,
} from "./calendar/booking/BookingDataTypes";
import { HealthpointLocation } from "./today-locations/healthpoint/HealthpointData";

function defaultContextValue<T>(defaultValue: T) {
  return {
    value: defaultValue,
    setValue: (_: T): void => {},
  };
}

interface Context<T> {
  value: T;
  setValue: (_: T) => void;
}

function contextCreate<T>(defaultValue: T): React.Context<Context<T>> {
  return createContext<Context<T>>(defaultContextValue(defaultValue as T));
}

export type HealthpointLocationsResult =
  | { value: HealthpointLocation[] }
  | { error: Error }
  | { loading: true };
export type LocationsResult =
  | { value: Location[] }
  | { error: Error }
  | { loading: true };

export const HealthpointLocationsContext = contextCreate({
  loading: true,
} as HealthpointLocationsResult);
export const LocationsContext = contextCreate({
  loading: true,
} as LocationsResult);

// DON'T USE
export const AvailabilityDataContext = contextCreate(
  null as AvailabilityData | null
);
