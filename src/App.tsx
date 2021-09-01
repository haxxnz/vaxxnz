import { Button, KIND } from "baseui/button";
import { Search, Show } from "baseui/icon";
import { Modal } from "baseui/modal";
import { Select } from "baseui/select";
import { parse } from "date-fns";
import React, { useCallback, useContext, useEffect, useState } from "react";
import styled from "styled-components";
import "./App.css";
import { DateLocationsPairsContext } from "./contexts";
import { getMyCalendar } from "./getData";
import { DateLocationsPair, LocationSlotsPair } from "./types";
import { getDistanceKm } from "./distanceUtils";

function sum(array: number[]) {
  return array.reduce((a, b) => a + b, 0);
}

function App() {
  const [isOpen, setIsOpen] = React.useState<DateLocationsPair | null>(null);
  function close() {
    setIsOpen(null);
  }
  const [radiusKm, setRadiusKm] = useState(30);
  const [lat, setLat] = useState(-36.853610199274385);
  const [lng, setLng] = useState(174.76054541484535);
  const { dateLocationsPairs, setDateLocationsPairs } = useContext(
    DateLocationsPairsContext
  );
  const loadCalendar = useCallback(async () => {
    const data = await getMyCalendar(lat, lng, radiusKm);
    setDateLocationsPairs(data);
  }, [lat, lng, radiusKm, setDateLocationsPairs]);

  useEffect(() => {
    loadCalendar();
  }, [loadCalendar]);

  const getLocation = () => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser");
    } else {
      navigator.geolocation.getCurrentPosition((position) => {
        setLat(position.coords.latitude);
        setLng(position.coords.longitude);
      });
    }
  };

  return (
    <>
      <div className="App">
          <Modal
            onClose={close}
            isOpen={!!isOpen}
            overrides={{
              Root: { style: { zIndex: 1500 } },
              Dialog: {
                style: {
                  width: "80vw",
                  height: "80vh",
                  display: "flex",
                  flexDirection: "column",
                  padding: "1.5rem",
                },
              },
            }}
          >
            <ModalGrid>
              <div style={{ position: "sticky", top: "0", display: "block" }}>
                <h1>Available slots <br/> for {isOpen?.dateStr}</h1>
               
                <p>Data from bookmyvaccine.nz</p>
                <Button
                  onClick={() => setIsOpen(null)}
                  overrides={{
                    Root: { style: { width: "100%", margin: "2rem 0" } },
                  }}
                  kind={KIND.secondary}
                >
                  Back to calendar
                </Button>
              
              </div>

              <div style={{ overflow: "scroll" }}>
                {sortByDistance(isOpen?.locationSlotsPairs, lat, lng)
                  .filter(
                    (locationSlotsPair) => locationSlotsPair.slots?.length
                  )
                  .map((locationSlotsPair) => (
                    <VaccineCentre>
                      <h3>{locationSlotsPair.location.name}</h3>
                      <p>{locationSlotsPair.location.displayAddress} ({Math.floor(getDistanceKm(lat, lng, locationSlotsPair.location.location.lat, locationSlotsPair.location.location.lng))}km away)</p>
                      <a href="https://bookmyvaccine.nz" target="_blank">
                        <div className='ButtonConstraint'>
                        <Button
                              
                    overrides={{
                      Root: { style: { width: "100%", margin: "1rem 0" } },
                      
                    }}
                  >
                    Make a Booking
                          </Button>
                          </div>
                </a>
                      <p style={{ margin: "0.25rem 0 0.5rem 0" }}>
                        Available slots:
                      </p>
                      <section>
                        {/* <p>1am</p> */}
                        {locationSlotsPair.slots?.map((slot) => (
                          <p>
                            {parse(
                              slot.localStartTime,
                              "HH:mm:ss",
                              new Date()
                            ).toLocaleTimeString("en-NZ", {
                              hour: "2-digit",
                              minute: "2-digit",
                              hour12: true,
                            })}
                          </p>
                        ))}
                      </section>
                    </VaccineCentre>
                  ))}
              </div>
            </ModalGrid>
          </Modal>
        {/* <pre>{JSON.stringify({ dateLocationsPairs }, null, 2)}</pre> */}

        <section className="App-header">
          <h1>Vaccine Calendar</h1>
          <p>
            Check vaccine booking availability for all sites before making a booking. This
            is an unofficial website and pulls data from bookmyvaccine.nz{" "}
          </p>
        </section>

        <HeaderMain>
        
          <h1>Available Vaccine Slots</h1>
          <div >
            <a href="https://github.com/CovidEngine" target="_blank">
              <Button 
              startEnhancer={() => <Show size={24} />} kind={KIND.secondary}>View Source Code</Button>
            </a>

            <Select
              options={[
                { label: "Whthin 30km", id: "#F0F8FF" },
                { label: "Within 60km", id: "#FAEBD7" },
                { label: "Within 90km", id: "#00FFFF" },
              ]}
              placeholder={`Within ${radiusKm}km`}
              disabled={true} // TODO: implement
            />
            
            <Button
              startEnhancer={() => <Search size={24} />}
              kind={KIND.secondary}
              onClick={getLocation}
            >
              Edit your Location
            </Button>
          </div>
        </HeaderMain>
        <CalendarContainer>
          <CalendarSectionContainer>
            <h2>September 2021</h2>
            <MonthContainer>
              {dateLocationsPairs.map((dateLocationsPair) => (
                <button onClick={() => setIsOpen(dateLocationsPair)}>
                  <div>
                  <h3>
                    {parse(
                      dateLocationsPair.dateStr,
                      "yyyy-MM-dd",
                      new Date()
                    ).toLocaleDateString([], {
                      month: "short",
                      day: "numeric",
                    })}
                  </h3>
                  <p>
                    {sum(
                      dateLocationsPair.locationSlotsPairs.map(
                        (locationSlotsPair) =>
                          (locationSlotsPair.slots || []).length
                      )
                    )}{" "}
                    available
                    </p>
                    </div>
                  <img src='./arrow.svg' />
                </button>
              ))}
            </MonthContainer>
          </CalendarSectionContainer>
        </CalendarContainer>
      </div>
    </>
  );
}

