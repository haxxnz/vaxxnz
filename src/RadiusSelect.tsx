import { Select } from "./common/Select";
import { useTranslation } from "react-i18next";
import { enqueueAnalyticsEvent } from "./utils/analytics";
import { Radius } from "./utils/locationTypes";
import { eventedPushState } from "./utils/url";
import { useRadiusKm } from "./utils/useRadiusKm";

interface Props {}

export default function RadiusSelect(props: Props) {
  const { t } = useTranslation("common");
  const radiusKm = useRadiusKm();

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
    { label: t("navigation.distanceDropdown.10closest"), id: "10closest" },
  ];

  const selectedOption = options.find((o) => o.id === radiusKm);

  return (
    <Select
      options={options}
      value={selectedOption}
      valueKey={"id"}
      placeholder="Select radius"
      onChange={(params) => {
        const selectedOption = params.option;
        const id = selectedOption.id;
        if (id && (typeof id === "number" || id === "10closest")) {
          setRadiusKm(id);
          enqueueAnalyticsEvent("Radius changed", { radiusKm: id });
        }
      }}
    />
  );
}
