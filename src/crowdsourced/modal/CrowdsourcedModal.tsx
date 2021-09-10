import { faCar, faWalking } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, KIND } from "baseui/button";
import { Modal } from "baseui/modal";
import { FunctionComponent } from "react";
import { Trans, useTranslation } from "react-i18next";
import "../../App.css";
import { CancelBookingNotice } from "../../common/CancelNotice";
import { NoticeList, NoticeListItem } from "../../NoticeList";
import { ModalGrid } from "../../VaxComponents";
import { Instruction } from "../../walk-in/WalkInData";
import { CrowdsourcedLocation } from "../CrowdsourcedData";

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
  const { t } = useTranslation("common");

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
          {location.instructions.includes(Instruction.walkIn) ??
            (location.instructions.includes(Instruction.driveThrough) && (
              <section>
                <div className="WalkInTypes">
                  {location.instructions.includes(Instruction.walkIn) && (
                    <p>
                      <Trans
                        i18nKey="walkins.walkinAwailable"
                        t={t}
                        components={[<FontAwesomeIcon icon={faWalking} />]}
                      />
                    </p>
                  )}
                  {location.instructions.includes(Instruction.driveThrough) && (
                    <p>
                      <Trans
                        i18nKey="walkins.driveThroughAvailable"
                        t={t}
                        components={[<FontAwesomeIcon icon={faCar} />]}
                      />
                    </p>
                  )}
                </div>
              </section>
            ))}

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
              {t("core.getDirections")}
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
            {t("core.cancel")}
          </Button>

          <NoticeList>
            <NoticeListItem
              title={t("walkins.otherLocations.disclaimer.title")}
            >
              {t("walkins.otherLocations.disclaimer.message")}
            </NoticeListItem>
          </NoticeList>
        </div>
        <div style={{ height: "100%" }}>
          <CancelBookingNotice className="desktop" />
          <section>
            <h3>{t("core.address")}</h3>
            <p>{location.address}</p>
          </section>
          {location.website && (
            <section>
              <h3>{t("core.website")}</h3>
              <p>
                <a href={location.website} target="_blank" rel="noreferrer">
                  {location.website}
                </a>
              </p>
            </section>
          )}

          {telephone && (
            <section>
              <h3>{t("walkins.phone")}</h3>

              <a href={`tel:${telephone}`}>{telephone}</a>
            </section>
          )}

          {location.openingHours.length > 0 && (
            <section>
              <h3>{t("walkins.hours")}</h3>
              {location.openingHours.map((oh, index) => {
                return (
                  <p key={index}>
                    {dayOfWeekToString(oh.day)}
                    {": "}
                    {oh.isOpen ? oh.hours : t("walkins.closed")}
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
