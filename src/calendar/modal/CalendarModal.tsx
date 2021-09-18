/* eslint-disable react/jsx-no-target-blank */
import { Button, KIND } from "baseui/button";
import { Modal } from "baseui/modal";
import { FunctionComponent } from "react";
import { useTranslation } from "react-i18next";
import { useMediaQuery } from "react-responsive";
import { Coords } from "../../location-picker/LocationPicker";
import { enqueueAnalyticsEvent } from "../../utils/analytics";
import { CalendarDate } from "../CalendarData";
import { CalendarModalContent } from "./CalendarModalContent";

interface BookingModalProps {
  activeDate: CalendarDate | null;
  setActiveDate: (activeDate: CalendarDate | null) => void;
  coords: Coords;
  radiusKm: number;
}

const BookingModal: FunctionComponent<BookingModalProps> = ({
  activeDate,
  radiusKm,
  setActiveDate,
  coords,
}) => {
  const { t } = useTranslation("common");

  const close = () => {
    setActiveDate(null);
  };

  const isMobileView = useMediaQuery({ query: "(max-width: 768px)" });

  const desktopDialogStyle = {
    width: "100%",
  };
  const mobileDialogStyle = {
    width: "100vw",
    margin: "0rem",
    borderRadius: "0",
  };
  const sharedDialogStyle = {
    display: "flex",
    flexDirection: "column",
    alignSelf: "center",
    padding: "1.5rem",
    backgroundColor: "white",
    border: "1px solid lightgray",
  };
  const dialogStyle = isMobileView
    ? { ...mobileDialogStyle, ...sharedDialogStyle }
    : { ...desktopDialogStyle, ...sharedDialogStyle };

  return (
    <div style={dialogStyle as any}>
      {activeDate && (
        <CalendarModalContent
          activeDate={activeDate}
          close={() => setActiveDate(null)}
          coords={coords}
          radiusKm={radiusKm}
        />
      )}
      <div className="MobileOnly">
        <Button
          onClick={() => {
            setActiveDate(null);
            enqueueAnalyticsEvent("Back to Calendar clicked");
          }}
          overrides={{
            Root: {
              style: {
                width: "100%",
                marginTop: "1rem",
                marginRight: 0,
                marginBottom: "1rem",
                marginLeft: 0,
              },
            },
          }}
          kind={KIND.secondary}
        >
          {t("calendar.modal.backToCalendar")}
        </Button>
      </div>
    </div>
  );
};
export default BookingModal;
