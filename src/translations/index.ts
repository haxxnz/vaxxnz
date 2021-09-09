import { resources } from "./resources";
import languages from "./resources";

let initLanguage = localStorage.getItem("language") || "en";

export const config = {
  lng: initLanguage,
  fallbackLng: initLanguage,
  interpolation: { escapeValue: false },
  resources,
};

export { languages };
