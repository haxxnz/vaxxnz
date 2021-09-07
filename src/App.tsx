import { Button, KIND } from "baseui/button";
import { Spinner } from "baseui/spinner";
import { formatDistance, parse } from "date-fns";
import React, { useCallback, useContext, useEffect, useState } from "react";
import {
  HeaderMain,
  CalendarContainer,
  CalendarSectionContainer,
  MonthContainer,
} from "./VaxComponents";
import { ShareButtons } from "./ShareButtons";

import { DateLocationsPairsContext } from "./contexts";
import { getMyCalendar } from "./getData";
import { DateLocationsPair } from "./booking/BookingDataTypes";
import LocationModal from "./location-picker/LocationModal";
import BookingsModal from "./booking/BookingsModal";

import RadiusSelect from "./RadiusSelect";
import { useSearchParams } from "./utils/url";
import { WalkInSection } from "./walk-in/WalkInSection";
import filterOldDates from "./filterOldDates";
import { useDefaultCoords } from "./location-picker/LocationPicker";

function sum(array: number[]) {
  return array.reduce((a, b) => a + b, 0);
}

function App() {
  const defaultCoords = useDefaultCoords();
  const [coords, setCoords] = useState(defaultCoords);
  // update the coords when the URL changes
  useEffect(() => setCoords(defaultCoords), [defaultCoords]);

  const [radiusKm, setRadiusKm] = useState(10);
  // const {
  //   lat: urlLat,
  //   lng: urlLng,
  //   placeName: urlPlaceName,
  // } = useSearchParams();
  // const defaultLat = urlLat ? parseFloat(urlLat) : -36.853610199274385;
  // const defaultLng = urlLng ? parseFloat(urlLng) : 174.76054541484535;
  // const defaultPlaceName = urlPlaceName ?? "Auckland CBD";

  // const loadCalendar = useCallback(async () => {
  //   setLoading(true);
  //   setError(null);
  //   try {
  //     const data = await getMyCalendar(coords[0], coords[1], radiusKm);
  //     setDateLocationsPairs(data.dateLocationsPairs);
  //     setLastUpdateTime(
  //       data.oldestLastUpdatedTimestamp === Infinity
  //         ? new Date(0)
  //         : new Date(data.oldestLastUpdatedTimestamp)
  //     );
  //   } catch (error) {
  //     setError(error as Error);
  //   }
  //   setLoading(false);
  // }, [coords, radiusKm, setDateLocationsPairs]);

  return (
    <>
      <div className="App">
        <BookingsModal
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          lat={coords[0]}
          lng={coords[1]}
        />

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
            <a href="https://bookmyvaccine.nz" target="_blank" rel="noreferrer">
              bookmyvaccine.nz
            </a>{" "}
            <br />
          </p>
        </section>
        <div className={"big-old-container"}></div>
        {!loading && error ? (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              marginTop: "1rem",
            }}
          >
            {/* <Spinner color="black" /> */}
            <div style={{ marginLeft: "1rem", fontSize: "1.5rem" }}>
              {error.message}
            </div>
          </div>
        ) : null}

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
