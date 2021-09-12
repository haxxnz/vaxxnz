/* eslint-disable react/jsx-no-target-blank */
import { Button } from "baseui/button";
import { VaccineCentre } from "../VaxComponents";
import { formatDistanceKm, getDistanceKm } from "../utils/distance";
import { parse } from "date-fns";
import { Coords } from "../location-picker/LocationPicker";
import { FunctionComponent, useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";

import { enqueueAnalyticsEvent } from "../utils/analytics";
import { differenceInDays } from "date-fns/esm";

import { useSeen } from "../utils/useSeen";
import {
  BookingLocationSlotsPair,
  SlotWithAvailability,
} from "./booking/BookingDataTypes";
import { CalendarDate } from "./CalendarData";

type BookingLocationProps = {
  locationSlotsPair: BookingLocationSlotsPair;
  coords: Coords;
  activeDate: CalendarDate;
  radiusKm: number;
};

const IS_UAT =
  window.location.hostname === "localhost" ||
  window.location.hostname === "127.0.0.1" ||
  window.location.hostname.endsWith("netlify.app");

const MOH_PROXY = IS_UAT
  ? "https://dev-moh-f3a4edb2.vaxx.nz"
  : "https://moh.vaxx.nz";

const BookingLocation: FunctionComponent<BookingLocationProps> = ({
  locationSlotsPair,
  coords,
  radiusKm,
  activeDate,
}) => {
  const { t, i18n } = useTranslation("common");
  const ref = useRef() as any;
  const seen = useSeen(ref, "20px");
  const [slots, setSlots] = useState<SlotWithAvailability[] | undefined>();

  const getSlots = async (url: string) => {
    try {
      const res = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          vaccineData: "WyJhMVQ0YTAwMDAwMEhJS0NFQTQiXQ==",
          groupSize: 1,
          url: "https://app.bookmyvaccine.covid19.health.nz/appointment-select",
          timeZone: "Pacific/Auckland",
        }),
      });
      const dataStr = await res.text();
      let data;

      data = JSON.parse(dataStr);
      return data;
    } catch (e) {
      console.log("Couldn't retreive slots");
      return;
    }
  };

  useEffect(() => {
    async function load() {
      if (!seen || slots) {
        return;
      }
      const response = await getSlots(
        `${MOH_PROXY}/public/locations/${locationSlotsPair.location.extId}/date/${activeDate.dateStr}/slots`
      );
      if (response) {
        setSlots(response.slotsWithAvailability);
      }
    }
    load();
  }, [
    seen,
    slots,
    setSlots,
    locationSlotsPair.location.extId,
    activeDate.dateStr,
  ]);

  const slotsToDisplay =
    slots && slots.length > 0 ? slots : locationSlotsPair.slots;
  const location = locationSlotsPair.location;
  const date = parse(activeDate.dateStr, "yyyy-MM-dd", new Date());
  return (
    <VaccineCentre ref={ref}>
      <h3>{location.name}</h3>
      <p>
        {location.displayAddress} (
        {t("core.distanceAway", {
          distance: formatDistanceKm(
            getDistanceKm(coords, location.location),
            i18n.language
          ),
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
        {slotsToDisplay?.map((slot) => (
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

export default BookingLocation;
