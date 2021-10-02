import { withStyle } from "baseui";
import CustomSpinner from "../utils/customSpinner";
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
  CalendarDateLocations,
  CalendarMonth,
} from "./CalendarData";
import React from "react";
import { useRadiusKm } from "../utils/useRadiusKm";
import { PageLink } from "../PageLink";
import styled from "styled-components";

interface BookingCalendarProps {
  data: CalendarData;
}

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 20vh;
  width: 100%;
  background-color: white;
`;

const LoadingText = styled.div`
  margin-left: 1rem;
  font-size: 1.5rem;
`;

export const LoadingBookingCalendar: FunctionComponent = () => {
  const { t } = useTranslation("common");

  return (
    <LoadingContainer>
      <CustomSpinner />
      <LoadingText>{t("core.loading")}</LoadingText>
    </LoadingContainer>
  );
};

export const BookingCalendar: FunctionComponent<BookingCalendarProps> = ({
  data,
}) => {
  const { i18n } = useTranslation();
  const calendarData = Array.from(data);
  const { t } = useTranslation("common");
  return (
    <>
      <div className="WalkSection2">
        <h2>{t("core.availableBookingSlots")}</h2>
        <p>{t("core.vaccApptToBook")}</p>
      </div>

      <CalendarContainer>
        {calendarData.map(([monthStr, monthDates]) => (
          <CalendarMonthContainer
            key={monthStr}
            monthStr={monthStr}
            monthDates={monthDates}
            language={i18n.language}
          />
        ))}
      </CalendarContainer>
    </>
  );
};

interface CalendarMonthContainerProps {
  monthStr: string;
  monthDates: CalendarMonth;
  language: string;
}
function CalendarMonthContainerExpensive(
  props: CalendarMonthContainerProps
): JSX.Element {
  const { monthStr, monthDates } = props;
  const date = parse(monthStr, "MMMM yyyy", new Date());
  const monthDatesArr = Array.from(monthDates);
  const firstDayDate = parse(monthDatesArr[0][0], "yyyy-MM-dd", new Date());
  const lastDayDate = parse(
    monthDatesArr[monthDatesArr.length - 1][0],
    "yyyy-MM-dd",
    new Date()
  );

  return (
    <CalendarSectionContainer key={monthStr}>
      <div className="MonthSection">
        <h3>
          {date.toLocaleDateString([i18next.language], {
            month: "long",
            year: "numeric",
          })}
        </h3>
      </div>
      <MonthContainer>
        {[...Array(firstDayDate.getDay() ?? 0)].map((_, i) => (
          <div
            className="dayPlaceholder"
            key={`${firstDayDate.toISOString}-placeholder-${i}`}
          ></div>
        ))}

        {monthDatesArr.map(([dateStr, locations]) => {
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
              locations={locations}
            />
          );
        })}

        {[...Array(6 - (lastDayDate.getDay() ?? 6))].map((_, i) => (
          <div
            className="dayPlaceholder"
            key={`${lastDayDate.toISOString}-placeholder-${i}`}
          ></div>
        ))}
      </MonthContainer>
    </CalendarSectionContainer>
  );
}
// FOR FUTURE: ideally we just have cheaper calendar month containers? Idk. Maybe useMemo or memoizeOne is a more elegant solution? Idk. This will do for now.
const CalendarMonthContainer = React.memo(CalendarMonthContainerExpensive);

interface CalendarDayProps {
  availableCount: number;
  dateStr: string;
  locations: CalendarDateLocations;
}
function CalendarDay(props: CalendarDayProps): JSX.Element {
  const { t } = useTranslation("common");
  const { availableCount, dateStr } = props;
  const date = parse(dateStr, "yyyy-MM-dd", new Date());
  const radiusKm = useRadiusKm();
  const path = `/bookings/${dateStr}`;
  return (
    <PageLink to={path}>
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
        <img src="/arrow.svg" aria-hidden="true" alt="" />
      </button>
    </PageLink>
  );
}
