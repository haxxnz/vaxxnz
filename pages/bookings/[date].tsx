import * as React from "react";
import { useState } from "react";
import BookingModal from "../../src/calendar/modal/CalendarModal";
import { useBookingData } from "../../src/calendar/booking/BookingData";
import { GetServerSideProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { HealthPoint } from "../../src/components/HealthPoint/HealthPoint";

function Page() {
    const [, setLastUpdateTime] = useState<Date | null>(null); // null whilst loading
    const bookingData = useBookingData(setLastUpdateTime);
    return (
        <HealthPoint>
            <div className={"big-old-container"}>
                <BookingModal
                    bookingData={
                        "ok" in bookingData ? bookingData.ok : undefined
                    }
                />
            </div>
        </HealthPoint>
    );
}

export const getServerSideProps: GetServerSideProps = async ({
    locale,
    res,
}) => {
    /* edge cache */
    res.setHeader("Cache-Control", "s-maxage=100, stale-while-revalidate");
    return {
        props: {
            ...(await serverSideTranslations(locale || "en-NZ", ["common"])),
        },
    };
};

export default Page;
