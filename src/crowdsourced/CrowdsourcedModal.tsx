import { Button, KIND } from "baseui/button";
import { FunctionComponent } from "react";
import { useTranslation } from "react-i18next";
import { useMediaQuery } from "react-responsive";
import { LocationNotice } from "../common/LocationNotice";
import { NoticeList, NoticeListItem } from "../NoticeList";
import { ModalGrid } from "../VaxComponents";
import { CrowdsourcedLocation } from "./CrowdsourcedData";
type Props = {
  clearSelectedLocation: () => void;
  location?: CrowdsourcedLocation;
};

function dayOfWeekToString(dayIdx: number) {
  return (
    [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ][dayIdx] || ""
  );
}

const CrowdsourcedModal: FunctionComponent<Props> = ({
  clearSelectedLocation,
  location,
}) => {
  const { t } = useTranslation("common");
  const isMobileView = useMediaQuery({ query: "(max-width: 768px)" });

  const close = () => clearSelectedLocation();
  if (location == null) {
    return null;
  }
  const telephone = location.telephone?.replace(/\[.*\]/g, "");

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
    padding: "1.5rem",
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
      <ModalGrid className={"modal-container WalkModal"}>
        <div>
          <h1
            style={{
              marginBottom: "1rem",
            }}
          >
            {location.name}
          </h1>
          <LocationNotice instructions={location.instructions} />

          <a
            href={`https://www.google.com/maps/dir/?api=1&destination=${location.lat},${location.lng}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button
              overrides={{
                Root: {
                  style: {
                    width: "100%",
                    marginTop: "1.5rem",
                    marginRight: 0,
                    marginBottom: "0.5rem",
                    marginLeft: 0,
                  },
                },
              }}
              kind={KIND.primary}
            >
              {t("core.getDirections")}
            </Button>
          </a>

          <Button
            overrides={{
              Root: {
                style: {
                  width: "100%",
                  marginTop: "0.5rem",
                  marginRight: 0,
                  marginBottom: "0.5rem",
                  marginLeft: 0,
                },
              },
            }}
            kind={KIND.secondary}
            onClick={close}
          >
            {t("core.cancel")}
          </Button>

          <NoticeList>
            <NoticeListItem
              title={t("walkins.otherLocations.disclaimer.title")}
            >
              {t("walkins.otherLocations.disclaimer.message")}
            </NoticeListItem>
          </NoticeList>
        </div>
        <div style={{ height: "100%" }}>
          <section>
            <h3>{t("core.address")}</h3>
            <p>{location.address}</p>
          </section>
          {location.website && (
            <section>
              <h3>{t("core.website")}</h3>
              <p>
                <a href={location.website} target="_blank" rel="noreferrer">
                  {location.website}
                </a>
              </p>
            </section>
          )}

          {telephone && (
            <section>
              <h3>{t("walkins.phone")}</h3>

              <a href={`tel:${telephone}`}>{telephone}</a>
            </section>
          )}
          {location.openingHours.length > 0 && (
            <section>
              <h3 style={{ marginBottom: "0.75rem" }}>{t("walkins.hours")}</h3>
              {location.openingHours.map((oh, index) => {
                return (
                  <>
                    <p key={index} style={{ float: "left" }}>
                      {dayOfWeekToString(oh.day)}{" "}
                    </p>
                    <p style={{ float: "right" }}>
                      {oh.isOpen ? oh.hours : t("walkins.closed")}
                    </p>
                    <br style={{ lineHeight: "0.5rem" }} />
                    <hr
                      style={{
                        width: "100%",
                        height: 1,
                        backgroundColor: "#e9e9e9",
                        border: "none",
                        padding: 0,
                        margin: "0 0 12px 0",
                      }}
                    />
                  </>
                );
              })}
            </section>
          )}
        </div>
      </ModalGrid>
    </div>
  );
};

export default CrowdsourcedModal;
