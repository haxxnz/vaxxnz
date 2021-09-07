import { WalkBox, WalkContainer } from "../VaxComponents";
import WalkModal from "./modal/WalkInModal";
import { getDistanceKm } from "../utils/distance";
import { Coords } from "../location-picker/LocationPicker";
import { Instruction, useWalkInLocations } from "./WalkInData";
import { useState } from "react";
import { Spinner } from "baseui/spinner";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCar, faWalking } from "@fortawesome/free-solid-svg-icons";

export interface Props {
  coords: Coords;
  radiusKm: number;
}

export function WalkInSection({ coords, radiusKm }: Props) {
  const locations = useWalkInLocations(coords, radiusKm);

  const [selectedLocationIndex, setSelectedLocation] = useState<number>();
  const [currentView, setCurrentView] = useState(6);
  const openModal = (locationIndex: number) => {
    setSelectedLocation(locationIndex);
  };

  const clearSelectedLocation = () => setSelectedLocation(undefined);

  const loadMore = () => {
    setCurrentView((latest) => latest + 6);
  };

  return "error" in locations ||
    ("ok" in locations && locations.ok.length === 0) ? null : (
    <div>
      <WalkModal
        clearSelectedLocation={clearSelectedLocation}
        location={
          "ok" in locations && selectedLocationIndex !== undefined
            ? locations.ok[selectedLocationIndex]
            : undefined
        }
      />
      <h2 className="WalkSection">
        Walk-in &amp; Drive-thru Vaccinations<strong> - Open Today</strong>
      </h2>
      {"loading" in locations ? (
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
      ) : (
        <>
          <WalkContainer>
            {locations.ok
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
                      <section>
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
                                getDistanceKm(coords, {
                                  lat: locationLat,
                                  lng: locationLng,
                                }) * 10
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

          {/* Over here @WALTS */}
          {"ok" in locations && locations.ok.length / currentView > 1 && (
            <button className="WalkSeeMore" onClick={loadMore}>
              See more
            </button>
          )}
        </>
      )}
    </div>
  );
}
