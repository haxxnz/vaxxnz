import {
  WalkBox as OtherBox,
  WalkContainer as OtherContainer,
  WalkMessage,
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
import { saveScrollAndGo } from "../scroll";

export function TodayLocationsSection() {
  const radiusKm = useRadiusKm();
  const coords = useCoords();
  const isMobileView = useMediaQuery({ query: "(max-width: 768px)" });
  const locations = useTodayLocationsData();
  const { t, i18n } = useTranslation("common");
  const history = useHistory();

  const [currentView, setCurrentView] = useState(!isMobileView ? 12 : 12);
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
    const path = `locations/${slug(location.name)}-${simpleHash(
      `${location.lat}${location.lng}`
    )}`;
    saveScrollAndGo(path);
    history.push(`${path}${getSearch()}`);
  };

  const loadMore = () => {
    setCurrentView((latest) => latest + 12);
  };

  return (
    <div>
      <div className="WalkSection">
        <h2>Walk-in and Drive Thru Vaccination Centres</h2>
        <p>
          You don't need an appointment to get vaccinated at these venues. Visit{" "}
          <a href="https://covid19.govt.nz/covid-19-vaccines/how-to-get-a-covid-19-vaccination/walk-in-and-drive-through-vaccination-centres/">
            covid19.govt.nz
          </a>{" "}
          for more information.
        </p>
      </div>
      {"loading" in locations ? (
        <WalkMessage>
          <Spinner color="black" />
          <div
            style={{
              marginLeft: "1rem",
              fontSize: "1.5rem",
            }}
          >
            {t("core.loading")}
          </div>
        </WalkMessage>
      ) : "error" in locations ? (
        <WalkMessage>Loading failed: {locations.error.message}</WalkMessage>
      ) : locations.ok.length === 0 ? (
        <WalkMessage>
          There aren't any walk-in or drive thru vaccination centres in your
          area. Try make a booking instead.
        </WalkMessage>
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
