import * as React from "react";
import { useState } from "react";
import { RouteType, VaxxHelmet } from "../../src/VaxxHelmet";
import { Tabs, TabType } from "../../src/components/Tabs/Tabs";
import { TodayLocationsSection } from "../../src/today-locations/TodayLocationsSection";
import { GetServerSideProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { LocationPicker } from "../../src/components/LocationPicker/LocationPicker";
import { useBookingData } from "../../src/calendar/booking/BookingData";
import { Navigation } from "../../src/components/layouts/Navigation/Navigation";

function Page() {
    const [lastUpdateTime, setLastUpdateTime] = useState<Date | null>(null); // null whilst loading
    useBookingData(setLastUpdateTime);
    return (
        <Navigation>
            <LocationPicker lastUpdateTime={lastUpdateTime} />
            <VaxxHelmet routeType={RouteType.Locations} />
            <Tabs activeTab={TabType.walkIn} />
            <TodayLocationsSection />
        </Navigation>
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
