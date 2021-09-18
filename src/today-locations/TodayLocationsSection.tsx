import {
  WalkBox as OtherBox,
  WalkContainer as OtherContainer,
} from "../VaxComponents";
import { formatDistanceKm, getDistanceKm } from "../utils/distance";
import { Instruction } from "./healthpoint/HealthpointData";
import { useState } from "react";
import { Spinner } from "baseui/spinner";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCar, faWalking } from "@fortawesome/free-solid-svg-icons";
import { enqueueAnalyticsEvent } from "../utils/analytics";
import { Trans, useTranslation } from "react-i18next";
import { useMediaQuery } from "react-responsive";
import { useTodayLocationsData } from "./TodayLocationsData";
import { useHistory } from "react-router-dom";
import { simpleHash } from "../utils/simpleHash";
import { slug } from "../utils/slug";
import { useRadiusKm } from "../utils/useRadiusKm";
import { getSearch } from "../utils/url";
import { useCoords } from "../utils/useCoords";

export interface Props {
  selectedLocationIndex?: number;
  setSelectedLocation: (num?: number) => void;
}

export function TodayLocationsSection({
  selectedLocationIndex,
  setSelectedLocation,
}: Props) {
  const radiusKm = useRadiusKm();
  const coords = useCoords();
  const isMobileView = useMediaQuery({ query: "(max-width: 768px)" });
  const locations = useTodayLocationsData();
  const { t, i18n } = useTranslation("common");
  const history = useHistory();

  const [currentView, setCurrentView] = useState(!isMobileView ? 3 : 1);
  const openModal = (locationIndex: number) => {
    const location =
      "ok" in locations && locationIndex !== undefined
        ? locations.ok[locationIndex]
        : undefined;
    if (!location) {
      return;
    }
    enqueueAnalyticsEvent("Healthpoint location selected", {
      locationName: location ? location.name : "",
      radiusKm,
    });
    history.push(
      `/${slug(location.name)}-${simpleHash(
        `${location.lat}${location.lng}`
      )}${getSearch()}`
    );
  };

  const loadMore = () => {
    setCurrentView((latest) => latest + 12);
  };

  return "error" in locations ||
    ("ok" in locations && locations.ok.length === 0) ? null : (
    <div>
      <div className="WalkSection">
        <h2>
          <Trans
            i18nKey="walkins.sectionHeader"
            t={t}
            components={[<strong></strong>]}
          />
        </h2>
      </div>
      {"loading" in locations ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            minHeight: "20vh",
            width: "100%",
            backgroundColor: "white",
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
          <OtherContainer>
            {locations.ok
              .slice(0, currentView)
              .map(
                (
                  { name, lat: locationLat, lng: locationLng, ...location },
                  index
                ) => {
                  let openHours;
                  let isOpenToday;
                  let instructions;
                  if ("isHealthpoint" in location) {
                    openHours = location.openTodayHours;
                    isOpenToday = location.isOpenToday;
                    instructions = location.instructionLis;
                  } else {
                    instructions = location.instructions;
                    const currentDay = new Date().getDay();
                    const hours = location.openingHours.find(
                      (oh) => oh.day === currentDay
                    )!;
                    isOpenToday = hours.isOpen;
                    if (hours.isOpen) {
                      openHours = hours.hours;
                    }
                  }
                  return (
                    <OtherBox onClick={() => openModal(index)} key={index}>
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
                              {t("core.distanceAway", {
                                distance: formatDistanceKm(
                                  getDistanceKm(coords, {
                                    lat: locationLat,
                                    lng: locationLng,
                                  }),
                                  i18n.language
                                ),
                              })}
                            </p>
                          )}
                        </div>

                        {isOpenToday && (
                          <p>
                            {t("walkins.openString", {
                              openTimeString: openHours,
                            })}
                          </p>
                        )}
                      </section>
                      <img
                        className="Chevron"
                        src="./arrow-right-1.svg"
                        alt=""
                      />
                    </OtherBox>
                  );
                }
              )}
          </OtherContainer>

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
