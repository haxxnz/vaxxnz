import { Helmet } from "react-helmet";
import { useParams } from "react-router-dom";
import { config } from "./translations";

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
  const { lat, lng, placeName, radius } = searchParams;
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

const VaxxCanonical: React.FC<{ url: string; title: string }> = ({
  url,
  title,
}) => {
  return (
    <Helmet>
      <title>{title}</title>
      <link rel="canonical" href={url} />
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
  locationName,
}: {
  routeType: RouteType;
  locationName?: string;
}) {
  const { date } = useParams<{ date: string }>();
  let title;
  switch (routeType) {
    case RouteType.Home:
    case RouteType.Bookings:
      title =
        "Find a COVID-19 vaccine bookings in New Zealand | Vaccine finder New Zealand | See ways to get vaccinated near you | vaxx.nz";
      return <VaxxCanonical url={getCanonicalHome()} title={title} />;
    case RouteType.Locations:
      title =
        "Find COVID-19 vaccination sites in New Zealand | Vaccine finder New Zealand | See ways to get vaccinated near you | vaxx.nz";
      return <VaxxCanonical url={getCanonicalHomeLocations()} title={title} />;
    case RouteType.Booking:
      title = `Available to Book - ${date} | Find a COVID-19 vaccine | vaxx.nz`;
      return <VaxxCanonical url={getCanonicalCalendarDay()} title={title} />;
    case RouteType.Location:
      title = `${locationName} | Walk-in/Drive-through COVID-19 vaccination site | Find a COVID-19 vaccine | vaxx.nz`;
      return <VaxxCanonical url={getCanonicalLocation()} title={title} />;
  }
}
