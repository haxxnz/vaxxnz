import * as React from "react";
import { useState } from "react";
import { useBookingData } from "../src/calendar/booking/BookingData";
import { useSaveScroll } from "../src/scroll";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { GetServerSideProps } from "next";
import { Tabs, TabType } from "../src/components/Tabs/Tabs";
import { RouteType, VaxxHelmet } from "../src/VaxxHelmet";
import { CalendarSection } from "../src/calendar/CalendarSection";
import { LocationPicker } from "../src/components/LocationPicker/LocationPicker";
import { Navigation } from "../src/components/layouts/Navigation/Navigation";

function Page() {
    const [lastUpdateTime, setLastUpdateTime] = useState<Date | null>(null); // null whilst loading
    const bookingData = useBookingData(setLastUpdateTime);
    useSaveScroll();
    return (
        <Navigation>
            <LocationPicker lastUpdateTime={lastUpdateTime} />
            <VaxxHelmet routeType={RouteType.Home} />
            <Tabs activeTab={TabType.bookings} />
            <CalendarSection bookingData={bookingData} />
        </Navigation>
    );
}

export const getServerSideProps: GetServerSideProps = async ({
    locale,
    res,
}) => {
    res.setHeader("Cache-Control", "s-maxage=100, stale-while-revalidate");
    return {
        props: {
            ...(await serverSideTranslations(locale || "en-NZ", ["common"])),
        },
    };
};

export default Page;
