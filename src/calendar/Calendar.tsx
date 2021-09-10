import { Spinner } from "baseui/spinner";
import { FunctionComponent } from "react";
import { sum } from "../utils/math";
import {
  CalendarContainer,
  CalendarSectionContainer,
  MonthContainer,
} from "../VaxComponents";
import { differenceInDays, parse } from "date-fns";
import { enqueueAnalyticsEvent } from "../utils/analytics";
import { useTranslation } from "react-i18next";
import i18next from "i18next";
import { CalendarData, CalendarDate } from "./CalendarData";

interface BookingCalendarProps {
  data: CalendarData;
  setActiveDate: (activeDate: CalendarDate | null) => void;
  radiusKm: number;
}

export const LoadingBookingCalendar: FunctionComponent = () => {
  const { t } = useTranslation("common");

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "20vh",
        width: "100%",
        backgroundColor: "white",
      }}
    >
      <Spinner color="black" />
      <div
        style={{
          marginLeft: "1rem",
          fontSize: "1.5rem",
        }}
      >
        {t("core.loading")}
      </div>
    </div>
  );
};

export const BookingCalendar: FunctionComponent<BookingCalendarProps> = ({
  data,
  setActiveDate,
  radiusKm,
}) => {
  const { t } = useTranslation("common");

  return (
    <CalendarContainer>
      {Array.from(data.entries()).map(([monthStr, monthDates]) => (
        <CalendarSectionContainer key={monthStr}>
          <div className="MonthSection">
            <h2>
              {parse(monthStr, "MMMM yyyy", new Date()).toLocaleDateString(
                [i18next.language],
                {
                  month: "long",
                  year: "numeric",
                }
              )}
            </h2>
          </div>
          <MonthContainer>
            {Array.from(monthDates).map(([dateStr, locations]) => {
              const availableCount = sum(
                locations.map((location) =>
                  "isBooking" in location ? location.slots?.length ?? 0 : 1
                )
              );
              return (
                <button
                  className={availableCount === 0 ? "zero-available" : ""}
                  key={dateStr}
                  onClick={() => {
                    enqueueAnalyticsEvent("Calendar day picked", {
                      datePicked: dateStr,
                      bookingDateInDays: differenceInDays(
                        parse(dateStr, "yyyy-MM-dd", new Date()),
                        new Date()
                      ),
                      radiusKm,
                      spotsAvailable: availableCount,
                    });
                    setActiveDate(locations);
                  }}
                >
                  <div>
                    <h3>
                      {parse(
                        dateStr,
                        "yyyy-MM-dd",
                        new Date()
                      ).toLocaleDateString([i18next.language], {
                        day: "numeric",
                        month: "short",
                      })}
                      <br />{" "}
                      <aside aria-hidden="true">
                        {parse(
                          dateStr,
                          "yyyy-MM-dd",
                          new Date()
                        ).toLocaleDateString([i18next.language], {
                          weekday: "short",
                        })}
                      </aside>
                    </h3>
                    <p>
                      {t("calendar.numberOfAppointments", {
                        sumAvailableTimes: availableCount,
                      })}
                    </p>
                  </div>
                  <img src="./arrow.svg" aria-hidden="true" alt="" />
                </button>
              );
            })}
          </MonthContainer>
        </CalendarSectionContainer>
      ))}
    </CalendarContainer>
  );
};
