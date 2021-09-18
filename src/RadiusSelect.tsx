import { Select } from "baseui/select";
import { useTranslation } from "react-i18next";
import { enqueueAnalyticsEvent } from "./utils/analytics";
import { Radius } from "./utils/locationTypes";
import { eventedPushState } from "./utils/url";

interface Props {
  radiusKm: Radius;
}

export default function RadiusSelect(props: Props) {
  const { t } = useTranslation("common");

  const setRadiusKm = (radiusKm: Radius) => {
    const url = new URL(window.location.toString());
    url.searchParams.set("radius", radiusKm.toString());
    eventedPushState(url.toString());
  };

  const options = [
    { label: t("navigation.distanceDropdown.2km"), id: 2 },
    { label: t("navigation.distanceDropdown.5km"), id: 5 },
    { label: t("navigation.distanceDropdown.10km"), id: 10 },
    { label: t("navigation.distanceDropdown.25km"), id: 25 },
    { label: t("navigation.distanceDropdown.50km"), id: 50 },
    { label: t("navigation.distanceDropdown.100km"), id: 100 },
    { label: t("navigation.distanceDropdown.auto"), id: "auto" },
  ];

  const selectedOption = options.find((o) => o.id === props.radiusKm);

  return (
    <Select
      searchable={false}
      clearable={false}
      options={options}
      value={selectedOption ? [selectedOption] : []}
      placeholder="Select radius"
      onChange={(params) => {
        const selectedOptions = params.value;
        if (selectedOptions.length > 0) {
          const selectedOption = selectedOptions[0];
          const id = selectedOption.id;
          if (id && (typeof id === "number" || id === "auto")) {
            setRadiusKm(id);
            enqueueAnalyticsEvent("Radius changed", { radiusKm: id });
          }
        }
      }}
    />
  );
}
