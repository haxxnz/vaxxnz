import * as Locales from "date-fns/locale";
import { Locale } from "date-fns";
import i18next from "i18next";

/**
 * Looks up a date-fns locale. This falls back to `en-NZ`
 * @returns date-fns locale.
 */
export const getDateFnsLocale = (): Locale => {
  const lang = i18next.language;
  return Locales[lang.replace("-", "") as keyof typeof Locales] ?? Locales.enNZ;
};
