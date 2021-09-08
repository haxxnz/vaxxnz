import { Select } from "baseui/select";
import { enqueAnalyticsEvent } from './utils/analytics';

const options = [
  { label: "Within 2km", id: 2 },
  { label: "Within 5km", id: 5 },
  { label: "Within 10km", id: 10 },
  { label: "Within 25km", id: 25 },
  { label: "Within 50km", id: 50 },
  { label: "Within 100km", id: 100 },
];

interface Props {
  value: number;
  setValue: (value: number) => void;
}

export default function RadiusSelect(props: Props) {
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
            enqueAnalyticsEvent('Change radius', { radius: id });
          }
        }
      }}
    />
  );
}
