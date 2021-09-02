import { Button, KIND } from "baseui/button";
import { Search, Show } from "baseui/icon";
import { Select } from "baseui/select";
import { formatDistance, parse } from "date-fns";
import React, { useCallback, useContext, useEffect, useState } from "react";
import {
    HeaderMain,
    CalendarContainer,
    CalendarSectionContainer,
    MonthContainer,
} from "./VaxComponents";

import { DateLocationsPairsContext } from "./contexts";
import { getLastUpdatedTime, getMyCalendar } from "./getData";
import { DateLocationsPair } from "./types";
import LocationModal from "./LocationModal";
import BookingsModal from "./BookingsModal";

function sum(array: number[]) {
    return array.reduce((a, b) => a + b, 0);
}

function App() {
    const [isOpen, setIsOpen] = React.useState<DateLocationsPair | null>(null);
    const [locationIsOpen, setLocationIsOpen] = React.useState<boolean>(false);

    const [radiusKm, setRadiusKm] = useState(30);
    const [lat, setLat] = useState(-36.853610199274385);
    const [lng, setLng] = useState(174.76054541484535);
    const { dateLocationsPairs, setDateLocationsPairs } = useContext(
        DateLocationsPairsContext
    );
    const loadCalendar = useCallback(async () => {
        const data = await getMyCalendar(lat, lng, radiusKm);
        setDateLocationsPairs(data);
    }, [lat, lng, radiusKm, setDateLocationsPairs]);

    const [lastUpdateTime, setLastUpdateTime] = useState(new Date());

    useEffect(() => {
        getLastUpdatedTime().then((time) => setLastUpdateTime(time));
    }, []);

    useEffect(() => {
        loadCalendar();
    }, [loadCalendar]);

    const openLocation = () => {
        setLocationIsOpen(true);
    };

    let byMonth = new Map<string, DateLocationsPair[]>();
    dateLocationsPairs.forEach((dateLocationsPair) => {
        const date = parse(dateLocationsPair.dateStr, "yyyy-MM-dd", new Date());
        const month = date.toLocaleString("en-NZ", {
            month: "long",
            year: "numeric",
        });
        const arrayToPush = byMonth.get(month) ?? [];
        arrayToPush.push(dateLocationsPair);
        byMonth.set(month, arrayToPush);
    });

    return (
        <>
            <div className="App">
                <BookingsModal
                    isOpen={isOpen}
                    setIsOpen={setIsOpen}
                    lat={lat}
                    lng={lng}
                />
                <LocationModal
                    locationIsOpen={locationIsOpen}
                    setLocationIsOpen={setLocationIsOpen}
                    setLat={setLat}
                    setLng={setLng}
                />

                {/* <pre>{JSON.stringify({ dateLocationsPairs }, null, 2)}</pre> */}

                <section className="App-header">
                    <h1>Vaxx Booking Finder</h1> <br />
                    <p>
                        This is a website that shows every available vaccination
                        booking slot near you. It shows vaccination sites, and
                        available booking times.
                        <br /> <br />
                        This is not an official Government website. To get
                        vaccinated visit
                        <a
                            href="https://bookmyvaccine.nz"
                            target="_blank"
                            rel="noreferrer"
                        >
                            bookmyvaccine.nz
                        </a>
                    </p>
                </section>

                <HeaderMain>
                    <section>
                        <h1>Available Vaccine Slots</h1>
                        <p>
                            Last updated:{" "}
                            {formatDistance(lastUpdateTime, new Date(), {
                                addSuffix: true,
                            })}
                        </p>
                    </section>
                    <div>
                        <Select
                            options={[
                                { label: "Whthin 30km", id: "#F0F8FF" },
                                { label: "Within 60km", id: "#FAEBD7" },
                                { label: "Within 90km", id: "#00FFFF" },
                            ]}
                            placeholder={`Within ${radiusKm}km`}
                            disabled={true} // TODO: implement
                        />

                        <Button
                            startEnhancer={() => <Search size={24} />}
                            kind={KIND.secondary}
                            onClick={openLocation}
                        >
                            Edit your Location
                        </Button>
                        <a
                            href="https://github.com/CovidEngine/vaxxnz"
                            target="_blank"
                            rel="noreferrer"
                        >
                            <Button
                                startEnhancer={() => <Show size={24} />}
                                kind={KIND.secondary}
                            >
                                Source Code
                            </Button>
                        </a>
                    </div>
                </HeaderMain>
                <CalendarContainer>
                    {Array.from(byMonth.entries()).map(
                        ([month, dateLocationsPairsForMonth]) => (
                            <CalendarSectionContainer>
                                <div className="MonthSection">
                                    <h2>{month}</h2>{" "}
                                </div>
                                <MonthContainer>
                                    {dateLocationsPairsForMonth.map(
                                        (dateLocationsPair) => (
                                            <button
                                                onClick={() =>
                                                    setIsOpen(dateLocationsPair)
                                                }
                                            >
                                                <div>
                                                    <h3>
                                                        {parse(
                                                            dateLocationsPair.dateStr,
                                                            "yyyy-MM-dd",
                                                            new Date()
                                                        ).toLocaleDateString(
                                                            [],
                                                            {
                                                                month: "short",
                                                                day: "numeric",
                                                            }
                                                        )}
                                                        {/* <aside>
                                                            &nbsp; - &nbsp;
                                                            {parse(
                                                                dateLocationsPair.dateStr,
                                                                "yyyy-MM-dd",
                                                                new Date()
                                                            ).toLocaleDateString(
                                                                [],
                                                                {
                                                                    weekday:
                                                                        "short",
                                                                }
                                                            )}
                                                        </aside> */}
                                                    </h3>
                                                    <p>
                                                        {sum(
                                                            dateLocationsPair.locationSlotsPairs.map(
                                                                (
                                                                    locationSlotsPair
                                                                ) =>
                                                                    (
                                                                        locationSlotsPair.slots ||
                                                                        []
                                                                    ).length
                                                            )
                                                        )}{" "}
                                                        available
                                                    </p>
                                                </div>
                                                <img
                                                    src="./arrow.svg"
                                                    aria-hidden="true"
                                                    alt=""
                                                />
                                            </button>
                                        )
                                    )}
                                </MonthContainer>
                            </CalendarSectionContainer>
                        )
                    )}
                </CalendarContainer>
            </div>
        </>
    );
}

export default App;

export function sortBy<T = unknown>(
    notes: T[],
    comparator: (note: T) => string | number
) {
    return [...notes].sort((a: T, b: T) => {
        if (comparator(a) < comparator(b)) {
            return -1;
        }
        if (comparator(a) > comparator(b)) {
            return 1;
        }
        return 0;
    });
}
