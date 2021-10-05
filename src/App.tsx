import React, { useState } from "react";
import "./App.css";
import { LocationPicker } from "./location-picker/LocationPicker";
import { TodayLocationsSection } from "./today-locations/TodayLocationsSection";
import CookiesBar from "./Cookies";
import BookingModal from "./calendar/modal/CalendarModal";
import { Switch, Route } from "react-router-dom";
import { useBookingData } from "./calendar/booking/BookingData";
import { LocationRouter } from "./LocationRouter";
import { Header } from "./Header";
import { Banner } from "./Banner";
import {
  HealthpointLocationsContext,
  HealthpointLocationsResult,
} from "./contexts";
import { Tabs, TabType } from "./HomePage";
import { useSaveScroll } from "./scroll";
import { HelmetProvider } from "react-helmet-async";
import { RouteType, VaxxHelmet } from "./VaxxHelmet";
import { CalendarSection } from "./calendar/CalendarSection";
import TermsAndConditions from "./termsAndConditions";
import PrivacyPolicy from "./privacyPolicy";
import CookiesPolicy from "./cookiesPolicy";

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

function App() {
  const [lastUpdateTime, setLastUpdateTime] = useState<Date | null>(null); // null whilst loading
  const bookingData = useBookingData(setLastUpdateTime);
  useSaveScroll();

  return (
    <HelmetProvider>
      <Contexts>
        <div className="App">
          <Header />
          <Switch>
            <Route path="/terms-and-conditions">
              <div className={"big-old-container"}>
                <TermsAndConditions />
              </div>
            </Route>
            <Route path="/privacy-policy">
              <div className={"big-old-container"}>
                <PrivacyPolicy />
              </div>
            </Route>
            <Route path="/cookie-policy">
              <div className={"big-old-container"}>
                <CookiesPolicy />
              </div>
            </Route>
            <Route path="/bookings/:date">
              <div className={"big-old-container"}>
                <LocationPicker lastUpdateTime={lastUpdateTime} />
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
              <Switch>
                <Route path="/locations">
                  <div className={"big-old-container"}>
                    <LocationPicker lastUpdateTime={lastUpdateTime} />
                    <VaxxHelmet routeType={RouteType.Locations} />
                    <Tabs activeTab={TabType.walkIn} />
                    <TodayLocationsSection />
                  </div>
                </Route>
                <Route>
                  <div className={"big-old-container"}>
                    <LocationPicker lastUpdateTime={lastUpdateTime} />
                    <VaxxHelmet routeType={RouteType.Home} />
                    <Tabs activeTab={TabType.bookings} />
                    <CalendarSection bookingData={bookingData} />
                  </div>
                </Route>
              </Switch>
            </Route>
          </Switch>
        </div>
        <div className="background">
          <div className="bg-impt"></div>
          <CookiesBar />
        </div>
      </Contexts>
    </HelmetProvider>
  );
}

export default App;
