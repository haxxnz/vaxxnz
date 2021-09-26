import { Select } from "baseui/select";
import { useState } from "react";
import { useTranslation } from "next-i18next";
import languages, { Language } from "./translations/resources";
import { enqueueAnalyticsEvent } from "./utils/analytics";
import { useRouter } from "next/router";

const LanguageSelect = () => {
    const router = useRouter();
    const langCode = router.locale;
    // const langCode = localStorage.getItem("i18nextLng") || "en-NZ-NZ";
    const [language, setLanguage] = useState<Language | undefined>(
        languages.find((lang) => lang.code === langCode)
    );
    const { i18n } = useTranslation();

    const changeLanguage = (selectedLanguage: Language) => {
        let newLang = languages.find(
            (lang) => lang.code === selectedLanguage.code
        );
        setLanguage(newLang);
        i18n.changeLanguage(newLang?.code);
        const url = new URL(window.location.toString());
        url.searchParams.set(
            "locale",
            String(newLang?.code.toLocaleLowerCase())
        );
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
                        Color: "rgba(0,0,0,0)",
                        minWidth: "144px",
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
                router.push(router.pathname, router.pathname, {
                    locale: (params.option as Language).code,
                });
                // changeLanguage(params.option as Language);
            }}
        />
    );
};

export default LanguageSelect;