export default App;

const HeaderMain = styled.header`
position: sticky;
display: flex;
flex-direction: row;
justify-content: space-between;
box-sizing: border-box;
top: -2px;
padding: 1.5rem;
background-color: white;

  z-index: 2;

border-top: 1px solid lightgray;
border-bottom: 1px solid lightgray;
div {
  display:flex;
  flex-direction: row;
  gap:1rem;
  max-height: 48px;
  width: auto;
}
h1 {
  text-align: left;
  margin: 0;
}


@media screen and (max-width:1024px) {
  position: relative;
  top: initial;
flex-direction: column;
div {

  max-height: initial;
  flex-direction: column;
}
}
@media screen and (max-width:768px) {
flex-direction: column;
div {
  flex-direction: column;

}
@media screen and (max-width:500px) {
  flex-direction: column;
div {
  flex-direction: column;

}

`;

const CalendarContainer = styled.section`
  margin: 0;
`;

const CalendarSectionContainer = styled.section`
  h2 {
    display: block;
    padding: 1.5rem;
    font-size: 1.5rem;
    border-bottom: 1px solid lightgray;
    position: sticky;
    top: 96px;

    background-color: #fff;
    z-index: 1;
  }

@media screen and (max-width:1024px) {
  h2 {
    top: 0;
  }
}
`;

const MonthContainer = styled.section`
  display: grid;
  box-sizing: border-box;
  grid-template-columns: repeat(7, 1fr);
  background-color: lightgray;
  border-bottom: 1px solid lightgray;
  gap: 1px;
  transition: all 0.3s;
  button {
    box-sizing: border-box;
    min-height: 144px;
    text-align: left;
    background-color: white;
    border: none;
    padding: 1.5rem;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    div {
      height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    }

    h3 {
      font-size: 1.3rem;
      font-weight: 400;
    }
    p {
      font-size: 1.25rem;
      font-weight: 600;
    }
    :hover {
      background-color: #e4eeff;
      cursor: pointer;
    }
    img {
      width: 1.5rem;
      height: 1.5rem;
      bottom: 0;
      opacity: 0.7;
    }
  }

  @media screen and (max-width: 1024px) {
    grid-template-columns: repeat(5, 1fr);
  }
  @media screen and (max-width: 768px) {
    grid-template-columns: repeat(3, 1fr);
  }
  @media screen and (max-width: 500px) {
    grid-template-columns: repeat(1, 1fr);
  }
`;

const ModalGrid = styled.section`
  display: grid;
  gap: 4rem;
  grid-template-columns: 480px 1fr;
  overflow: hidden;
  h1 {
    font-size: 2.5rem;
  }

  @media screen and (max-width: 1024px) {
    grid-template-columns: 1fr;
    gap: 0;
  }
`

const VaccineCentre = styled.section`
  padding-bottom: 1.5rem;
  margin-bottom: 1.5rem;
  border-bottom: 2px solid lightgray;
    h3 {
      font-size: 2rem;
      max-width: 80%;
    }

  @media screen and (min-width: 1024px) {
 .ButtonConstraint {
    max-width: 400px;
    }
  }
   

  section {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    gap: 0.5rem;
    p {
      border-radius: 4px;
      border: 2px solid #e8e8e8;
      color: black;
      font-weight: 600;
      padding: 0.5rem;
      min-width: 80px;
      text-align: center;
      
    }
  }
`;


export function sortBy<T = unknown>(
  notes: T[],
  comparator: (note: T) => string | number,
) {
  return [...notes].sort((a: T, b: T) => {
    if (comparator(a) < comparator(b)) {
      return -1;
    }
    if (comparator(a) > comparator(b)) {
      return 1;
    }
    return 0;
  });
}

function sortByDistance(locationSlotsPairs: LocationSlotsPair[] | undefined, lat: number, lng: number): LocationSlotsPair[] {
  return sortBy(locationSlotsPairs ?? [], locationSlotsPair => {
    const distanceKm = getDistanceKm(lat, lng, locationSlotsPair.location.location.lat, locationSlotsPair.location.location.lng)
    return distanceKm
  });
}

