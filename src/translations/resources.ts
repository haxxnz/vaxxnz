// import common_en_NZ from "./locales/common_en-NZ.json";
// import common_mi_NZ from "./locales/common_mi-NZ.json";
// import common_de_DE from "./locales/common_de-DE.json";
// import common_ru_RU from "./locales/common_ru-RU.json";
// import common_es_ES from "./locales/common_es-ES.json";
// import common_id_ID from "./locales/common_id-ID.json";
// import common_ms_MY from "./locales/common_ms-MY.json";
// import common_zh_CN from "./locales/common_zh-CN.json";
// import common_zh_TW from "./locales/common_zh-TW.json";
// import common_sm_SM from "./locales/common_sm-SM.json";
// import common_to_TO from "./locales/common_to-TO.json";
// import common_vi_VN from "./locales/common_vi-VN.json";
// import common_pl_PL from "./locales/common_pl-PL.json";
// import common_ja_JP from "./locales/common_ja-JP.json";
// import common_tl_PH from "./locales/common_tl-PH.json";
// import common_ar_IQ from "./locales/common_ar-IQ.json";
// import common_hi_HI from "./locales/common_hi-HI.json";

export type Language = {
    //typeof common_en_NZ;
    label: string;
    code: string;
    flag?: string;
};

const languages: Language[] = [
    {
        label: "English",
        code: "en-NZ",
    },
    {
        label: "Te Reo Māori",
        code: "mi-NZ",
    },
    {
        label: "Gagana Samoa",
        code: "sm-SM",
    },
    {
        label: "Lea faka-Tonga",
        code: "to-TO",
    },
    {
        label: "中文（简体）",
        code: "zh-CN",
    },
    {
        label: "中文（繁體）",
        code: "zh-TW",
    },
    {
        label: "日本語",
        code: "ja-JP",
    },
    {
        label: "हिन्दी (Hindi)",
        code: "hi-HI",
    },
    {
        label: "Español",
        code: "es-ES",
    },
    {
        label: "Deutsch",
        code: "de-DE",
    },
    {
        label: "Русский",
        code: "ru-RU",
    },
    {
        label: "Bahasa Indo",
        code: "id-ID",
    },
    {
        label: "Bahasa Melayu",
        code: "ms-MY",
    },
    {
        label: "Tiếng Việt",
        code: "vi-VN",
    },
    {
        label: "Polski",
        code: "pl-PL",
    },
    {
        label: "عربي",
        code: "ar-IQ",
    },
    {
        label: "Filipino",
        code: "tl-PH",
    },
];

const resources = languages.reduce(
    (current, lang) => ({ ...current, [lang["code"]]: lang }),
    {}
);

export { resources };

export default languages;
