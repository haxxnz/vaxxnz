import { Select } from "baseui/select";
import { useState } from "react";
import { useTranslation } from "react-i18next";

interface Props {
  value: number;
  setValue: (value: number) => void;
}

export default function RadiusSelect(props: Props) {
  const { t } = useTranslation("common");

  const options = [
    { label: t("navigation.distanceDropdown.2km"), id: 2 },
    { label: t("navigation.distanceDropdown.5km"), id: 5 },
    { label: t("navigation.distanceDropdown.10km"), id: 10 },
    { label: t("navigation.distanceDropdown.25km"), id: 25 },
    { label: t("navigation.distanceDropdown.50km"), id: 50 },
    { label: t("navigation.distanceDropdown.100km"), id: 100 },
  ];

  const selectedOption = options.find((o) => o.id === props.value);

  return (
    <Select
      overrides={{
        Root: {
          style: {
            maxHeight: "40px",
          },
        },
      }}
      clearable={false}
      options={options}
      value={selectedOption ? [selectedOption] : []}
      placeholder="Select radius"
      onChange={(params) => {
        const selectedOptions = params.value;
        if (selectedOptions.length > 0) {
          const selectedOption = selectedOptions[0];
          const id = selectedOption.id;
          if (id && typeof id === "number") {
            props.setValue(id);
          }
        }
      }}
    />
  );
}
