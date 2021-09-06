import { useEffect, useState } from "react";
import { Spinner } from "baseui/spinner";
import { getWalkinData, WalkinLocation } from "./getData";
import { WalkBox, WalkContainer } from "./VaxComponents";
import WalkModal from "./WalkModal";
import { getDistanceKm } from "./distanceUtils";

export interface Props {
  lat: number;
  lng: number;
  radiusKm: number;
}

export function WalkInSection({ lat, lng, radiusKm }: Props) {
  const [selectedLocationIndex, setSelectedLocation] = useState<number>();
  const [walkInLocations, setWalkinLocation] = useState<WalkinLocation[]>([]);
  const [currentView, setCurrentView] = useState(6);
  const [loading, setLoading] = useState<boolean>(true);
  useEffect(() => {
    setLoading(true);
    getWalkinData()
      .then((walkIn) => {
        setWalkinLocation(filterWalkInLocation(walkIn, lat, lng, radiusKm));
        setCurrentView(6); // clear view more when we reload location
      })
      .finally(() => setLoading(false));
  }, [lat, lng, radiusKm]);
  const openModal = (locationIndex: number) => {
    setSelectedLocation(locationIndex);
  };

  const clearSelectedLocation = () => setSelectedLocation(undefined);

  const loadMore = () => {
    setCurrentView((latest) => latest + 6);
  };

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
      <h2 className="WalkSection">Walk-in &amp; Drive-through Locations </h2>
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
      )}
      {walkInLocations.length === 0 && !loading && (
        <div>
          someone please come up with something that I can show when no walk in
          location found. Looking at you, WALTER LIM XOXOXO
          <br /> Minh pls ill design something soon im tired
        </div>
      )}
      <WalkContainer>
        {walkInLocations
          .slice(0, currentView)
          .map(
            (
              { name, isOpenToday, lat: locationLat, lng: locationLng },
              index
            ) => {
              return (
                <WalkBox onClick={() => openModal(index)} key={index}>
                  <section>
                    <div>
                      <h3>{name}</h3>
                      {locationLat && locationLng && (
                        <p>
                          {Math.round(
                            getDistanceKm(lat, lng, locationLat, locationLng) *
                              10
                          ) / 10}
                          KM away
                        </p>
                      )}
                    </div>

                    {isOpenToday && <p>Open today </p>}
                  </section>
                  <img className="Chevron" src="./arrow-right-1.svg" alt="" />
                </WalkBox>
              );
            }
          )}
      </WalkContainer>
      {/* Over here @WALTS */}
      {walkInLocations.length / currentView > 1 && (
        <button className="WalkSeeMore" onClick={loadMore}>
          See more
        </button>
      )}
    </div>
  );
}

function filterWalkInLocation(
  walkIn: WalkinLocation[],
  lat: number,
  lng: number,
  radiusKm: number
) {
  const matchedFilter = walkIn.filter(
    ({ lat: locationLat, lng: locationLng, isOpenToday, instructionLis: bps }) => {
      const distanceInKm =
        locationLat &&
        locationLng &&
        getDistanceKm(lat, lng, locationLat, locationLng);

      const filterBoolean = (bps.includes('Walk in') || bps.includes('Drive through')) && !(bps.includes('Eligible GP enrolled patients only') || bps.includes('By invitation only'))

      return distanceInKm < radiusKm && isOpenToday && filterBoolean;
    }
  );
  matchedFilter.sort(
    (
      { lat: locationALat, lng: locationALng },
      { lat: locationBLat, lng: locationBLng }
    ) => {
      const distanceKmLocationA = getDistanceKm(
        lat,
        lng,
        locationALat,
        locationALng
      );
      const distanceKmLocationB = getDistanceKm(
        lat,
        lng,
        locationBLat,
        locationBLng
      );
      return distanceKmLocationA - distanceKmLocationB;
    }
  );
  return matchedFilter;
}
