import { Select } from "baseui/select";
import { useTranslation } from "next-i18next";
import { enqueueAnalyticsEvent } from "./utils/analytics";
import { Radius } from "./utils/locationTypes";
import { useRadiusKm } from "./utils/useRadiusKm";
import { useRouter } from "next/router";

interface Props {}

export default function RadiusSelect(props: Props) {
    const { t } = useTranslation("common");
    const router = useRouter();
    const radiusKm = useRadiusKm();

    const setRadiusKm = (radiusKm: Radius) => {
        router.push(
            {
                pathname: router.pathname,
                query: { radius: radiusKm.toString() },
            },
            { query: { radius: radiusKm.toString() } },
            { shallow: true }
        );
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
                    if (id && (typeof id === "number" || id === "10closest")) {
                        setRadiusKm(id);
                        enqueueAnalyticsEvent("Radius changed", {
                            radiusKm: id,
                        });
                    }
                }
            }}
        />
    );
}
