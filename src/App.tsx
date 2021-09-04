import { Button, KIND } from "baseui/button";
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
import { useSearchParams } from "./urlUtils";

function sum(array: number[]) {
    return array.reduce((a, b) => a + b, 0);
}

function App() {
    const {
        lat: urlLat,
        lng: urlLng,
        placeName: urlPlaceName,
    } = useSearchParams();
    const defaultLat = urlLat ? parseFloat(urlLat) : -36.853610199274385;
    const defaultLng = urlLng ? parseFloat(urlLng) : 174.76054541484535;
    const defaultPlaceName = urlPlaceName ?? "Auckland CBD";

    const [isOpen, setIsOpen] = React.useState<DateLocationsPair | null>(null);
    const [locationIsOpen, setLocationIsOpen] = React.useState<boolean>(false);

    const [radiusKm, setRadiusKm] = useState(10);
    const [coords, setCoords] = useState<[number, number]>([
        defaultLat,
        defaultLng,
    ]);
    const [placeName, setPlaceName] = useState(defaultPlaceName);

    useEffect(() => {
        setCoords([defaultLat, defaultLng]);
        setPlaceName(defaultPlaceName);
    }, [defaultLat, defaultLng, defaultPlaceName]);

    const { dateLocationsPairs, setDateLocationsPairs } = useContext(
        DateLocationsPairsContext
    );
    const [lastUpdateTime, setLastUpdateTime] = useState(new Date());
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<Error | null>(null);

    const [shareButtonText, setShareButtonText] = useState("Share");
    const resetShareButtonText = () => {
        setShareButtonText("Share");
    };

    const loadCalendar = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const data = await getMyCalendar(coords[0], coords[1], radiusKm);
            setDateLocationsPairs(data.dateLocationsPairs);
            setLastUpdateTime(
                data.oldestLastUpdatedTimestamp === Infinity
                    ? new Date(0)
                    : new Date(data.oldestLastUpdatedTimestamp)
            );
        } catch (error) {
            setError(error as Error);
        }
        setLoading(false);
    }, [coords, radiusKm, setDateLocationsPairs]);

    useEffect(() => {
        loadCalendar();
    }, [loadCalendar]);

    const openLocation = () => {
        setLocationIsOpen(true);
    };

    const onClickShare = async () => {
        const shareData = {
            title: "Vaxx.nz | The NZ COVID Vaccination Finder",
            text: "See all vaccine slots for all vaccination sites to minimise the manual filtering hassle",
            url: "https://vaxx.nz/",
        };

        if (navigator.share) {
            try {
                await navigator.share(shareData);
            } catch (err) {
                console.error(err);
            }
        } else {
            navigator.clipboard.writeText(shareData.url);
            setShareButtonText("Copied!");
            setTimeout(() => {
                resetShareButtonText();
            }, 2000);

            console.log("Copied");
        }
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
                    lat={coords[0]}
                    lng={coords[1]}
                />
                <LocationModal
                    locationIsOpen={locationIsOpen}
                    setLocationIsOpen={setLocationIsOpen}
                    setCoords={setCoords}
                    setPlaceName={setPlaceName}
                />

                <section className="App-header">
                    <a href="/" className="nolink">
                        <h1>NZ COVID Vaccination Finder</h1>
                    </a>{" "}
                    <br />
                    <p>
                        <h3 style={{ fontWeight: "normal" }}>
                            See every available vaccination booking slot near
                            you.{" "}
                        </h3>
                        This is not an official Government website.
                        <br /> To get vaccinated visit&nbsp;
                        <a
                            href="https://bookmyvaccine.nz"
                            target="_blank"
                            rel="noreferrer"
                        >
                            bookmyvaccine.nz
                        </a>{" "}
                        <br />
                        <Button
                            kind={KIND.primary}
                            onClick={() => onClickShare()}
                            overrides={{
                                BaseButton: {
                                    style: {
                                        maxWidth: "100px",
                                        width: "80px",
                                        marginTop: "0.5rem",
                                    },
                                },
                            }}
                        >
                            {shareButtonText}
                        </Button>{" "}
                    </p>
                </section>
                <div className={"big-old-container"}>
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
                                {coords[0] === defaultLat &&
                                coords[1] === defaultLng
                                    ? "Set your Location"
                                    : "Location set"}
                            </Button>
                            <RadiusSelect
                                value={radiusKm}
                                setValue={setRadiusKm}
                            />
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
                            <div
                                style={{
                                    marginLeft: "1rem",
                                    fontSize: "1.5rem",
                                }}
                            >
                                Loading...
                            </div>
                        </div>
                    ) : null}

                    {!loading && !error ? (
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
                                                                <aside>
                                                                    &nbsp;
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
                                                                </aside>
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
                                                                            )
                                                                                .length
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
                    ) : null}
                </div>
                {!loading && error ? (
                    <div
                        style={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            marginTop: "1rem",
                        }}
                    >
                        {/* <Spinner color="black" /> */}
                        <div style={{ marginLeft: "1rem", fontSize: "1.5rem" }}>
                            {error.message}
                        </div>
                    </div>
                ) : null}

                <section className="App-header">
                    <p>
                        <a
                            href="https://github.com/CovidEngine/vaxxnzlocations"
                            target="_blank"
                            rel="noreferrer"
                        >
                            JSON of all available slots
                        </a>
                    </p>
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
