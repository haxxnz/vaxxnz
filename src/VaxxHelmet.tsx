import { parse } from "date-fns";
import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import { config } from "./translations";
import { DEFAULT_LOCATION } from "./utils/consts";
import { usePlaceName } from "./utils/usePlaceName";

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

function getCanonicalHome() {
  const { protocol, host } = window.location;
  const searchParams = getBookingDataParams(getSearchParams());
  return `${protocol}//${host}${getSearch(searchParams)}`;
}
function getCanonicalHomeLocations() {
  const { protocol, host, pathname } = window.location;
  const searchParams = getBookingDataParams(getSearchParams());
  return `${protocol}//${host}${pathname}${getSearch(searchParams)}`;
}

function getCanonicalLocation() {
  const { protocol, host, pathname } = window.location;
  const searchParams = {};
  return `${protocol}//${host}${pathname}${getSearch(searchParams)}`;
}

function getCanonicalCalendarDay() {
  const { protocol, host, pathname } = window.location;
  const searchParams = getBookingDataParams(getSearchParams());
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
  keywords: string[];
}> = ({ url, title, description, keywords }) => {
  const { i18n } = useTranslation("common");
  return (
    <Helmet>
      <html lang={i18n.language.toLowerCase()} />
      <title>{title}</title>
      <link rel="canonical" href={url} />
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords.join(",")} />

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
            href={`${url}&locale=${locale}`}
            hrefLang={`${locale}`}
          />
        );
      })}
    </Helmet>
  );
};

export function VaxxHelmet({
  routeType,
  location,
}: {
  routeType: RouteType;
  location?: { name: string; address: string; telephone: string };
}) {
  const { date } = useParams<{ date: string }>();
  const placeName = usePlaceName();
  const dateObject = parse(date, "yyyy-MM-dd", new Date());

  const titleDate = `${dateObject.toLocaleDateString(["en-NZ"], {
    day: "numeric",
    month: "short",
    year: "numeric",
  })}`;

  let title;
  let description;
  let keywords;

  const commonKeywords = [
    "covid",
    "vaccine",
    "nz",
    "covid-19",
    "vaccine near me",
    "vaccine rollout",
    "new zealand",
    "medsafe",
    "ministry of health",
    "vaccination",
    "vaccination centres",
    "group 3",
    "group 4",
    "vaccination sites",
    "vaccination locations",
  ];
  switch (routeType) {
    case RouteType.Home:
    case RouteType.Bookings:
      title = `COVID-19 Vaccine Bookings - ${placeName} - Vaxx.nz`;
      description =
        "Available Booking Slots. Vaccination appointments available to book right now. This is not an official Government website. To get vaccinated visit bookmyvaccine.nz.";
      keywords = [
        ...commonKeywords,
        "booking",
        "book",
        "book my vaccine",
        "vaccine schedule",
        "vaccination schedule",
        "today",
        "tomorrow",
        "week",
        "weekend",
        `${placeName}`,
      ];
      return (
        <VaxxCanonical
          url={getCanonicalHome()}
          title={title}
          description={description}
          keywords={keywords}
        />
      );
    case RouteType.Locations:
      title = `COVID-19 Vaccination Centres - ${placeName} - Vaxx.nz`;
      description =
        "Walk-in and Drive Thru Vaccination Centres. You don't need an appointment to get vaccinated at these venues. Visit covid19.govt.nz for more information. ";
      keywords = [
        ...commonKeywords,
        "walk-in",
        "drive thru",
        "drive through",
        `${placeName}`,
      ];
      return (
        <VaxxCanonical
          url={getCanonicalHomeLocations()}
          title={title}
          description={description}
          keywords={keywords}
        />
      );
    case RouteType.Booking:
      title = `Available to Book - ${placeName} - ${titleDate} - Vaxx.nz`;
      description =
        "Find a location and time from the list below. Click on the Make a Booking button, this will take you to bookmyvaccine.nz. Enter your details.";
      keywords = [
        ...commonKeywords,
        "booking",
        "book",
        "book my vaccine",
        "vaccine schedule",
        "vaccination schedule",
        "today",
        "tomorrow",
        "week",
        "weekend",
        `${placeName}`,
      ];
      return (
        <VaxxCanonical
          url={getCanonicalCalendarDay()}
          title={title}
          description={description}
          keywords={keywords}
        />
      );
    case RouteType.Location:
      title = `${location?.name} - Vaxx.nz`;
      description = `You can get a free COVID-19 vaccination at ${location?.address}. You can also call ${location?.telephone} to check how long the queues are.`;

      keywords = [
        ...commonKeywords,
        "walk-in",
        "drive thru",
        "drive through",
        `${location?.name}`,
      ];
      return (
        <VaxxCanonical
          url={getCanonicalLocation()}
          title={title}
          description={description}
          keywords={keywords}
        />
      );
  }
}
