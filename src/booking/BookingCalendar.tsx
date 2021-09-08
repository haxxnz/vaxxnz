import { Spinner } from "baseui/spinner";
import { FunctionComponent } from "react";
import { sum } from "../utils/math";
import {
  CalendarContainer,
  CalendarSectionContainer,
  MonthContainer,
} from "../VaxComponents";
import { BookingData } from "./BookingData";
import { DateLocationsPair } from "./BookingDataTypes";
import { parse } from "date-fns";
import { useTranslation } from "react-i18next";

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
}) => {
  const { t } = useTranslation("common");

  return (
    <CalendarContainer>
      {Array.from(data.entries()).map(([month, dateLocationsPairsForMonth]) => (
        <CalendarSectionContainer key={month}>
          <div className="MonthSection">
            <h2>{t("calendar.month", { monthString: month })}</h2>
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
                  <p>
                    {t("calendar.numberOfDoses", {
                      numberOfDoses: sum(
                        dateLocationsPair.locationSlotsPairs.map(
                          (locationSlotsPair) =>
                            (locationSlotsPair.slots || []).length
                        )
                      ),
                    })}
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
};
