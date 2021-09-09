import { Button, KIND } from "baseui/button";
import { Modal } from "baseui/modal";
import { ModalGrid } from "../../VaxComponents";
import { NoticeList, NoticeListItem } from "../../NoticeList";
import { FunctionComponent } from "react";
import { CancelBookingNotice } from "./CancelNotice";
import "../../App.css";
import { faCar, faWalking } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { CrowdsourcedLocation } from "../CrowdsourcedData";
import { Instruction } from "../../walk-in/WalkInData";

type Props = {
  clearSelectedLocation: () => void;
  location?: CrowdsourcedLocation;
};

function dayOfWeekToString(dayIdx: number) {
  return (
    [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ][dayIdx] || ""
  );
}

const CrowdsourcedModal: FunctionComponent<Props> = ({
  clearSelectedLocation,
  location,
}) => {
  const close = () => clearSelectedLocation();
  if (location == null) {
    return null;
  }
  const telephone = location.telephone?.replace(/\[.*\]/g, "");

  return (
    <Modal
      onClose={close}
      isOpen={!!location}
      unstable_ModalBackdropScroll={true}
      size="full"
      overrides={{
        Root: { style: { zIndex: 1500 } },
        Dialog: {
          style: {
            display: "flex",
            flexDirection: "column",
            alignSelf: "center",
            padding: "1.5rem",
            maxWidth: "860px",
          },
        },
      }}
    >
      <ModalGrid className={"modal-container WalkModal"}>
        <div>
          <h1
            style={{
              marginBottom: "1rem",
            }}
          >
            {location.name}
          </h1>

          <p>{location.address}</p>

          <a
            href={`https://www.google.com/maps/dir/?api=1&destination=${location.lat},${location.lng}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button
              overrides={{
                Root: {
                  style: {
                    width: "100%",
                    marginTop: "1.5rem",
                    marginRight: 0,
                    marginBottom: "0.5rem",
                    marginLeft: 0,
                  },
                },
              }}
              kind={KIND.primary}
            >
              Get Directions
            </Button>
          </a>

          <Button
            overrides={{
              Root: {
                style: {
                  width: "100%",
                  marginTop: "0.5rem",
                  marginRight: 0,
                  marginBottom: "0.5rem",
                  marginLeft: 0,
                },
              },
            }}
            kind={KIND.secondary}
            onClick={close}
          >
            Cancel
          </Button>

          <NoticeList>
            <NoticeListItem title="This location has been submitted by the public">
              The information here may not be 100% accurate. Please refer to the
              locations website.
            </NoticeListItem>
          </NoticeList>
        </div>
        <div style={{ height: "100%" }}>
          <CancelBookingNotice className="desktop" />

          {location.website && (
            <section>
              <h3> Website</h3>
              <p>
                <a
                  href="https://bookmyvaccine.covid19.health.nz/"
                  target="_blank"
                  rel="noreferrer"
                >
                  {location.website}
                </a>
              </p>
            </section>
          )}

          <section>
            <div className="WalkInTypes">
              {location.instructions.includes(Instruction.walkIn) && (
                <p>
                  <FontAwesomeIcon icon={faWalking} /> Walk-in available
                </p>
              )}
              {location.instructions.includes(Instruction.driveThrough) && (
                <p>
                  <FontAwesomeIcon icon={faCar} /> Drive-through available
                </p>
              )}
            </div>
          </section>

          {telephone && (
            <section>
              <h3> Phone</h3>

              <a href={`tel:${telephone}`}>{telephone}</a>
            </section>
          )}

          {location.openingHours.length > 0 && (
            <section>
              <h3> Hours</h3>
              {location.openingHours.map((oh, index) => {
                return (
                  <p key={index}>
                    {dayOfWeekToString(oh.day)} {oh.isOpen ? oh.hours : undefined}
                    <br />
                  </p>
                );
              })}
            </section>
          )}
        </div>
      </ModalGrid>
    </Modal>
  );
};

export default CrowdsourcedModal;
