import "./App.css";
import { useEffect, useState } from "react";
import { ShareButtons } from "./ShareButtons";

import { WalkInSection } from "./walk-in/WalkInSection";
import {
  LocationPicker,
  useDefaultCoords,
} from "./location-picker/LocationPicker";
import { BookingSection } from "./booking/BookingSection";
import { useTranslation } from "react-i18next";

function App() {
  const { lat, lng } = useDefaultCoords();
  const [coords, setCoords] = useState({ lat, lng });
  useEffect(() => setCoords({ lat, lng }), [lat, lng]);

  const [radiusKm, setRadiusKm] = useState(10);
  const [lastUpdateTime, setLastUpdateTime] = useState<Date | null>(null); // null whilst loading

  const { t } = useTranslation("common");

  return (
    <>
      <div className="App">
        <header className="menu-header">
          <a href="/" className="nolink menu-logo">
            Vaxx.nz
          </a>
          <div className="menu-divider">
            {" "}
            <a
              href="https://github.com/CovidEngine/vaxxnz"
              target="_blank"
              rel="noreferrer"
              className="menu-link"
            >
              About
            </a>
            <a
              href="https://airtable.com/shrxuw3vSp2yRPrG7"
              className="menu-link"
            >
              Contact
            </a>
            <a
              href="https://github.com/CovidEngine/vaxxnz/blob/main/CONTRIBUTORS.md"
              className="menu-link"
            >
              Get Involved
            </a>
          </div>
        </header>
        <section className="App-header">
          <div className="header-content">
            <h1>Find a COVID vaccination</h1>
            <h3 style={{ fontWeight: "normal" }}>
              See ways to get vaccinated near you.{" "}
            </h3>
            <br />
            <p>
              This is not an official Government website.
              <br /> To get vaccinated visit&nbsp;
              <a
                href="https://bookmyvaccine.covid19.health.nz"
                target="_blank"
                rel="noreferrer"
              >
                bookmyvaccine.nz
              </a>{" "}
              <br />
            </p>
          </div>
          <div className="header-divider"></div>{" "}
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

          <BookingSection
            coords={coords}
            radiusKm={radiusKm}
            setLastUpdateTime={setLastUpdateTime}
          />
          <WalkInSection coords={coords} radiusKm={radiusKm} />
        </div>

        <section className="App-header">
          <p style={{ marginBottom: "0.5rem" }}>{t("footer.message")}</p>
          <div className={"social-container"}>
            <ShareButtons />
          </div>
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
              href="https://github.com/CovidEngine/vaxxnzlocations"
              target="_blank"
              rel="noreferrer"
            >
              {t("footer.links.rawData")}
            </a>{" "}
            /{" "}
            <a
              href="https://github.com/CovidEngine/vaxxnz"
              target="_blank"
              rel="noreferrer"
            >
              {t("footer.links.sourceCode")}
            </a>{" "}
            /{" "}
            <a
              href="https://github.com/CovidEngine/vaxxnz/projects/2"
              target="_blank"
              rel="noreferrer"
            >
              {t("footer.links.roadmap")}
            </a>
          </p>
          <p></p>
        </section>
      </div>
      <div className="bg">
        <div
          className="bg-impt"
          style={{
            backgroundImage: `url(${process.env.PUBLIC_URL + "./bg.svg"})`,
          }}
        ></div>
      </div>
    </>
  );
}

export default App;
