import WalkModal from "./today-locations/healthpoint/HealthpointModal";
import {
  HealthpointLocation,
  useHealthpointLocations,
} from "./today-locations/healthpoint/HealthpointData";
import { CrowdsourcedLocation } from "./crowdsourced/CrowdsourcedData";
import CrowdsourcedModal from "./crowdsourced/CrowdsourcedModal";
import { useParams, useHistory } from "react-router-dom";
import { simpleHash } from "./utils/simpleHash";
import { crowdsourcedLocations } from "./crowdsourced/CrowdsourcedLocations";
import { getSearch } from "./utils/url";
import { saveScrollAndGo } from "./scroll";

export function LocationRouter() {
  const { slug } = useParams<{ slug: string }>();
  const [hash] = slug.split("-").slice(-1);
  const history = useHistory();

  const healthpointLocationsResult = useHealthpointLocations();
  const loading = "loading" in healthpointLocationsResult;
  const error =
    "error" in healthpointLocationsResult
      ? healthpointLocationsResult.error
      : null;
  const healthpointLocations =
    "value" in healthpointLocationsResult
      ? healthpointLocationsResult.value
      : [];

  const locations = [...healthpointLocations, ...crowdsourcedLocations];

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  if (!locations.length) {
    return <p>No locations found</p>;
  }

  const location = locations.find(
    (loc) => simpleHash(`${loc.lat}${loc.lng}`) === hash
  );

  if (!location) {
    return (
      <p>
        {slug}|{hash}
      </p>
    );
  }

  return (
    <>
      {"isHealthpoint" in location ? (
        <WalkModal
          clearSelectedLocation={() => {
            const path = "/locations";
            saveScrollAndGo(path);
            history.push(`${path}${getSearch()}`);
          }}
          location={location as HealthpointLocation}
        />
      ) : (
        <CrowdsourcedModal
          clearSelectedLocation={() => {
            const path = "/locations";
            saveScrollAndGo(path);
            history.push(`${path}${getSearch()}`);
          }}
          location={location as CrowdsourcedLocation}
        />
      )}
    </>
  );
}
