import React, { useState } from "react";
import "./App.css";
import { CalendarSection } from "./calendar/CalendarSection";
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
import { Tabs, Tab } from "baseui/tabs";

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
  const [selectedLocationIndex, setSelectedLocationIndex] = useState<number>();

  const bookingData = useBookingData(setLastUpdateTime);
  const [activeKey, setActiveKey] = useState<React.Key>("0");

  return (
    <Contexts>
      <div className="App">
        <Header />
        <Switch>
          <Route path="/bookings/:date">
            <div className={"big-old-container"}>
              <BookingModal
                bookingData={"ok" in bookingData ? bookingData.ok : undefined}
              />
            </div>
          </Route>
          <Route path="/:slug">
            <div className={"big-old-container"}>
              <LocationRouter />
              <TodayLocationsSection
                selectedLocationIndex={selectedLocationIndex}
                setSelectedLocation={setSelectedLocationIndex}
              />
            </div>
          </Route>
          <Route path="/">
            <>
              <Banner />
              <div className={"big-old-container"}>
                <LocationPicker lastUpdateTime={lastUpdateTime} />
                <Tabs
                  onChange={({ activeKey }) => {
                    setActiveKey(activeKey);
                  }}
                  activeKey={activeKey}
                  overrides={{
                    TabBar: {
                      style: {
                        backgroundColor: "white",
                        borderBottom: "1px solid lightgray",
                        borderLeft: "1px solid lightgray",
                        borderRight: "1px solid lightgray",
                      },
                    },
                    TabContent: {
                      style: {
                        padding: "0px",
                      },
                    },
                    Tab: {
                      style: {
                        fontSize: "1.25rem",
                        fontWeight: "bold",
                      },
                    },
                  }}
                >
                  <Tab title="All">
                    <TodayLocationsSection
                      selectedLocationIndex={selectedLocationIndex}
                      setSelectedLocation={setSelectedLocationIndex}
                    />
                    <CalendarSection
                      setLastUpdateTime={setLastUpdateTime}
                      data={bookingData}
                    />
                  </Tab>
                  <Tab title="Booking">
                    <CalendarSection
                      setLastUpdateTime={setLastUpdateTime}
                      data={bookingData}
                    />
                  </Tab>
                  <Tab title="Walk In">
                    <TodayLocationsSection
                      selectedLocationIndex={selectedLocationIndex}
                      setSelectedLocation={setSelectedLocationIndex}
                    />
                  </Tab>
                </Tabs>
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
