import { Button } from "baseui/button";
import { differenceInDays, parse } from "date-fns";
import React, { FunctionComponent } from "react";
import { useTranslation } from "react-i18next";
import { Coords } from "../../location-picker/LocationPicker";
import { enqueueAnalyticsEvent } from "../../utils/analytics";
import { getDistanceKm } from "../../utils/distance";
import { VaccineCentre } from "../../VaxComponents";
import { BookingLocationSlotsPair } from "../booking/BookingDataTypes";

interface SlotBookingLocationProps {
  location: BookingLocationSlotsPair;
  coords: Coords;
  date: Date;
  radiusKm: number;
}

export const SlotBookingLocation: FunctionComponent<SlotBookingLocationProps> =
  ({ location: { location, slots }, radiusKm, coords, date }) => {
    const { t } = useTranslation("common");
    return (
      <VaccineCentre>
        <h3>{location.name}</h3>
        <p>
          {location.displayAddress} (
          {t("core.kmAway", {
            distance: Math.floor(getDistanceKm(coords, location.location)),
          })}
          )
        </p>
        <p>
          <a
            href={`https://www.google.com/maps/dir/?api=1&destination=${location.location.lat},${location.location.lng}`}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() =>
              enqueueAnalyticsEvent("Get Directions clicked", {
                radiusKm,
                spotsAvailable: slots?.length || 0,
                bookingDateInDays: differenceInDays(date, new Date()),
              })
            }
          >
            {t("core.getDirections")}
          </a>
        </p>
        <a
          href="https://bookmyvaccine.covid19.health.nz"
          target="_blank"
          referrerPolicy="origin"
          rel="noreferrer"
        >
          <div className="ButtonConstraint">
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
              onClick={() =>
                enqueueAnalyticsEvent("Make a Booking clicked", {
                  locationName: location.name,
                  radiusKm,
                  spotsAvailable: slots?.length || 0,
                  bookingDateInDays: differenceInDays(date, new Date()),
                })
              }
            >
              {t("core.makeABooking")}
            </Button>
          </div>
        </a>
        <p
          style={{
            marginTop: "0.25rem",
            marginRight: 0,
            marginBottom: "0.5rem",
            marginLeft: 0,
          }}
        >
          {t("calendar.modal.availableSlots")}
        </p>
        <section className="slot">
          {/* <p>1am</p> */}
          {slots?.map((slot) => (
            <p key={slot.localStartTime}>
              {parse(
                slot.localStartTime,
                "HH:mm:ss",
                new Date()
              ).toLocaleTimeString("en-NZ", {
                hour: "2-digit",
                minute: "2-digit",
                hour12: true,
              })}
            </p>
          ))}
        </section>
      </VaccineCentre>
    );
  };
