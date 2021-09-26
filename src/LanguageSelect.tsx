import { Select } from "baseui/select";
import { Select as New } from "./common/Select";

import { useState } from "react";
import { useTranslation } from "react-i18next";
import languages, { Language } from "./translations/resources";
import { enqueueAnalyticsEvent } from "./utils/analytics";
import { eventedPushState } from "./utils/url";

const LanguageSelect = () => {
  const langCode = localStorage.getItem("i18nextLng") || "en-NZ";
  const [language, setLanguage] = useState<Language | undefined>(
    languages.find((lang) => lang.code === langCode)
  );
  const { i18n } = useTranslation();

  const changeLanguage = (selectedLanguage: Language) => {
    let newLang = languages.find((lang) => lang.code === selectedLanguage.code);
    setLanguage(newLang);
    i18n.changeLanguage(newLang?.code);
    const url = new URL(window.location.toString());
    url.searchParams.set("locale", String(newLang?.code.toLocaleLowerCase()));
    eventedPushState(url.toString());
    enqueueAnalyticsEvent("Language changed", { code: newLang?.code });
  };

  return (
    <New />
    // <Select
    //   overrides={{
    //     Root: {
    //       style: {
    //         maxHeight: "40px",
    //         alignSelf: "center",
    //         marginTop: "-4px",
    //       },
    //     },
    //     ControlContainer: {
    //       style: {
    //         Color: "rgba(0,0,0,0)",
    //         minWidth: "144px",
    //         // fontSize: "1.1rem",
    //       },
    //     },
    //   }}
    //   searchable={false}
    //   clearable={false}
    //   options={languages}
    //   valueKey="code"
    //   value={language ? [language] : undefined}
    //   placeholder="English"
    //   onChange={(params) => {
    //     changeLanguage(params.option as Language);
    //   }}
    // />
  );
};

export default LanguageSelect;
