import { FunctionComponent } from "react";

export const CancelBookingNotice: FunctionComponent<{ className: string }> = ({
  className,
}) => (
  <div className={`cancel-booking-notice ${className}`}>
    <h4>Please don't double-book</h4>
    <p>
      Remember to cancel your original booking if you have one at{" "}
      <a href="https://bookmyvaccine.covid19.health.nz" target="_blank" rel="noreferrer">
        bookmyvaccine.nz
      </a>
    </p>
  </div>
);
