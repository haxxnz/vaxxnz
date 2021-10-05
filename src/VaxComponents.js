import styledd from "styled-components";
import { styled } from "styletron-react";

export const CalendarContainer = styled("section", {
  borderLeft: "1px solid lightgray",
  borderRight: "1px solid lightgray",
  margin: "0",
});

export const WalkInstructions = styledd.div`
  padding: 1.5rem;
  border-right: 1px solid lightgray;
`;

export const WalkGrid = styledd.section`
  display: grid;
  grid-template-columns: 1fr 1fr;
  height: 100%;
  overflow-y: scroll;
  h1 {
    font-size: 2.5rem;
    font-weight: 600;
  }

  hr {
    border: none;
    border-top: 1px solid lightgray;
    margin-top: 1rem;
    padding-top: 1rem;
  }
  p {
    font-size: 1.1rem;
    line-height: 1.5;
  }
  @media screen and (max-width: 1024px) {
    grid-template-columns: 1fr;
    gap: 0;
  }
  @media screen and (max-width: 768px) {
    gap: 0;
    h1 {
      font-size: 2rem;
    }
  }
`;

export const VaccineCentre = styledd.section`
  padding-bottom: 1.5rem;
  margin-bottom: 1.5rem;
  border-bottom: 2px solid lightgray;
  h3 {
    font-size: 1.75rem;
    font-weight: 400;
    margin-bottom: 0.5rem;
  }

  .ButtonConstraint {
    display: flex;
    flex-wrap: wrap;

    margin: 1rem 0;
    gap: 1.5rem;
    a {
      flex: 1;
    }
  }

  @media screen and (max-width: 768px) {
    h3 {
      font-size: 1.5rem;
      margin-bottom: 0.25rem;
    }
  }
  section.slot {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    gap: 0.5rem;
    p {
      border-radius: 4px;
      border: 1px solid #e8e8e8;
      color: black;
      font-weight: 600;
      font-size: 1rem;
      padding: 0.5rem;
      min-width: 80px;
      text-align: center;
    }

    @media screen and (max-width: 500px) {
      p {
        flex: 1;
      }
    }
    @media screen and (max-width: 600px) {
      .ButtonConstraint {
        flex-direction: column;
        gap: 1rem;
      }
    }
  }
`;

export const WalkHeading = styledd.section`
  border-bottom: 1px solid lightgray;
  padding: 1.5rem;

  display: flex;

  width: 100%;
  box-sizing: border-box;
  h1 {
    flex: 1;
    font-size: 2rem;
    align-self: center;
  }
`;

export const WalkContainer = styledd.div`
  border-left: 1px solid lightgray;
  border-right: 1px solid lightgray;
  margin: 0;
  display: grid;
  box-sizing: border-box;
  grid-template-columns: 1fr 1fr 1fr;
  background-color: lightgray;
  border-bottom: 1px solid lightgray;
  gap: 1px;
  transition: all 0.3s;

  z-index: 1;
  @media screen and (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media screen and (max-width: 768px) {
    grid-template-columns: repeat(1, 1fr);
  }
  @media screen and (max-width: 500px) {
    grid-template-columns: repeat(1, 1fr);
  }
`;

export const WalkMessage = styledd.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 20vh;
  width: 100%;
  border: 1px solid lightgray;
  background: white;
  margin: 0;
  box-sizing: border-box;
`;

export const WalkBox = styledd.button`
  box-sizing: border-box;
  font-family: inherit;
  min-height: 112px;
  height: 100%;
  width: 100%;
  flex: 1;
  min-width: 320px;

  text-align: left;
  background-color: white;
  border: none;
  margin: 0;
  padding: 1rem;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  @media (hover: hover) {
    :hover {
      background-color: #e4eeff;
      cursor: pointer;
      h3,
      p {
        color: #005eca;
      }
    }
  }

  h3 {
    font-size: 1.2rem;
    font-weight: 400;
    margin-bottom: 0.25rem;
  }
  p {
    font-size: 1rem;
    color: #333;
  }
  section {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 100%;
    min-height: inherit;
  }
  .Chevron {
    width: 1.25rem;
    height: 1.25rem;
    align-self: center;
  }
`;
