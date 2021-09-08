import { faCar, faWalking } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, KIND } from "baseui/button";
import { Modal } from "baseui/modal";
import { FunctionComponent } from "react";
import { Trans, useTranslation } from "react-i18next";
import "../../App.css";
import { NoticeList, NoticeListItem } from "../../NoticeList";
import { ModalGrid } from "../../VaxComponents";
import { Instruction, WalkInLocation } from "../WalkInData";
import { CancelBookingNotice } from "./CancelNotice";

type Props = {
  clearSelectedLocation: () => void;
  location?: WalkInLocation;
};

const WalkInModal: FunctionComponent<Props> = ({
  clearSelectedLocation,
  location,
}) => {
  const close = () => clearSelectedLocation();
  const { t } = useTranslation("common");

  if (location == null) {
    return null;
  }
  const telephone = location.telephone.replace(/\[.*\]/g, "");

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

          <CancelBookingNotice className="mobile" />

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
            {t("walkins.cancelBooking")}
          </Button>

          <NoticeList>
            <NoticeListItem title={t("walkins.noticeList.title")}>
              {t("walkins.noticeList.text")}
            </NoticeListItem>
          </NoticeList>
        </div>
        <div style={{ height: "100%" }}>
          <CancelBookingNotice className="desktop" />
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

          <section>
            <div className="WalkInTypes">
              {location.instructionLis.includes(Instruction.walkIn) && (
                <p>
                  <Trans
                    i18nKey="walkins.walkinAwailable"
                    t={t}
                    components={[<FontAwesomeIcon icon={faWalking} />]}
                  />
                </p>
              )}
              {location.instructionLis.includes(Instruction.driveThrough) && (
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

          {telephone && (
            <section>
              <h3>{t("walkins.phone")}</h3>
              <a href={`tel:${telephone}`}>{telephone}</a>
            </section>
          )}

          {location.opennningHours.schedule && (
            <section>
              <h3>{t("walkins.hours")}</h3>
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
            </section>
          )}

          {Object.entries(location.opennningHours.exceptions).map(
            ([key, value], index) => {
              return (
                <section
                  key={index}
                  style={{
                    marginTop: "1rem",
                    lineHeight: "1.5",
                  }}
                >
                  <h3>
                    {key === "Public Holidays"
                      ? t("walkins.publicHolidays")
                      : t("walkins.otherExeptions")}
                  </h3>

                  <p key={index}>{value}</p>
                </section>
              );
            }
          )}
          {location.opennningHours.notesHtml.map((noteHtml, index) => {
            return (
              <div key={index} style={{ marginTop: "1rem" }}>
                <small
                  key={index}
                  dangerouslySetInnerHTML={{ __html: noteHtml }}
                ></small>
              </div>
            );
          })}
        </div>
      </ModalGrid>
    </Modal>
  );
};

export default WalkInModal;
