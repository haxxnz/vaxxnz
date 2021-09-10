/* eslint-disable react/jsx-no-target-blank */
import { Modal } from "baseui/modal";
import { Button, KIND } from "baseui/button";
import { ModalGrid, VaccineCentre } from "../VaxComponents";
import {
  BookingDateLocations,
  BookingLocationSlotsPair,
} from "./booking/BookingDataTypes";
import { getDistanceKm } from "../utils/distance";
import { parse } from "date-fns";
import { sortByAsc } from "../utils/array";
import { NoticeList } from "../NoticeList";
import { Coords } from "../location-picker/LocationPicker";
import { FunctionComponent } from "react";
import { useTranslation, Trans } from "react-i18next";

import { enqueueAnalyticsEvent } from "../utils/analytics";
import { differenceInDays } from "date-fns/esm";

import { useMediaQuery } from "react-responsive";
import i18next from "i18next";
import { CalendarDate } from "./CalendarData";

interface BookingModalProps {
  activeDate: CalendarDate | null;
  setActiveDate: (activeDate: CalendarDate | null) => void;
  coords: Coords;
  radiusKm: number;
}

const BookingModal: FunctionComponent<BookingModalProps> = ({
  activeDate,
  radiusKm,
  setActiveDate,
  coords,
}) => {
  const { t } = useTranslation("common");

  const close = () => {
    setActiveDate(null);
  };

  const isMobileView = useMediaQuery({ query: "(max-width: 768px)" });

  const desktopDialogStyle = {
    width: "80vw",
  };
  const mobileDialogStyle = {
    width: "100vw",
    margin: "0rem",
    borderRadius: "0",
  };
  const sharedDialogStyle = {
    maxWidth: "1200px",
    display: "flex",
    flexDirection: "column",
    alignSelf: "center",
    padding: "1.5rem",
  };
  const dialogStyle = isMobileView
    ? { ...mobileDialogStyle, ...sharedDialogStyle }
    : { ...desktopDialogStyle, ...sharedDialogStyle };

  function sortByDistance(
    locationSlotsPairs: BookingLocationSlotsPair[] | undefined,
    coords: Coords
  ): BookingLocationSlotsPair[] {
    return sortByAsc(locationSlotsPairs ?? [], (locationSlotsPair) => {
      const distanceKm = getDistanceKm(
        coords,
        locationSlotsPair.location.location
      );
      return distanceKm;
    });
  }

  return (
    <Modal
      onClose={close}
      isOpen={!!activeDate}
      unstable_ModalBackdropScroll={true}
      overrides={{
        Dialog: {
          style: dialogStyle as any,
        },
      }}
    >
      <ModalGrid className={"modal-container"}>
        <div>
          <div className="ModalHeader">
            <h1>
              {activeDate
                ? parse(
                    activeDate.dateStr,
                    "yyyy-MM-dd",
                    new Date()
                  ).toLocaleDateString([i18next.language], {
                    weekday: "long",
                  })
                : ""}
              <br />
              {activeDate
                ? parse(
                    activeDate.dateStr,
                    "yyyy-MM-dd",
                    new Date()
                  ).toLocaleDateString([i18next.language], {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })
                : ""}
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
                setActiveDate(null);
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
            {activeDate
              ? parse(
                  activeDate.dateStr,
                  "yyyy-MM-dd",
                  new Date()
                ).toLocaleDateString([], {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })
              : ""}
          </h2>
          <hr />

          {activeDate?.locationSlotsPairs.filter(
            (locationSlotsPair) => locationSlotsPair.slots?.length
          ).length ? (
            sortByDistance(activeDate?.locationSlotsPairs, coords)
              .filter((locationSlotsPair) => locationSlotsPair.slots?.length)
              .map((locationSlotsPair) => (
                <VaccineCentre key={locationSlotsPair.location.extId}>
                  <h3>{locationSlotsPair.location.name}</h3>
                  <p>
                    {locationSlotsPair.location.displayAddress} (
                    {t("core.kmAway", {
                      distance: Math.floor(
                        getDistanceKm(
                          coords,
                          locationSlotsPair.location.location
                        )
                      ),
                    })}
                    )
                  </p>
                  <p>
                    <a
                      href={`https://www.google.com/maps/dir/?api=1&destination=${locationSlotsPair.location.location.lat},${locationSlotsPair.location.location.lng}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() =>
                        enqueueAnalyticsEvent("Get Directions clicked", {
                          radiusKm,
                          spotsAvailable: locationSlotsPair.slots?.length || 0,
                          bookingDateInDays: differenceInDays(
                            parse(activeDate.dateStr, "yyyy-MM-dd", new Date()),
                            new Date()
                          ),
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
                            locationName: locationSlotsPair.location.name,
                            radiusKm,
                            spotsAvailable:
                              locationSlotsPair.slots?.length || 0,
                            bookingDateInDays: differenceInDays(
                              parse(
                                activeDate.dateStr,
                                "yyyy-MM-dd",
                                new Date()
                              ),
                              new Date()
                            ),
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
                  <section>
                    {/* <p>1am</p> */}
                    {locationSlotsPair.slots?.map((slot) => (
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
              ))
          ) : (
            <>
              <h1>{t("calendar.modal.noBookingsAvailable")}</h1>
              {/* <Button
                onClick={() => setActiveDate(null)}
                overrides={{
                  Root: {
                    style: {
                      width: "100%",
                      maxWidth: "400px",
                      marginTop: "2rem",
                      marginRight: 0,
                      marginBottom: "2rem",
                      marginLeft: 0,
                    },
                  },
                }}
                kind={KIND.secondary}
              >
                {t("calendar.modal.backToCalendar")}
              </Button> */}
            </>
          )}
        </div>
      </ModalGrid>
      <div className="MobileOnly">
        <Button
          onClick={() => {
            setActiveDate(null);
            enqueueAnalyticsEvent("Back to Calendar clicked");
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
      </div>
    </Modal>
  );
};
export default BookingModal;
