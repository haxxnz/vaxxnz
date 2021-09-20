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

                        padding: "0px",
                      },
                    },
                    TabContent: {
                      style: {
                        padding: "0px !important",
                        marginTop: "1.5rem",
                      },
                    },
                    Tab: {
                      style: ({ $active }) => ({
                        fontSize: "1.15rem",
                        fontWeight: "bold",
                        textAlign: "center",
                        margin: "0px",
                        padding: "13px 0px",
                        flex: "1",
                        ":hover": {
                          backgroundColor: "#e4eeff",
                          color: "#0050ac",
                        },
                        color: $active ? "#000" : "#0076FF",
                        borderBottomColor: $active ? "#000" : "transparent",
                        borderRadius: "0",
                      }),
                    },
                  }}
                >
                  <Tab
                    title="Make a Booking"
                    overrides={{
                      Tab: {
                        style: {
                          borderRight: "1px solid lightgray",
                        },
                      },
                    }}
                  >
                    <CalendarSection
                      setLastUpdateTime={setLastUpdateTime}
                      data={bookingData}
                    />
                  </Tab>
                  <Tab title="Walk-in/Drive Thru">
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
