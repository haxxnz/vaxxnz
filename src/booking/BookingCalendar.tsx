import { Spinner } from "baseui/spinner";
import React, { FunctionComponent } from "react";
import { sum } from "../utils/math";
import {
  CalendarContainer,
  CalendarSectionContainer,
  MonthContainer,
} from "../VaxComponents";
import { BookingData } from "./BookingData";
import { DateLocationsPair } from "./BookingDataTypes";
import { parse } from "date-fns";

import { faMedkit, faClock } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface BookingCalendarProps {
  data: BookingData;
  setActiveDate: (activeDate: DateLocationsPair | null) => void;
}

export const LoadingBookingCalendar: FunctionComponent = () => (
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
);

export const BookingCalendar: FunctionComponent<BookingCalendarProps> = ({
  data,
  setActiveDate,
}) => (
  <CalendarContainer>
    {Array.from(data.entries()).map(([month, dateLocationsPairsForMonth]) => (
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
              onClick={() => setActiveDate(dateLocationsPair)}
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
                <p id="cal-info">
                  {/* Ternary statement to display number of vaccination centres if > 0. We need to use a map as there are some cases where locationSlotsPairs has entries
                              but the nested slots field is empty. */}
                  {sum(
                    dateLocationsPair.locationSlotsPairs.map(
                      (locationSlotsPair) => {
                        return locationSlotsPair?.slots!.length > 0
                          ? 1
                          : 0;
                      }
                    )
                  ) < 1 ? null : (
                    <React.Fragment>
                      <FontAwesomeIcon icon={faMedkit} />
                      &nbsp;&nbsp;
                      {
                        dateLocationsPair.locationSlotsPairs.length
                      }{" "}
                      locations
                      <br />
                    </React.Fragment>
                  )}
                  <FontAwesomeIcon icon={faClock} />
                  &nbsp;&nbsp;
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
    ))}
  </CalendarContainer>
);
