import { Select } from "baseui/select";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import languages, { Language } from "./translations/resources";
import { enqueueAnalyticsEvent } from "./utils/analytics";

const LanguageSelect = () => {
  const langCode = localStorage.getItem("i18nextLng") || "en-NZ";
  const [language, setLanguage] = useState<Language | undefined>(
    languages.find((lang) => lang.code === langCode)
  );
  const { i18n } = useTranslation();

  const changeLanguage = (selectedLanguage: any) => {
    let newLang = languages.find((lang) => lang.code === selectedLanguage.code);
    setLanguage(newLang);
    i18n.changeLanguage(newLang?.code);
    enqueueAnalyticsEvent("Language changed", { code: newLang?.code });
  };

  return (
    <Select
      overrides={{
        Root: {
          style: {
            maxHeight: "40px",
            alignSelf: "center",
            marginTop: "-4px",
          },
        },
        ControlContainer: {
          style: {
            // backgroundColor: "rgba(0,0,0,0)",
            // border: "none",
            // fontSize: "1.1rem",
          },
        },
      }}
      searchable={false}
      clearable={false}
      options={languages}
      valueKey="code"
      value={language ? [language] : undefined}
      placeholder="English"
      onChange={(params) => {
        changeLanguage(params.option);
      }}
    />
  );
};

export default LanguageSelect;
