import { resources } from "./resources";
import languages from "./resources";

let initLanguage = localStorage.getItem("i18nextLng") || "en";

const options = {
  order: ["querystring", "navigator"],
  lookupQuerystring: "lang",
};

export const config = {
  lng: initLanguage,
  fallbackLng: "en",
  ns: ["common"],
  defaultNS: "common",
  detection: options,
  supportedLngs: ["en", "es", "de", "ru"],
  interpolation: { escapeValue: false },
  resources,
};

export { languages };
