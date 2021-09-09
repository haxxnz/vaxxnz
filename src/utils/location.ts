export function getSuburbIsh(
  place: google.maps.places.PlaceResult
): string | undefined {
  const { address_components } = place;
  const suburbish = (address_components ?? []).find(
    (a) =>
      a.types.includes("locality") ||
      a.types.includes("sublocality_level_1") ||
      a.types.includes("sublocality")
  );
  const short_name = suburbish?.short_name;
  return short_name;
}

export const DEFAULT_LOCATION = {
  lat: -36.853610199274385,
  lng: 174.76054541484535,
  placeName: "Auckland CBD"
}
