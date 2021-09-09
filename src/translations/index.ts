import { resources } from "./resources";
import languages from "./resources";

let initLanguage = localStorage.getItem("i18nextLng") || "en";

export const config = {
  lng: initLanguage,
  fallbackLng: "en",
  interpolation: { escapeValue: false },
  resources,
};

export { languages };
