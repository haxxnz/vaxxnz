import {
  enNZ,
  de,
  es,
  ru,
  vi,
  zhCN,
  zhTW,
  ms,
  pl,
  id,
  hi,
  arSA,
  ja,
} from "date-fns/locale"; // Only import locale we support. Don't use import * it is bad
import { Locale } from "date-fns";
import i18next from "i18next";

const supportedDateLocale: { [localeString: string]: Locale } = {
  "en-NZ": enNZ,
  "de-DE": de,
  "ms-MY": ms,
  "es-ES": es,
  "ru-RU": ru,
  "pl-PL": pl,
  "vi-VN": vi,
  "zh-TW": zhTW,
  "zh-CN": zhCN,
  "id-ID": id,
  "hi-HI": hi,
  "ar-IQ": arSA,
  "ja-JP": ja,
};

/**
 * Looks up a date-fns locale. This falls back to `en-NZ`
 * @returns date-fns locale.
 */
export const getDateFnsLocale = (): Locale => {
  const lang = i18next.language;
  return supportedDateLocale[lang] ?? enNZ;
};

/**
 * Formats a given distance in kilometers to meters, if the distance is
 * less than 1000 meters.
 *
 * @export
 * @param {number} km
 * @param {string} language
 * @return {string}
 */
export function formatDistanceKm(km: number, language: string): string {
  try {
    if (km < 1) {
      const meters = km * 1000;
      return new Intl.NumberFormat(language, {
        style: "unit",
        unit: "meter",
        notation: "compact",
      }).format(meters);
    } else {
      return new Intl.NumberFormat(language, {
        style: "unit",
        unit: "kilometer",
        notation: "compact",
      }).format(km);
    }
  } catch (e) {
    if (km < 1) {
      return `${km * 1000} m`;
    } else {
      return `${km} km`;
    }
  }
}
