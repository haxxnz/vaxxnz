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
import { differenceInDays, parse } from "date-fns";
import { enqueueAnalyticsEvent } from '../utils/analytics';
import { useTranslation } from "react-i18next";
import i18next from "i18next";

interface BookingCalendarProps {
  data: BookingData;
  setActiveDate: (activeDate: DateLocationsPair | null) => void;
  radiusKm: number;
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
  radiusKm,
}) => {
  const { t } = useTranslation("common");

  return (
    <CalendarContainer>
      {Array.from(data.entries()).map(([month, dateLocationsPairsForMonth]) => (
        <CalendarSectionContainer key={month}>
          <div className="MonthSection">
            <h2>
              {
                parse(
                  "1 " + month,
                  "d MMMM yyyy",
                  new Date()
                ).toLocaleDateString([i18next.language], {
                  month: "long",
                  year: "numeric"
                })
              }
            </h2>
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
                onClick={() => {
                  enqueueAnalyticsEvent('Calendar day picked', {
                    datePicked: dateLocationsPair.dateStr,
                    bookingDateInDays: differenceInDays(parse(
                      dateLocationsPair.dateStr,
                      "yyyy-MM-dd",
                      new Date()
                    ), new Date()),
                    radiusKm,
                    spotsAvailable: sum(
                      dateLocationsPair.locationSlotsPairs.map(
                        (locationSlotsPair) =>
                          (locationSlotsPair.slots || []).length
                      )
                    ),
                  });
                  setActiveDate(dateLocationsPair)
                }}
              >
                <div>
                  <h3>
                    {parse(
                        dateLocationsPair.dateStr,
                        "yyyy-MM-dd",
                        new Date()
                      ).toLocaleDateString([i18next.language], {
                        day: "numeric",
                        month: "short",
                    })}
                    <br />{" "}
                    <aside aria-hidden="true">
                      {parse(
                          dateLocationsPair.dateStr,
                          "yyyy-MM-dd",
                          new Date()
                        ).toLocaleDateString([i18next.language], {
                          weekday: "short",
                      })}
                    </aside>
                  </h3>
                  <p>
                    {t("calendar.numberOfAppointments", {
                      sumAvailableTimes: sum(
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
