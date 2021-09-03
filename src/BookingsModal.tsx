import { Modal } from "baseui/modal";
import { Button, KIND } from "baseui/button";
import { ModalGrid, VaccineCentre } from "./VaxComponents";
import { DateLocationsPair, LocationSlotsPair } from "./types";
import { sortBy } from "./App";
import { getDistanceKm } from "./distanceUtils";
import { parse } from "date-fns";

type Props = {
    isOpen: DateLocationsPair | null;
    setIsOpen: any;
    lat: number;
    lng: number;
};

const BookingsModal = (props: Props) => {
    const close = () => {
        props.setIsOpen(false);
    };

    function sortByDistance(
        locationSlotsPairs: LocationSlotsPair[] | undefined,
        lat: number,
        lng: number
    ): LocationSlotsPair[] {
        return sortBy(locationSlotsPairs ?? [], (locationSlotsPair) => {
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
            overrides={{
                // Root: { style: { zIndex: 1500 } },
                Dialog: {
                    style: {
                        width: "80vw",
                        height: "80vh",
                        display: "flex",
                        flexDirection: "column",
                        padding: "1.5rem",
                    },
                },
            }}
        >
            <ModalGrid>
                <div
                    style={{
                        position: "sticky",
                        top: "0",
                        display: "block",
                    }}
                >
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
                    <p>Booking data from bookmyvaccine.nz</p>

                    <Button
                        onClick={() => props.setIsOpen(null)}
                        overrides={{
                            Root: {
                                style: {
                                    width: "100%",
                                    margin: "2rem 0",
                                },
                            },
                        }}
                        kind={KIND.secondary}
                    >
                        Back to calendar
                    </Button>
                </div>

                <div style={{ overflowY: "scroll", height: "100%" }}>
                    <h2>Available slots</h2>
                    <hr />
                    {sortByDistance(
                        props.isOpen?.locationSlotsPairs,
                        props.lat,
                        props.lng
                    )
                        .filter(
                            (locationSlotsPair) =>
                                locationSlotsPair.slots?.length
                        )
                        .map((locationSlotsPair) => (
                            <VaccineCentre>
                                <h3>{locationSlotsPair.location.name}</h3>
                                <p>
                                    {locationSlotsPair.location.displayAddress}{" "}
                                    (
                                    {Math.floor(
                                        getDistanceKm(
                                            props.lat,
                                            props.lng,
                                            locationSlotsPair.location.location
                                                .lat,
                                            locationSlotsPair.location.location
                                                .lng
                                        )
                                    )}
                                    km away)
                                </p>
                                <a
                                    href="https://bookmyvaccine.nz"
                                    target="_blank"
                                    rel="noreferrer"
                                >
                                    <div className="ButtonConstraint">
                                        <Button
                                            overrides={{
                                                Root: {
                                                    style: {
                                                        width: "100%",
                                                        margin: "1rem 0",
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
                                        margin: "0.25rem 0 0.5rem 0",
                                    }}
                                >
                                    Available slots:
                                </p>
                                <section>
                                    {/* <p>1am</p> */}
                                    {locationSlotsPair.slots?.map((slot) => (
                                        <p>
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
                        ))}
                </div>
            </ModalGrid>
        </Modal>
    );
};
export default BookingsModal;
