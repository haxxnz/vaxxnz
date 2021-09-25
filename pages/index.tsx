import * as React from "react";
import { useState } from "react";
import { useBookingData } from "../src/calendar/booking/BookingData";
import { useSaveScroll } from "../src/scroll";
import { Header } from "../src/Header";
import { Footer } from "../src/Footer";
import CookiesBar from "../src/Cookies";
import {
    HealthpointLocationsContext,
    HealthpointLocationsResult,
} from "../src/contexts";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { GetServerSideProps } from "next";
import { Tabs, TabType } from "../src/components/Tabs/Tabs";
import { RouteType, VaxxHelmet } from "../src/VaxxHelmet";
import { CalendarSection } from "../src/calendar/CalendarSection";
import { Banner } from "../src/Banner";
import { LocationPicker } from "../src/components/LocationPicker/LocationPicker";
import { HealthPoint } from "../src/components/HealthPoint/HealthPoint";

function Page() {
    const [lastUpdateTime, setLastUpdateTime] = useState<Date | null>(null); // null whilst loading
    const bookingData = useBookingData(setLastUpdateTime);
    useSaveScroll();
    return (
        <HealthPoint>
            <div className="App">
                <Header />
                <Banner />
                <div className={"big-old-container"}>
                    <LocationPicker lastUpdateTime={lastUpdateTime} />
                    <VaxxHelmet routeType={RouteType.Home} />
                    <Tabs activeTab={TabType.bookings} />
                    <CalendarSection bookingData={bookingData} />
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
        </HealthPoint>
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
