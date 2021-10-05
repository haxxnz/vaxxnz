import { differenceInDays } from "date-fns";
import React, { FunctionComponent } from "react";
import { Trans, useTranslation } from "react-i18next";
import { CrowdsourcedLocation } from "../../crowdsourced/CrowdsourcedData";
import { enqueueAnalyticsEvent } from "../../utils/analytics";
import { getDistanceKm } from "../../utils/distance";
import { formatDistanceKm } from "../../utils/locale";
import { useCoords } from "../../utils/useCoords";
import { useRadiusKm } from "../../utils/useRadiusKm";
import { VaccineCentre } from "../../VaxComponents";
import { styled } from "styletron-react";

interface CrowdsourcedBookingLocationProps {
  location: CrowdsourcedLocation;
  date: Date;
}

const Section = styled("section", { marginTop: "0.8rem" });

export const CrowdsourcedBookingLocation: FunctionComponent<CrowdsourcedBookingLocationProps> =
  ({ location, date }) => {
    const { t, i18n } = useTranslation("common");
    const locationCoords = { lat: location.lat, lng: location.lng };
    const hours = location.openingHours.find((a) => a.day === date.getDay());
    const radiusKm = useRadiusKm();
    const coords = useCoords();
    return (
      <VaccineCentre>
        <h3>{location.name}</h3>
        <p>
          {location.address} (
          {t("core.distanceAway", {
            distance: formatDistanceKm(
              getDistanceKm(coords, locationCoords),
              i18n.language
            ),
          })}
          )
        </p>
        <p>
          <a
            href={`https://www.google.com/maps/dir/?api=1&destination=${location.lat},${location.lng}`}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() =>
              enqueueAnalyticsEvent("Get Directions clicked", {
                radiusKm,
                bookingDateInDays: differenceInDays(date, new Date()),
              })
            }
          >
            {t("core.getDirections")}
          </a>
        </p>

        <p className="not-bmv">
          <Trans
            i18nKey="calendar.modal.notBMV"
            t={t}
            components={[
              <a
                href="https://bookmyvaccine.nz"
                target="_blank"
                rel="noreferrer"
              >
                bookmyvaccine.nz
              </a>,
            ]}
          />
        </p>

        <Section>
          <h4>{t("walkins.hours")}</h4>
          {/* Closed should never happen */}
          <p>{hours?.isOpen ? hours?.hours : "Closed"}</p>{" "}
        </Section>

        {location.website && (
          <Section>
            <h4>{t("core.website")}</h4>
            <p>
              {" "}
              <a href={location.website} target="_blank" rel="noreferrer">
                {location.website}
              </a>
            </p>
          </Section>
        )}

        {location.telephone && (
          <Section>
            <h4>{t("walkins.phone")}</h4>
            <p>
              {" "}
              <a href={`tel:${location.telephone}`}>{location.telephone}</a>
            </p>
          </Section>
        )}

        <Section>
          <h4>{t("walkins.otherLocations.disclaimer.title")}</h4>
          <p> {t("walkins.otherLocations.disclaimer.message")}</p>
        </Section>
      </VaccineCentre>
    );
  };
