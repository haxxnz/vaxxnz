import common_en_NZ from "./locales/common_en-NZ.json";
import common_de_DE from "./locales/common_de-DE.json";
import common_ru_RU from "./locales/common_ru-RU.json";
import common_es_ES from "./locales/common_es-ES.json";
import common_id_ID from "./locales/common_id-ID.json";
import common_ms_MY from "./locales/common_ms-MY.json";
import common_zh_CN from "./locales/common_zh-CN.json";
import common_zh_TW from "./locales/common_zh-TW.json";
import common_sm_SM from "./locales/common_sm-SM.json";
import common_to_TO from "./locales/common_to-TO.json";
import common_vi_VN from "./locales/common_vi-VN.json";
import common_pl_PL from "./locales/common_pl-PL.json";

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
    common: common_sm_SM,
    label: "Gagana Samoa",
    code: "sm-SM",
  },
  {
    common: common_to_TO,
    label: "Lea faka-Tonga",
    code: "to-TO",
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
    common: common_id_ID,
    label: "Bahasa Indo",
    code: "id-ID",
  },
  {
    common: common_ms_MY,
    label: "Bahasa Melayu",
    code: "ms-MY",
  },
  {
    common: common_vi_VN,
    label: "Tiếng Việt",
    code: "vi-VN",
  },
  {
    common: common_pl_PL,
    label: "Polski",
    code: "pl-PL",
  },
];

const resources = languages.reduce(
  (current, lang) => ({ ...current, [lang["code"]]: lang }),
  {}
);

export { resources };

export default languages;
