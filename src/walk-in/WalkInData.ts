import { useState, useEffect } from "react";
import { Coords } from "../location-picker/LocationPicker";
import { getDistanceKm } from "../utils/distance";

export interface OpennningHours {
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
}

export interface WalkInLocation {
  lat: number;
  lng: number;
  name: string;
  branch: string;
  isOpenToday: boolean;
  openTodayHours: string;
  instructionLis: Instruction[];
  address: string;
  faxNumber: string;
  telephone: string;
  opennningHours: OpennningHours;
}

const getWalkInData = (): Promise<WalkInLocation[]> =>
  fetch(
    "https://raw.githubusercontent.com/CovidEngine/vaxxnzlocations/HEAD/healthpointLocations.json"
  ).then((r) => r.json());

type WalkInDataResult =
  | { ok: WalkInLocation[] }
  | { error: Error }
  | { loading: true };

const useWalkInData = (): WalkInDataResult => {
  const [walkInLocations, setWalkinLocations] = useState<
    WalkInLocation[] | null
  >(null);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    getWalkInData()
      .then((locations) => {
        setWalkinLocations(locations);
      })
      .catch((err) => setError(err));
  }, []);

  if (error) {
    return { error };
  } else if (walkInLocations) {
    return { ok: walkInLocations };
  } else {
    return { loading: true };
  }
};

type WalkInLocationsResult =
  | { ok: WalkInLocation[] }
  | { error: Error }
  | { loading: true };

export const useWalkInLocations = (
  coords: Coords,
  radiusKm: number
): WalkInLocationsResult => {
  const allLocations = useWalkInData();

  if ("ok" in allLocations) {
    return { ok: filterWalkInLocation(allLocations.ok, coords, radiusKm) };
  } else {
    return allLocations;
  }
};

function filterWalkInLocation(
  allLocations: WalkInLocation[],
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
