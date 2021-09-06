import { Fragment } from "react";
import { Button, KIND } from "baseui/button";
import { Modal } from "baseui/modal";
import "./App.css";
import { WalkinLocation } from "./getData";
import { ModalGrid } from "./VaxComponents";
import { NoticeList } from "./NoticeList";

type Props = {
  clearSelectedLocation: () => void;
  location?: WalkinLocation;
};

const WalkModal = ({ clearSelectedLocation, location }: Props) => {
  const close = () => clearSelectedLocation();
  if (location == null) {
    return null;
  }

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
            height: "80vh",
            display: "flex",
            flexDirection: "column",
            padding: "1.5rem",
            maxWidth: "860px",
          },
        },
      }}
    >
      <ModalGrid>
        <div>
          <h1
            style={{
              marginBottom: "1rem",
            }}
          >
            {location.name}
          </h1>

          <p>{location.address}</p>

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
            onClick={() => {
              // Also close the modal to avoid confusing stuff
              window.open(
                `https://www.google.com/maps/dir/?api=1&saddr=My+Location&destination=${location.address}`
              );
              close();
            }}
          >
            Get directions
          </Button>

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

          <NoticeList />
        </div>
        <div style={{ height: "100%" }}>
          {/* <p
                style={{
                    marginTop: "1rem",
                    paddingTop: "1.25rem",
                    marginBottom: "0.5rem",
                    marginRight: "1rem",
                    fontSize: "1.25rem",
                    borderTop: "1px solid lightgray",
                    borderBottom: "1px solid lightgray",
                    paddingBottom: "1.5rem",
                    lineHeight: "1.5",
                }}
            >
                {location.instructionLis.map((instruction, index) => {
                    return (
                        <Fragment key={index}>
                            {instruction}
                            <br />
                        </Fragment>
                    );
                })}
            </p> */}

          {location.telephone && (
            <p
              style={{
                marginBottom: "0.5rem",
                marginRight: "1rem",
                fontSize: "1.25rem",

                paddingTop: "1rem",
                lineHeight: "1.5",
              }}
            >
              <h3> Phone</h3>

              <a href={`tel:${location.telephone}`}>{location.telephone}</a>
            </p>
          )}

          {location.opennningHours.schedule && (
            <div
              style={{
                marginTop: "1rem",
                marginBottom: "0.5rem",
                marginRight: "1rem",
                borderBottom: "1px solid lightgray",
                borderTop: "1px solid lightgray",
                paddingBottom: "1.5rem",
                paddingTop: "1rem",
                lineHeight: "1.5",
              }}
            >
              <h3> Hours</h3>
              {Object.keys(location.opennningHours.schedule).map(
                (openDate, index) => {
                  return (
                    <p key={index}>
                      {openDate} {location.opennningHours.schedule[openDate]}
                      <br />
                    </p>
                  );
                }
              )}
            </div>
          )}

          {Object.entries(location.opennningHours.exceptions).map(
            ([key, value], index) => {
              return (
                <div
                  key={index}
                  style={{
                    marginTop: "1rem",
                    lineHeight: "1.5",
                  }}
                >
                  <strong>{key}</strong>
                  <br />

                  <p key={index}>{value}</p>
                </div>
              );
            }
          )}
          {location.opennningHours.notes.map((note, index) => {
            return (
              <div key={index} style={{ marginTop: "1rem" }}>
                <small>{note}</small>
              </div>
            );
          })}
        </div>
      </ModalGrid>
    </Modal>
  );
};

export default WalkModal;
