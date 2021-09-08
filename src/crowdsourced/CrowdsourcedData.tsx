import { Coords } from "../location-picker/LocationPicker";
import { getDistanceKm } from "../utils/distance";

interface OpeningHours {
  // 0 = monday, 1 = tuesday ... same as new Date().getDay();
  day: 0 | 1 | 2 | 3 | 4 | 5 | 6;
  isOpen: boolean;
  hours: string;
}

export enum Instruction {
  anyoneEligible = "Anyone currently eligible can access",
  makeAppointment = "Make an appointment",
  enrolledOnly = "Eligible GP enrolled patients only",
  walkIn = "Walk in",
  invitationOnly = "By invitation only",
  driveThrough = "Drive through",
}

export interface CrowdsourcedLocation {
  lat: number;
  lng: number;
  name: string;
  branch?: string;
  address: string;
  telephone?: string;
  openingHours: OpeningHours[];
  instructions: string;
  website?: string;
  bookingWebsite?: string;
  additionalInformation?: string;
}

// const getWalkInData = (): Promise<CrowdsourcedLocation[]> =>
//   fetch(
//     "https://raw.githubusercontent.com/CovidEngine/vaxxnzlocations/HEAD/healthpointLocations.json"
//   ).then((r) => r.json());

type WalkInDataResult =
  | { ok: CrowdsourcedLocation[] }
  | { error: Error }
  | { loading: true };

const useCrowdsourcedData = (): WalkInDataResult => {
  // const [walkInLocations, setWalkinLocations] = useState<
  //   WalkInLocation[] | null
  // >(null);
  // const [error, setError] = useState<Error | null>(null);

  // useEffect(() => {
  //   getWalkInData()
  //     .then((locations) => {
  //       setWalkinLocations(locations);
  //     })
  //     .catch((err) => setError(err));
  // }, []);

  return {
    ok: [
      {
        name: "Auckland Airport Vaccination Centre",
        address: "22 Verissimo Drive, Mangere",
        lat: -36.9854795,
        lng: 174.7885245,
        instructions: Instruction.driveThrough,
        website:
          "https://www.aucklandairport.co.nz/information/drive-through-vaccination-centre",
        bookingWebsite: undefined,
        additionalInformation: undefined,
        branch: undefined,
        telephone: undefined,
        openingHours: [
          {
            day: 0,
            isOpen: true,
            hours: "8:30am - 4:00pm",
          },
          {
            day: 1,
            isOpen: true,
            hours: "8:30am - 4:00pm",
          },
          {
            day: 2,
            isOpen: true,
            hours: "8:30am - 4:00pm",
          },
          {
            day: 3,
            isOpen: true,
            hours: "8:30am - 4:00pm",
          },
          {
            day: 4,
            isOpen: true,
            hours: "8:30am - 4:00pm",
          },
          {
            day: 5,
            isOpen: true,
            hours: "8:30am - 4:00pm",
          },
          {
            day: 6,
            isOpen: true,
            hours: "8:30am - 4:00pm",
          },
        ],
      },
    ],
  };
};

type CrowdSourcedLocationResult =
  | { ok: CrowdsourcedLocation[] }
  | { error: Error }
  | { loading: true };

export const useCrowdsourcedLocations = (
  coords: Coords,
  radiusKm: number
): CrowdSourcedLocationResult => {
  const allLocations = useCrowdsourcedData();

  if ("ok" in allLocations) {
    return {
      ok: filterCrowdsourcedLocations(allLocations.ok, coords, radiusKm),
    };
  } else {
    return allLocations;
  }
};

function filterCrowdsourcedLocations(
  allLocations: CrowdsourcedLocation[],
  coords: Coords,
  radiusKm: number
) {
  const currentDay = new Date().getDay();
  const matchedFilter = allLocations.filter(
    ({ lat: locationLat, lng: locationLng, openingHours }) => {
      const openingHoursToday = openingHours.find(
        (oh) => oh.day === currentDay
      );

      const distanceInKm =
        locationLat &&
        locationLng &&
        getDistanceKm(coords, { lat: locationLat, lng: locationLng });

      return distanceInKm < radiusKm && openingHoursToday?.isOpen;
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
