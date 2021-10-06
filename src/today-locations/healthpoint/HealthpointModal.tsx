import { Button, KIND } from "baseui/button";
import { FunctionComponent } from "react";
import { Trans, useTranslation } from "react-i18next";
import { styled } from "styletron-react";
import { LocationNotice } from "../../common/LocationNotice";
import { enqueueAnalyticsEvent } from "../../utils/analytics";
import { useRadiusKm } from "../../utils/useRadiusKm";
import { WalkInstructions } from "../../VaxComponents";
import { HealthpointLocation } from "./HealthpointData";
import { parsePhoneNumber } from "../../utils/parsePhone";

import { faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { PageLink } from "../../PageLink";
import { RouteType, VaxxHelmet } from "../../VaxxHelmet";

type Props = {
  cancelPath: string;
  location?: HealthpointLocation;
};

const HealthpointModal: FunctionComponent<Props> = ({
  cancelPath,
  location,
}) => {
  const { t } = useTranslation("common");
  const radiusKm = useRadiusKm();

  if (location == null) {
    return null;
  }
  const telephone = parsePhoneNumber(location.telephone);

  const MOBILE = "@media screen and (max-width: 768)";
  const Dialog = styled("div", {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignSelf: "center",
    padding: "1.5rem",
    backgroundColor: "white",
    border: "1px solid lightgray",
    maxWidth: "1440px",
    boxSizing: "border-box",

    [MOBILE]: {
      width: "100vw",
      margin: "0rem",
      borderRadius: "0",
    },
  });
  const ScheduleContainer = styled("div", {
    fontSize: "1.25rem",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottom: "1px solid rgb(233, 233, 233)",
    padding: "12px 0 4px 0",
  });
  const ExceptionContainer = styled("section", {
    marginTop: "1rem",
    lineHeight: "1.5",
  });
  const GoogleMapsContainer = styled("div", { height: "100%" });
  const NotesHtmlContainer = styled("div", { marginTop: "1rem" });
  const Title = styled("h2", { marginBottom: "0.5rem" });
  const WalkinHours = styled("h3", { marginBottom: "0.25rem" });

  return (
    <Dialog>
      <VaxxHelmet routeType={RouteType.Location} location={location} />

      <section className="walk-heading">
        <h1>{location.name}</h1>
        <PageLink to={cancelPath}>
          <Button
            overrides={{
              Root: {
                style: {},
              },
            }}
            kind={KIND.secondary}
          >
            {t("walkins.cancelBooking")}
          </Button>
        </PageLink>
      </section>
      <section className={"modal-container walk-grid WalkModal"}>
        <WalkInstructions>
          <Title>{t("walkins.healthpointModal.title")}</Title>
          <p>{t("walkins.healthpointModal.subtitle")}</p>

          <a
            href={`https://www.google.com/maps/dir/?api=1&destination=${location.lat},${location.lng}`}
            target="_blank"
            rel="noopener noreferrer"
            className="address-card"
            onClick={() =>
              enqueueAnalyticsEvent("Healthpoint Get Directions clicked", {
                locationName: location.name,
                radiusKm,
              })
            }
          >
            <FontAwesomeIcon className="address-icon" icon={faMapMarkerAlt} />
            <section>
              <p>{location.address}</p>
              <aside>{t("core.getDirections")}</aside>
            </section>
          </a>

          {telephone && (
            <p>
              <Trans
                i18nKey="walkins.healthpointModal.queueQuery"
                t={t}
                components={[
                  <a href={`tel:${telephone}`} target="_blank" rel="noreferrer">
                    {{ telephone }}
                  </a>,
                ]}
              />
            </p>
          )}

          <LocationNotice instructions={location.instructionLis} />
          <h2 className="address-header">
            {t("walkins.healthpointModal.venueDetails")}
          </h2>

          {telephone && (
            <section>
              <h3>{t("walkins.phone")}</h3>
              <a href={`tel:${telephone}`}>{telephone}</a>
            </section>
          )}

          <section>
            <h3>{t("core.address")}</h3>
            <p>{location.address}</p>
          </section>

          {location.opennningHours.schedule && (
            <section>
              <WalkinHours>{t("walkins.hours")}</WalkinHours>
              {Object.keys(location.opennningHours.schedule).map(
                (openDate, index) => {
                  return (
                    <ScheduleContainer key={index}>
                      <p>{openDate}</p>
                      <p>{location.opennningHours.schedule[openDate]}</p>
                    </ScheduleContainer>
                  );
                }
              )}
            </section>
          )}
          {location.url && (
            <section>
              <h3>{t("core.website")}</h3>
              <a href={location.url} target="_blank" rel="noreferrer">
                {location.url}
              </a>
            </section>
          )}

          {Object.entries(location.opennningHours.exceptions).map(
            ([key, value], index) => {
              return (
                <ExceptionContainer key={index}>
                  <h3>
                    {key === "Public Holidays"
                      ? t("walkins.publicHolidays")
                      : t("walkins.otherExeptions")}
                  </h3>

                  <p key={index}>{value}</p>
                </ExceptionContainer>
              );
            }
          )}
          {location.opennningHours.notesHtml.map((noteHtml, index) => {
            return (
              <NotesHtmlContainer key={index}>
                <small
                  key={index}
                  dangerouslySetInnerHTML={{ __html: noteHtml }}
                ></small>
              </NotesHtmlContainer>
            );
          })}
        </WalkInstructions>
        <GoogleMapsContainer>
          <iframe
            title="Google Maps Embed"
            className="mappymap"
            width="100%"
            height="600px"
            frameBorder="0"
            scrolling="no"
            loading="lazy"
            src={`https://www.google.com/maps/embed/v1/place?zoom=16&q=${location.address}&center=${location.lat}%2C${location.lng}&key=AIzaSyAcCqT9f9Oe5dTmK81lFC1IyVHJmxwv_eg`}
          ></iframe>
          <br />
        </GoogleMapsContainer>
      </section>
      <div className="MobileOnly">
        <PageLink to={cancelPath}>
          <Button
            overrides={{
              Root: {
                style: {
                  width: "100%",
                  marginTop: "1rem",
                  marginRight: 0,
                  marginBottom: "1rem",
                  marginLeft: 0,
                },
              },
            }}
            kind={KIND.secondary}
          >
            {t("walkins.cancelBooking")}
          </Button>
        </PageLink>
      </div>
    </Dialog>
  );
};

export default HealthpointModal;
