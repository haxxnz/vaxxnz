import * as React from "react";
import { useState } from "react";
import { useBookingData } from "../../../calendar/booking/BookingData";
import { useSaveScroll } from "../../../scroll";
import { HealthPoint } from "../../HealthPoint/HealthPoint";
import { Header } from "../../../Header";
import { Banner } from "../../../Banner";
import { Footer } from "../../../Footer";
import CookiesBar from "../../../Cookies";

interface IProps {
    hideHeader?: boolean;
    hideBanner?: boolean;
}

export const Navigation: React.FC<IProps> = ({
    children,
    hideBanner = false,
    hideHeader = false,
}) => {
    const [lastUpdateTime, setLastUpdateTime] = useState<Date | null>(null); // null whilst loading
    const bookingData = useBookingData(setLastUpdateTime);
    useSaveScroll();
    return (
        <HealthPoint>
            <div className="App">
                {!hideHeader && <Header />}
                {!hideBanner && <Banner />}
                <div className={"big-old-container"}>{children}</div>
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
};
