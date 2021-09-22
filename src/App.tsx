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

function getCanonicalHome() {
  const { protocol, host } = window.location;
  const searchParams = new URL(window.location.toString()).searchParams;
  const lat = searchParams.get("lat");
  const lng = searchParams.get("lng");
  const placeName = searchParams.get("placeName");
  const radius = searchParams.get("radius");

  const canonicalDict = {
    ...(lat ? { lat } : {}),
    ...(lng ? { lng } : {}),
    ...(placeName ? { placeName } : {}),
    ...(radius ? { radius } : {}),
  };

  const sp = new URLSearchParams(canonicalDict).toString();
  const canonical = `${protocol}//${host}${sp ? `?${sp}` : ""}`;
  console.log("canonical", canonical);
  return canonical;
}
function getCanonicalHomeLocations() {
  const { protocol, host, pathname } = window.location;
  const searchParams = new URL(window.location.toString()).searchParams;
  const lat = searchParams.get("lat");
  const lng = searchParams.get("lng");
  const placeName = searchParams.get("placeName");
  const radius = searchParams.get("radius");

  const canonicalDict = {
    ...(lat ? { lat } : {}),
    ...(lng ? { lng } : {}),
    ...(placeName ? { placeName } : {}),
    ...(radius ? { radius } : {}),
  };

  const sp = new URLSearchParams(canonicalDict).toString();
  const canonical = `${protocol}//${host}${pathname}${sp ? `?${sp}` : ""}`;
  console.log("canonical", canonical);
  return canonical;
}

function getCanonicalLocations() {
  const { protocol, host, pathname } = window.location;
  const canonicalDict = {};
  const sp = new URLSearchParams(canonicalDict).toString();
  const canonical = `${protocol}//${host}${pathname}${sp ? `?${sp}` : ""}`;
  console.log("canonical", canonical);
  return canonical;
}

function getCanonicalBookings() {
  const { protocol, host, pathname } = window.location;
  const searchParams = new URL(window.location.toString()).searchParams;
  const lat = searchParams.get("lat");
  const lng = searchParams.get("lng");
  const placeName = searchParams.get("placeName");
  const radius = searchParams.get("radius");
  const canonicalDict = {
    ...(lat ? { lat } : {}),
    ...(lng ? { lng } : {}),
    ...(placeName ? { placeName } : {}),
    ...(radius ? { radius } : {}),
  };
  const sp = new URLSearchParams(canonicalDict).toString();
  const canonical = `${protocol}//${host}${pathname}${sp ? `?${sp}` : ""}`;
  console.log("canonical", canonical);
  return canonical;
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
            <>
              <Helmet>
                <title>
                  {/* TODO: dynamic */}
                  Available to Book - 22 Sep 2021 | COVID-19 vaccination |
                  Vaxx.nz
                </title>
                <link rel="canonical" href={getCanonicalBookings()} />
              </Helmet>
              <div className={"big-old-container"}>
                <BookingModal
                  bookingData={"ok" in bookingData ? bookingData.ok : undefined}
                />
              </div>
            </>
          </Route>
          <Route path="/locations/:slug">
            <>
              <Helmet>
                <title>
                  {/* TODO: dynamic */}
                  The Auckland City Doctors | Walk-in/Drive-through COVID-19
                  vaccination site | Vaxx.nz
                </title>
                <link rel="canonical" href={getCanonicalLocations()} />
              </Helmet>
              <div className={"big-old-container"}>
                <LocationRouter />
                <TodayLocationsSection />
              </div>
            </>
          </Route>
          <Route>
            <>
              <Banner />
              <div className={"big-old-container"}>
                <LocationPicker lastUpdateTime={lastUpdateTime} />
                {/* <HomePage bookingData={bookingData} /> */}
                <Switch>
                  <Route path="/locations">
                    <Helmet>
                      <title>
                        COVID-19 vaccination bookings in New Zealand | Vaccine
                        finder New Zealand | See ways to get vaccinated near you
                        | Vaxx.nz
                      </title>
                      <link rel="canonical" href={getCanonicalHome()} />
                    </Helmet>
                    <Tabs activeTab={TabType.walkIn} />
                    <TodayLocationsSection />
                  </Route>
                  <Route>
                    <Helmet>
                      <title>
                        COVID-19 vaccination sites in New Zealand | Vaccine
                        finder New Zealand | See ways to get vaccinated near you
                        | Vaxx.nz
                      </title>
                      <link
                        rel="canonical"
                        href={getCanonicalHomeLocations()}
                      />
                    </Helmet>
                    <Tabs activeTab={TabType.bookings} />
                    <CalendarSection bookingData={bookingData} />
                  </Route>
                </Switch>
              </div>
            </>
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
