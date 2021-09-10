import { WalkBox, WalkContainer } from "../VaxComponents";
import WalkModal from "./modal/WalkInModal";
import { getDistanceKm } from "../utils/distance";
import { Coords } from "../location-picker/LocationPicker";
import { Instruction, useWalkInLocations } from "./WalkInData";
import { useState } from "react";
import { Spinner } from "baseui/spinner";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCar, faWalking } from "@fortawesome/free-solid-svg-icons";
import { enqueueAnalyticsEvent } from '../utils/analytics';
import { Trans, useTranslation } from "react-i18next";

export interface Props {
  coords: Coords;
  radiusKm: number;
}

export function WalkInSection({ coords, radiusKm }: Props) {
  const locations = useWalkInLocations(coords, radiusKm);
  const { t } = useTranslation("common");

  const [selectedLocationIndex, setSelectedLocation] = useState<number>();
  const [currentView, setCurrentView] = useState(6);
  const openModal = (locationIndex: number) => {
    const location =
      "ok" in locations && locationIndex !== undefined
        ? locations.ok[locationIndex]
        : undefined;
    enqueueAnalyticsEvent("Healthpoint location selected", {
      locationName: location ? location.name : "",
      radiusKm,
    });
    setSelectedLocation(locationIndex);
  };

  const clearSelectedLocation = () => {
    setSelectedLocation(undefined)
  };

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
        radiusKm={radiusKm}
      />
      <h2 className="WalkSection">
        <Trans
          i18nKey="walkins.sectionHeader"
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
            marginBottom: "1rem",
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

                        {isOpenToday && (
                          <p>
                            {t("walkins.openString", {
                              openTimeString: openTodayHours,
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
