import { useEffect, useState } from "react";
import { Spinner } from "baseui/spinner";
import { getWalkinData, Instruction, WalkinLocation } from "./getData";
import { WalkBox, WalkContainer } from "./VaxComponents";
import WalkModal from "./WalkModal";
import { getDistanceKm } from "./distanceUtils";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCar, faWalking } from "@fortawesome/free-solid-svg-icons";

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
    <div
      style={
        walkInLocations.length === 0 && !loading ? { display: "none" } : {}
      }
    >
      <WalkModal
        clearSelectedLocation={clearSelectedLocation}
        location={
          selectedLocationIndex !== undefined
            ? walkInLocations[selectedLocationIndex]
            : undefined
        }
      />
      <h2 className="WalkSection">
        Walk-in &amp; Drive-thru Vaccinations<strong> - Open Today</strong>
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
      )}
      <WalkContainer>
        {walkInLocations
          .slice(0, currentView)
          .map(
            (
              {
                name,
                isOpenToday,
                lat: locationLat,
                lng: locationLng,
                openTodayHours,
                instructionLis: instructions,
              },
              index
            ) => {
              return (
                <WalkBox onClick={() => openModal(index)} key={index}>
                  <section className="WalkItem">
                    <div>
                      <h3>
                        {name}
                        {instructions.includes(Instruction.walkIn) && (
                          <FontAwesomeIcon icon={faWalking} />
                        )}
                        {instructions.includes(Instruction.driveThrough) && (
                          <FontAwesomeIcon icon={faCar} />
                        )}
                      </h3>
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

                    {isOpenToday && (
                      <p>
                        Open <span>{openTodayHours}</span>
                      </p>
                    )}
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
    ({
      lat: locationLat,
      lng: locationLng,
      isOpenToday,
      instructionLis: bps,
    }) => {
      const distanceInKm =
        locationLat &&
        locationLng &&
        getDistanceKm(lat, lng, locationLat, locationLng);

      const filterBoolean =
        (bps.includes(Instruction.walkIn) ||
          bps.includes(Instruction.driveThrough)) &&
        Instruction.isPublic(bps);

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
