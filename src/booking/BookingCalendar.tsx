import { Button, KIND } from "baseui/button";
import { Spinner } from "baseui/spinner";
import { error } from "console";
import { formatDistance } from "date-fns";
import { parse } from "path";
import React, {
  FunctionComponent,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { DateLocationsPairsContext } from "../contexts";
import filterOldDates from "../filterOldDates";
import RadiusSelect from "../RadiusSelect";
import {
  HeaderMain,
  CalendarContainer,
  CalendarSectionContainer,
  MonthContainer,
} from "../VaxComponents";
import { WalkInSection } from "../walk-in/WalkInSection";
import { getMyCalendar } from "./BookingData";
import { DateLocationsPair } from "./BookingDataTypes";

interface BookingCalendarProps {}

export const BookingCalendar: FunctionComponent<BookingCalendarProps> =
  ({}) => {
    const {
      dateLocationsPairs: dateLocationsPairsUnfiltered,
      setDateLocationsPairs,
    } = useContext(DateLocationsPairsContext);
    const dateLocationsPairs = filterOldDates(dateLocationsPairsUnfiltered);
    const [lastUpdateTime, setLastUpdateTime] = useState(new Date(0));
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<Error | null>(null);

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
    const [isOpen, setIsOpen] = React.useState<DateLocationsPair | null>(null);

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

    useEffect(() => {
      loadCalendar();
    }, [loadCalendar]);

    return (
      <>
        <WalkInSection lat={coords[0]} lng={coords[1]} radiusKm={radiusKm} />
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
                    {dateLocationsPairsForMonth.map((dateLocationsPair) => (
                      <button
                        className={
                          sum(
                            dateLocationsPair.locationSlotsPairs.map(
                              (locationSlotsPair) =>
                                (locationSlotsPair.slots || []).length
                            )
                          ) === 0
                            ? "zero-available"
                            : ""
                        }
                        key={dateLocationsPair.dateStr}
                        onClick={() => setIsOpen(dateLocationsPair)}
                      >
                        <div>
                          <h3>
                            {parse(
                              dateLocationsPair.dateStr,
                              "yyyy-MM-dd",
                              new Date()
                            ).toLocaleDateString([], {
                              day: "numeric",
                            })}{" "}
                            {parse(
                              dateLocationsPair.dateStr,
                              "yyyy-MM-dd",
                              new Date()
                            ).toLocaleDateString([], {
                              month: "short",
                            })}
                            <br />{" "}
                            <aside aria-hidden="true">
                              {parse(
                                dateLocationsPair.dateStr,
                                "yyyy-MM-dd",
                                new Date()
                              ).toLocaleDateString([], {
                                weekday: "short",
                              })}
                            </aside>
                          </h3>
                          <p>
                            {sum(
                              dateLocationsPair.locationSlotsPairs.map(
                                (locationSlotsPair) =>
                                  (locationSlotsPair.slots || []).length
                              )
                            )}{" "}
                            available
                          </p>
                        </div>
                        <img src="./arrow.svg" aria-hidden="true" alt="" />
                      </button>
                    ))}
                  </MonthContainer>
                </CalendarSectionContainer>
              )
            )}
          </CalendarContainer>
        ) : null}
      </>
    );
  };
