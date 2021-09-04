import { format, parseISO } from "date-fns";
import { getDistanceKm } from "./distanceUtils";
import {
  DateLocationsPair,
  Location,
  LocationsData,
  LocationSlotsPair,
} from "./types";

export async function getLocations() {
  const res = await fetch(
    "https://raw.githubusercontent.com/CovidEngine/vaxxnzlocations/HEAD/uniqLocations.json"
  );
  const data: Location[] = await res.json();
  return data;
}

export async function getLocationData(extId: string) {
  const res = await fetch(
    `https://raw.githubusercontent.com/CovidEngine/vaxxnzlocations/HEAD/availability/${extId}.json`
  );
  const data: LocationsData = await res.json();
  return data;
}
export async function getMyCalendar(
  lat: number,
  lng: number,
  radiusKm: number
) {
  const locations = await getLocations();
  const filtredLocations = locations.filter((location) => {
    const distance = getDistanceKm(
      lat,
      lng,
      location.location.lat,
      location.location.lng
    );
    return distance < radiusKm;
  });
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
  const dateLocationsPairs: DateLocationsPair[] = [];
  for (let i = 0; i < 60; i++) {
    // 90 days in the future
    const date = new Date().setDate(today.getDate() + i);
    const dateStr = format(date, "yyyy-MM-dd");
    const locationSlotsPairs: LocationSlotsPair[] = [];
    for (let j = 0; j < availabilityDatesAndLocations.length; j++) {
      const availabilityDatesAndLocation = availabilityDatesAndLocations[j];
      const { location, availabilityDates } = availabilityDatesAndLocation;
      const slots = availabilityDates ? availabilityDates[dateStr] : [];
      locationSlotsPairs.push({ location, slots });
    }
    dateLocationsPairs.push({
      dateStr,
      locationSlotsPairs,
    });
  }
  return { dateLocationsPairs, oldestLastUpdatedTimestamp };
}
