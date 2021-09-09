import { Button, KIND } from "baseui/button";
import { formatDistance } from "date-fns";
import { FunctionComponent, useEffect, useState } from "react";
import { Trans, useTranslation } from "react-i18next";
import RadiusSelect from "../RadiusSelect";
import { enqueueAnalyticsEvent } from "../utils/analytics";
import { getDateFnsLocale } from "../utils/locale";
import { useSearchParams } from "../utils/url";
import { HeaderMain } from "../VaxComponents";
import LocationModal from "./LocationModal";

export interface Coords {
  lng: number;
  lat: number;
}

interface LocationPickerProps {
  coords: Coords;
  setCoords: (coords: Coords) => void;
  radiusKm: number;
  setRadiusKm: (radiusKm: number) => void;
  lastUpdateTime: Date | null;
}

export const useDefaultCoords = (): Coords => {
  const { lat: urlLat, lng: urlLng } = useSearchParams();
  const defaultLat = urlLat ? parseFloat(urlLat) : -36.853610199274385;
  const defaultLng = urlLng ? parseFloat(urlLng) : 174.76054541484535;

  return {
    lat: defaultLat,
    lng: defaultLng,
  };
};

const useDefaultPlaceName = () => {
  const { placeName: urlPlaceName } = useSearchParams();
  return urlPlaceName ?? "Auckland CBD";
};

export const LocationPicker: FunctionComponent<LocationPickerProps> = ({
  coords,
  setCoords,
  radiusKm,
  setRadiusKm,
  lastUpdateTime,
}) => {
  const defaultCoords = useDefaultCoords();
  const defaultPlaceName = useDefaultPlaceName();
  const [placeName, setPlaceName] = useState(defaultPlaceName);
  useEffect(() => setPlaceName(defaultPlaceName), [defaultPlaceName]);

  const [isOpen, setIsOpen] = useState(false);

  const { t } = useTranslation("common");

  return (
    <>
      <LocationModal
        locationIsOpen={isOpen}
        setLocationIsOpen={setIsOpen}
        setCoords={setCoords}
        setPlaceName={setPlaceName}
      />

      <HeaderMain>
        <section>
          <h1>
            <Trans
              i18nKey="navigation.vaccinationsNear"
              t={t}
              components={[
                <strong>
                  {{ location: placeName || t("navigation.unknownLocation") }}
                </strong>,
              ]}
            />
          </h1>
          <p>
            {t("core.lastUpdated", {
              updatedAt:
                lastUpdateTime === null
                  ? "..."
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
            {coords.lat === defaultCoords.lat &&
            coords.lng === defaultCoords.lng
              ? t("navigation.setLocation")
              : t("navigation.setLocationConfirmation")}
          </Button>
          <RadiusSelect value={radiusKm} setValue={setRadiusKm} />
        </div>
      </HeaderMain>
    </>
  );
};
