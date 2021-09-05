import { useState } from 'react';
import { WalkBox, WalkContainer } from './VaxComponents';
import WalkModal from './WalkModal';

export type WalkinLocation = {
  name: string;
  hours: string[];
  phone?: string;
  address: string;
  description: string;
  openHourToday?: string;
  distanceAway: number;
};

// TODO: replace this with legit data
const mockWalkInLocations: WalkinLocation[] = [{
  name: 'Henderson Vaccination Centre',
  description: 'This vaccination centre allows you to walk up and get a vaccination, no booking necessary. Just remember to maintain social distancing, and bring a mask!',
  address: 'Henderson Vaccination Centre, 28 Catherine Street, Henderson',
  hours: [`Mon - fri 8am - 4.30pm (first appointments at 9am, last appointments at 3.30pm)`, `Sat 9:00 AM – 2:00 PM`],
  phone: '09 123 123',
  openHourToday: 'Open today 9am - 5pm',
  distanceAway: 400
},
{
  name: 'Henderson Vaccination Centre',
  description: 'This vaccination centre allows you to walk up and get a vaccination, no booking necessary. Just remember to maintain social distancing, and bring a mask!',
  address: 'Henderson Vaccination Centre, 28 Catherine Street, Henderson',
  hours: [`Mon - fri 8am - 4.30pm (first appointments at 9am, last appointments at 3.30pm)`, `Sat 9:00 AM – 2:00 PM`],
  phone: '09 123 123',
  openHourToday: 'Open today 9am - 5pm',
  distanceAway: 400
},
{
  name: 'Henderson Vaccination Centre',
  description: 'This vaccination centre allows you to walk up and get a vaccination, no booking necessary. Just remember to maintain social distancing, and bring a mask!',
  address: 'Henderson Vaccination Centre, 28 Catherine Street, Henderson',
  hours: [`Mon - fri 8am - 4.30pm (first appointments at 9am, last appointments at 3.30pm)`, `Sat 9:00 AM – 2:00 PM`],
  phone: '09 123 123',
  openHourToday: 'Open today 9am - 5pm',
  distanceAway: 400
},
{
  name: 'Henderson Vaccination Centre',
  description: 'This vaccination centre allows you to walk up and get a vaccination, no booking necessary. Just remember to maintain social distancing, and bring a mask!',
  address: 'Henderson Vaccination Centre, 28 Catherine Street, Henderson',
  hours: [`Mon - fri 8am - 4.30pm (first appointments at 9am, last appointments at 3.30pm)`, `Sat 9:00 AM – 2:00 PM`],
  phone: '09 123 123',
  openHourToday: '9am - 5pm',
  distanceAway: 400
},
];

export function WalkInSection() {
  const [selectedLocationIndex, setSelectedLocation] = useState<number>();

  const openModal = (locationIndex: number) => {
    console.log(locationIndex);
    setSelectedLocation(locationIndex);
  };

  const clearSelectedLocation = () => setSelectedLocation(undefined);

  return (
    <div>
      <WalkModal
        clearSelectedLocation={clearSelectedLocation}
        location={selectedLocationIndex !== undefined ? mockWalkInLocations[selectedLocationIndex] : undefined}
      />
      <h2 className="WalkSection">
        Walk-in centres - Open right now
      </h2>
      <WalkContainer>
        {
          mockWalkInLocations.map(({ name, distanceAway, openHourToday }, index) => {
            return (
              <WalkBox onClick={() => openModal(index)} key={index}>
                <section>
                  <div>
                    <h3>{name}</h3>
                    <p>{distanceAway}m away</p>
                  </div>

                  {openHourToday && <p>Open today {openHourToday}</p>}
                </section>
                <img
                  className="Chevron"
                  src="./arrow-right-1.svg"
                  alt=""
                />
              </WalkBox>
            );
          })
        }
      </WalkContainer>
    </div>);
}