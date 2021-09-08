import "./App.css";
import { useEffect, useState } from "react";
import { ShareButtons } from "./ShareButtons";

import { WalkInSection } from "./walk-in/WalkInSection";
import {
  LocationPicker,
  useDefaultCoords,
} from "./location-picker/LocationPicker";
import { BookingSection } from "./booking/BookingSection";

function App() {
  const {lat, lng} = useDefaultCoords();
  const [coords, setCoords] = useState({lat, lng});
  useEffect(() => setCoords({lat, lng}), [lat, lng]);

  const [radiusKm, setRadiusKm] = useState(10);
  const [lastUpdateTime, setLastUpdateTime] = useState<Date | null>(null); // null whilst loading

  return (
    <>
      <div className="App">
        <section className="App-header">
          <a href="/" className="nolink">
            <h1>NZ COVID Vaccination Finder</h1>
          </a>{" "}
          <h3 style={{ fontWeight: "normal" }}>
            See every available vaccination booking slot near you.{" "}
          </h3>{" "}
          <br />
          <p>
            This is not an official Government website.
            <br /> To get vaccinated visit&nbsp;
            <a href="https://bookmyvaccine.covid19.health.nz/" target="_blank" rel="noreferrer">
              bookmyvaccine.nz
            </a>{" "}
            <br />
          </p>
        </section>
        <div className={"big-old-container"}>
          <LocationPicker
            coords={coords}
            setCoords={setCoords}
            radiusKm={radiusKm}
            setRadiusKm={setRadiusKm}
            lastUpdateTime={lastUpdateTime}
          />

          <WalkInSection coords={coords} radiusKm={radiusKm} />

          <BookingSection
            coords={coords}
            radiusKm={radiusKm}
            setLastUpdateTime={setLastUpdateTime}
          />
        </div>

        <section className="App-header">
          <p style={{ marginBottom: "0.5rem" }}>
            If this site helped you please consider sharing:
          </p>
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
              Contact us
            </a>{" "}
            /{" "}
            <a
              href="https://github.com/CovidEngine/vaxxnzlocations"
              target="_blank"
              rel="noreferrer"
            >
              Raw Data
            </a>{" "}
            /{" "}
            <a
              href="https://github.com/CovidEngine/vaxxnz"
              target="_blank"
              rel="noreferrer"
            >
              Source code
            </a>{" "}
            /{" "}
            <a
              href="https://github.com/CovidEngine/vaxxnz/projects/2"
              target="_blank"
              rel="noreferrer"
            >
              {" "}
              Roadmap
            </a>
          </p>
          <p></p>
        </section>
      </div>
    </>
  );
}

export default App;
