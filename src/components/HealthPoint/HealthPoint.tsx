import * as React from "react";
import { useState } from "react";
import {
    HealthpointLocationsContext,
    HealthpointLocationsResult,
} from "../../contexts";

export const HealthPoint: React.FC = (props) => {
    const [healthpointLocations, setHealthpointLocations] =
        useState<HealthpointLocationsResult>({ loading: true });

    return (
        <HealthpointLocationsContext.Provider
            value={{
                value: healthpointLocations,
                setValue: setHealthpointLocations,
            }}
        >
            {props.children}
        </HealthpointLocationsContext.Provider>
    );
};
