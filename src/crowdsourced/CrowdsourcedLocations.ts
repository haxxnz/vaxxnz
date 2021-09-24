import { Instruction } from "../today-locations/healthpoint/HealthpointData";
import { CrowdsourcedLocation } from "./CrowdsourcedData";

export const crowdsourcedLocations: CrowdsourcedLocation[] = [
  {
    isCrowdSourced: true,
    name: "Unichem Taieri Pharmacy",
    address: "2 Factory Road, Mosgiel 9024, New Zealand",
    lat: -45.87390569999999,
    lng: 170.3481553,
    instructions: [Instruction.allowsBookings],
    website: "http://www.unichem.co.nz/storelocator/store?id=2535814157",
    telephone: "03-489 5171",
    openingHours: [
      { day: 1, isOpen: true, hours: "8:30 AM – 6:00 PM" },
      { day: 2, isOpen: true, hours: "8:30 AM – 6:00 PM" },
      { day: 3, isOpen: true, hours: "8:30 AM – 6:00 PM" },
      { day: 4, isOpen: true, hours: "8:30 AM – 6:00 PM" },
      { day: 5, isOpen: true, hours: "8:30 AM – 6:00 PM" },
      { day: 6, isOpen: true, hours: "9:30 AM – 2:00 PM" },
      { day: 0, isOpen: false },
    ],
  },
];
