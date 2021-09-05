import { useEffect, useState } from "react";
import { Spinner } from 'baseui/spinner';
import { getWalkinData, WalkinLocation } from './getData';
import { WalkBox, WalkContainer } from "./VaxComponents";
import WalkModal from "./WalkModal";
import { getDistanceKm } from './distanceUtils';

export interface Props {
  lat: number;
  lng: number;
  radiusKm: number;
}

export function WalkInSection({ lat, lng, radiusKm }: Props) {

  const [selectedLocationIndex, setSelectedLocation] = useState<number>();
  const [walkInLocations, setWalkinLocation] = useState<WalkinLocation[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  useEffect(() => {
    setLoading(true);
    getWalkinData()
      .then(walkIn => {
        const matchedFilter = walkIn.filter(({ lat: locationLat, lng: locationLng, isOpenToday }) => {
          const distanceInKm = locationLat && locationLng && getDistanceKm(lat, lng, locationLat, locationLng);
          return (distanceInKm < radiusKm) && isOpenToday
        });
        setWalkinLocation(matchedFilter);
      })
      .finally(() => setLoading(false));
  }, [lat, lng, radiusKm]);
  const openModal = (locationIndex: number) => {
    setSelectedLocation(locationIndex);
  };

  const clearSelectedLocation = () => setSelectedLocation(undefined);

  return (
    <div>
      <WalkModal
        clearSelectedLocation={clearSelectedLocation}
        location={
          selectedLocationIndex !== undefined
            ? walkInLocations[selectedLocationIndex]
            : undefined
        }
      />
      <h2 className="WalkSection">
        Walk-in centres <i className="StupidWalkHack">- Open today</i>
      </h2>
      {loading && (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginTop: "1rem",
          }}
        >
          <Spinner color="black" />
          <div
            style={{
              marginLeft: "1rem",
              fontSize: "1.5rem",
            }}
          >
            Loading...
          </div>
        </div>
      )
      }
      {walkInLocations.length === 0 && !loading && (
        <div>
          someone please come up with something that I can show when
          no walk in location found. Looking at you, WALTER LIM XOXOXO
        </div>
      )}
      <WalkContainer>
        {walkInLocations.map(
          (
            {
              name,
              isOpenToday,
              lat: locationLat, lng: locationLng,
            },
            index
          ) => {
            return (
              <WalkBox
                onClick={() => openModal(index)}
                key={index}
              >
                <section>
                  <div>
                    <h3>{name}</h3>
                    {locationLat && locationLng && <p>{Math.round(getDistanceKm(lat, lng, locationLat, locationLng) * 100)/ 100}Km away</p>}
                  </div>

                  {isOpenToday && (
                    <p>Open today </p>
                  )}
                </section>
                <img
                  className="Chevron"
                  src="./arrow-right-1.svg"
                  alt=""
                />
              </WalkBox>
            );
          }
        )}
      </WalkContainer>
    </div>
  );
}
