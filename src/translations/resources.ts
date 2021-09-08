import common_en from "./en/common.json";
import common_de from "./de/common.json";
import enFlag from "./flags/gbFlag.png";
// import miFlag from "./flags/miFlag.png";
// import esFlag from "./flags/miFlag.png";

const languages = [
  {
    common: common_en,
    label: "English",
    code: "en",
    flag: enFlag,
  },
  {
    common: common_de,
    label: "Deutsch",
    code: "de",
    // flag: deFlag
  },
];

const resources = languages.reduce(
  (current, lang) => ({ ...current, [lang["code"]]: lang }),
  {}
);

export { resources };

export default languages;
