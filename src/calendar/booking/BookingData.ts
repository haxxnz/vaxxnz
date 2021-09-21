import { addDays, format, parse } from "date-fns";
import { useCallback, useEffect, useMemo, useState } from "react";
import {
  CrowdsourcedLocation,
  getCrowdsourcedLocations,
} from "../../crowdsourced/CrowdsourcedData";
import { filterSlots, getTodayDateStr } from "../../filterOldDates";
import { Coords } from "../../utils/distance";
import { filterLocations } from "../../utils/location";
import { Radius } from "../../utils/locationTypes";
import { memoize0, memoizeOnce } from "../../utils/memoize";
import { useCoords } from "../../utils/useCoords";
import { useRadiusKm } from "../../utils/useRadiusKm";
import { DateString, MonthString } from "../CalendarData";
import {
  BookingDateLocations,
  BookingLocationSlotsPair,
  Location,
  AvailabilityData,
  LocationRaw,
} from "./BookingDataTypes";

const getLocations = memoizeOnce(async function () {
  const res = await fetch(
    "https://raw.githubusercontent.com/CovidEngine/vaxxnzlocations/main/uniqLocations.json"
  );
  const dataRaw: LocationRaw[] = await res.json();
  const data: Location[] = dataRaw.map((l) => ({
    ...l,
    isBooking: true,
    lat: l.location.lat,
    lng: l.location.lng,
  }));
  return data;
});

const getAvailabilityData = memoize0(async function (extId: string) {
  const res = await fetch(
    `https://raw.githubusercontent.com/CovidEngine/vaxxnzlocations/main/availability/${extId}.json`
  );
  const data: AvailabilityData = await res.json();
  return data;
});

async function getMyCalendar(coords: Coords, radiusKm: Radius) {
  const locations = await getLocations();
  const crowdSourced = getCrowdsourcedLocations();
  const combinedSorted = filterLocations(
    [...locations, ...crowdSourced],
    coords,
    radiusKm,
    (l) => [l.lat, l.lng]
  );

  let oldestLastUpdatedTimestamp = Infinity;
  const bmvLocations = combinedSorted.filter((l) =>
    "isBooking" in l ? true : false
  ) as Location[];
  const crowdSourcedLocations = combinedSorted.filter((l) =>
    "isCrowdSourced" in l ? true : false
  ) as CrowdsourcedLocation[];
  const availabilityDatesAndLocations = await Promise.all(
    bmvLocations.map(async (location) => {
      let locationsData: AvailabilityData | undefined = undefined;
      try {
        locationsData = await getAvailabilityData(location.extId);
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

      const todayDateStr = getTodayDateStr();
      const slots = filterSlots(locationsData?.availabilityDates[todayDateStr]);

      return {
        location,
        availabilityDates: {
          ...locationsData?.availabilityDates,
          [todayDateStr]: slots,
        },
      };
    })
  );

  const today = new Date();
  const dateLocationsPairs: BookingDateLocations[] = [];
  for (let i = 0; i < 60; i++) {
    // 90 days in the future
    const date = new Date().setDate(today.getDate() + i);
    const dateStr = format(date, "yyyy-MM-dd");
    const locationSlotsPairs: (
      | BookingLocationSlotsPair
      | CrowdsourcedLocation
    )[] = [];
    for (let j = 0; j < availabilityDatesAndLocations.length; j++) {
      const availabilityDatesAndLocation = availabilityDatesAndLocations[j];
      const { location, availabilityDates } = availabilityDatesAndLocation;
      const slots = availabilityDates ? availabilityDates[dateStr] : [];
      locationSlotsPairs.push({ isBooking: true, location, slots });
    }

    for (const location of crowdSourcedLocations) {
      const date = addDays(today, i);
      const isOpen = location.openingHours.find(
        (a) => a.day === date.getDay()
      )?.isOpen;
      if (!isOpen) {
        continue;
      }
      locationSlotsPairs.push(location);
    }

    dateLocationsPairs.push({
      dateStr,
      locationSlotsPairs,
    });
  }
  return { dateLocationsPairs, oldestLastUpdatedTimestamp };
}

export type BookingDataResult =
  | { ok: BookingData }
  | { error: Error }
  | { loading: true };

export type BookingData = Map<
  MonthString,
  Map<DateString, BookingLocationSlotsPair[]>
>;

function generateBookingData(
  bookingDateLocations: BookingDateLocations[],
  coords: Coords,
  radiusKm: Radius
) {
  const dateLocationsPairs = bookingDateLocations;
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
  setLastUpdateTime: (time: Date | null) => void
): BookingDataResult => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [dateLocationsPairs, setDateLocationsPairs] = useState<
    BookingDateLocations[]
  >([]);
  const radiusKm = useRadiusKm();
  const coords = useCoords();

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
    () => generateBookingData(dateLocationsPairs, coords, radiusKm),
    [coords, dateLocationsPairs, radiusKm]
  );

  useEffect(() => {
    loadCalendar();
  }, [loadCalendar]);

  if (loading) {
    return { loading: true };
  } else if (error) {
    return { error };
  } else {
    return {
      ok: new Map(
        Array.from(byMonth).sort((a, b) => String(b[0]).localeCompare(a[0]))
      ),
    };
  }
};
