import { differenceInDays } from "date-fns";
import React, { FunctionComponent } from "react";
import { Trans, useTranslation } from "react-i18next";
import { CrowdsourcedLocation } from "../../crowdsourced/CrowdsourcedData";
import { Coords } from "../../location-picker/LocationPicker";
import { enqueueAnalyticsEvent } from "../../utils/analytics";
import { formatDistanceKm, getDistanceKm } from "../../utils/distance";
import { VaccineCentre } from "../../VaxComponents";

interface CrowdsourcedBookingLocationProps {
  location: CrowdsourcedLocation;
  coords: Coords;
  date: Date;
  radiusKm: number;
}

export const CrowdsourcedBookingLocation: FunctionComponent<CrowdsourcedBookingLocationProps> =
  ({ location, radiusKm, coords, date }) => {
    const { t } = useTranslation("common");
    const locationCoords = { lat: location.lat, lng: location.lng };
    const hours = location.openingHours[date.getDay()];
    return (
      <VaccineCentre>
        <h3>{location.name}</h3>
        <p>
          {location.address} (
          {t("core.kmAway", {
            distance: formatDistanceKm(getDistanceKm(coords, locationCoords)),
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

        <section style={{ marginTop: "0.8rem" }}>
          <h4>{t("walkins.hours")}</h4>
          {/* Closed should never happen */}
          <p>{hours.isOpen ? hours.hours : "Closed"}</p>{" "}
        </section>

        {location.website && (
          <section style={{ marginTop: "0.8rem" }}>
            <h4>{t("core.website")}</h4>
            <p>
              {" "}
              <a href={location.website} target="_blank" rel="noreferrer">
                {location.website}
              </a>
            </p>
          </section>
        )}

        {location.telephone && (
          <section style={{ marginTop: "0.8rem" }}>
            <h4>{t("walkins.phone")}</h4>
            <p>
              {" "}
              <a href={`tel:${location.telephone}`}>{location.telephone}</a>
            </p>
          </section>
        )}

        <section style={{ marginTop: "0.8rem" }}>
          <h4>{t("walkins.otherLocations.disclaimer.title")}</h4>
          <p> {t("walkins.otherLocations.disclaimer.message")}</p>
        </section>
      </VaccineCentre>
    );
  };
