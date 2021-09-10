import common_en_NZ from "./locales/common_en-NZ.json";
import common_de_DE from "./locales/common_de-DE.json";
import common_ru_RU from "./locales/common_ru-RU.json";
import common_es_ES from "./locales/common_es-ES.json";
import common_ms_MY from "./locales/common_ms-MY.json";
import common_zh_CN from "./locales/common_zh-CN.json";
import common_zh_TW from "./locales/common_zh-TW.json";
import common_sm_SM from "./locales/common_sm-SM.json";

export type Language = {
  common: Object; //typeof common_en_NZ;
  label: string;
  code: string;
  flag?: string;
};

const languages: Language[] = [
  {
    common: common_en_NZ,
    label: "English",
    code: "en-NZ",
  },
  {
    common: common_sa_SA,
    label: "Gagana Samoa",
    code: "sm-SM",
  },
  {
    common: common_zh_CN,
    label: "中文（简体）",
    code: "zh-CN",
  },
  {
    common: common_zh_TW,
    label: "中文（繁體）",
    code: "zh-TW",
  },
  {
    common: common_es_ES,
    label: "Español",
    code: "es-ES",
  },
  {
    common: common_de_DE,
    label: "Deutsch",
    code: "de-DE",
  },
  {
    common: common_ru_RU,
    label: "Русский",
    code: "ru-RU",
  },
  {
    common: common_ms_MY,
    label: "Bahasa Malaysia",
    code: "ms-MY",
  },
];

const resources = languages.reduce(
  (current, lang) => ({ ...current, [lang["code"]]: lang }),
  {}
);

export { resources };

export default languages;
