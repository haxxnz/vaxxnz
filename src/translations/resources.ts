import common_en from "./locales/common_en.json";
import common_de from "./locales/common_de.json";
import common_ru from "./locales/common_ru.json";
import common_es from "./locales/common_es.json";
import common_ms_MY from "./locales/common_ms-MY.json";
import common_zh_cn from "./locales/common_zh_cn.json";
import common_zh_tw from "./locales/common_zh_tw.json";

export type Language = {
  common: typeof common_en;
  label: string;
  code: string;
  flag?: string;
};

const languages: Language[] = [
  {
    common: common_en,
    label: "English",
    code: "en-NZ",
  },
  {
    common: common_es,
    label: "Español",
    code: "es-ES",
  },
  {
    common: common_de,
    label: "Deutsch",
    code: "de-DE",
  },
  {
    common: common_ru,
    label: "Русский",
    code: "ru-RU",
  },
  {
    common: common_zh_cn,
    label: "中文（简体）",
    code: "zh-CN",
  },
  {
    common: common_zh_tw,
    label: "中文（繁體）",
    code: "zh-TW",
  },
  {
    common: common_ms_MY,
    label: "Bahasa Malaysia",
    code: "ms",
  },
];

const resources = languages.reduce(
  (current, lang) => ({ ...current, [lang["code"]]: lang }),
  {}
);

export { resources };

export default languages;
