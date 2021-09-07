/* eslint-disable react/jsx-no-target-blank */
import { Modal } from "baseui/modal";
import { Button, KIND } from "baseui/button";
import { ModalGrid, VaccineCentre } from "./VaxComponents";
import { DateLocationsPair, LocationSlotsPair } from "./types";
import { getDistanceKm } from "./utils/distance";
import { parse } from "date-fns";
import { sortByAsc } from "./utils/array";
import { NoticeList } from "./NoticeList";

type Props = {
  isOpen: DateLocationsPair | null;
  setIsOpen: (isOpen: DateLocationsPair | null) => void;
  lat: number;
  lng: number;
};

const BookingsModal = (props: Props) => {
  const close = () => {
    props.setIsOpen(null);
  };

  function sortByDistance(
    locationSlotsPairs: LocationSlotsPair[] | undefined,
    lat: number,
    lng: number
  ): LocationSlotsPair[] {
    return sortByAsc(locationSlotsPairs ?? [], (locationSlotsPair) => {
      const distanceKm = getDistanceKm(
        lat,
        lng,
        locationSlotsPair.location.location.lat,
        locationSlotsPair.location.location.lng
      );
      return distanceKm;
    });
  }

  return (
    <Modal
      onClose={close}
      isOpen={!!props.isOpen}
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
              {props.isOpen
                ? parse(
                    props.isOpen.dateStr,
                    "yyyy-MM-dd",
                    new Date()
                  ).toLocaleDateString([], {
                    weekday: "long",
                  })
                : ""}
              <br />
              {props.isOpen
                ? parse(
                    props.isOpen.dateStr,
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
              <h3>How to Book</h3>
            </p>
            <ol className="HelpList">
              <li>Find find a location and time from the list below.</li>
              <li>
                Click on the <i>Make a Booking</i> button, this will take you to{" "}
                <a href="https://bookmyvaccine.nz/">bookmyvaccine.nz</a>
              </li>
              <li>Enter your details.</li>
              <li>When asked, search for your desired location and time.</li>
            </ol>

            <Button
              onClick={() => props.setIsOpen(null)}
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
              Back to calendar
            </Button>

            <NoticeList />
          </div>
        </div>

        <div style={{ height: "100%" }}>
          <h2>Available slots</h2>
          <hr />

          {props.isOpen?.locationSlotsPairs.filter(
            (locationSlotsPair) => locationSlotsPair.slots?.length
          ).length ? (
            sortByDistance(
              props.isOpen?.locationSlotsPairs,
              props.lat,
              props.lng
            )
              .filter((locationSlotsPair) => locationSlotsPair.slots?.length)
              .map((locationSlotsPair) => (
                <VaccineCentre key={locationSlotsPair.location.extId}>
                  <h3>{locationSlotsPair.location.name}</h3>
                  <p>
                    {locationSlotsPair.location.displayAddress} (
                    {Math.floor(
                      getDistanceKm(
                        props.lat,
                        props.lng,
                        locationSlotsPair.location.location.lat,
                        locationSlotsPair.location.location.lng
                      )
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
                onClick={() => props.setIsOpen(null)}
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
