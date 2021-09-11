import { useState, useEffect } from "react";
import { Coords } from "../../location-picker/LocationPicker";
import { getDistanceKm } from "../../utils/distance";

export interface OpeningHours {
  schedule: { [date: string]: string };
  exceptions: { [date: string]: string };
  notesHtml: string[];
}

export enum Instruction {
  anyoneEligible = "Anyone currently eligible can access",
  makeAppointment = "Make an appointment",
  enrolledOnly = "Eligible GP enrolled patients only",
  walkIn = "Walk in",
  invitationOnly = "By invitation only",
  driveThrough = "Drive through",
  allowsBookings = "Allows bookings",
}

export interface HealthpointLocationRaw {
  lat: number;
  lng: number;
  name: string;
  branch: string;
  isOpenToday: boolean;
  openTodayHours: string;
  url: string;
  instructionLis: Instruction[];
  address: string;
  faxNumber: string;
  telephone: string;
  opennningHours: OpeningHours;
}
export interface HealthpointLocation extends HealthpointLocationRaw {
  isHealthpoint: true;
}

const getHealthpointData = (): Promise<HealthpointLocation[]> =>
  fetch(
    "https://raw.githubusercontent.com/CovidEngine/vaxxnzlocations/HEAD/healthpointLocations.json"
  )
    .then((r) => r.json())
    .then((locs) =>
      locs.map((l: HealthpointLocationRaw) => ({ isHealthpoint: true, ...l }))
    );

type HealthpointDataResult =
  | { ok: HealthpointLocation[] }
  | { error: Error }
  | { loading: true };

const useHealthpointData = (): HealthpointDataResult => {
  const [healthpointLocations, setHealthpointLocations] = useState<
    HealthpointLocation[] | null
  >(null);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    getHealthpointData()
      .then((locations) => {
        setHealthpointLocations(locations);
      })
      .catch((err) => setError(err));
  }, []);

  if (error) {
    return { error };
  } else if (healthpointLocations) {
    return { ok: healthpointLocations };
  } else {
    return { loading: true };
  }
};

type HealthpointLocationsResult =
  | { ok: HealthpointLocation[] }
  | { error: Error }
  | { loading: true };

export const useHealthpointLocations = (
  coords: Coords,
  radiusKm: number
): HealthpointLocationsResult => {
  const allLocations = useHealthpointData();

  if ("ok" in allLocations) {
    return { ok: filterHealthpointLocation(allLocations.ok, coords, radiusKm) };
  } else {
    return allLocations;
  }
};

function filterHealthpointLocation(
  allLocations: HealthpointLocation[],
  coords: Coords,
  radiusKm: number
) {
  const matchedFilter = allLocations.filter(
    ({
      lat: locationLat,
      lng: locationLng,
      isOpenToday,
      instructionLis: bps,
    }) => {
      const distanceInKm =
        locationLat &&
        locationLng &&
        getDistanceKm(coords, { lat: locationLat, lng: locationLng });

      const filterBoolean =
        (bps.includes(Instruction.walkIn) ||
          bps.includes(Instruction.driveThrough)) &&
        !(
          bps.includes(Instruction.enrolledOnly) ||
          bps.includes(Instruction.invitationOnly)
        );

      return distanceInKm < radiusKm && isOpenToday && filterBoolean;
    }
  );
  matchedFilter.sort(
    (
      { lat: locationALat, lng: locationALng },
      { lat: locationBLat, lng: locationBLng }
    ) => {
      const distanceKmLocationA = getDistanceKm(coords, {
        lat: locationALat,
        lng: locationALng,
      });
      const distanceKmLocationB = getDistanceKm(coords, {
        lat: locationBLat,
        lng: locationBLng,
      });
      return distanceKmLocationA - distanceKmLocationB;
    }
  );
  return matchedFilter;
}
