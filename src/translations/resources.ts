import common_en from "./en/common.json";
import common_de from "./de/common.json";
import common_ru from "./ru/common.json";
import common_es from "./es/common_es.json";
import enFlag from "./flags/gbFlag.png";
// import miFlag from "./flags/miFlag.png";
// import esFlag from "./flags/miFlag.png";

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
    flag: enFlag,
  },
  {
    common: common_es,
    label: "Español",
    code: "es",
    // flag: esFlag
  },
  {
    common: common_de,
    label: "Deutsch",
    code: "de",
    // flag: deFlag,
  },
  {
    common: common_ru,
    label: "Русский",
    code: "ru",
    //  flag: enFlag
  }
];

const resources = languages.reduce(
  (current, lang) => ({ ...current, [lang["code"]]: lang }),
  {}
);

export { resources };

export default languages;
