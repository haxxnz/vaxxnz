import { enNZ, de, es, ru, vi, zhCN, zhTW, mn } from "date-fns/locale"; // Only import locale we support. Don't use import * it is bad
import { Locale } from "date-fns";
import i18next from "i18next";

const supportedDateLocale: { [localeString: string]: Locale } = {
  enNZ,
  de,
  "ms-My": mn, // Same issue
  es,
  ru,
  viVN: vi, // Don't ask me i18 locale string is different than date-fns locale string so ¯\_(ツ)_/¯
  zhTW,
  zhCN,
};

/**
 * Looks up a date-fns locale. This falls back to `en-NZ`
 * @returns date-fns locale.
 */
export const getDateFnsLocale = (): Locale => {
  const lang = i18next.language;
  const splittedLocale = lang.split("-");
  const localeString =
    splittedLocale[0].toLowerCase() === splittedLocale[1].toLowerCase()
      ? splittedLocale[0]
      : splittedLocale.join("");
  return supportedDateLocale[localeString] ?? enNZ;
};
