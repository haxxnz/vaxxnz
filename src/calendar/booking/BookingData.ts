import { format, parse } from "date-fns";
import { useState, useCallback, useEffect, useMemo } from "react";
import filterOldDates from "../../filterOldDates";
import { Coords } from "../../location-picker/LocationPicker";
import { getDistanceKm } from "../../utils/distance";
import { DateString, MonthString } from "../CalendarData";
import {
  BookingDateLocations,
  Location,
  LocationsData,
  BookingLocationSlotsPair,
} from "./BookingDataTypes";

const NZbbox = [166.509144322, -46.641235447, 178.517093541, -34.4506617165];

async function getLocations() {
  const res = await fetch(
    "https://raw.githubusercontent.com/CovidEngine/vaxxnzlocations/HEAD/uniqLocations.json"
  );
  const data: Location[] = await res.json();
  return data;
}

async function getLocationData(extId: string) {
  const res = await fetch(
    `https://raw.githubusercontent.com/CovidEngine/vaxxnzlocations/HEAD/availability/${extId}.json`
  );
  const data: LocationsData = await res.json();
  return data;
}

async function getMyCalendar(coords: Coords, radiusKm: number) {
  const locations = await getLocations();
  const filtredLocations = locations.filter((location) => {
    const distance = getDistanceKm(coords, location.location);
    return distance < radiusKm;
  });
  if (filtredLocations.length === 0) {
    if (
      !(
        coords.lat > NZbbox[1] &&
        coords.lat < NZbbox[3] &&
        coords.lng > NZbbox[0] &&
        coords.lng < NZbbox[2]
      )
    ) {
      throw new Error(
        "No vaccination sites found for this search query. Are you in New Zealand?"
      );
    }
    throw new Error(
      "No vaccination sites found for this search query. Try a different kilometer radius?"
    );
  }
  let oldestLastUpdatedTimestamp = Infinity;
  const availabilityDatesAndLocations = await Promise.all(
    filtredLocations.map(async (location) => {
      let locationsData: LocationsData | undefined = undefined;
      try {
        locationsData = await getLocationData(location.extId);
      } catch (e) {
        console.error("getMyCalendar e", e);
      }
      const lastUpdatedAt = locationsData?.lastUpdatedAt;
      const lastUpdatedTimestamp = lastUpdatedAt
        ? new Date(lastUpdatedAt).getTime()
        : Infinity;
      if (lastUpdatedTimestamp < oldestLastUpdatedTimestamp) {
        oldestLastUpdatedTimestamp = lastUpdatedTimestamp;
      }

      return {
        location,
        availabilityDates: locationsData?.availabilityDates,
      };
    })
  );

  const today = new Date();
  const dateLocationsPairs: BookingDateLocations[] = [];
  for (let i = 0; i < 60; i++) {
    // 90 days in the future
    const date = new Date().setDate(today.getDate() + i);
    const dateStr = format(date, "yyyy-MM-dd");
    const locationSlotsPairs: BookingLocationSlotsPair[] = [];
    for (let j = 0; j < availabilityDatesAndLocations.length; j++) {
      const availabilityDatesAndLocation = availabilityDatesAndLocations[j];
      const { location, availabilityDates } = availabilityDatesAndLocation;
      const slots = availabilityDates ? availabilityDates[dateStr] : [];
      locationSlotsPairs.push({ isBooking: true, location, slots });
    }
    dateLocationsPairs.push({
      dateStr,
      locationSlotsPairs,
    });
  }
  return { dateLocationsPairs, oldestLastUpdatedTimestamp };
}

type BookingDataResult =
  | { ok: BookingData }
  | { error: Error }
  | { loading: true };

export type BookingData = Map<
  MonthString,
  Map<DateString, BookingLocationSlotsPair[]>
>;

function getBookingData(bookingDateLocations: BookingDateLocations[]) {
  const dateLocationsPairs = filterOldDates(bookingDateLocations);
  let byMonth: BookingData = new Map();
  dateLocationsPairs.forEach((dateLocationsPair) => {
    const date = parse(dateLocationsPair.dateStr, "yyyy-MM-dd", new Date());
    const month = date.toLocaleString("en-NZ", {
      month: "long",
      year: "numeric",
    });
    const mapToPush = byMonth.get(month) ?? new Map();
    mapToPush.set(
      dateLocationsPair.dateStr,
      dateLocationsPair.locationSlotsPairs
    );
    byMonth.set(month, mapToPush);
  });
  return byMonth;
}

export const useBookingData = (
  coords: Coords,
  radiusKm: number,
  setLastUpdateTime: (time: Date | null) => void
): BookingDataResult => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [dateLocationsPairs, setDateLocationsPairs] = useState<
    BookingDateLocations[]
  >([]);

  const loadCalendar = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getMyCalendar(coords, radiusKm);
      setDateLocationsPairs(data.dateLocationsPairs);
      setLastUpdateTime(
        data.oldestLastUpdatedTimestamp === Infinity
          ? null
          : new Date(data.oldestLastUpdatedTimestamp)
      );
    } catch (error) {
      setError(error as Error);
    }
    setLoading(false);
  }, [coords, radiusKm, setDateLocationsPairs, setLastUpdateTime]);

  // FOR FUTURE: set directly in setState to reduce RAM usage?
  const byMonth = useMemo(
    () => getBookingData(dateLocationsPairs),
    [dateLocationsPairs]
  );

  useEffect(() => {
    loadCalendar();
  }, [loadCalendar]);

  if (loading) {
    return { loading: true };
  } else if (error) {
    return { error };
  } else {
    return { ok: byMonth };
  }
};
