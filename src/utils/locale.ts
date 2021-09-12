import { enNZ, de, es, ru, vi, zhCN, zhTW, mn, pl, id } from "date-fns/locale"; // Only import locale we support. Don't use import * it is bad
import { Locale } from "date-fns";
import i18next from "i18next";

const supportedDateLocale: { [localeString: string]: Locale } = {
  "en-NZ": enNZ,
  "de-DE": de,
  "ms-MY": mn, // Same issue
  "es-ES": es,
  "ru-RU": ru,
  "pl-PL": pl,
  "vi-VN": vi, // Don't ask me i18 locale string is different than date-fns locale string so ¯\_(ツ)_/¯
  "zh-TW": zhTW,
  "zh-CN": zhCN,
  "id-ID": id,
};

/**
 * Looks up a date-fns locale. This falls back to `en-NZ`
 * @returns date-fns locale.
 */
export const getDateFnsLocale = (): Locale => {
  const lang = i18next.language;
  return supportedDateLocale[lang] ?? enNZ;
};
