import { Select } from "baseui/select";

const options = [
    { label: "Within 5km", id: 5 },
    { label: "Within 10km", id: 10 },
    { label: "Within 20km", id: 20 },
    { label: "Within 30km", id: 30 },
];

interface Props {
    value: number;
    setValue: (value: number) => void;
}

export default function RadiusSelect(props: Props) {
    const selectedOption = options.find((o) => o.id === props.value);
    return (
        <Select
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
