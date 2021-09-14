/**
 * API key to access addressfinder.nz services.
 *
 * @constant
 * @type {string}
 * @default
 */
export const ADDRESS_FINDER_API_KEY = "ARFHPVK67QXM49BEWDL3";

/**
 * addressfinder.nz API endpoint for reverse geocoding.
 *
 * @constant
 * @type {string}
 * @default
 */
export const REVERSE_GEOCODE_URL =
  "https://api.addressfinder.io/api/nz/address/reverse_geocode/?";

/**
 * addressfinder.nz API endpoint for obtaining detailed information
 * for a given address/location.
 *
 * @constant
 * @type {string}
 * @default
 */
export const ADDRESS_METADATA_URL =
  "https://api.addressfinder.io/api/nz/address/metadata/?";

/**
 * The default/starting location to populate vaxx.nz.
 *
 * @constant
 * @type {string}
 * @default
 */
export const DEFAULT_LOCATION = {
  lat: -36.853610199274385,
  lng: 174.76054541484535,
  placeName: "Auckland CBD",
};
