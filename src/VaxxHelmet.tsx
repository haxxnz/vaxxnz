import { parse } from "date-fns";
import Head from "next/head";
import { config } from "./translations";
import { DEFAULT_LOCATION } from "./utils/consts";
import { usePlaceName } from "./utils/usePlaceName";
import { useLocale } from "./hooks/use-locale";
import { useRouter } from "next/router";

function getSearchParams() {
    return Object.fromEntries([
        ...new URL(window.location.toString()).searchParams.entries(),
    ]);
}

function getSearch(searchParams: Record<string, string>) {
    const sp = new URLSearchParams(searchParams).toString();
    return sp ? `?${sp}` : "";
}

function getBookingDataParams(searchParams: Record<string, string>) {
    let { lat, lng, placeName, radius } = searchParams;
    if (
        lat === `${DEFAULT_LOCATION.lat}` &&
        lng === `${DEFAULT_LOCATION.lng}` &&
        placeName === DEFAULT_LOCATION.placeName
    ) {
        lat = "";
        lng = "";
        placeName = "";
    }
    if (radius === "10") {
        radius = "";
    }
    return {
        ...(lat ? { lat } : {}),
        ...(lng ? { lng } : {}),
        ...(placeName ? { placeName } : {}),
        ...(radius ? { radius } : {}),
    };
}

function getCanonicalLocation() {
    const { protocol, host, pathname } = window.location;
    const searchParams = {};
    return `${protocol}//${host}${pathname}${getSearch(searchParams)}`;
}

export enum RouteType {
    Home = "/",
    Locations = "/locations",
    Bookings = "/bookings",
    Booking = "/bookings/:date",
    Location = "/locations/:slug",
}

const VaxxCanonical: React.FC<{
    url: string;
    title: string;
    description: string;
}> = ({ url, title, description }) => {
    const locale = useLocale();
    return (
        <Head>
            <title>{title}</title>
            <link rel="canonical" href={url} />
            <meta name="description" content={description} />

            {config.supportedLngs.map((lng) => {
                if (lng === "cimode") {
                    return null;
                }
                if (lng === "en-NZ") {
                    return null;
                }
                const locale = lng.toLowerCase();
                return (
                    <link
                        key={locale}
                        rel="alternate"
                        href={`${url}/${locale}`}
                        hrefLang={`${locale}`}
                    />
                );
            })}
        </Head>
    );
};

const normalize = (
    object: Record<string, string | string[] | undefined>
): Record<string, string> => {
    return Object.fromEntries(
        Object.entries(object).map(([k, v]) => {
            if (!v) return [k, v || ""];
            return [k, Array.isArray(v) ? v[0] || "" : v];
        })
    );
};

export function VaxxHelmet({
    routeType,
    location,
}: {
    routeType: RouteType;
    location?: { name: string; address: string; telephone: string };
}) {
    const router = useRouter();
    const date = router.query.date?.toString() || "";
    const placeName = usePlaceName();
    const dateObject = parse(date, "yyyy-MM-dd", new Date());
    const searchParams = getBookingDataParams(normalize(router.query || {}));
    const search = getSearch(searchParams);

    const titleDate = `${dateObject.toLocaleDateString(["en-NZ"], {
        day: "numeric",
        month: "short",
        year: "numeric",
    })}`;

    let title;
    let description;

    switch (routeType) {
        case RouteType.Home:
        case RouteType.Bookings:
            title = `COVID-19 Vaccine Bookings - ${placeName} - Vaxx.nz`;
            description =
                "Available Booking Slots. Vaccination appointments available to book right now. This is not an official Government website. To get vaccinated visit bookmyvaccine.nz.";
            return (
                <VaxxCanonical
                    url={`${getSearch(searchParams)}`}
                    title={title}
                    description={description}
                />
            );
        case RouteType.Locations:
            title = `COVID-19 Vaccination Centres - ${placeName} - Vaxx.nz`;
            description =
                "Walk-in and Drive Thru Vaccination Centres. You don't need an appointment to get vaccinated at these venues. Visit covid19.govt.nz for more information. ";
            return (
                <VaxxCanonical
                    url={`${router.pathname}/${search}`}
                    title={title}
                    description={description}
                />
            );
        case RouteType.Booking:
            title = `Available to Book - ${placeName} - ${titleDate} - Vaxx.nz`;
            description =
                "Find a location and time from the list below. Click on the Make a Booking button, this will take you to bookmyvaccine.nz. Enter your details.";
            return (
                <VaxxCanonical
                    url={`${router.pathname}/${search}`}
                    title={title}
                    description={description}
                />
            );
        case RouteType.Location:
            title = `${location?.name} - Vaxx.nz`;
            description = `You can get a free COVID-19 vaccination at ${location?.address}. You can also call ${location?.telephone} to check how long the queues are.`;

            return (
                <VaxxCanonical
                    url={router.pathname}
                    title={title}
                    description={description}
                />
            );
    }
}
