import { useEffect, useMemo, useState } from "react";
import { Trans, useTranslation } from "react-i18next";
import "./App.css";
import { CalendarSection } from "./calendar/CalendarSection";
import LanguageSelect from "./LanguageSelect";
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
        <header className="menu-header">
          <a href="/" className="nolink menu-logo">
            {t("core.title")}
          </a>
          <div className="menu-divider">
            {" "}
            <a
              href="https://github.com/CovidEngine/vaxxnz"
              target="_blank"
              rel="noreferrer"
              className="menu-link"
            >
              {t("navigation.about")}
            </a>
            <a
              href="https://airtable.com/shrxuw3vSp2yRPrG7"
              className="menu-link"
            >
              {t("navigation.contact")}
            </a>
            <LanguageSelect />
          </div>
        </header>

        <div className={"big-old-container"}>
          <Switch>
            <Route path="/bookings/:date">
              <BookingModal
                coords={coords}
                radiusKm={radiusKm}
                bookingData={"ok" in bookingData ? bookingData.ok : undefined}
              />
            </Route>
            <Route path="/:slug">
              <LocationRouter radiusKm={radiusKm} />
            </Route>
            <Route path="/">
              <>
                <section className="App-header">
                  <div className="header-content">
                    <h1>{t("core.tagline")}</h1>
                    <h2 style={{ fontWeight: "normal" }}>
                      {t("core.subtitle")}
                    </h2>
                    <br />
                    <p>
                      <Trans
                        i18nKey="core.disclaimerNotAGovWebsite"
                        t={t}
                        components={[
                          <a
                            href="https://bookmyvaccine.nz"
                            target="_blank"
                            rel="noreferrer"
                          >
                            https://bookmyvaccine.nz
                          </a>,
                        ]}
                      />
                      <br />
                    </p>
                  </div>
                  <div className="header-img-container">
                    <img
                      className="header-img"
                      src="./doc.svg"
                      alt=" a doctor"
                    ></img>
                  </div>
                </section>
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
        </div>
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
