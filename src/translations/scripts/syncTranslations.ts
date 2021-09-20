import fs from "fs";
import { join } from "path";
import prettier from "prettier";
import english from "../locales/common_en-NZ.json";
import { traverseTranslations } from "./traverseTranslations";

const paths = traverseTranslations();

const set = (string: string, obj: any, value: string) => {
  const [current, ...rest] = string.split(".");
  rest.length >= 1
    ? set(rest.join("."), (obj[current] = obj[current] || {}), value)
    : (obj[current] = value);
  return obj;
};

const get = (value: object, path: string, defaultValue: string) => {
  return String(path)
    .split(".")
    .reduce((acc: any, v: any) => {
      try {
        acc = acc[v];
      } catch (e) {
        return defaultValue;
      }
      return acc;
    }, value);
};

export interface IHash {
  [locale: string]: number;
}

let missingKeys: IHash = {};

fs.readdirSync(join(__dirname, "../locales")).forEach((locale) => {
  if (locale === "common_en-NZ.json") {
    return;
  }

  const filename = join(__dirname, "../locales", locale);

  let data: any;

  try {
    data = JSON.parse(fs.readFileSync(filename, { encoding: "utf-8" }));
  } catch (err: any) {
    throw new Error(`${locale}: ${err.message}`);
  }

  paths.forEach((p) => {
    if (get(data, p, "") === undefined) {
      set(p, data, get(english, p, ""));
      missingKeys[locale] = missingKeys[locale] ? missingKeys[locale] + 1 : 1;
    }
  });

  fs.writeFileSync(
    filename,
    prettier.format(JSON.stringify(data), {
      parser: "json",
    })
  );
});

console.log("NEW TRANSLATIONS REQUIRED:");
console.log(missingKeys);
