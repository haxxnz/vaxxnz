import { WalkBox, WalkContainer } from "../../VaxComponents";
// import WalkModal from "./modal/WalkInModal";
import { getDistanceKm } from "../../utils/distance";
import { Coords } from "../../location-picker/LocationPicker";
import { useCrowdsourcedLocations } from "./CrowdsourcedData";
import { useState } from "react";
import { Spinner } from "baseui/spinner";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCar, faWalking } from "@fortawesome/free-solid-svg-icons";
import CrowdsourcedModal from "./modal/CrowdsourcedModal";
import { Instruction } from "../healthpoint/HealthpointData";
import { Trans, useTranslation } from "react-i18next";

export interface Props {
  coords: Coords;
  radiusKm: number;
}

export function CrowdSourcedSection({ coords, radiusKm }: Props) {
  const locations = useCrowdsourcedLocations(coords, radiusKm);

  const [selectedLocationIndex, setSelectedLocation] = useState<number>();
  const [currentView, setCurrentView] = useState(6);
  const openModal = (locationIndex: number) => {
    setSelectedLocation(locationIndex);
  };

  const { t } = useTranslation("common");

  const clearSelectedLocation = () => setSelectedLocation(undefined);

  const loadMore = () => {
    setCurrentView((latest) => latest + 6);
  };

  return "error" in locations ||
    ("ok" in locations && locations.ok.length === 0) ? null : (
    <div>
      <CrowdsourcedModal
        clearSelectedLocation={clearSelectedLocation}
        location={
          "ok" in locations && selectedLocationIndex !== undefined
            ? locations.ok[selectedLocationIndex]
            : undefined
        }
      />
      <h2 className="WalkSection">
        <Trans
          i18nKey="walkins.otherLocations.sectionHeader"
          t={t}
          components={[<strong></strong>]}
        />
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
            {t("core.loading")}
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
                    lat: locationLat,
                    lng: locationLng,
                    openingHours,
                    instructions,
                  },
                  index
                ) => {
                  const currentDay = new Date().getDay();
                  const currentOpeningHours = openingHours.find(
                    (oh) => oh.day === currentDay
                  );
                  return (
                    <WalkBox onClick={() => openModal(index)} key={index}>
                      <section className="WalkItem">
                        <div>
                          <h3>
                            {name}
                            {instructions.includes(Instruction.walkIn) && (
                              <FontAwesomeIcon icon={faWalking} />
                            )}
                            {instructions.includes(
                              Instruction.driveThrough
                            ) && <FontAwesomeIcon icon={faCar} />}
                          </h3>
                          {locationLat && locationLng && (
                            <p>
                              {t("core.kmAway", {
                                distance:
                                  Math.round(
                                    getDistanceKm(coords, {
                                      lat: locationLat,
                                      lng: locationLng,
                                    }) * 10
                                  ) / 10,
                              })}
                            </p>
                          )}
                        </div>

                        {currentOpeningHours?.isOpen && (
                          <p>
                            {t("walkins.openString", {
                              openTimeString: currentOpeningHours.hours,
                            })}
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
              {t("walkins.seeMore")}
            </button>
          )}
        </>
      )}
    </div>
  );
}
