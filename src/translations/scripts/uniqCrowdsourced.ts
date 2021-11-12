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
      "https://raw.githubusercontent.com/vaxxnz/vaxxnzlocations/main/healthpointLocations.json",
      (resp) => {
        let data = "";
        resp.on("data", (chunk) => {
          data += chunk;
        });
        resp.on("end", () => {
          healthpointLocations = JSON.parse(data) as HealthpointLocation[];
          for (let i = 0; i < crowdsourcedLocations.length; i++) {
            const location: CrowdsourcedLocation = crowdsourcedLocations[i];
            let minKm = Infinity;
            let minKmLocation: HealthpointLocation | undefined;
            for (let j = 0; j < healthpointLocations.length; j++) {
              const healthpointLocation = healthpointLocations[j];
              const km = getDistanceKm(healthpointLocation, location);
              if (km < minKm) {
                minKm = km;
                minKmLocation = healthpointLocation;
              }
            }
            const closestMeters = Math.floor(minKm * 1000);
            if (location.name !== minKmLocation?.name) {
              console.log("distance between meters", closestMeters);
              console.log("locationCS.name", location.name);
              console.log("locationHP.name", minKmLocation?.name);
            }
          }
        });
      }
    )
    .on("error", (err) => {
      console.log("Error: " + err.message);
    });
}
main();
