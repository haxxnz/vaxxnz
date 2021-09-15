import { useEffect, useState } from "react";
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
import CookieConsent from "react-cookie-consent";

function App() {
  const { lat, lng } = useSearchParams();
  const [coords, setCoords] = useState({
    lat: DEFAULT_LOCATION.lat,
    lng: DEFAULT_LOCATION.lng,
  });
  useEffect(() => {
    setCoords({
      lat: lat ? parseFloat(lat) : DEFAULT_LOCATION.lat,
      lng: lng ? parseFloat(lng) : DEFAULT_LOCATION.lng,
    });
  }, [lat, lng]);

  const [radiusKm, setRadiusKm] = useState(10);
  const [lastUpdateTime, setLastUpdateTime] = useState<Date | null>(null); // null whilst loading

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
        <section className="App-header">
          <div className="header-content">
            <h1>{t("core.tagline")}</h1>
            <h2 style={{ fontWeight: "normal" }}>{t("core.subtitle")}</h2>
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
            <img className="header-img" src="./doc.svg" alt=" a doctor"></img>
          </div>
        </section>
        <div className={"big-old-container"}>
          <LocationPicker
            coords={coords}
            setCoords={setCoords}
            radiusKm={radiusKm}
            setRadiusKm={setRadiusKm}
            lastUpdateTime={lastUpdateTime}
          />

          <TodayLocationsSection coords={coords} radiusKm={radiusKm} />
          <CalendarSection
            coords={coords}
            radiusKm={radiusKm}
            setLastUpdateTime={setLastUpdateTime}
          />
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
              href="https://github.com/CovidEngine/vaxxnz/blob/main/CONTRIBUTORS.md"
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
          <p></p>
        </footer>
      </div>
      <div className="background">
        <div
          className="bg-impt"
          style={{
            backgroundImage: `url(${process.env.PUBLIC_URL + "./bg.svg"})`,
          }}
        ></div>
        <CookieConsent
          location="bottom"
          buttonText="I Understand"
          declineButtonText="Cookie Settings"
          cookieName="myAwesomeCookieName2"
          style={{ background: "#000000" }}
          buttonStyle={{
            color: "#4e503b",
            fontSize: "13px",
            fontWeight: "Bold",
          }}
          declineButtonStyle={{
            background: "#000000",
            textDecoration: "underline",
          }}
          expires={150}
          onAccept={(byScroll) => {
            alert(`consent given. \n\n By scrolling? ${byScroll}`);
          }}
          enableDeclineButton
          onDecline={() => {
            alert("Cookie Settings");
          }}
        >
          <p style={{ fontFamily: "sans-serif" }}>
            This website uses cookies to enhance the user experience.
          </p>
        </CookieConsent>
      </div>
    </>
  );
}

export default App;
