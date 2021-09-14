import {
  addressFinderAPIKey,
  reverseGeocodeURL,
  addressMetadataURL,
} from "./consts";

/**
 * An interface to describe the reverse geocode API response.
 * Endpoint documentation: https://addressfinder.nz/api/nz/address/reverse_geocode/
 *
 * @interface ReverseGeocodeResp
 */
interface ReverseGeocodeResp {
  completions: AddressResp[];
  paid: boolean;
  demo: boolean;
  success: boolean;
}

interface AddressResp {
  // The canonical address as supplied by Land Information New Zealand or NZ Post.
  a: string;
  // The unique address identifier used by addressfinder.nz.
  pxid: string;
}

/**
 * A simple interface to describe the address metadata API response.
 * Endpoint documentation: https://addressfinder.nz/api/nz/address/metadata/
 *
 * @interface AddressMetaResp
 */
interface AddressMetaResp {
  success: boolean;
  city: string;
  suburb: string;
}

/**
 * Returns the suburb that a given pair of latitude/longitude points lie within. This is
 * done by making HTTP queries to the addressfinder.nz API.
 * API documentation: https://addressfinder.nz/api/nz/specs/
 *
 * @param {number} lat
 * @param {number} lng
 * @return {Promise<string>}
 */
async function getSuburb(lat: number, lng: number): Promise<string> {
  let geocoded = await reverseGeocode(lat, lng);
  return await extractSuburb(geocoded);
}

/**
 * Returns the first/best address match for a given pair of latitude/longitude points. An
 * error is thrown if no address is found.
 *
 * @param {number} lat
 * @param {number} lng
 * @return {Promise<AddressResp>}
 */
async function reverseGeocode(lat: number, lng: number): Promise<AddressResp> {
  try {
    let params = new URLSearchParams({
      key: addressFinderAPIKey,
      format: "json",
      y: lat.toString(),
      x: lng.toString(),
    });

    let resp = await fetch(reverseGeocodeURL + params);
    let data: ReverseGeocodeResp = await resp.json();
    if (!data.success || data.completions.length === 0) {
      throw new Error("no result returned from reverse geocode query");
    }

    return data.completions[0];
  } catch (err) {
    throw new Error(`error making reverse geocode query: ${err}`);
  }
}

/**
 * Finds the suburb of a location from its associated addressfinder.nz pxid. If no suburb
 * information is found, we fallback to returning the city. Throws an error if both city
 * and suburb fields are empty.
 *
 * @param {AddressResp} geocoded
 * @return {Promise<string>}
 */
async function extractSuburb(geocoded: AddressResp): Promise<string> {
  try {
    let params = new URLSearchParams({
      key: addressFinderAPIKey,
      format: "json",
      pxid: geocoded.pxid,
    });

    let resp = await fetch(addressMetadataURL + params);
    let data: AddressMetaResp = await resp.json();

    if (!data.success || (!data.suburb && !data.city)) {
      throw new Error(
        "no valid result returned from address metadata endpoint"
      );
    }

    // Handle edge case where suburb is not provided by endpoint.
    if (!data.suburb) {
      return data.city;
    }

    return data.suburb;
  } catch (err) {
    throw new Error(`error making address metadata query: ${err}`);
  }
}

export default getSuburb;
export { reverseGeocode, extractSuburb };
