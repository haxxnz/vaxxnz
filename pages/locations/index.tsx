import * as React from "react";
import { RouteType, VaxxHelmet } from "../../src/VaxxHelmet";
import { Tabs, TabType } from "../../src/components/Tabs/Tabs";
import { TodayLocationsSection } from "../../src/today-locations/TodayLocationsSection";
import { GetServerSideProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { Header } from "../../src/Header";
import { Banner } from "../../src/Banner";
import { LocationPicker } from "../../src/components/LocationPicker/LocationPicker";
import { CalendarSection } from "../../src/calendar/CalendarSection";
import { Footer } from "../../src/Footer";
import CookiesBar from "../../src/Cookies";
import { useState } from "react";
import {
    HealthpointLocationsContext,
    HealthpointLocationsResult,
} from "../../src/contexts";
import { useBookingData } from "../../src/calendar/booking/BookingData";

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

function Page() {
    const [lastUpdateTime, setLastUpdateTime] = useState<Date | null>(null); // null whilst loading
    useBookingData(setLastUpdateTime);
    return (
        <>
            <Contexts>
                <div className="App">
                    <Header />
                    <Banner />
                    <div className={"big-old-container"}>
                        <LocationPicker lastUpdateTime={lastUpdateTime} />
                        <VaxxHelmet routeType={RouteType.Locations} />
                        <Tabs activeTab={TabType.walkIn} />
                        <TodayLocationsSection />
                    </div>
                    <Footer />
                </div>
                <div className="background">
                    <div
                        className="bg-impt"
                        style={{
                            backgroundImage: `url("/bg.svg")`,
                        }}
                    />
                    <CookiesBar />
                </div>
            </Contexts>
        </>
    );
}

export const getServerSideProps: GetServerSideProps = async ({
    locale,
    res,
}) => {
    /* edge caching for 100s stale-while-revalidate */
    res.setHeader("Cache-Control", "s-maxage=100, stale-while-revalidate");
    return {
        props: {
            ...(await serverSideTranslations(locale || "en-NZ", ["common"])),
        },
    };
};

export default Page;
