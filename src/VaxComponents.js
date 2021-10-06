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
