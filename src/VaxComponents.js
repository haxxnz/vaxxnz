import styledd from "styled-components";
import { styled } from "styletron-react";

export const CalendarContainer = styled("section", {
  borderLeft: "1px solid lightgray",
  borderRight: "1px solid lightgray",
  margin: "0",
});

export const WalkInstructions = styled("div", {
  padding: "1.5rem",
  borderRight: "1px solid lightgray",
});

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

export const WalkContainer = styled("div", {
  borderLeft: "1px solid lightgray",
  borderRight: "1px solid lightgray",
  margin: 0,
  display: "grid",
  boxSizing: "border-box",
  gridTemplateColumns: "1fr 1fr 1fr",
  backgroundColor: "lightgray",
  borderBottom: "1px solid lightgray",
  gap: "1px",
  transition: "all 0.3s",

  zIndex: 1,
  "@media screen and (max-width: 1024px)": {
    gridTemplateColumns: "repeat(2, 1fr)",
  },
  "@media screen and (max-width: 768px)": {
    gridTemplateColumns: "repeat(1, 1fr)",
  },
  "@media screen and (max-width: 500px)": {
    gridTemplateColumns: "repeat(1, 1fr)",
  },
});

export const WalkMessage = styled("div", {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  minHeight: "20vh",
  width: "100%",
  border: "1px solid lightgray",
  background: "white",
  margin: 0,
  boxSizing: "border-box",
});

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
