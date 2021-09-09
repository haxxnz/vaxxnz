import { Instruction } from "../walk-in/WalkInData";
import { CrowdsourcedLocation } from "./CrowdsourcedData";

export const crowdsourcedLocations: CrowdsourcedLocation[] = [
  {
    name: "Auckland Airport Vaccination Centre",
    address: "22 Verissimo Drive, Mangere",
    lat: -36.9854795,
    lng: 174.7885245,
    instructions: [Instruction.driveThrough],
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
];
