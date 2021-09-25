import { Client, Server } from "styletron-engine-atomic";
import { Provider as StyletronProvider } from "styletron-react";
import { BaseProvider } from "baseui";
import { appWithTranslation } from "next-i18next";
import VaxxTheme from "../src/VaxxTheme";
import React, { useState } from "react";
import {
    HealthpointLocationsContext,
    HealthpointLocationsResult,
} from "../src/contexts";
import "../src/App.css";
import "../src/index.css";

export const engine =
    typeof window === "undefined"
        ? new Server()
        : new Client({
              hydrate: Array.from(
                  document.getElementsByClassName("_styletron_hydrate_")
              ) as HTMLStyleElement[],
          });

const Contexts: React.FC<{}> = (props) => {
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
function _App({ Component, pageProps }: any) {
    return (
        <StyletronProvider value={engine}>
            <BaseProvider theme={VaxxTheme}>
                <Contexts>
                    <Component {...pageProps} />
                </Contexts>
            </BaseProvider>
        </StyletronProvider>
    );
}

export default appWithTranslation(_App);
