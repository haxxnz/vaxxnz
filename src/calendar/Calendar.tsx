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
import {
  CalendarData,
  CalendarDate,
  CalendarDateLocations,
  CalendarMonth,
} from "./CalendarData";
import { useHistory } from "react-router-dom";
import React from "react";

interface BookingCalendarProps {
  data: CalendarData;
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
  radiusKm,
}) => {
  const { i18n } = useTranslation();

  return (
    <CalendarContainer>
      {Array.from(data).map(([monthStr, monthDates]) => (
        <CalendarMonthContainer
          key={monthStr}
          monthStr={monthStr}
          monthDates={monthDates}
          radiusKm={radiusKm}
          language={i18n.language}
        />
      ))}
    </CalendarContainer>
  );
};

interface CalendarMonthContainerProps {
  monthStr: string;
  monthDates: CalendarMonth;
  radiusKm: number;
  language: string;
}
function CalendarMonthContainerExpensive(
  props: CalendarMonthContainerProps
): JSX.Element {
  const { monthStr, monthDates, radiusKm } = props;
  const date = parse(monthStr, "MMMM yyyy", new Date());
  return (
    <CalendarSectionContainer key={monthStr}>
      <div className="MonthSection">
        <h2>
          {date.toLocaleDateString([i18next.language], {
            month: "long",
            year: "numeric",
          })}
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
            <CalendarDay
              key={dateStr}
              availableCount={availableCount}
              dateStr={dateStr}
              radiusKm={radiusKm}
              locations={locations}
            />
          );
        })}
      </MonthContainer>
    </CalendarSectionContainer>
  );
}
// FOR FUTURE: ideally we just have cheaper calendar month containers? Idk. Maybe useMemo or memoizeOne is a more elegant solution? Idk. This will do for now.
const CalendarMonthContainer = React.memo(CalendarMonthContainerExpensive);

interface CalendarDayProps {
  availableCount: number;
  dateStr: string;
  radiusKm: number;
  locations: CalendarDateLocations;
}
function CalendarDay(props: CalendarDayProps): JSX.Element {
  const { t } = useTranslation("common");
  const { availableCount, dateStr, radiusKm, locations } = props;
  const date = parse(dateStr, "yyyy-MM-dd", new Date());
  const history = useHistory();
  return (
    <button
      className={availableCount === 0 ? "zero-available" : ""}
      key={dateStr}
      onClick={() => {
        enqueueAnalyticsEvent("Calendar day picked", {
          datePicked: dateStr,
          bookingDateInDays: differenceInDays(date, new Date()),
          radiusKm,
          spotsAvailable: availableCount,
        });
        history.push(`/bookings/${dateStr}`);
      }}
    >
      <div>
        <h3>
          {date.toLocaleDateString([i18next.language], {
            day: "numeric",
            month: "short",
          })}
          <br />{" "}
          <aside aria-hidden="true">
            {date.toLocaleDateString([i18next.language], {
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
}
