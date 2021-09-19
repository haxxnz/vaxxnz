import { createContext } from "react";
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

export const HealthpointLocationsContext = contextCreate({
  loading: true,
} as HealthpointLocationsResult);
