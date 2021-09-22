import React, { useState } from "react";
import "./App.css";
import { LocationPicker } from "./location-picker/LocationPicker";
import { TodayLocationsSection } from "./today-locations/TodayLocationsSection";
import CookiesBar from "./Cookies";
import BookingModal from "./calendar/modal/CalendarModal";
import { Switch, Route } from "react-router-dom";
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

function getCanonicalHome() {
  const { protocol, host } = window.location;
  const { lat, lng, placeName, radius } = getSearchParams();
  const searchParams = { lat, lng, placeName, radius };
  return `${protocol}//${host}${getSearch(searchParams)}`;
}
function getCanonicalHomeLocations() {
  const { protocol, host, pathname } = window.location;
  const { lat, lng, placeName, radius } = getSearchParams();
  const searchParams = { lat, lng, placeName, radius };
  return `${protocol}//${host}${pathname}${getSearch(searchParams)}`;
}

function getCanonicalLocation() {
  const { protocol, host, pathname } = window.location;
  const searchParams = {};
  return `${protocol}//${host}${pathname}${getSearch(searchParams)}`;
}

function getCanonicalCalendarDay() {
  const { protocol, host, pathname } = window.location;
  const { lat, lng, placeName, radius } = getSearchParams();
  const searchParams = { lat, lng, placeName, radius };
  return `${protocol}//${host}${pathname}${getSearch(searchParams)}`;
}

enum RouteType {
  Home = "/",
  Locations = "/locations",
  Bookings = "/bookings",
  Booking = "/bookings/:date",
  Location = "/locations/:slug",
}

function VaxxHelmet({ routeType }: { routeType: RouteType }) {
  switch (routeType) {
    case RouteType.Home:
    case RouteType.Bookings:
      return (
        <Helmet>
          <title>
            COVID-19 vaccination sites in New Zealand | Vaccine finder New
            Zealand | See ways to get vaccinated near you | vaxx.nz
          </title>
          <link rel="canonical" href={getCanonicalHome()} />
        </Helmet>
      );
    case RouteType.Locations:
      return (
        <Helmet>
          <title>
            COVID-19 vaccination bookings in New Zealand | Vaccine finder New
            Zealand | See ways to get vaccinated near you | vaxx.nz
          </title>
          <link rel="canonical" href={getCanonicalHomeLocations()} />
        </Helmet>
      );
    case RouteType.Booking:
      return (
        <Helmet>
          <title>
            Available to Book - 22 Sep 2021 | COVID-19 vaccination | vaxx.nz
          </title>
          <link rel="canonical" href={getCanonicalCalendarDay()} />
        </Helmet>
      );
    case RouteType.Location:
      return (
        <Helmet>
          <title>
            The Auckland City Doctors | Walk-in/Drive-through COVID-19
            vaccination site | vaxx.nz
          </title>
          <link rel="canonical" href={getCanonicalLocation()} />
        </Helmet>
      );
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
            <VaxxHelmet routeType={RouteType.Location} />
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
