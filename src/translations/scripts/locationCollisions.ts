// import fs from "fs";
import https from "https";
// import { join } from "path";
import { crowdsourcedLocations } from "../../crowdsourced/CrowdsourcedLocations";
import { HealthpointLocation } from "../../today-locations/healthpoint/HealthpointData";
import { CrowdsourcedLocation } from "../../crowdsourced/CrowdsourcedData";
import { getDistanceKm } from "../../utils/distance";
// import distance from "@turf/distance";
// import { point } from "@turf/helpers";

// export interface Coords {
//   lng: number;
//   lat: number;
// }

// /**
//  * Calculates the distance (in kilometers) between two co-ordinates.
//  *
//  * @export
//  * @param {Coords} coords1
//  * @param {Coords} coords2
//  * @return {number} Distance in kilometers.
//  */
// export function getDistanceKm(coords1: Coords, coords2: Coords): number {
//   const from = point([coords1.lat, coords1.lng]);
//   const to = point([coords2.lat, coords2.lng]);
//   const d = distance(from, to, { units: "kilometers" });
//   return d;
// }

// import prettier from "prettier";
// import english from "../locales/common_en-NZ.json";
// import { traverseTranslations } from "./traverseTranslations";

// crowdsourcedLocations
// const paths = traverseTranslations();

// const set = (string: string, obj: any, value: string) => {
//   const [current, ...rest] = string.split(".");
//   rest.length >= 1
//     ? set(rest.join("."), (obj[current] = obj[current] || {}), value)
//     : (obj[current] = value);
//   return obj;
// };

// const get = (value: object, path: string, defaultValue: string) => {
//   return String(path)
//     .split(".")
//     .reduce((acc: any, v: any) => {
//       try {
//         acc = acc[v];
//       } catch (e) {
//         return defaultValue;
//       }
//       return acc;
//     }, value);
// };

export interface IHash {
  [locale: string]: number;
}

// let missingKeys: IHash = {};

// const k = crowdsourcedLocations

async function main() {
  let healthpointLocations: HealthpointLocation[] = [];
  https
    .get(
      "https://raw.githubusercontent.com/CovidEngine/vaxxnzlocations/main/healthpointLocations.json",
      (resp) => {
        let data = "";

        // A chunk of data has been received.
        resp.on("data", (chunk) => {
          data += chunk;
        });

        // The whole response has been received. Print out the result.
        resp.on("end", () => {
          healthpointLocations = JSON.parse(data) as HealthpointLocation[];

          for (let i = 0; i < crowdsourcedLocations.length; i++) {
            const location: CrowdsourcedLocation = crowdsourcedLocations[i];
            const closestKm = Math.min(
              ...healthpointLocations.map((h) => getDistanceKm(h, location))
            );
            console.log("closestKm", closestKm);
            // for (let j = 0; j < healthpointLocations.length; j++) {
            //   const healthpointLocation = healthpointLocations[j];
            //   const km = getDistanceKm(location, healthpointLocation);
            //   console.log("km", km);
            // }
          }
        });
      }
    )
    .on("error", (err) => {
      console.log("Error: " + err.message);
    });
}
main();

// crowdsourcedLocations.forEach(location => {

// })

// fs.readdirSync(join(__dirname, "../locales")).forEach((locale) => {
//   if (locale === "common_en-NZ.json") {
//     return;
//   }

//   const filename = join(__dirname, "../locales", locale);

//   let data: any;

//   try {
//     data = JSON.parse(fs.readFileSync(filename, { encoding: "utf-8" }));
//   } catch (err: any) {
//     throw new Error(`${locale}: ${err.message}`);
//   }

//   paths.forEach((p) => {
//     if (get(data, p, "") === undefined) {
//       set(p, data, get(english, p, ""));
//       missingKeys[locale] = missingKeys[locale] ? missingKeys[locale] + 1 : 1;
//     }
//   });

//   fs.writeFileSync(
//     filename,
//     prettier.format(JSON.stringify(data), {
//       parser: "json",
//     })
//   );
// });

// console.log("NEW TRANSLATIONS REQUIRED:");
// console.log(missingKeys);
