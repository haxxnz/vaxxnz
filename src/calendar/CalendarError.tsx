import React from "react";

export function CalendarError(props: { errorMessage: string }) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        marginTop: "1rem",
      }}
    >
      <div style={{ marginLeft: "1rem", fontSize: "1.5rem" }}>
        {props.errorMessage}
      </div>
    </div>
  );
}
