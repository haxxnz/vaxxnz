import { Button, KIND } from "baseui/button";
import { FunctionComponent } from "react";
import { useTranslation } from "react-i18next";
import { styled } from "styletron-react";
import { LocationNotice } from "../common/LocationNotice";
import { NoticeList, NoticeListItem } from "../NoticeList";
import { PageLink } from "../PageLink";
import { CrowdsourcedLocation } from "./CrowdsourcedData";
import { parsePhoneNumber } from "../utils/parsePhone";
import { RouteType, VaxxHelmet } from "../VaxxHelmet";

type Props = {
  cancelPath: string;
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
  cancelPath,
  location,
}) => {
  const { t } = useTranslation("common");

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
  const Container = styled("div", { height: "100%" });
  const OpeningHours = styled("p", { float: "right" });
  const BR = styled("br", { lineHeight: "0.5rem" });
  const HR = styled("hr", {
    width: "100%",
    height: 1,
    backgroundColor: "#e9e9e9",
    border: "none",
    padding: 0,
    margin: "0 0 12px 0",
  });
  const DayOfWeek = styled("p", {
    float: "left",
  });
  const WalkInHours = styled("h3", { marginBottom: "0.75rem" });

  const LocationName = styled("h1", {
    marginBottom: "1rem",
  });

  return (
    <Dialog>
      <VaxxHelmet routeType={RouteType.Location} location={location} />
      <section className={"modal-container WalkModal modal-grid"}>
        <div>
          <LocationName>{location.name}</LocationName>
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
          <PageLink to={cancelPath}>
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
            >
              {t("core.cancel")}
            </Button>
          </PageLink>
          <NoticeList>
            <NoticeListItem
              title={t("walkins.otherLocations.disclaimer.title")}
            >
              {t("walkins.otherLocations.disclaimer.message")}
            </NoticeListItem>
          </NoticeList>
        </div>
        <Container>
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
              <WalkInHours>{t("walkins.hours")}</WalkInHours>
              {location.openingHours.map((oh, index) => {
                return (
                  <>
                    <DayOfWeek key={index}>
                      {dayOfWeekToString(oh.day)}{" "}
                    </DayOfWeek>
                    <OpeningHours>
                      {oh.isOpen ? oh.hours : t("walkins.closed")}
                    </OpeningHours>
                    <BR />
                    <HR />
                  </>
                );
              })}
            </section>
          )}
        </Container>
      </section>
    </Dialog>
  );
};

export default CrowdsourcedModal;
