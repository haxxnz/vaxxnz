import { format } from "date-fns";
import { getDistanceKm } from "./distanceUtils";
import {
  AvailabilityDates,
  DateLocationsPair,
  Location,
  LocationSlotsPair,
} from "./types";

export async function getLocations() {
  const res = await fetch(
    "https://raw.githubusercontent.com/CovidEngine/vaxxnzlocations/main/uniqLocations.json"
  );
  const data: Location[] = await res.json();
  return data;
}

export async function getAvailabilityDates(extId: string) {
  const res = await fetch(
    `https://raw.githubusercontent.com/CovidEngine/vaxxnzlocations/main/availability/${extId}.json`
  );
  const data: {availabilityDates: AvailabilityDates, lastUpdatedAt: string} = await res.json();
  return data.availabilityDates;
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
  const availabilityDatesAndLocations = await Promise.all(
    filtredLocations.map(async (location) => {
      let availabilityDates: AvailabilityDates | undefined = undefined;
      try {
        availabilityDates = await getAvailabilityDates(location.extId);
      } catch (e) {
        console.error("getMyCalendar e", e);
      }

      return {
        location,
        availabilityDates,
      };
    })
  );

  const today = new Date();
  const dateLocationsPairs: DateLocationsPair[] = [];
  for (let i = 0; i < 90; i++) {
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
  return dateLocationsPairs;
}
