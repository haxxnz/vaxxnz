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
              <Footer />
            </Route>
            <Route path="/privacy-policy">
              <div className={"big-old-container"}>
                <PrivacyPolicy />
              </div>
              <Footer />
            </Route>
            <Route path="/cookie-policy">
              <div className={"big-old-container"}>
                <CookiesPolicy />
              </div>
              <Footer />
            </Route>
            <Route path="/bookings/:date">
              <div className={"big-old-container"}>
                <BookingModal
                  bookingData={"ok" in bookingData ? bookingData.ok : undefined}
                />
              </div>
              {"ok" in bookingData ? <Footer /> : null}
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
                    {"ok" in bookingData ? <Footer /> : null}
                  </Route>
                </Switch>
              </div>
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
