import https from "https";
import { crowdsourcedLocations } from "../../crowdsourced/CrowdsourcedLocations";
import { HealthpointLocation } from "../../today-locations/healthpoint/HealthpointData";
import { CrowdsourcedLocation } from "../../crowdsourced/CrowdsourcedData";
import { getDistanceKm } from "../../utils/distance";

export interface IHash {
  [locale: string]: number;
}

async function main() {
  let healthpointLocations: HealthpointLocation[] = [];
  https
    .get(
      "https://raw.githubusercontent.com/CovidEngine/vaxxnzlocations/main/healthpointLocations.json",
      (resp) => {
        let data = "";

        resp.on("data", (chunk) => {
          data += chunk;
        });

        resp.on("end", () => {
          healthpointLocations = JSON.parse(data) as HealthpointLocation[];

          for (let i = 0; i < crowdsourcedLocations.length; i++) {
            const location: CrowdsourcedLocation = crowdsourcedLocations[i];
            const closestKm = Math.min(
              ...healthpointLocations.map((h) => getDistanceKm(h, location))
            );
            console.log("closestKm", closestKm);
          }
        });
      }
    )
    .on("error", (err) => {
      console.log("Error: " + err.message);
    });
}
main();
