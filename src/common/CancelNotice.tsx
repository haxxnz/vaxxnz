import { FunctionComponent } from "react";
import { Trans, useTranslation } from "react-i18next";

export const CancelBookingNotice: FunctionComponent<{ className: string }> = ({
  className,
}) => {
  const { t } = useTranslation("common");

  return (
    <div className={`cancel-booking-notice ${className}`}>
      <h4>{t("walkins.cancellationNotice.info")}</h4>
      <p>
        <Trans
          i18nKey="walkins.cancellationNotice.message"
          t={t}
          components={[
            <a href="https://bookmyvaccine.nz" target="_blank" rel="noreferrer">
              https://bookmyvaccine.nz
            </a>,
          ]}
        />
      </p>
    </div>
  );
};
