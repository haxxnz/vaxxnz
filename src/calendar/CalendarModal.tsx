/* eslint-disable react/jsx-no-target-blank */
import { Modal } from "baseui/modal";
import { Button, KIND } from "baseui/button";
import { ModalGrid, VaccineCentre } from "../VaxComponents";
import {
  BookingDateLocations,
  BookingLocationSlotsPair,
} from "./booking/BookingDataTypes";
import { getDistanceKm } from "../utils/distance";
import { parse } from "date-fns";
import { sortByAsc } from "../utils/array";
import { NoticeList } from "../NoticeList";
import { Coords } from "../location-picker/LocationPicker";
import { FunctionComponent } from "react";
import { useTranslation, Trans } from "react-i18next";

import { enqueueAnalyticsEvent } from "../utils/analytics";
import { differenceInDays } from "date-fns/esm";

import { useMediaQuery } from "react-responsive";
import i18next from "i18next";
import { CalendarDate } from "./CalendarData";
import { CalendarModalContent } from "./CalendarModalContext";

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
    width: "80vw",
  };
  const mobileDialogStyle = {
    width: "100vw",
    margin: "0rem",
    borderRadius: "0",
  };
  const sharedDialogStyle = {
    maxWidth: "1200px",
    display: "flex",
    flexDirection: "column",
    alignSelf: "center",
    padding: "1.5rem",
  };
  const dialogStyle = isMobileView
    ? { ...mobileDialogStyle, ...sharedDialogStyle }
    : { ...desktopDialogStyle, ...sharedDialogStyle };

  function sortByDistance(
    locationSlotsPairs: BookingLocationSlotsPair[] | undefined,
    coords: Coords
  ): BookingLocationSlotsPair[] {
    return sortByAsc(locationSlotsPairs ?? [], (locationSlotsPair) => {
      const distanceKm = getDistanceKm(
        coords,
        locationSlotsPair.location.location
      );
      return distanceKm;
    });
  }

  return (
    <Modal
      onClose={close}
      isOpen={!!activeDate}
      unstable_ModalBackdropScroll={true}
      overrides={{
        Dialog: {
          style: dialogStyle as any,
        },
      }}
    >
      {activeDate && (
        <CalendarModalContent
          activeDate={activeDate}
          close={() => setActiveDate(null)}
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
    </Modal>
  );
};
export default BookingModal;
