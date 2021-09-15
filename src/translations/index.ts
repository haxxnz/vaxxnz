import { resources } from "./resources";
import languages from "./resources";

const options = {
  order: ["querystring", "localStorage", "navigator"],
  lookupQuerystring: "locale",
};

export const unsupportedLocales = ["mi-NZ", "to-TO", "sm-SM"];

export const config = {
  fallbackLng: "en-NZ",
  ns: ["common"],
  defaultNS: "common",
  detection: options,
  supportedLngs: [
    "en-NZ",
    "mi-NZ",
    "es-ES",
    "de-DE",
    "id-ID",
    "ru-RU",
    "zh-CN",
    "zh-TW",
    "hi-HI",
    "ms-MY",
    "sm-SM",
    "vi-VN",
    "to-TO",
    "pl-PL",
    "ar-IQ",
  ],
  interpolation: { escapeValue: false },
  resources,
};

export { languages };
