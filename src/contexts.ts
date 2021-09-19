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

// export const HealthpointLocationContext = createContext<Context<HealthpointLocation[]>>(defaultContextValue([] as HealthpointLocation[]));
// export const AvailabilityDataContext = createContext<Context<AvailabilityData>>(defaultContextValue(null as AvailabilityData));
// export const LocationContext = createContext<Context<Location[]>>(defaultContextValue([] as Location[]));

export const HealthpointLocationsContext = contextCreate(
  null as HealthpointLocation[] | null
);
export const AvailabilityDataContext = contextCreate(
  null as AvailabilityData | null
);
export const LocationsContext = contextCreate(null as Location[] | null);
