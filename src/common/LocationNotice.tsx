import { faWalking, faCar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FunctionComponent } from "react";
import { Trans, useTranslation } from "react-i18next";
import { Instruction } from "../other-locations/healthpoint/HealthpointData";

interface LocationNoticeProps {
  instructions: Instruction[];
}

export const LocationNotice: FunctionComponent<LocationNoticeProps> = ({
  instructions,
}) => {
  const { t } = useTranslation("common");
  return (
    <>
      {instructions.includes(Instruction.walkIn) && (
        <div className="WalkInTypes">
          <h3>
            <Trans
              i18nKey="walkins.walkinAwailable"
              t={t}
              components={[<FontAwesomeIcon icon={faWalking} />]}
            />
          </h3>
          <p>{t("walkins.noticeList.text")}</p>
          <p>
            <Trans
              i18nKey="walkins.cancellationNotice.message"
              t={t}
              components={[
                <a
                  href="https://bookmyvaccine.nz"
                  target="_blank"
                  rel="noreferrer"
                >
                  https://bookmyvaccine.nz
                </a>,
              ]}
            />
          </p>
        </div>
      )}

      {instructions.includes(Instruction.driveThrough) && (
        <div className="WalkInTypes">
          <h3>
            <Trans
              i18nKey="walkins.driveThroughAvailable"
              t={t}
              components={[<FontAwesomeIcon icon={faCar} />]}
            />
          </h3>
          <p>{t("walkins.noticeList.text")}</p>
          <p>
            <Trans
              i18nKey="walkins.cancellationNotice.message"
              t={t}
              components={[
                <a
                  href="https://bookmyvaccine.nz"
                  target="_blank"
                  rel="noreferrer"
                >
                  https://bookmyvaccine.nz
                </a>,
              ]}
            />
          </p>
        </div>
      )}
    </>
  );
};
