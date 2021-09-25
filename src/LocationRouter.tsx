import WalkModal from "./today-locations/healthpoint/HealthpointModal";
import {
    HealthpointLocation,
    useHealthpointLocations,
} from "./today-locations/healthpoint/HealthpointData";
import { CrowdsourcedLocation } from "./crowdsourced/CrowdsourcedData";
import CrowdsourcedModal from "./crowdsourced/CrowdsourcedModal";
import { simpleHash } from "./utils/simpleHash";
import { crowdsourcedLocations } from "./crowdsourced/CrowdsourcedLocations";
import { useRouter } from "next/router";

export function LocationRouter() {
    const router = useRouter();
    const [hash] = router.query.slug?.toString().split("-").slice(-1) || [""];

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
    console.log(loading);
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
                {router.query.slug?.toString()}|{hash}
            </p>
        );
    }

    return (
        <>
            {"isHealthpoint" in location ? (
                <WalkModal
                    cancelPath="/locations"
                    location={location as HealthpointLocation}
                />
            ) : (
                <CrowdsourcedModal
                    cancelPath="/locations"
                    location={location as CrowdsourcedLocation}
                />
            )}
        </>
    );
}
