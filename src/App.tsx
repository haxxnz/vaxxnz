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
import { HomePage } from "./HomePage";
import { useSaveScroll } from "./scroll";
import ReactMarkdown from "react-markdown";
import { terms, privacy, cookie } from "./md/LegalContent";

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
    <Contexts>
      <div className="App">
        <Header />
        <Switch>
          <Route path="/terms-and-conditions">
            <div className={"big-old-container"}>
              <ReactMarkdown>{terms}</ReactMarkdown>
            </div>
          </Route>
          <Route path="/privacy-policy">
            <div className={"big-old-container"}>
              <ReactMarkdown>{privacy}</ReactMarkdown>
            </div>
          </Route>
          <Route path="/cookie-policy">
            <div className={"big-old-container"}>
              <ReactMarkdown>{cookie}</ReactMarkdown>
            </div>
          </Route>
          <Route path="/bookings/:date">
            <div className={"big-old-container"}>
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
            <>
              <Banner />
              <div className={"big-old-container"}>
                <LocationPicker lastUpdateTime={lastUpdateTime} />
                <HomePage bookingData={bookingData} />
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
