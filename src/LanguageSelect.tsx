import { Select } from "./common/Select";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import languages, { Language } from "./translations/resources";
import { enqueueAnalyticsEvent } from "./utils/analytics";
import { eventedPushState } from "./utils/url";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGlobeAmericas } from "@fortawesome/free-solid-svg-icons";
import { styled } from "styletron-react";

const GlobeContainer = styled("div", {
  alignSelf: "center",
  marginLeft: "auto",
  marginRight: "2px",
  opacity: "0.6",
});

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
    <Select
      overrides={{
        InputContainer: {
          node: (
            <GlobeContainer>
              <FontAwesomeIcon
                icon={faGlobeAmericas}
                className="american-globe"
              />
            </GlobeContainer>
          ),
        },
      }}
      options={languages}
      valueKey="code"
      value={language}
      placeholder="English"
      onChange={(params) => {
        changeLanguage(params.option as Language);
      }}
    />
  );
};

export default LanguageSelect;
