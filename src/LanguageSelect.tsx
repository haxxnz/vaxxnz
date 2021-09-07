import { Select } from "baseui/select";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import enFlag from "./translations/flags/gbFlag.png";
import miFlag from "./translations/flags/miFlag.png";

const Languages = [
  {
    label: "English",
    code: "en",
    flag: enFlag,
  },
  {
    label: "Te Reo Māori",
    code: "mi",
    flag: miFlag,
  },
];

const LanguageSelect = () => {
  const [language, setLanguage] = useState(
    Languages.find((lang) => lang.code === "en")
  );
  const { i18n } = useTranslation();

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
      options={Languages}
      // value={}
      placeholder="Language"
      onChange={(params) => {
        // const newLang = Languages.find((lang) => lang.label === params.value)
        // setLanguage(newLang);
        // i18n.changeLanguage(language?.code);
        // const selectedOptions = params.value;
        // if (selectedOptions.length > 0) {
        //   const selectedOption = selectedOptions[0];
        //   const id = selectedOption.id;
        //   if (id && typeof id === "number") {
        //     props.setValue(id);
        //   }
        // }
      }}
    />
  );
};

export default LanguageSelect;

// const options = [
//   { label: "Within 2km", id: 2 },
//   { label: "Within 5km", id: 5 },
//   { label: "Within 10km", id: 10 },
//   { label: "Within 25km", id: 25 },
//   { label: "Within 50km", id: 50 },
//   { label: "Within 100km", id: 100 },
// ];

// interface Props {
//   value: number;
//   setValue: (value: number) => void;
// }

/* export default function LanguageSelect(props: Props) {
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
} */
