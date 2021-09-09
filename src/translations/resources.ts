import common_en from "./locales/common_en.json";
import common_de from "./locales/common_de.json";
import common_ru from "./locales/common_ru.json";
import common_es from "./locales/common_es.json";

export type Language = {
  common: typeof common_en,
  label: string;
  code: string;
  flag?: string;
}

const languages: Language[] = [
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
];

const resources = languages.reduce(
  (current, lang) => ({ ...current, [lang["code"]]: lang }),
  {}
);

export { resources };

export default languages;
