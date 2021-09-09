import english from "../locales/common_en.json";
import fs from "fs";
import { join } from "path";
import { traverseTranslations } from "./traverseTranslations";
import { get, set } from "lodash";

const paths = traverseTranslations();

export interface IHash {
  [locale: string]: number;
}

let missingKeys: IHash = {};

fs.readdirSync(join(__dirname, "../locales")).forEach((locale) => {
  if (locale === "common_en.json") {
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
    if (get(data, p, null) === null) {
      set(data, p, get(english, p));
      missingKeys[locale] = missingKeys[locale] ? missingKeys[locale] + 1 : 1;
    }
  });

  fs.writeFileSync(filename, JSON.stringify(data, null, 2));
});

console.log("NEW TRANSLATIONS REQUIRED:");
console.log(missingKeys);
