import { resources } from "./resources";
import languages from "./resources";

let initLanguage = localStorage.getItem("i18nextLng") || "en-NZ";

const options = {
  order: ["querystring", "navigator"],
  lookupQuerystring: "lang",
};

export const config = {
  lng: initLanguage,
  fallbackLng: "en-NZ",
  ns: ["common"],
  defaultNS: "common",
  detection: options,
  supportedLngs: [
    "en-NZ",
    "es-ES",
    "de-DE",
    "ru-RU",
    "zh-CN",
    "zh-TW",
    "ms-MY",
  ],
  interpolation: { escapeValue: false },
  resources,
};

export { languages };
