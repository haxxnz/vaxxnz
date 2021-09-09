import common_en from "./locales/common_en.json";
import common_de from "./locales/common_de.json";
import common_ru from "./locales/common_ru.json";
import common_es from "./locales/common_es.json";
import common_zh_cn from "./locales/common_zh_cn.json";
import common_zh_tw from "./locales/common_zh_tw.json";

const languages = [
  {
    common: common_en,
    label: "English",
    code: "en",
  },
  {
    common: common_es,
    label: "Español",
    code: "es",
  },
  {
    common: common_de,
    label: "Deutsch",
    code: "de",
  },
  {
    common: common_ru,
    label: "Русский",
    code: "ru",
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
];

const resources = languages.reduce(
  (current, lang) => ({ ...current, [lang["code"]]: lang }),
  {}
);

export { resources };

export default languages;
