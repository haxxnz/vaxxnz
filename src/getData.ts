import { format } from "date-fns";
import { getDistanceKm } from "./distanceUtils";
import {
  DateLocationsPair,
  Location,
  LocationsData,
  LocationSlotsPair,
} from "./types";

const NZbbox = [166.509144322, -46.641235447, 178.517093541, -34.4506617165];


export async function getLocations() {
  const res = await fetch(
    "https://raw.githubusercontent.com/CovidEngine/vaxxnzlocations/main/uniqLocations.json"
  );
  const data: Location[] = await res.json();
  return data;
}

export async function getLocationData(extId: string) {
  const res = await fetch(
    `https://raw.githubusercontent.com/CovidEngine/vaxxnzlocations/main/availability/${extId}.json`
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
  if (filtredLocations.length === 0) {
    if (!(lat > NZbbox[1] && lat < NZbbox[3] && lng > NZbbox[0] && lng < NZbbox[2])) {
      throw new Error('No vaccination sites found for this search query. Are you in New Zealand?');
    }
    throw new Error('No vaccination sites found for this search query. Try a different kilometer radius?');
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

export interface OpennningHours {
  schedule: { [date: string]: string; };
  exceptions: { [date: string]: string; };
  notesHtml: string[]
}

export interface WalkinLocation {
  lat: number;
  lng: number;
  name: string;
  branch: string;
  isOpenToday: boolean;
  instructionLis: string[];
  address: string;
  faxNumber: string;
  telephone: string;
  opennningHours: OpennningHours;
}

export async function getWalkinData(): Promise<WalkinLocation[]> {
  try {
    const res = await fetch('https://raw.githubusercontent.com/CovidEngine/vaxxnzlocations/5bbd5c30cdefbb753412523a272f7a143cff5aa3/healthpointLocations.json');
    const data = await res.json();
    return data;
  } catch (e) {
    console.error(e); // Ilia, please don't break this, xoxoxo
    return [];
  }
}