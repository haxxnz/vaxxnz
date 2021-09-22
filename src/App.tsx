import React, { useState } from "react";
import "./App.css";
import { LocationPicker } from "./location-picker/LocationPicker";
import { TodayLocationsSection } from "./today-locations/TodayLocationsSection";
import CookiesBar from "./Cookies";
import BookingModal from "./calendar/modal/CalendarModal";
import { Switch, Route, useParams } from "react-router-dom";
import { useBookingData } from "./calendar/booking/BookingData";
import { LocationRouter } from "./LocationRouter";
import { Footer } from "./Footer";
import { Header } from "./Header";
import { Banner } from "./Banner";
import {
  HealthpointLocationsContext,
  HealthpointLocationsResult,
} from "./contexts";
import { Tabs, TabType } from "./HomePage";
import { useSaveScroll } from "./scroll";
import { Helmet } from "react-helmet";
import { CalendarSection } from "./calendar/CalendarSection";
import { config } from "./translations";

const Contexts: React.FC<{}> = (props) => {
  const [healthpointLocations, setHealthpointLocations] =
    useState<HealthpointLocationsResult>({ loading: true });

  return (
    <HealthpointLocationsContext.Provider
      value={{
        value: healthpointLocations,
        setValue: setHealthpointLocations,
      }}
    >
      {props.children}
    </HealthpointLocationsContext.Provider>
  );
};

function getSearchParams() {
  return Object.fromEntries([
    ...new URL(window.location.toString()).searchParams.entries(),
  ]);
}

function getSearch(searchParams: Record<string, string>) {
  const sp = new URLSearchParams(searchParams).toString();
  return sp ? `?${sp}` : "";
}

function getBookingDataParams(searchParams: Record<string, string>) {
  const { lat, lng, placeName, radius } = searchParams;
  return {
    ...(lat ? { lat } : {}),
    ...(lng ? { lng } : {}),
    ...(placeName ? { placeName } : {}),
    ...(radius ? { radius } : {}),
  };
}

function getCanonicalHome() {
  const { protocol, host } = window.location;
  const searchParams = getBookingDataParams(getSearchParams());
  return `${protocol}//${host}${getSearch(searchParams)}`;
}
function getCanonicalHomeLocations() {
  const { protocol, host, pathname } = window.location;
  const searchParams = getBookingDataParams(getSearchParams());
  return `${protocol}//${host}${pathname}${getSearch(searchParams)}`;
}

function getCanonicalLocation() {
  const { protocol, host, pathname } = window.location;
  const searchParams = {};
  return `${protocol}//${host}${pathname}${getSearch(searchParams)}`;
}

function getCanonicalCalendarDay() {
  const { protocol, host, pathname } = window.location;
  const searchParams = getBookingDataParams(getSearchParams());
  return `${protocol}//${host}${pathname}${getSearch(searchParams)}`;
}

export enum RouteType {
  Home = "/",
  Locations = "/locations",
  Bookings = "/bookings",
  Booking = "/bookings/:date",
  Location = "/locations/:slug",
}

const VaxxCanonical: React.FC<{ url: string; title: string }> = ({
  url,
  title,
}) => {
  return (
    <Helmet>
      <title>{title}</title>
      <link rel="canonical" href={url} />
      {config.supportedLngs.map((lng) => {
        if (lng === "cimode") {
          return null;
        }
        if (lng === "en-NZ") {
          return null;
        }
        const locale = lng.toLowerCase();
        return (
          <link
            rel="alternate"
            href={`${url}&locale=${locale}`}
            hrefLang={`${locale}`}
          />
        );
      })}
    </Helmet>
  );
};

export function VaxxHelmet({
  routeType,
  locationName,
}: {
  routeType: RouteType;
  locationName?: string;
}) {
  const { date, slug } = useParams<{ date: string; slug: string }>();
  let title;
  switch (routeType) {
    case RouteType.Home:
    case RouteType.Bookings:
      title =
        "Find a COVID-19 vaccine bookings in New Zealand | Vaccine finder New Zealand | See ways to get vaccinated near you | vaxx.nz";
      return <VaxxCanonical url={getCanonicalHome()} title={title} />;
    case RouteType.Locations:
      title =
        "Find COVID-19 vaccination sites in New Zealand | Vaccine finder New Zealand | See ways to get vaccinated near you | vaxx.nz";
      return <VaxxCanonical url={getCanonicalHomeLocations()} title={title} />;
    case RouteType.Booking:
      title = `Available to Book - ${date} | Find a COVID-19 vaccine | vaxx.nz`;
      return <VaxxCanonical url={getCanonicalCalendarDay()} title={title} />;
    case RouteType.Location:
      title = `${locationName} | Walk-in/Drive-through COVID-19 vaccination site | Find a COVID-19 vaccine | vaxx.nz`;
      return <VaxxCanonical url={getCanonicalLocation()} title={title} />;
  }
}

function App() {
  const [lastUpdateTime, setLastUpdateTime] = useState<Date | null>(null); // null whilst loading
  const bookingData = useBookingData(setLastUpdateTime);
  useSaveScroll();

  return (
    <Contexts>
      <div className="App">
        <Header />
        <Switch>
          <Route path="/bookings/:date">
            <div className={"big-old-container"}>
              <VaxxHelmet routeType={RouteType.Booking} />
              <BookingModal
                bookingData={"ok" in bookingData ? bookingData.ok : undefined}
              />
            </div>
          </Route>
          <Route path="/locations/:slug">
            <div className={"big-old-container"}>
              <LocationRouter />
              <TodayLocationsSection />
            </div>
          </Route>
          <Route>
            <Banner />
            <div className={"big-old-container"}>
              <LocationPicker lastUpdateTime={lastUpdateTime} />
              <Switch>
                <Route path="/locations">
                  <VaxxHelmet routeType={RouteType.Locations} />
                  <Tabs activeTab={TabType.walkIn} />
                  <TodayLocationsSection />
                </Route>
                <Route>
                  <VaxxHelmet routeType={RouteType.Home} />
                  <Tabs activeTab={TabType.bookings} />
                  <CalendarSection bookingData={bookingData} />
                </Route>
              </Switch>
            </div>
          </Route>
        </Switch>
        <Footer />
      </div>
      <div className="background">
        <div
          className="bg-impt"
          style={{
            backgroundImage: `url(${process.env.PUBLIC_URL + "/bg.svg"})`,
          }}
        ></div>
        <CookiesBar />
      </div>
    </Contexts>
  );
}

export default App;
