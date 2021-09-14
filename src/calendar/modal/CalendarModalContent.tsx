import { Button, KIND } from "baseui/button";
import { parse } from "date-fns";
import i18next from "i18next";
import { FunctionComponent } from "react";
import { Trans, useTranslation } from "react-i18next";
import { CrowdsourcedLocation } from "../../crowdsourced/CrowdsourcedData";
import { Coords } from "../../location-picker/LocationPicker";
import { NoticeList } from "../../NoticeList";
import { Instruction } from "../../today-locations/healthpoint/HealthpointData";
import { enqueueAnalyticsEvent } from "../../utils/analytics";
import { sortByAsc } from "../../utils/array";
import { getDistanceKm } from "../../utils/distance";
import { ModalGrid } from "../../VaxComponents";
import { BookingLocationSlotsPair } from "../booking/BookingDataTypes";
import BookingLocation from "../BookingLocation";
import { CalendarDate, CalendarLocation } from "../CalendarData";
import { CrowdsourcedBookingLocation } from "./CrowdsourcedBookingLocation";

interface CalendarModalContentProps {
  activeDate: CalendarDate;
  close: () => void;
  coords: Coords;
  radiusKm: number;
}

function sortByDistance(
  locations: CalendarLocation[],
  coords: Coords
): CalendarLocation[] {
  return sortByAsc(locations ?? [], (location) => {
    const distanceKm = getDistanceKm(
      coords,
      "isBooking" in location
        ? location.location.location
        : { lat: location.lat, lng: location.lng }
    );
    return distanceKm;
  });
}

export const CalendarModalContent: FunctionComponent<CalendarModalContentProps> =
  ({ activeDate: { dateStr, locations }, close, coords, radiusKm }) => {
    const date = parse(dateStr, "yyyy-MM-dd", new Date());
    const { t } = useTranslation("common");

    // TODO: useMemo, or move this to the data source hook
    const sortedLocations = sortByDistance(locations, coords);

    const slotLocations = sortedLocations.filter(
      (location) =>
        "isBooking" in location && location.slots && location.slots.length > 0
    ) as BookingLocationSlotsPair[];
    const crowdsourcedBookingLocations = sortedLocations.filter(
      (location) =>
        "isCrowdSourced" in location &&
        location.instructions.includes(Instruction.allowsBookings)
    ) as CrowdsourcedLocation[];
    /* const walkinBookingLocations = sortedLocations.filter(
      (location) =>
        "isCrowdSourced" in location &&
        (location.instructions.includes(Instruction.driveThrough) ||
          location.instructions.includes(Instruction.walkIn))
    ) as CrowdsourcedLocation[]; */

    return (
      <ModalGrid className={"modal-container"}>
        <div>
          <div className="ModalHeader">
            <h1>
              {date.toLocaleDateString([i18next.language], {
                weekday: "long",
              })}
              <br />
              {date.toLocaleDateString([i18next.language], {
                day: "numeric",
                month: "short",
                year: "numeric",
              })}
            </h1>
            <div>
              {" "}
              <br />
              <h3>{t("calendar.modal.howToBook.title")}</h3>
            </div>
            <ol className="HelpList">
              <li>{t("calendar.modal.howToBook.stepOne")}</li>
              <li>
                <Trans
                  i18nKey="calendar.modal.howToBook.stepTwo"
                  t={t}
                  components={[
                    <a
                      href="https://bookmyvaccine.nz"
                      target="_blank"
                      rel="noreferrer"
                    >
                      https://bookmyvaccine.nz
                    </a>,
                  ]}
                />
              </li>
              <li>{t("calendar.modal.howToBook.stepThree")}</li>
              <li>{t("calendar.modal.howToBook.stepFour")}</li>
            </ol>

            <Button
              onClick={() => {
                enqueueAnalyticsEvent("Back to Calendar clicked");
                close();
              }}
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
              {t("calendar.modal.backToCalendar")}
            </Button>

            <NoticeList />
          </div>
        </div>

        <div style={{ height: "100%" }}>
          <h2>
            {t("calendar.modal.availableSlots")} -{" "}
            {date.toLocaleDateString([i18next.language], {
              month: "short",
              day: "numeric",
              year: "numeric",
            })}
          </h2>
          <hr />

          {slotLocations.map((location) => (
            <BookingLocation
              key={location.location.extId}
              locationSlotsPair={location}
              coords={coords}
              radiusKm={radiusKm}
              activeDate={{ dateStr, locations }}
            />
          ))}

          {crowdsourcedBookingLocations.map((location) => (
            <CrowdsourcedBookingLocation
              key={location.name}
              location={location}
              coords={coords}
              date={date}
              radiusKm={radiusKm}
            />
          ))}

          {slotLocations.length === 0 &&
            crowdsourcedBookingLocations.length === 0 && (
              <>
                <h1>{t("calendar.modal.noBookingsAvailable")}</h1>
              </>
            )}
        </div>
      </ModalGrid>
    );
  };
