import { Button, KIND } from "baseui/button";
import { FunctionComponent } from "react";
import { useTranslation } from "react-i18next";
import { useMediaQuery } from "react-responsive";
import { LocationNotice } from "../../common/LocationNotice";
import { enqueueAnalyticsEvent } from "../../utils/analytics";
import { useRadiusKm } from "../../utils/useRadiusKm";
import { WalkGrid, WalkHeading, WalkInstructions } from "../../VaxComponents";
import { HealthpointLocation } from "./HealthpointData";

type Props = {
  clearSelectedLocation: () => void;
  location?: HealthpointLocation;
};

const HealthpointModal: FunctionComponent<Props> = ({
  clearSelectedLocation,
  location,
}) => {
  const close = () => clearSelectedLocation();
  const { t } = useTranslation("common");
  const isMobileView = useMediaQuery({ query: "(max-width: 768px)" });
  const radiusKm = useRadiusKm();

  if (location == null) {
    return null;
  }
  const telephone = location.telephone.replace(/\[.*\]/g, "");

  const desktopDialogStyle = {
    width: "100%",
  };
  const mobileDialogStyle = {
    width: "100vw",
    margin: "0rem",
    borderRadius: "0",
  };
  const sharedDialogStyle = {
    display: "flex",
    flexDirection: "column",
    alignSelf: "center",
    backgroundColor: "white",
    border: "1px solid lightgray",
    maxWidth: "1440px",
    boxSizing: "border-box",
  };

  const dialogStyle = isMobileView
    ? { ...mobileDialogStyle, ...sharedDialogStyle }
    : { ...desktopDialogStyle, ...sharedDialogStyle };
  return (
    <div style={dialogStyle as any}>
      <WalkHeading>
        <h1>{location.name}</h1>
        <Button
          overrides={{
            Root: {
              style: {},
            },
          }}
          kind={KIND.secondary}
          onClick={close}
        >
          {t("walkins.cancelBooking")}
        </Button>
      </WalkHeading>
      <WalkGrid className={"modal-container WalkModal"}>
        <WalkInstructions>
          <h2>How to get vaccinated here</h2>
          <p>
            Go to the address below in person and ask for a COVID vaccination{" "}
          </p>

          <a
            href={`https://www.google.com/maps/dir/?api=1&destination=${location.lat},${location.lng}`}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() =>
              enqueueAnalyticsEvent("Healthpoint Get Directions clicked", {
                locationName: location.name,
                radiusKm,
              })
            }
          >
            <section>
              <p>{location.address}</p>
              {t("core.getDirections")}
            </section>
          </a>

          <LocationNotice instructions={location.instructionLis} />

          {telephone && (
            <section>
              <h3>{t("walkins.phone")}</h3>
              <a href={`tel:${telephone}`}>{telephone}</a>
            </section>
          )}

          {location.opennningHours.schedule && (
            <section>
              <h3 style={{ marginBottom: "0.25rem" }}>{t("walkins.hours")}</h3>
              {Object.keys(location.opennningHours.schedule).map(
                (openDate, index) => {
                  return (
                    <div
                      key={index}
                      style={{
                        fontSize: "1.25rem",
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between",
                        borderBottom: "1px solid rgb(233, 233, 233)",
                        padding: "12px 0 4px 0",
                      }}
                    >
                      <p>{openDate}</p>
                      <p>{location.opennningHours.schedule[openDate]}</p>
                    </div>
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
                <section
                  key={index}
                  style={{
                    marginTop: "1rem",
                    lineHeight: "1.5",
                  }}
                >
                  <h3>
                    {key === "Public Holidays"
                      ? t("walkins.publicHolidays")
                      : t("walkins.otherExeptions")}
                  </h3>

                  <p key={index}>{value}</p>
                </section>
              );
            }
          )}
          {location.opennningHours.notesHtml.map((noteHtml, index) => {
            return (
              <div key={index} style={{ marginTop: "1rem" }}>
                <small
                  key={index}
                  dangerouslySetInnerHTML={{ __html: noteHtml }}
                ></small>
              </div>
            );
          })}
        </WalkInstructions>
        <div style={{ height: "100%" }}></div>
      </WalkGrid>
      <div className="MobileOnly">
        <Button
          onClick={close}
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
      </div>
    </div>
  );
};

export default HealthpointModal;
