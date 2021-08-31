import React, { useCallback, useContext, useEffect, useState } from 'react';
import styled from 'styled-components'
import './App.css';
import { Button, KIND } from "baseui/button";
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalButton,
} from 'baseui/modal';
import { Select } from "baseui/select";

import { TimePicker } from "baseui/timepicker";
import { getMyCalendar } from './getData';
import { DateLocationsPairsContext } from './contexts';




function App() {
  const [isOpen, setIsOpen] = React.useState(false);
  function close() {
    setIsOpen(false);
  }
  const [value, setValue] = React.useState(
    new Date("2021-08-31T10:29:52.589Z")
  );

  const [radiusKm, setRadiusKm] = useState(30)
  const [lat, setLat] = useState(-46.4102)
  const [lng, setLng] = useState(168.355)
  const { dateLocationsPairs, setDateLocationsPairs } = useContext(DateLocationsPairsContext)
  const loadCalendar = useCallback(async () => {
    const data = await getMyCalendar(lat, lng, radiusKm)
    setDateLocationsPairs(data)
  }, [lat, lng, radiusKm, setDateLocationsPairs])

  useEffect(() => {
    loadCalendar()
  }, [loadCalendar])

  return (
    <>

      <div className="App">
        <pre>{JSON.stringify({ dateLocationsPairs }, null, 2)}</pre>

        <section className="App-header">
          <h1>Vaccine Timetable</h1>
          <p>Check vaccine timetable availability before making a booking. This is an unofficial website and pulls data from managemyvaccine.nz </p>
        </section>

        <HeaderMain>
          <Modal
            onClose={close}
            isOpen={isOpen}
            overrides={{
              Root: { style: { zIndex: 1500 } },
              Dialog: {
                style: {
                  width: '80vw',
                  height: '80vh',
                  display: 'flex',
                  flexDirection: 'column',
                  padding: '1.5rem'
                },
              },

            }}
          >
            <ModalGrid>
              <div style={{ position: 'sticky', top: "0", display: 'block' }}><h1>Available slots - 1 September 2021</h1>
                <Button onClick={() => alert("click")}
                  overrides={{
                    Root: { style: { width: "100%", margin: '1rem 0' } }
                  }}>Make a Booking</Button>
                <p>or visit bookmyvaccine.nz</p>
                <Button onClick={() => alert("click")} overrides={{
                  Root: { style: { width: "100%", margin: '1rem 0' } }
                }} kind={KIND.secondary}>Back to calendar</Button>
              </div>

              <div style={{ overflow: 'scroll' }}>
                <VaccineCentre>
                  <h3>Murihiku Medical Services</h3>
                  <p>Level 1, 112 Don Street, Invercargill  </p>

                  <p>Available slots:</p>
                  <section>
                    <p>1am</p>
                    <p>2am</p>
                    <p>3am</p>
                    <p>4am</p>
                    <p>5am</p>
                    <p>6am</p>
                    <p>7am</p>
                    <p>8am</p>
                    <p>9am</p>
                    <p>10am</p>
                    <p>11am</p>
                    <p>12pm</p>
                    <p>1pm</p>
                    <p>2pm</p>
                    <p>3pm</p>
                    <p>4pm</p>
                    <p>5pm</p>
                    <p>6pm</p>
                    <p>7pm</p>
                    <p>8pm</p>
                    <p>9pm</p>
                    <p>10pm</p>
                    <p>11pm</p>
                    <p>12am</p>

                  </section>
                </VaccineCentre>
                <VaccineCentre>
                  <h3>Murihiku Medical Services</h3>
                  <p>Level 1, 112 Don Street, Invercargill  </p>

                  <p>Available slots:</p>
                  <section>
                    <p>9am</p>
                    <p>10am</p>
                    <p>11am</p>
                    <p>12pm</p>
                    <p>1pm</p>
                    <p>2pm</p>
                    <p>3pm</p>
                    <p>4pm</p>
                    <p>5pm</p>
                  </section>


                </VaccineCentre>
                <VaccineCentre>
                  <h3>Murihiku Medical Services</h3>
                  <p>Level 1, 112 Don Street, Invercargill  </p>

                  <p>Available slots:</p>
                  <section>
                    <p>12pm</p>
                    <p>1pm</p>
                    <p>2pm</p>
                    <p>3pm</p>
                    <p>4pm</p>
                    <p>5pm</p>
                    <p>6pm</p>
                  </section>


                </VaccineCentre>
                <VaccineCentre>
                  <h3>Murihiku Medical Services</h3>
                  <p>Level 1, 112 Don Street, Invercargill  </p>

                  <p>Available slots:</p>
                  <section>
                    <p>12pm</p>
                    <p>1pm</p>
                    <p>2pm</p>
                    <p>3pm</p>
                    <p>4pm</p>
                    <p>5pm</p>
                    <p>6pm</p>
                  </section>


                </VaccineCentre>
                <VaccineCentre>
                  <h3>Murihiku Medical Services</h3>
                  <p>Level 1, 112 Don Street, Invercargill  </p>

                  <p>Available slots:</p>
                  <section>
                    <p>12pm</p>
                    <p>1pm</p>
                    <p>2pm</p>
                    <p>3pm</p>
                    <p>4pm</p>
                    <p>5pm</p>
                    <p>6pm</p>
                  </section>


                </VaccineCentre>
                <VaccineCentre>
                  <h3>Murihiku Medical Services</h3>
                  <p>Level 1, 112 Don Street, Invercargill  </p>

                  <p>Available slots:</p>
                  <section>
                    <p>12pm</p>
                    <p>1pm</p>
                    <p>2pm</p>
                    <p>3pm</p>
                    <p>4pm</p>
                    <p>5pm</p>
                    <p>6pm</p>
                  </section>


                </VaccineCentre>
                <VaccineCentre>
                  <h3>Murihiku Medical Services</h3>
                  <p>Level 1, 112 Don Street, Invercargill  </p>

                  <p>Available slots:</p>
                  <section>
                    <p>12pm</p>
                    <p>1pm</p>
                    <p>2pm</p>
                    <p>3pm</p>
                    <p>4pm</p>
                    <p>5pm</p>
                    <p>6pm</p>
                  </section>


                </VaccineCentre>
                <VaccineCentre>
                  <h3>Murihiku Medical Services</h3>
                  <p>Level 1, 112 Don Street, Invercargill  </p>

                  <p>Available slots:</p>
                  <section>
                    <p>12pm</p>
                    <p>1pm</p>
                    <p>2pm</p>
                    <p>3pm</p>
                    <p>4pm</p>
                    <p>5pm</p>
                    <p>6pm</p>
                  </section>


                </VaccineCentre>




              </div>

            </ModalGrid>


          </Modal>
          <h1>Available Vaccine Slots</h1>
          <div style={{ zIndex: 22 }}>
            <Button onClick={() => alert("click")} kind={KIND.secondary}>About</Button>
            <TimePicker
              value={value}
              onChange={date => setValue(date)}
              minTime={new Date("2021-08-30T12:00:00.000Z")}
            />
            <Select
              options={[
                { label: "Whthin 30KM", id: "#F0F8FF" },
                { label: "Within 60KM", id: "#FAEBD7" },
                { label: "Within 90KM", id: "#00FFFF" },
              ]}
              placeholder="Within 30KM"



            />
            <Button onClick={() => alert("click")} kind={KIND.secondary}>Edit Location</Button>
          </div>


        </HeaderMain>
        <CalendarContainer>
          <CalendarSectionContainer>
            <h2>September 2021</h2>
            <MonthContainer>
              <div onClick={() => setIsOpen(true)}>
                <h3>1 Sept</h3>
                <p>3 slots available</p>
              </div>
              <div>
                <h3>1 Sept</h3>
                <p>3 slots available</p>
              </div>
              <div>
                <h3>1 Sept</h3>
                <p>3 slots available</p>
              </div>
              <div>
                <h3>1 Sept</h3>
                <p>3 slots available</p>
              </div>
              <div>
                <h3>1 Sept</h3>
                <p>3 slots available</p>
              </div>
              <div>
                <h3>1 Sept</h3>
                <p>3 slots available</p>
              </div>
              <div>
                <h3>1 Sept</h3>
                <p>3 slots available</p>
              </div>
              <div>
                <h3>1 Sept</h3>
                <p>3 slots available</p>
              </div>
              <div>
                <h3>1 Sept</h3>
                <p>3 slots available</p>
              </div>
              <div>
                <h3>1 Sept</h3>
                <p>3 slots available</p>
              </div>
              <div>
                <h3>1 Sept</h3>
                <p>3 slots available</p>
              </div>
              <div>
                <h3>1 Sept</h3>
                <p>3 slots available</p>
              </div>
              <div>
                <h3>1 Sept</h3>
                <p>3 slots available</p>
              </div>
              <div>
                <h3>1 Sept</h3>
                <p>3 slots available</p>
              </div>
              <div>
                <h3>1 Sept</h3>
                <p>3 slots available</p>
              </div>
              <div>
                <h3>1 Sept</h3>
                <p>3 slots available</p>
              </div>
              <div>
                <h3>1 Sept</h3>
                <p>3 slots available</p>
              </div>
              <div>
                <h3>1 Sept</h3>
                <p>3 slots available</p>
              </div>
              <div>
                <h3>1 Sept</h3>
                <p>3 slots available</p>
              </div>
              <div>
                <h3>1 Sept</h3>
                <p>3 slots available</p>
              </div>
              <div>
                <h3>1 Sept</h3>
                <p>3 slots available</p>
              </div>



            </MonthContainer>
          </CalendarSectionContainer>
          <CalendarSectionContainer>
            <h2>October 2021</h2>
            <MonthContainer>
              <div>
                <h3>1 Sept</h3>
                <p>3 slots available</p>
              </div>
              <div>
                <h3>1 Sept</h3>
                <p>3 slots available</p>
              </div>
              <div>
                <h3>1 Sept</h3>
                <p>3 slots available</p>
              </div>
              <div>
                <h3>1 Sept</h3>
                <p>3 slots available</p>
              </div>
              <div>
                <h3>1 Sept</h3>
                <p>3 slots available</p>
              </div>
              <div>
                <h3>1 Sept</h3>
                <p>3 slots available</p>
              </div>
              <div>
                <h3>1 Sept</h3>
                <p>3 slots available</p>
              </div>
              <div>
                <h3>1 Sept</h3>
                <p>3 slots available</p>
              </div>
              <div>
                <h3>1 Sept</h3>
                <p>3 slots available</p>
              </div>
              <div>
                <h3>1 Sept</h3>
                <p>3 slots available</p>
              </div>
              <div>
                <h3>1 Sept</h3>
                <p>3 slots available</p>
              </div>
              <div>
                <h3>1 Sept</h3>
                <p>3 slots available</p>
              </div>
              <div>
                <h3>1 Sept</h3>
                <p>3 slots available</p>
              </div>
              <div>
                <h3>1 Sept</h3>
                <p>3 slots available</p>
              </div>
              <div>
                <h3>1 Sept</h3>
                <p>3 slots available</p>
              </div>
              <div>
                <h3>1 Sept</h3>
                <p>3 slots available</p>
              </div>
              <div>
                <h3>1 Sept</h3>
                <p>3 slots available</p>
              </div>
              <div>
                <h3>1 Sept</h3>
                <p>3 slots available</p>
              </div>
              <div>
                <h3>1 Sept</h3>
                <p>3 slots available</p>
              </div>
              <div>
                <h3>1 Sept</h3>
                <p>3 slots available</p>
              </div>
              <div>
                <h3>1 Sept</h3>
                <p>3 slots available</p>
              </div>



            </MonthContainer>
          </CalendarSectionContainer>
          <CalendarSectionContainer>
            <h2>November 2021</h2>
            <MonthContainer>
              <div>
                <h3>1 Sept</h3>
                <p>3 slots available</p>
              </div>
              <div>
                <h3>1 Sept</h3>
                <p>3 slots available</p>
              </div>
              <div>
                <h3>1 Sept</h3>
                <p>3 slots available</p>
              </div>
              <div>
                <h3>1 Sept</h3>
                <p>3 slots available</p>
              </div>
              <div>
                <h3>1 Sept</h3>
                <p>3 slots available</p>
              </div>
              <div>
                <h3>1 Sept</h3>
                <p>3 slots available</p>
              </div>
              <div>
                <h3>1 Sept</h3>
                <p>3 slots available</p>
              </div>
              <div>
                <h3>1 Sept</h3>
                <p>3 slots available</p>
              </div>
              <div>
                <h3>1 Sept</h3>
                <p>3 slots available</p>
              </div>
              <div>
                <h3>1 Sept</h3>
                <p>3 slots available</p>
              </div>
              <div>
                <h3>1 Sept</h3>
                <p>3 slots available</p>
              </div>
              <div>
                <h3>1 Sept</h3>
                <p>3 slots available</p>
              </div>
              <div>
                <h3>1 Sept</h3>
                <p>3 slots available</p>
              </div>
              <div>
                <h3>1 Sept</h3>
                <p>3 slots available</p>
              </div>
              <div>
                <h3>1 Sept</h3>
                <p>3 slots available</p>
              </div>
              <div>
                <h3>1 Sept</h3>
                <p>3 slots available</p>
              </div>
              <div>
                <h3>1 Sept</h3>
                <p>3 slots available</p>
              </div>
              <div>
                <h3>1 Sept</h3>
                <p>3 slots available</p>
              </div>
              <div>
                <h3>1 Sept</h3>
                <p>3 slots available</p>
              </div>
              <div>
                <h3>1 Sept</h3>
                <p>3 slots available</p>
              </div>
              <div>
                <h3>1 Sept</h3>
                <p>3 slots available</p>
              </div>



            </MonthContainer>
          </CalendarSectionContainer>
          <CalendarSectionContainer>
            <h2>December 2021</h2>
            <MonthContainer>
              <div>
                <h3>1 Sept</h3>
                <p>3 slots available</p>
              </div>
              <div>
                <h3>1 Sept</h3>
                <p>3 slots available</p>
              </div>
              <div>
                <h3>1 Sept</h3>
                <p>3 slots available</p>
              </div>
              <div>
                <h3>1 Sept</h3>
                <p>3 slots available</p>
              </div>
              <div>
                <h3>1 Sept</h3>
                <p>3 slots available</p>
              </div>
              <div>
                <h3>1 Sept</h3>
                <p>3 slots available</p>
              </div>
              <div>
                <h3>1 Sept</h3>
                <p>3 slots available</p>
              </div>
              <div>
                <h3>1 Sept</h3>
                <p>3 slots available</p>
              </div>
              <div>
                <h3>1 Sept</h3>
                <p>3 slots available</p>
              </div>
              <div>
                <h3>1 Sept</h3>
                <p>3 slots available</p>
              </div>
              <div>
                <h3>1 Sept</h3>
                <p>3 slots available</p>
              </div>
              <div>
                <h3>1 Sept</h3>
                <p>3 slots available</p>
              </div>
              <div>
                <h3>1 Sept</h3>
                <p>3 slots available</p>
              </div>
              <div>
                <h3>1 Sept</h3>
                <p>3 slots available</p>
              </div>
              <div>
                <h3>1 Sept</h3>
                <p>3 slots available</p>
              </div>
              <div>
                <h3>1 Sept</h3>
                <p>3 slots available</p>
              </div>
              <div>
                <h3>1 Sept</h3>
                <p>3 slots available</p>
              </div>
              <div>
                <h3>1 Sept</h3>
                <p>3 slots available</p>
              </div>
              <div>
                <h3>1 Sept</h3>
                <p>3 slots available</p>
              </div>
              <div>
                <h3>1 Sept</h3>
                <p>3 slots available</p>
              </div>
              <div>
                <h3>1 Sept</h3>
                <p>3 slots available</p>
              </div>



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
}
h1 {
  text-align: left;
  margin: 0;
}


@media screen and (max-width:1024px) {
flex-direction: column;
div {
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


`

const CalendarContainer = styled.section`

  margin:  0;

  `



const CalendarSectionContainer = styled.section`
h2 {
  display: block;
  padding: 1.5rem ;
  font-size: 1.5rem;
border-bottom: 1px solid lightgray;
position: sticky;
top:96px;

  background-color: #fff;
  z-index: 1;
}
`

const MonthContainer = styled.section`
display: grid;
box-sizing: border-box;
grid-template-columns: repeat(7, 1fr);
background-color: lightgray;
border-bottom: 1px solid lightgray;
gap: 1px;
transition: all 0.3s;
div {
  min-height:120px;
  background-color: white;
  padding: 1.5rem;
  display:flex;
  flex-direction: column;
  justify-content: space-between;

  h3 {
    font-size: 1.25rem;
    font-weight: 400;
  }
  p {
    font-size: 1.2rem;
    font-weight: 600;
  }
  :hover {
    background-color: #e4eeff;
    cursor: pointer;
  }
}

@media screen and (max-width:1024px) {
grid-template-columns: repeat(5, 1fr);
}
@media screen and (max-width:768px) {
grid-template-columns: repeat(3, 1fr);
}
@media screen and (max-width:500px) {
grid-template-columns: repeat(1, 1fr);
}
`

const ModalGrid = styled.section`
display: grid;
gap: 4rem;
grid-template-columns: 480px 1fr;
overflow: hidden;
`

const VaccineCentre = styled.section`
padding-bottom: 1.5rem;
margin-bottom: 1.5rem;
border-bottom: 1px solid lightgray;
section {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 0.5rem;
  p {
    border-radius: 4px;
    background-color: #444;
    color: white;
    padding: 0.5rem;
    min-width: 48px;
    text-align: center;
  }
}

`