import { Button, KIND } from "baseui/button";
import { formatDistance } from "date-fns";
import { FunctionComponent, useEffect, useState } from "react";
import { enqueueAnalyticsEvent } from '../utils/analytics';
import { Trans, useTranslation } from "react-i18next";
import RadiusSelect from "../RadiusSelect";
import { useSearchParams } from "../utils/url";
import { HeaderMain } from "../VaxComponents";
import LocationModal from "./LocationModal";
import { DEFAULT_LOCATION } from "../utils/location";

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

export const LocationPicker: FunctionComponent<LocationPickerProps> = ({
  coords,
  setCoords,
  radiusKm,
  setRadiusKm,
  lastUpdateTime,
}) => {
  const { placeName: urlPlaceName } = useSearchParams();
  const [placeName, setPlaceName] = useState(urlPlaceName);
  useEffect(() => setPlaceName(urlPlaceName), [urlPlaceName]);

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
                  {{ location: placeName || DEFAULT_LOCATION.placeName }}
                </strong>,
              ]}
            />
          </h1>
          <p>
            Last updated{" "}
            {lastUpdateTime === null
              ? "..."
              : formatDistance(lastUpdateTime, new Date(), {
                  addSuffix: true,
                })}
          </p>
        </section>

        <div>
          <Button
            kind={KIND.primary}
            onClick={() => {
              enqueueAnalyticsEvent('Location modal opened')
              setIsOpen(true)}
            }
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
          <RadiusSelect value={radiusKm} setValue={setRadiusKm} />
        </div>
      </HeaderMain>
    </>
  );
};
