import { parse, format } from "date-fns";

import { getDateFnsLocale } from "./locale";
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
    return format(parse(timeString, "HH:mm:ss", new Date()), "hh:mm aa", {
        locale: getDateFnsLocale(),
    });
}

export const formatDate = (
    inputDate: string | Date,
    inputMask: string = "default",
    utc: boolean = false
) => {
    const date =
        typeof inputDate === "string" ? new Date(inputDate) : inputDate;
    if (isNaN(date.getTime())) return "";

    const mask = String(masks[inputMask] || inputMask || masks.default);
    const { d, D, m, y, H, M, s, L, o } = splitDate(date, utc);
    const flags: { [key: string]: string | number } = {
        d,
        dd: pad(d),
        ddd: i18n.dayNames[D],
        dddd: i18n.dayNames[D + 7],
        m: m + 1,
        mm: pad(m + 1),
        mmm: i18n.monthNames[m],
        mmmm: i18n.monthNames[m + 12],
        yy: String(y).slice(2),
        yyyy: y,
        h: H % 12 || 12,
        hh: pad(H % 12 || 12),
        H,
        HH: pad(H),
        M,
        MM: pad(M),
        s,
        ss: pad(s),
        l: pad(L, 3),
        L: pad(L > 99 ? Math.round(L / 10) : L),
        t: H < 12 ? "a" : "p",
        tt: H < 12 ? "am" : "pm",
        T: H < 12 ? "A" : "P",
        TT: H < 12 ? "AM" : "PM",
        Z: utc
            ? "UTC"
            : (String(date).match(timezone) || [""])
                  .pop()!
                  .replace(timezoneClip, ""),
        o:
            (o > 0 ? "-" : "+") +
            pad(Math.floor(Math.abs(o) / 60) * 100 + (Math.abs(o) % 60), 4),
        S: ["th", "st", "nd", "rd"][
            d % 10 > 3 ? 0 : ((d % 100) - (d % 10) !== 10 ? d : 0) % 10
        ],
    };

    return mask.replace(token, ($0) => {
        return $0 in flags ? flags[$0].toString() : $0.slice(1, $0.length - 1);
    });
};

const token = /d{1,4}|m{1,4}|yy(?:yy)?|([HhMsTt])\1?|[LloSZ]|"[^"]*"|'[^']*'/g;
const timezone =
    /\b(?:[PMCEA][SDP]T|(?:Pacific|Mountain|Central|Eastern|Atlantic) (?:Standard|Daylight|Prevailing) Time|(?:GMT|UTC)(?:[-+]\d{4})?)\b/g;
const timezoneClip = /[^-+\dA-Z]/g;
const pad = (value: string | number, len: number = 2): string => {
    return value.toString().length < len
        ? pad("0" + value, len)
        : value.toString();
};

const masks: { [key: string]: string } = {
    default: "ddd mmm dd yyyy HH:MM:ss",
    shortDate: "m/d/yy",
    mediumDate: "mmm d, yyyy",
    longDate: "mmmm d, yyyy",
    fullDate: "dddd, mmmm d, yyyy",
    shortTime: "h:MM TT",
    mediumTime: "h:MM:ss TT",
    longTime: "h:MM:ss TT Z",
    isoDate: "yyyy-mm-dd",
    isoTime: "HH:MM:ss",
    isoDateTime: "yyyy-mm-dd'T'HH:MM:ss",
};

const i18n = {
    dayNames: [
        "Sun",
        "Mon",
        "Tue",
        "Wed",
        "Thu",
        "Fri",
        "Sat",
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
    ],
    monthNames: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
    ],
};

const splitDate = (date: Date, utc: boolean): { [key: string]: number } => {
    return utc
        ? {
              d: date.getUTCDate(),
              D: date.getUTCDay(),
              m: date.getUTCMonth(),
              y: date.getUTCFullYear(),
              H: date.getUTCHours(),
              M: date.getUTCMinutes(),
              s: date.getUTCSeconds(),
              L: date.getUTCMilliseconds(),
              o: 0,
          }
        : {
              d: date.getDate(),
              D: date.getDay(),
              m: date.getMonth(),
              y: date.getFullYear(),
              H: date.getHours(),
              M: date.getMinutes(),
              s: date.getSeconds(),
              L: date.getMilliseconds(),
              o: date.getTimezoneOffset(),
          };
};
