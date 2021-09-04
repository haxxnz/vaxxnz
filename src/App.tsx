import { Button, KIND } from "baseui/button";
import { Search, Check } from "baseui/icon";
import { Spinner } from "baseui/spinner";
import { formatDistance, parse } from "date-fns";
import React, { useCallback, useContext, useEffect, useState } from "react";
import {
    HeaderMain,
    CalendarContainer,
    CalendarSectionContainer,
    MonthContainer,
} from "./VaxComponents";

import { DateLocationsPairsContext } from "./contexts";
import { getMyCalendar } from "./getData";
import { DateLocationsPair } from "./types";
import LocationModal from "./LocationModal";
import BookingsModal from "./BookingsModal";
import RadiusSelect from "./RadiusSelect";

function sum(array: number[]) {
    return array.reduce((a, b) => a + b, 0);
}

const searchParams = new URL(window.location.toString()).searchParams;

const urlLat = searchParams.get("lat");
const urlLng = searchParams.get("lng");
const urlPlaceName = searchParams.get("placeName");

const defaultLat = urlLat ? parseFloat(urlLat) : -36.853610199274385;
const defaultLng = urlLng ? parseFloat(urlLng) : 174.76054541484535;
const defaultPlaceName = urlPlaceName ?? "Auckland CBD";

function App() {
    const [isOpen, setIsOpen] = React.useState<DateLocationsPair | null>(null);
    const [locationIsOpen, setLocationIsOpen] = React.useState<boolean>(false);

    const [radiusKm, setRadiusKm] = useState(10);

    const [lat, setLat] = useState(defaultLat);
    const [lng, setLng] = useState(defaultLng);
    const [placeName, setPlaceName] = useState(defaultPlaceName);

    const { dateLocationsPairs, setDateLocationsPairs } = useContext(
        DateLocationsPairsContext
    );
    const [lastUpdateTime, setLastUpdateTime] = useState(new Date());
    const [loading, setLoading] = useState(false);
    const loadCalendar = useCallback(async () => {
        setLoading(true);
        try {
            const data = await getMyCalendar(lat, lng, radiusKm);
            setDateLocationsPairs(data.dateLocationsPairs);
            setLastUpdateTime(
                data.oldestLastUpdatedTimestamp === Infinity
                    ? new Date(0)
                    : new Date(data.oldestLastUpdatedTimestamp)
            );
        } catch (error) {
            alert((error as Error).message);
        }
        setLoading(false);
    }, [lat, lng, radiusKm, setDateLocationsPairs]);

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
                    setPlaceName={setPlaceName}
                />

                <section className="App-header">
                    <h1>NZ Vaccination Finder</h1> <br />
                    <p>
                        <h3 style={{ fontWeight: "normal" }}>
                            See every available vaccination booking slots in NZ
                            near you.{" "}
                        </h3>
                        <br />
                        This is not an official Government website.
                        <br /> To get vaccinated visit&nbsp;
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
                        <h1>
                            Available Vaccine Slots
                            <strong>
                                {placeName ? " near " + placeName : ""}
                            </strong>
                        </h1>
                        <p>
                            Last updated:{" "}
                            {formatDistance(lastUpdateTime, new Date(), {
                                addSuffix: true,
                            })}
                        </p>
                    </section>
                    <div>
                        {lat === defaultLat && lng === defaultLng ? (
                            <Button
                                kind={KIND.primary}
                                onClick={() => openLocation()}
                                overrides={{
                                    BaseButton: {
                                        style: {
                                            minWidth: "220px",
                                        },
                                    },
                                }}
                            >
                                {"Set your Location"}
                            </Button>
                        ) : (
                            <Button
                                startEnhancer={() => <Check size={24} />}
                                kind={KIND.primary}
                                onClick={() => openLocation()}
                            >
                                Location set ({placeName})
                            </Button>
                        )}
                        <RadiusSelect value={radiusKm} setValue={setRadiusKm} />
                    </div>
                </HeaderMain>

                {loading ? (
                    <div
                        style={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            marginTop: "1rem",
                        }}
                    >
                        <Spinner color="black" />
                        <div style={{ marginLeft: "1rem", fontSize: "1.5rem" }}>
                            Loading...
                        </div>
                    </div>
                ) : null}

                {!loading && (
                    <CalendarContainer>
                        {Array.from(byMonth.entries()).map(
                            ([month, dateLocationsPairsForMonth]) => (
                                <CalendarSectionContainer key={month}>
                                    <div className="MonthSection">
                                        <h2>{month}</h2>{" "}
                                    </div>
                                    <MonthContainer>
                                        {dateLocationsPairsForMonth.map(
                                            (dateLocationsPair) => (
                                                <button
                                                    key={
                                                        dateLocationsPair.dateStr
                                                    }
                                                    onClick={() =>
                                                        setIsOpen(
                                                            dateLocationsPair
                                                        )
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
                )}
                <section className="App-header">
                    <p>
                        <a
                            href="https://github.com/CovidEngine/vaxxnz"
                            target="_blank"
                            rel="noreferrer"
                        >
                            Source code
                        </a>
                    </p>
                </section>
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
