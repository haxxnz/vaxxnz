import { BaseProvider } from "baseui";
import { appWithTranslation } from "next-i18next";
import VaxxTheme from "../src/VaxxTheme";
import React from "react";
import { Provider as StyletronProvider } from "styletron-react";
import { engine } from "./_document";
import "../src/App.css";
import "../src/index.css";

function _App({ Component, pageProps }: any) {
    return (
        <StyletronProvider value={engine}>
            <BaseProvider theme={VaxxTheme}>
                <Component {...pageProps} />
            </BaseProvider>
        </StyletronProvider>
    );
}

export default appWithTranslation(_App);
