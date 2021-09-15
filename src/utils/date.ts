import { parse } from "date-fns";

/**
 * Formats a time string (in HH:mm:ss) to locale specific format
 *
 * @export
 * @param {string} timeString
 * @param {string} language
 * @returns  {string} The formated string in locale specific format
 */
export function formatToLocaleTimeString(
  timeString: string,
  language: string
): string {
  return new Intl.DateTimeFormat(language, {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  }).format(parse(timeString, "HH:mm:ss", new Date()));
}
