import { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
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
  const { lat, lng, radius } = useSearchParams();
  const coords = useMemo(() => {
    return {
      lat: lat ? parseFloat(lat) : DEFAULT_LOCATION.lat,
      lng: lng ? parseFloat(lng) : DEFAULT_LOCATION.lng,
    };
  }, [lat, lng]);
  const radiusKm = radius ? parseInt(radius, 10) : 10;
  const { pathname } = useLocation();

  const [lastUpdateTime, setLastUpdateTime] = useState<Date | null>(null); // null whilst loading
  const [selectedLocationIndex, setSelectedLocationIndex] = useState<number>();

  const bookingData = useBookingData(coords, radiusKm, setLastUpdateTime);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  const { t } = useTranslation("common");

  return (
    <>
      <div className="App">
        <Header />
        {/* <div> */}
        <Switch>
          <Route path="/bookings/:date">
            <div className={"big-old-container"}>
              <BookingModal
                coords={coords}
                radiusKm={radiusKm}
                bookingData={"ok" in bookingData ? bookingData.ok : undefined}
              />
            </div>
          </Route>
          <Route path="/:slug">
            <div className={"big-old-container"}>
              <LocationRouter radiusKm={radiusKm} />
            </div>
          </Route>
          <Route path="/">
            <>
              <Banner />
              <div className={"big-old-container"}>
                <LocationPicker
                  coords={coords}
                  radiusKm={radiusKm}
                  lastUpdateTime={lastUpdateTime}
                />

                <TodayLocationsSection
                  coords={coords}
                  radiusKm={radiusKm}
                  selectedLocationIndex={selectedLocationIndex}
                  setSelectedLocation={setSelectedLocationIndex}
                />
                <CalendarSection
                  coords={coords}
                  radiusKm={radiusKm}
                  setLastUpdateTime={setLastUpdateTime}
                />
              </div>
            </>
          </Route>
        </Switch>
        {/* </div> */}
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
