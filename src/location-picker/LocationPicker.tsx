import { Button, KIND } from "baseui/button";
import { formatDistance } from "date-fns";
import i18next from "i18next";
import { FunctionComponent, useState } from "react";
import { Trans, useTranslation } from "react-i18next";
import RadiusSelect from "../RadiusSelect";
import { unsupportedLocales } from "../translations";
import { enqueueAnalyticsEvent } from "../utils/analytics";
import { getDateFnsLocale } from "../utils/locale";
import { DEFAULT_LOCATION } from "../utils/consts";
import { useSearchParams } from "../utils/url";
import { HeaderMain } from "../VaxComponents";
import LocationModal from "./LocationModal";

export interface Coords {
  lng: number;
  lat: number;
}

interface LocationPickerProps {
  coords: Coords;
  radiusKm: number;
  lastUpdateTime: Date | null;
}

export const LocationPicker: FunctionComponent<LocationPickerProps> = ({
  coords,
  radiusKm,
  lastUpdateTime,
}) => {
  const { placeName } = useSearchParams();

  const [isOpen, setIsOpen] = useState(false);

  const { t } = useTranslation("common");

  const isUnsupported = unsupportedLocales.indexOf(i18next.language) > -1;

  return (
    <>
      <LocationModal locationIsOpen={isOpen} setLocationIsOpen={setIsOpen} />

      <HeaderMain>
        <section>
          <h1>
            <Trans
              i18nKey="navigation.vaccinationsNear"
              t={t}
              components={[
                <strong>
                  {{ location: placeName || DEFAULT_LOCATION.placeName }}
                </strong>,
              ]}
            />
          </h1>
          <p style={{ color: "#666" }}>
            {t("core.lastUpdated", {
              updatedAt:
                lastUpdateTime === null
                  ? "..."
                  : isUnsupported
                  ? new Date(lastUpdateTime).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })
                  : formatDistance(lastUpdateTime, new Date(), {
                      addSuffix: true,
                      locale: getDateFnsLocale(),
                    }),
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
          <RadiusSelect value={radiusKm} />
        </div>
      </HeaderMain>
    </>
  );
};
