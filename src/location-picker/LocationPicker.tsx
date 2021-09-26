import { Button, KIND } from "baseui/button";
import { formatDistance } from "date-fns";
import { FunctionComponent, useEffect, useState } from "react";
import { Trans, useTranslation } from "next-i18next";
import RadiusSelect from "../RadiusSelect";
import { unsupportedLocales } from "../translations";
import { enqueueAnalyticsEvent } from "../utils/analytics";
import { getDateFnsLocale } from "../utils/locale";
import { DEFAULT_LOCATION } from "../utils/consts";
import LocationModal from "./LocationModal";
import { useCoords } from "../utils/useCoords";
import { usePlaceName } from "../utils/usePlaceName";
import { useLocale } from "../hooks/use-locale";
import styles from "./LocationPicker.module.scss";

interface LocationPickerProps {
    lastUpdateTime: Date | null;
}

export const LocationPicker: FunctionComponent<LocationPickerProps> = ({
    lastUpdateTime,
}) => {
    const locale = useLocale();
    const placeName = usePlaceName();
    const coords = useCoords();
    const [isOpen, setIsOpen] = useState(false);
    const { t } = useTranslation("common");
    const isUnsupported = unsupportedLocales.indexOf(locale) > -1;

    return (
        <>
            <LocationModal
                locationIsOpen={isOpen}
                setLocationIsOpen={setIsOpen}
            />
            <header className={styles["header-main"]}>
                <section>
                    <h1>
                        <Trans
                            i18nKey="navigation.vaccinationsNear"
                            t={t}
                            components={[
                                <strong>{{ location: placeName }}</strong>,
                            ]}
                        />
                    </h1>
                    <p style={{ color: "#666" }}>
                        {t("core.lastUpdated", {
                            updatedAt:
                                lastUpdateTime === null
                                    ? "..."
                                    : isUnsupported
                                    ? new Date(
                                          lastUpdateTime
                                      ).toLocaleTimeString([], {
                                          hour: "2-digit",
                                          minute: "2-digit",
                                      })
                                    : formatDistance(
                                          lastUpdateTime,
                                          new Date(),
                                          {
                                              addSuffix: true,
                                              locale: getDateFnsLocale(),
                                          }
                                      ),
                        })}
                    </p>
                </section>
                <div>
                    <Button
                        kind={KIND.primary}
                        onClick={() => {
                            enqueueAnalyticsEvent("Location modal opened");
                            setIsOpen(true);
                        }}
                        overrides={{
                            BaseButton: {
                                style: {
                                    minWidth: "220px",
                                },
                            },
                        }}
                    >
                        {coords.lat === DEFAULT_LOCATION.lat &&
                        coords.lng === DEFAULT_LOCATION.lng
                            ? t("navigation.setLocation")
                            : t("navigation.setLocationConfirmation")}
                    </Button>
                    <RadiusSelect />
                </div>
            </header>
        </>
    );
};
