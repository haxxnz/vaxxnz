import { useEffect, useMemo, useState } from "react";
import { Trans, useTranslation } from "react-i18next";
import "./App.css";
import { CalendarSection } from "./calendar/CalendarSection";
import LanguageSelect from "./LanguageSelect";
import { LocationPicker } from "./location-picker/LocationPicker";
import { ShareButtons } from "./ShareButtons";
import { enqueueAnalyticsEvent } from "./utils/analytics";
import { DEFAULT_LOCATION } from "./utils/consts";
import { useSearchParams } from "./utils/url";
import { TodayLocationsSection } from "./today-locations/TodayLocationsSection";
import CookiesBar from "./Cookies";
import BookingModal from "./calendar/modal/CalendarModal";
import WalkModal from "./today-locations/healthpoint/HealthpointModal";
import {
  getHealthpointData,
  HealthpointLocation,
} from "./today-locations/healthpoint/HealthpointData";
import { CrowdsourcedLocation } from "./crowdsourced/CrowdsourcedData";
import CrowdsourcedModal from "./crowdsourced/CrowdsourcedModal";
import {
  Switch,
  Route,
  useParams,
  useHistory,
  useLocation,
} from "react-router-dom";
import { useBookingData } from "./calendar/booking/BookingData";
import { simpleHash } from "./utils/simpleHash";
import { crowdsourcedLocations } from "./crowdsourced/CrowdsourcedLocations";

function LocationRouter({ radiusKm }: { radiusKm: number }) {
  const { slug } = useParams<{ slug: string }>();
  const [hash] = slug.split("-").slice(-1);
  const history = useHistory();

  const [healthpointLocations, setHealthpointLocations] = useState<
    HealthpointLocation[]
  >([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function load() {
      setLoading(true);
      setError(null);
      try {
        setHealthpointLocations(await getHealthpointData());
      } catch (e) {
        setError(e as Error);
      }
      setLoading(false);
    }
    load();
  }, []);

  const locations = [...healthpointLocations, ...crowdsourcedLocations];

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  if (!locations.length) {
    return <p>No locations found</p>;
  }

  const location = locations.find(
    (loc) => simpleHash(`${loc.lat}${loc.lng}`) === hash
  );

  if (!location) {
    return (
      <p>
        {slug}|{hash}
      </p>
    );
  }

  return (
    <>
      {"isHealthpoint" in location ? (
        <WalkModal
          clearSelectedLocation={() => history.push("/")}
          radiusKm={radiusKm}
          location={location as HealthpointLocation}
        />
      ) : (
        <CrowdsourcedModal
          clearSelectedLocation={() => history.push("/")}
          location={location as CrowdsourcedLocation}
        />
      )}
    </>
  );
}

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
        <footer className="footer-header">
          <p style={{ marginBottom: "0.5rem" }}>{t("footer.message")}</p>
          <div className={"social-container"}>
            <ShareButtons />
          </div>
          <br />
          <p>
            <Trans
              i18nKey="footer.addressFinderLinkCopy"
              t={t}
              // eslint-disable-next-line jsx-a11y/anchor-has-content
              components={[<a href="https://addressfinder.nz"></a>]}
            />
          </p>
          <br />
          <p>
            <a
              href="https://airtable.com/shrxuw3vSp2yRPrG7"
              target="_blank"
              rel="noreferrer"
            >
              {t("footer.links.contactUs")}
            </a>{" "}
            /{" "}
            <a
              href="https://github.com/CovidEngine/vaxxnz/projects/2"
              target="_blank"
              rel="noreferrer"
              onClick={() => enqueueAnalyticsEvent("Roadmap clicked")}
            >
              {t("footer.links.roadmap")}
            </a>{" "}
            /{" "}
            <a
              href="https://github.com/CovidEngine/vaxxnz/blob/main/CONTRIBUTING.md"
              target="_blank"
              rel="noreferrer"
            >
              {t("navigation.getInvolved")}
            </a>
            <br />{" "}
            <a
              href="https://github.com/CovidEngine/vaxxnzlocations"
              target="_blank"
              rel="noreferrer"
              onClick={() => enqueueAnalyticsEvent("Raw data clicked")}
            >
              {t("footer.links.rawData")}
            </a>{" "}
            /{" "}
            <a
              href="https://github.com/CovidEngine/vaxxnz"
              target="_blank"
              rel="noreferrer"
              onClick={() => enqueueAnalyticsEvent("Source code clicked")}
            >
              {t("footer.links.sourceCode")}
            </a>{" "}
          </p>
          <p>
            <a
              href="https://twitter.com/vaxxnz"
              target="_blank"
              rel="noreferrer"
              onClick={() => enqueueAnalyticsEvent("Twitter Clicked")}
            >
              Twitter
            </a>{" "}
          </p>
        </footer>
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
