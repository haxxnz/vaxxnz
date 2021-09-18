import { useEffect, useMemo, useState } from "react";
import "./App.css";
import { CalendarSection } from "./calendar/CalendarSection";
import { LocationPicker } from "./location-picker/LocationPicker";
import { DEFAULT_LOCATION } from "./utils/consts";
import { useSearchParams } from "./utils/url";
import { TodayLocationsSection } from "./today-locations/TodayLocationsSection";
import CookiesBar from "./Cookies";
import BookingModal from "./calendar/modal/CalendarModal";
import { Switch, Route, useLocation } from "react-router-dom";
import { useBookingData } from "./calendar/booking/BookingData";
import { LocationRouter } from "./LocationRouter";
import { Footer } from "./Footer";
import { Header } from "./Header";
import { Banner } from "./Banner";

function App() {
  const { lat, lng } = useSearchParams();
  const coords = useMemo(
    () => ({
      lat: lat ? parseFloat(lat) : DEFAULT_LOCATION.lat,
      lng: lng ? parseFloat(lng) : DEFAULT_LOCATION.lng,
    }),
    [lat, lng]
  );
  const { pathname } = useLocation();

  const [lastUpdateTime, setLastUpdateTime] = useState<Date | null>(null); // null whilst loading
  const [selectedLocationIndex, setSelectedLocationIndex] = useState<number>();

  const bookingData = useBookingData(coords, setLastUpdateTime);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <>
      <div className="App">
        <Header />
        <Switch>
          <Route path="/bookings/:date">
            <div className={"big-old-container"}>
              <BookingModal
                coords={coords}
                bookingData={"ok" in bookingData ? bookingData.ok : undefined}
              />
            </div>
          </Route>
          <Route path="/:slug">
            <div className={"big-old-container"}>
              <LocationRouter />
            </div>
          </Route>
          <Route path="/">
            <>
              <Banner />
              <div className={"big-old-container"}>
                <LocationPicker
                  coords={coords}
                  lastUpdateTime={lastUpdateTime}
                />
                <TodayLocationsSection
                  coords={coords}
                  selectedLocationIndex={selectedLocationIndex}
                  setSelectedLocation={setSelectedLocationIndex}
                />
                <CalendarSection
                  coords={coords}
                  setLastUpdateTime={setLastUpdateTime}
                />
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
        <CookiesBar lng={coords.lng} lat={coords.lat} />
      </div>
    </>
  );
}

export default App;
