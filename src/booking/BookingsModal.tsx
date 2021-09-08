/* eslint-disable react/jsx-no-target-blank */
import { Modal } from "baseui/modal";
import { Button, KIND } from "baseui/button";
import { ModalGrid, VaccineCentre } from "../VaxComponents";
import { DateLocationsPair, LocationSlotsPair } from "./BookingDataTypes";
import { getDistanceKm } from "../utils/distance";
import { parse } from "date-fns";
import { sortByAsc } from "../utils/array";
import { NoticeList } from "../NoticeList";
import { Coords } from "../location-picker/LocationPicker";
import { FunctionComponent } from "react";
import { useTranslation, Trans } from "react-i18next";

type BookingsModalProps = {
  activeDate: DateLocationsPair | null;
  setActiveDate: (activeDate: DateLocationsPair | null) => void;
  coords: Coords;
};

const BookingsModal: FunctionComponent<BookingsModalProps> = ({
  activeDate,
  setActiveDate,
  coords,
}) => {

  const { t } = useTranslation("common")

  const close = () => {
    setActiveDate(null);
  };

  function sortByDistance(
    locationSlotsPairs: LocationSlotsPair[] | undefined,
    coords: Coords
  ): LocationSlotsPair[] {
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
        // Root: { style: { zIndex: 1500 } },
        Dialog: {
          style: {
            width: "80vw",
            maxWidth: "1200px",
            display: "flex",
            flexDirection: "column",
            alignSelf: "center",
            padding: "1.5rem",
          },
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
                ).toLocaleDateString([], {
                  weekday: "long",
                })
                : ""}
              <br />
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
            </h1>
            <p>
              {" "}
              <br />
              <h3>{t("calendar.modal.howToBook.title")}</h3>
            </p>
            <ol className="HelpList">
              <li>{t("calendar.modal.howToBook.stepOne")}</li>
              <li>
                <Trans
                  i18nKey="calendar.modal.howToBook.stepTwo"
                  t={t}
                  components={[
                    <a href="https://bookmyvaccine.nz" target="_blank" rel="noreferrer">
                      https://bookmyvaccine.nz
                    </a>,
                  ]}
                />
              </li>
              <li>{t("calendar.modal.howToBook.stepThree")}</li>
              <li>{t("calendar.modal.howToBook.stepFour")}</li>
            </ol>

            <Button
              onClick={() => setActiveDate(null)}
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
              {t("calendar.modal.howToBook.backToCalendar")}
            </Button>

            <NoticeList />
          </div>
        </div>

        <div style={{ height: "100%" }}>
          <h2>Available slots</h2>
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
                    {Math.floor(
                      getDistanceKm(coords, locationSlotsPair.location.location)
                    )}
                    km away)
                  </p>
                  <p>
                    <a
                      href={`https://www.google.com/maps/dir/?api=1&destination=${locationSlotsPair.location.location.lat},${locationSlotsPair.location.location.lng}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Get Directions
                    </a>
                  </p>
                  <a
                    href="https://bookmyvaccine.nz"
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
                      >
                        Make a Booking
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
                    Available slots:
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
              <h1>
                No bookings available on this day :(
                <br />
                Try changing your search!
              </h1>
              <Button
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
                Back to calendar
              </Button>
            </>
          )}
        </div>
      </ModalGrid>
    </Modal>
  );
};
export default BookingsModal;
