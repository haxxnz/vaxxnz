import {
  WalkBox as OtherBox,
  WalkContainer as OtherContainer,
  WalkMessage,
} from "../VaxComponents";
import { getDistanceKm } from "../utils/distance";
import { Instruction } from "./healthpoint/HealthpointData";
import { useState } from "react";
import { Spinner } from "baseui/spinner";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCar, faWalking } from "@fortawesome/free-solid-svg-icons";
import { enqueueAnalyticsEvent } from "../utils/analytics";
import { Trans, useTranslation } from "react-i18next";
import { useMediaQuery } from "react-responsive";
import { useTodayLocationsData } from "./TodayLocationsData";
import { simpleHash } from "../utils/simpleHash";
import { slug } from "../utils/slug";
import { useRadiusKm } from "../utils/useRadiusKm";
import { useCoords } from "../utils/useCoords";
import { PageLink } from "../PageLink";
import { formatDistanceKm } from "../utils/locale";

export function TodayLocationsSection() {
  const radiusKm = useRadiusKm();
  const coords = useCoords();
  const isMobileView = useMediaQuery({ query: "(max-width: 768px)" });
  const locations = useTodayLocationsData();
  const { t, i18n } = useTranslation("common");

  const [currentView, setCurrentView] = useState(!isMobileView ? 30 : 30);

  const modalPath = (locationIndex: number) => {
    const location =
      "ok" in locations && locationIndex !== undefined
        ? locations.ok[locationIndex]
        : undefined;
    if (!location) {
      return "";
    }
    return `/locations/${slug(location.name)}-${simpleHash(
      `${location.lat}${location.lng}`
    )}`;
  };

  const openModal = (locationIndex: number) => {
    const location =
      "ok" in locations && locationIndex !== undefined
        ? locations.ok[locationIndex]
        : undefined;

    enqueueAnalyticsEvent("Healthpoint location selected", {
      locationName: location ? location.name : "",
      radiusKm,
    });
  };

  const loadMore = () => {
    setCurrentView((latest) => latest + 12);
  };

  return (
    <div>
      <div className="WalkSection2">
        <h2>{t("walkins.sectionHeader")}</h2>
        <p>
          <Trans
            i18nKey="walkins.subHeader"
            t={t}
            components={[
              <a
                href="https://covid19.govt.nz/covid-19-vaccines/how-to-get-a-covid-19-vaccination/walk-in-and-drive-through-vaccination-centres/"
                target="_blank"
                rel="noreferrer"
              >
                covid19.govt.nz
              </a>,
            ]}
          />
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
        <WalkMessage>{t("walkins.noWalkinDriveThruFound")}</WalkMessage>
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
                    <PageLink to={modalPath(index)}>
                      <OtherBox onClick={() => openModal(index)} key={index}>
                        <section className="WalkItem">
                          <div>
                            <h3>{name}</h3>

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
                                })}{" "}
                                {instructions.includes(Instruction.walkIn) && (
                                  <FontAwesomeIcon icon={faWalking} />
                                )}
                                {instructions.includes(
                                  Instruction.driveThrough
                                ) && <FontAwesomeIcon icon={faCar} />}
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
                          src="/arrow-right-1.svg"
                          alt=""
                        />
                      </OtherBox>
                    </PageLink>
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
